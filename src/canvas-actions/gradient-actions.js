import { fabric } from "fabric";
export const addGradientToFill = (colors) => {
  const { canvas } = window;
  if (!canvas) return;
  const activeObject = canvas.getActiveObject();
  if (!activeObject) return;
  const { width, height } = activeObject.getBoundingRect(true);
  var color = new fabric.Gradient({
    type: "linear",
    coords: {
      x1: 0,
      y1: 0,
      x2: width,
      y2: height,
    },
    colorStops: colors.map((item) => ({
      offset: ![undefined,null].includes(item?.left) ? item.left : item.offset,
      color: item?.value ? item.value : item.color,
    })),
  });
  activeObject.set({
    previousFill: activeObject.fill,
    fill: color,
  });
  canvas.renderAll();
};

export const removeGradientFill = () => {
  const { canvas } = window;
  if (!canvas) return;
  const activeObject = canvas.getActiveObject();
  if (!activeObject) return;
  const { previousFill } = activeObject;
  activeObject.set({
    fill: previousFill || "#FFFCFC",
  });
  canvas.renderAll();
};

export const handleChangeFillGradProp = (gradient, type) => {
  const { canvas } = window;
  if (!canvas) return;
  const activeObject = canvas.getActiveObject();
  if (!activeObject) return;
  if (typeof activeObject.fill != "string") {
    const { width, height } = activeObject.getBoundingRect(true);
    const colorStops = gradient.colors.map((item) => ({
      offset: item.left / 100,
      color: item.value,
    }));
    var color = new fabric.Gradient({
      type: type,
      coords: {
        x1: 0,
        y1: 0,
        x2: width,
        y2: height,
      },
      colorStops: colorStops,
    });
    activeObject.set({
      fill: color,
    });
    canvas.renderAll();
  }
};
