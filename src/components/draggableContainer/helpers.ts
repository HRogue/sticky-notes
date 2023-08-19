// one call per frame
export function throttleRAF<Fn extends (...args: any[]) => void>(fn: Fn) {
  let skip = false;
  return (...args: Parameters<Fn>) => {
    if (skip) {
      return;
    }

    skip = true;
    requestAnimationFrame(() => {
      fn(...args);
      skip = false;
    });
  };
}

export const applyLimits = (v: number, [min, max]: [number, number]) =>
  v < min ? min : v > max ? max : v;

export function createDragOnMouseDownHandler(
  onMouseMove: (event: MouseEvent) => void,
  onMouseDown?: (event: React.MouseEvent<HTMLDivElement>) => void,
  onMouseUp?: (event: MouseEvent) => void
) {
  return function _onMouseDown(downEvent: React.MouseEvent<HTMLDivElement>) {
    onMouseDown && onMouseDown(downEvent);

    const _onMouseUp = (endEvent: MouseEvent) => {
      onMouseUp && onMouseUp(endEvent);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", _onMouseUp);
    };

    document.addEventListener("mouseup", _onMouseUp);
    document.addEventListener("mousemove", onMouseMove);

    downEvent.preventDefault();
    downEvent.stopPropagation();
  };
}
