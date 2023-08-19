import { ReactNode, useState, MouseEventHandler } from "react";
import styles from "./draggableContainer.module.css";
import { Dimensions } from "../../types";
import { createDragHandler } from "./createDragHandler";
import { createResizeHandler } from "./createResizeHandler";

export interface DraggableItem {
  readonly id: number;
  size: Dimensions;
  position: Dimensions;
  layer: number;
}

export interface DraggableContainerProps extends DraggableItem {
  onChange: (changedFields: Partial<DraggableItem>) => void;
  onDragEnd?: (cursor: Dimensions) => void;
  bounds: HTMLElement;
  children: ReactNode;
}

type OptionalMouseEventHandler = undefined | MouseEventHandler;

export default function DraggableContainer(props: DraggableContainerProps) {
  const { onChange, size, position, layer: zIndex, onDragEnd, bounds } = props;
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);

  let onResizeStart: OptionalMouseEventHandler = undefined;
  let onDragStart: OptionalMouseEventHandler = undefined;
  if (containerRef) {
    onDragStart = createDragHandler(
      containerRef,
      bounds,
      (position, cursor) => {
        onChange({ position });
        onDragEnd && onDragEnd(cursor);
      }
    );
    onResizeStart = createResizeHandler(containerRef, bounds, (size) => {
      onChange({ size });
    });
  }

  const { x: left, y: top } = position;
  return (
    <div
      ref={setContainerRef}
      style={{ zIndex, top, left }}
      className={styles["draggable-container"]}
    >
      <div
        onMouseDown={onDragStart}
        className={styles["draggable-container__drag-handle"]}
        title={'drag here'}
      >
      </div>
      <div
        style={{ width: size.x, height: size.y }}
        className={styles["draggable-container__content"]}
      >
        {props.children}
        <div
          className={styles["draggable-container__resize-handle"]}
          onMouseDown={onResizeStart}
        ></div>
      </div>
    </div>
  );
}
