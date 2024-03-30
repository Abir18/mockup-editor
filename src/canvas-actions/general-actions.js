import { fabric } from "fabric";
import { rotationWithSnapping } from "fabric-overrides/controls/global-controls";
export const canvasActions = {
  copy: (target) => {
    if (!target) return;
    // Serialize the active object to JSON
    const copiedObjectData = target.toJSON();
    // Store the copied object data in a variable or global storage
    window.copiedObjectData = copiedObjectData;
  },
  remove: (target) => {
    if (!target) return;
    const { canvas } = target;
    // Removing All Objects from Active Selection
    if (target.type === "activeSelection") {
      const objects = target.getObjects();
      canvas._discardActiveObject();
      objects.forEach(function (object) {
        object.canvas && object.canvas.remove(object);
      });
    } else {
      canvas && canvas.remove(target);
    }
    canvas.discardActiveObject();
    canvas.renderAll();
  },
  duplicate: async (target) => {
    if (!target) return;
    const { canvas, type } = target;
    if (type === "activeSelection") {
      target._objects.map(async (object) => {
        await object.clone((cloned) => {
          cloned.left = cloned.left + 10;
          cloned.top = cloned.top + 10;
          canvas.add(cloned);
          canvas.setActiveObject(cloned);
        });
      });
    } else {
      await target.clone((cloned) => {
        cloned.left = cloned.left + 10;
        cloned.top = cloned.top + 10;
        canvas.add(cloned);
        canvas.setActiveObject(cloned);
      });
    }

    canvas.requestRenderAll();
  },
  paste: async (canvas) => {
    if (!canvas) return;
    if (window.copiedObjectData) {
      // Deserialize the copied object data from JSON
      fabric.util.enlivenObjects([window.copiedObjectData], (objects) => {
        const copiedObject = objects[0];

        // Adjust the position of the copied object (optional)
        copiedObject.set({
          left: copiedObject.left + 10, // Adjust the left position
          top: copiedObject.top + 10, // Adjust the top position
        });

        // Add the copied object to the canvas
        canvas.add(copiedObject);

        // Make the copied object the active object
        canvas.setActiveObject(copiedObject);

        // Render the canvas
        canvas.renderAll();
      });
    }
  },
  selectAll: (canvas) => {
    let allObjects = canvas.getObjects();
    if (allObjects.length === 0) return;

    const selection = new fabric.ActiveSelection(allObjects, {
      canvas,
    });
    canvas.setActiveObject(selection);
    canvas.requestRenderAll();
  },
  deselectAll: (canvas) => {
    canvas.discardActiveObject();
    canvas.requestRenderAll();
  },
  bringForward: (target) => {
    const { canvas } = target;
    if (!canvas) return;
    target.bringToFront();
    canvas.requestRenderAll();
  },
  layerUp: (target) => {
    const { canvas } = target;
    if (!canvas) return;
    target.bringForward();
    canvas.renderAll();
  },
  layerDown: (target) => {
    const { canvas } = target;
    if (!canvas) return;
    target.sendBackwards();
    canvas.renderAll();
  },
  sendBackward: (target) => {
    const { canvas } = target;
    if (!canvas) return;
    target.sendToBack();
    canvas.requestRenderAll();
  },
  layerUp: (target) => {
    const { canvas } = target;
    if (!canvas) return;
    target.bringForward();
    canvas.renderAll();
  },
  toggleVisibility: (target) => {
    const { canvas } = target;
    if (!canvas) return;
    target.visible = !target.visible;
    canvas.renderAll();
  },
  toggleLockUnlock: (target) => {
    lockUnlock(target);
  },
  zoomToFit: (canvas) => {
    if (!canvas) return;
    canvas.fire("zoomToFit");
  },
  singleSelection: (target) => {
    const { canvas } = target;
    if (!canvas) return;
    canvas.setActiveObject(target);
    canvas.renderAll();
  }
};

export const isObjectLocked = (target) => {
  if (!target) return false;
  const { lockMovementX, lockMovementY, lockScalingX, lockScalingY } = target;
  return lockMovementX && lockMovementY && lockScalingX && lockScalingY;
};


export const lockUnlock = (target) => {
  const { canvas } = target;
  if (!canvas) return;
  const isLocked = isObjectLocked(target);
  const controlsUtils = fabric.controlsUtils;
  if (!isLocked) {
    // target.controls.mtr.actionHandler = (target, transform) => controlsUtils.wrapWithFireEvent('object:modified', lockUnlock(transform.target));
    target.controls.mtr.actionHandler = (target, transform) => lockUnlock(transform.target);
    target.controls.mtr.mouseUpHandler = (target, transform) => lockUnlock(transform.target);

  } else {
    target.controls.mtr.actionHandler = controlsUtils.wrapWithFireEvent('rotating', rotationWithSnapping);
    delete target.controls.mtr.mouseUpHandler;
    target.controls.mtr.cursorStyleHandler = controlsUtils.rotationStyleHandler;
  }
  target.set({
    lockMovementX: !isLocked,
    lockMovementY: !isLocked,
    lockScalingX: !isLocked,
    lockScalingY: !isLocked,
    // evented: isLocked,
    // selectable: isLocked,
    editable: isLocked,
  });
  canvas.renderAll();
}