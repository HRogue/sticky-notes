import React from "react";
import { Dimensions } from "../../types";
import {
  applyLimits,
  createDragOnMouseDownHandler,
  throttleRAF,
} from "./helpers";

export const pixelsToNumber = (str: string) =>
  parseInt(str.substring(0, str.length - 2));

export function createDragHandler(
  draggedElement: HTMLElement,
  bounds: HTMLElement,
  onEnd: (topLeft: Dimensions, cursor: Dimensions) => void
) {
  let isMouseUp = true; // onMouseMove can fire after onMouseUp because of throttleRAF
  const start = { x: 0, y: 0 };
  const startScroll = { x: 0, y: 0 };
  let rect: DOMRect;
  let top = 0;
  let left = 0;
  let sourceZIndex = "";
  const currentTranslate = { x: 0, y: 0 };
  let lastMoveEvent: MouseEvent;

  let limitsX: [number, number] = [0, 0];
  let limitsY: [number, number] = [0, 0];

  const onScroll = () => {
    // hacky way to scroll correctly
    if (lastMoveEvent && !isMouseUp) {
      onMouseMove(lastMoveEvent);
    }
  };

  const onMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    // initializes variables that we need in other handlers
    isMouseUp = false;
    rect = draggedElement.getBoundingClientRect();
    top = pixelsToNumber(draggedElement.style.top);
    left = pixelsToNumber(draggedElement.style.left);

    start.x = event.pageX;
    start.y = event.pageY;

    startScroll.x = bounds.scrollLeft;
    startScroll.y = bounds.scrollTop;

    limitsX = [-left, bounds.scrollWidth - left - rect.width];
    limitsY = [-top, bounds.scrollHeight - top - rect.height];

    // save original styles and apply some for optimisation purposes
    sourceZIndex = draggedElement.style.zIndex;
    draggedElement.style.zIndex = "" + Number.MAX_SAFE_INTEGER;
    draggedElement.style.willChange = "transform";

    bounds.addEventListener("scroll", onScroll);
  };

  const onMouseMove = throttleRAF((moveEvent: MouseEvent) => {
    if (isMouseUp) return;

    lastMoveEvent = moveEvent;
    const x = applyLimits(
      moveEvent.pageX - start.x + bounds.scrollLeft - startScroll.x,
      limitsX
    );
    const y = applyLimits(
      moveEvent.pageY - start.y + bounds.scrollTop - startScroll.y,
      limitsY
    );
    currentTranslate.x = x;
    currentTranslate.y = y;

    draggedElement.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    moveEvent.preventDefault();
    moveEvent.stopPropagation();
  });

  const onMouseUp = (event: MouseEvent) => {
    // restores styles
    draggedElement.style.transform = "";
    draggedElement.style.zIndex = sourceZIndex;
    draggedElement.style.willChange = "";

    const { pageX: x, pageY: y } = event;
    const { width, height } = rect;

    const topLeft = {
      x: applyLimits(x - start.x + bounds.scrollLeft - startScroll.x + left, [
        0,
        bounds.scrollWidth - width,
      ]),
      y: applyLimits(y - start.y + bounds.scrollTop - startScroll.y + top, [
        0,
        bounds.scrollHeight - height,
      ]),
    };

    isMouseUp = true;
    const cursorPosition = { x, y };
    bounds.removeEventListener("scroll", onScroll);
    onEnd(topLeft, cursorPosition);
  };

  return createDragOnMouseDownHandler(onMouseMove, onMouseDown, onMouseUp);
}
