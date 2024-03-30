import { fabric } from "fabric";
export const changeCanvasBackground = (url) => {
  const { canvas } = window;
  if (!canvas) return;
  // const updatedUrl = `${url}?tr=h-${canvas.height},w-${canvas.width}`;
  const updatedUrl = url;
  fabric.Image.fromURL(
    updatedUrl,
    function (img) {
      const W = canvas.width;
      const H = canvas.height;
      const K = H / W;
      const w = img.getScaledWidth();
      const h = img.getScaledHeight();
      const k = h / w;
      k < K ? img.scaleToHeight(H) : img.scaleToWidth(W);
      canvas.setBackgroundImage(
        img,
        canvas.renderAll.bind(canvas),
        {
          //   scaleY: originalHeight / img.height,
          //   scaleX: originalWidth / img.width,
          selectable: true,
          lockMovementX: true,
          lockMovementY: true,
          lockRotation: true,
          erasable: true,
        },
        { crossOrigin: "anonymous" }
      );
    },
    // { crossOrigin: "anonymous" }
  );
};

export const handleBackgroundGradient = (colors, type = "linear") => {
  const { canvas } = window;
  if (!canvas) return;
  const { width, height } = canvas;
  const length = colors.length;
  var color = new fabric.Gradient({
    type: type,
    coords: {
      x1: 0,
      y1: 0,
      x2: width,
      y2: height,
    },
    colorStops: colors.map((item, index) => ({
      offset: item?.left ? item.left : index / length,
      color: item?.value || item,
    })),
  });
  // canvas.set("backgroundColor", gradient.toLive());
  // canvas.backgroundColor = color.toLive(canvas.contextContainer);
  canvas.set({
    previousFill: canvas.backgroundColor,
    // backgroundColor: color.toLive(canvas.contextContainer),
    backgroundColor: color,
  });
  canvas.renderAll();
};

export const handleRemoveBGGradient = () => {
  const { canvas } = window;
  if (!canvas) return;
  const { previousFill } = canvas;
  canvas.set({
    backgroundColor: previousFill || "#FFFCFC",
  });
  canvas.renderAll();
};

export const handleChangeBGGradType = (type, gradient) => {
  const { canvas } = window;
  if (!canvas) return;
  if (typeof canvas.backgroundColor != String) {
    const { width, height } = canvas;
    const colorStops = gradient.map((item) => ({
      offset: item.left,
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
    canvas.set({
      // backgroundColor: color.toLive(canvas.contextContainer),
      backgroundColor: color,
    });
    canvas.renderAll();
  }
};

export const handleChangeBGGradProp = (gradient,type) => {
  const { canvas } = window;
  if (!canvas) return;
  if (typeof canvas.backgroundColor != String) {
    const { width, height } = canvas;
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
    canvas.set({
      // backgroundColor: color.toLive(canvas.contextContainer),
      backgroundColor: color,
    });
    canvas.renderAll();
  }
};
