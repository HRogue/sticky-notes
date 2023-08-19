import React from "react";
import { Dimensions } from "../../types";
import {
  applyLimits,
  createDragOnMouseDownHandler,
  throttleRAF,
} from "./helpers";

export function createResizeHandler(
  draggedElement: HTMLElement,
  bounds: HTMLElement,
  onEnd: (size: Dimensions) => void
) {
  let isMouseUp = true; // onMouseMove can fire after onMouseUp because of throttleRAF
  let rect: DOMRect;
  let sourceTransformOrigin = "";
  let sourceZIndex = "";
  const start = { x: 0, y: 0 };
  let lastMoveEvent: MouseEvent;
  const startScroll = { x: 0, y: 0 };

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

    start.x = event.pageX;
    start.y = event.pageY;

    startScroll.x = bounds.scrollLeft;
    startScroll.y = bounds.scrollTop;

    // save original styles and apply some for optimisation purposes
    sourceTransformOrigin = draggedElement.style.transformOrigin;
    draggedElement.style.transformOrigin = "top left";

    sourceZIndex = draggedElement.style.zIndex;
    draggedElement.style.zIndex = "" + Number.MAX_SAFE_INTEGER;

    draggedElement.style.willChange = "transform";
    bounds.addEventListener("scroll", onScroll);
  };

  const onMouseMove = throttleRAF((event: MouseEvent) => {
    if (isMouseUp) return;
    lastMoveEvent = event;
    const { pageX, pageY } = event;
    const { width, height } = rect;
    const scale = {
      x:
        applyLimits(
          rect.width + pageX - start.x + bounds.scrollLeft - startScroll.x,
          [70, Infinity]
        ) / width,
      y:
        applyLimits(
          rect.height + pageY - start.y + bounds.scrollTop - startScroll.y,
          [70, Infinity]
        ) / height,
    };

    draggedElement.style.transform = `scale(${scale.x}, ${scale.y})`;
    event.preventDefault();
    event.stopPropagation();
  });

  const onMouseUp = (event: MouseEvent) => {
    // restores styles
    draggedElement.style.transformOrigin = sourceTransformOrigin;
    draggedElement.style.zIndex = sourceZIndex;
    draggedElement.style.transform = "";
    draggedElement.style.willChange = "";

    isMouseUp = true;
    bounds.removeEventListener("scroll", onScroll);
    onEnd({
      x: applyLimits(
        rect.width + event.pageX - start.x + bounds.scrollLeft - startScroll.x,
        [70, Infinity]
      ),
      y: applyLimits(
        rect.height + event.pageY - start.y + bounds.scrollTop - startScroll.y,
        [70, Infinity]
      ),
    });
  };

  return createDragOnMouseDownHandler(onMouseMove, onMouseDown, onMouseUp);
}
