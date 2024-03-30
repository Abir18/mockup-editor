export const groupObjects = () => {
  const { canvas } = window;
  if (!canvas) return;
  const activeObject = canvas.getActiveObject();
  if (!activeObject) return;
  activeObject.toGroup();
  canvas.discardActiveObject();
  canvas.requestRenderAll();
};

export const ungroupObject = () => {
  const { canvas } = window;
  if (!canvas) return;
  const activeObject = canvas.getActiveObject();
  if (!activeObject) return;
  const newSelection = activeObject.toActiveSelection();
  newSelection.canvas = canvas;
  const allObjects = deepFindGroupedObjects(activeObject);
  allObjects.forEach((obj) => {
    const { left, top } = obj.getBoundingRect(true);
    obj.set({
      left,
      top,
    });
    obj.setCoords();
    obj._setOriginToCenter();
    canvas.add(obj);
  });
  canvas.remove(activeObject);
  canvas.discardActiveObject();
  canvas.requestRenderAll();
};

const deepFindGroupedObjects = (group, objects = [], key = "_objects") => {
  group[key].forEach((obj) => {
    if (obj.type !== "group") {
      objects.push(obj);
    } else {
      deepFindGroupedObjects(obj, objects, key);
    }
  });

  return objects;
};
