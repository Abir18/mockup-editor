import { fabric } from "fabric";
import { canvasActions } from "./general-actions";
const keyDownHandler = async (event, canvas) => {
  const { target, code, metaKey, ctrlKey, shiftKey} = event;
  if (!allowKeyboardEvent(target)) return;

  const active = canvas.getActiveObject();

  if (active) {
    event.preventDefault();
    if (metaKey || ctrlKey) {
      if (code === "KeyC") {
        canvasActions.copy(active);
      } else if (code === "KeyD") {
        canvasActions.duplicate(active);
      } else if (code === "KeyV") {
        canvasActions.paste(canvas);
      }
    }
    if (code === "Delete" || code === "Backspace") {
      canvasActions.remove(active);
    }
    handleMoveItemsWithKeyboard(event, canvas);
  }

  if (metaKey || ctrlKey) {
    switch (code) {
      case "KeyV":
        canvasActions.paste(canvas);
        break;
      case "KeyA":
        event.preventDefault();
        if(active?.type!=="activeSelection") canvasActions.selectAll(canvas);
        if (shiftKey) canvasActions.deselectAll(canvas);
        break;
    }
  }
};

export const startKeyboardEvents = (canvas) => {
  document.addEventListener("keydown", (event) =>
    keyDownHandler(event, canvas)
  );
};

/**
 * @description Add an remove items to/from frames when dragging
 *
 * @param {Event} e
 * @param {fabric.Canvas} canvas
 */
function handleMoveItemsWithKeyboard(e, canvas) {
  const { code, shiftKey } = e;

  const active = canvas.getActiveObject();
  if (!active || active.lockMovementX || active.lockMovementY) return;

  const eventObject = {
    target: active,
    eventSource: "keyboard",
    e,
    action: "drag",
    transform: {
      original: fabric.util.saveObjectTransform(active),
    },
  };

  if (code === "ArrowRight") {
    if (active.type === "arrow") {
      active.start.x += shiftKey ? 10 : 1;
      active.end.x += shiftKey ? 10 : 1;
      active._setLinePosition();
      active._setLineWidthHeight();
    } else {
      active.left += shiftKey ? 10 : 1;
    }
    active.setCoords();
    canvas.requestRenderAll();

    const movement = {
      x: shiftKey ? 10 : 1,
      y: 0,
    };
    canvas.fire("object:modified", { ...eventObject, movement });
    canvas.fire("object:moved", { ...eventObject, movement });
    active.fire("moved", { ...eventObject, movement });

    e.preventDefault();
  } else if (code === "ArrowLeft") {
    if (active.type === "arrow") {
      active.start.x -= shiftKey ? 10 : 1;
      active.end.x -= shiftKey ? 10 : 1;
      active._setLinePosition();
      active._setLineWidthHeight();
    } else {
      active.left -= shiftKey ? 10 : 1;
    }
    active.setCoords();
    canvas.requestRenderAll();

    const movement = {
      x: shiftKey ? -10 : -1,
      y: 0,
    };
    canvas.fire("object:modified", { ...eventObject, movement });
    canvas.fire("object:moved", { ...eventObject, movement });
    active.fire("moved", { ...eventObject, movement });

    e.preventDefault();
  } else if (code === "ArrowDown") {
    if (active.type === "arrow") {
      active.start.y += shiftKey ? 10 : 1;
      active.end.y += shiftKey ? 10 : 1;
      active._setLinePosition();
      active._setLineWidthHeight();
    } else {
      active.top += shiftKey ? 10 : 1;
    }
    active.setCoords();
    canvas.requestRenderAll();

    const movement = {
      x: 0,
      y: shiftKey ? 10 : 1,
    };
    canvas.fire("object:modified", { ...eventObject, movement });
    canvas.fire("object:moved", { ...eventObject, movement });
    active.fire("moved", { ...eventObject, movement });

    e.preventDefault();
  } else if (code === "ArrowUp") {
    if (active.type === "arrow") {
      active.start.y -= shiftKey ? 10 : 1;
      active.end.y -= shiftKey ? 10 : 1;
      active._setLinePosition();
      active._setLineWidthHeight();
    } else {
      active.top -= shiftKey ? 10 : 1;
    }
    active.setCoords();
    canvas.requestRenderAll();

    const movement = {
      x: 0,
      y: shiftKey ? -10 : -1,
    };
    canvas.fire("object:modified", { ...eventObject, movement });
    canvas.fire("object:moved", { ...eventObject, movement });
    active.fire("moved", { ...eventObject, movement });

    e.preventDefault();
  }
}

export function allowKeyboardEvent(target) {
  return !(
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.id === "video-canvas"
  );
}
