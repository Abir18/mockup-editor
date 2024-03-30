import { fabric } from "fabric";
import {canvasUtils} from "canvas-actions";
export const alignPositionOnCanvas = (position) => {
  const { canvas } = window;
  if (!canvas) return;
  const activeObject = canvas?.getActiveObject();
  if (!activeObject) return;
  switch (position.toLowerCase()) {
    case "left": {
      if (activeObject.type === "activeSelection") {
        const { left } = activeObject;
        activeObject.forEachObject((object) => {
          object.left =
            canvasUtils.getDims(object).x / 2 -
            canvasUtils.getDims(activeObject).x / 2;
        });
        activeObject.left = left;
      } else {
        // Calculate the new left position to align the object's left side with the canvas left
        const newLeft = activeObject.width / 2;
        // Set the 'left' property of the object
        activeObject.set({ left: newLeft });
      }
      break;
    }
    case "right": {
      if (activeObject.type === "activeSelection") {
        const { left, width } = activeObject;
        activeObject.forEachObject((object) => {
          object.left =
            canvasUtils.getDims(activeObject).x / 2 -
            canvasUtils.getDims(object).x / 2;
        });
        activeObject.left = left + width - activeObject.width;
      } else {
        const canvasWidth = canvas.width;
        const objectWidth = activeObject.width;
        // Calculate the new left position to align the object's right side with the canvas right
        const newLeft = canvasWidth - objectWidth / 2;
        activeObject.set({ left: newLeft });
      }
      break;
    }
    case "top": {
      if (activeObject.type === "activeSelection") {
        const { top } = activeObject;
        activeObject.forEachObject((object) => {
          object.top =
            canvasUtils.getDims(object).y / 2 -
            canvasUtils.getDims(activeObject).y / 2;
        });
        activeObject.top = top;
      } else {
        const objectHeight = activeObject.height;
        // Calculate the new top position to align the object's top side with the canvas top
        const newTop = objectHeight / 2;
        activeObject.set({ top: newTop });
      }
      break;
    }
    case "bottom": {
      if (activeObject.type === "activeSelection") {
        const { top, height } = activeObject;
        activeObject.forEachObject((object) => {
          object.top =
            canvasUtils.getDims(activeObject).y / 2 -
            canvasUtils.getDims(object).y / 2;
        });
        activeObject.top = top + height - activeObject.height;
      } else {
        const canvasHeight = canvas.height;
        const objectHeight = activeObject.height;
        // Calculate the new top position to align the object's bottom side with the canvas bottom
        const newTop = canvasHeight - objectHeight / 2;
        activeObject.set({ top: newTop });
      }
      break;
    }
    case "center": {
      if (activeObject.type === "activeSelection") {
        activeObject.forEachObject((object) => {
          object.setPositionByOrigin(
            new fabric.Point(object.left, 0),
            object.originX,
            "center"
          );
        });
      } else {
        const canvasWidth = canvas.width;

        // Calculate the horizontal center of the canvas
        const canvasCenterX = canvasWidth / 2;

        // Calculate the new left position to align the object horizontally
        const newLeft = canvasCenterX;

        // Set the 'left' property of the object
        activeObject.set({ left: newLeft });
      }
      break;
    }
    case "middle": {
      if (activeObject.type === "activeSelection") {
        activeObject.forEachObject((object) => {
          object.setPositionByOrigin(
            new fabric.Point(0, object.top),
            "center",
            object.originY
          );
        });
      } else {
        const canvasHeight = canvas.height;
        const objectHeight = activeObject.height;
        // Calculate the vertical center of the canvas
        const canvasCenterY = canvasHeight / 2;
        // Calculate the new top position to align the object vertically
        const newTop = canvasCenterY - objectHeight / 2;

        activeObject.set({ top: newTop });
      }
      break;
    }
    default: {
      break;
    }
  }
  canvas.requestRenderAll();
};
