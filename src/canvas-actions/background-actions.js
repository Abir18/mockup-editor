import {fabric} from "fabric";
export const changeCanvasBackground = (url, options = {}) => {
  const {canvas} = window;
  // console.log(options, "options");
  if (!canvas) return;
  // const updatedUrl = `${url}?tr=h-${canvas.height},w-${canvas.width}`;
  const updatedUrl = url;

  fabric.Image.fromURL(updatedUrl, function (img) {
    // img.scaleToHeight(300);
    // img.scaleToWidth(300);
    // img.scale(0.5).set({top: 50, left: 100});
    // const clipPath = new fabric.Circle({
    //   // top: 200,
    //   // left: 250,
    //   originY: "center",
    //   originX: "center"
    // });

    img.set({
      ...options
    });
    // canvas.add(img);
    // canvas.clipPath = clipPath;

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
        // scaleY: canvas.height / img.height,
        // scaleX: canvas.width / img.width,
        scaleY: canvas.height / h,
        scaleX: canvas.width / w,
        selectable: true,
        movementX: true,
        lockMovementX: false
        // lockMovementX: false,
        // lockMovementY: false,
        // lockRotation: false,
        // erasable: true
      },
      {crossOrigin: "anonymous"}
    );
    // img.set({
    //   left: 350,
    //   top: 300,
    //   scaleX: 0.2,
    //   scaleY: 0.2,
    //   selectable: true
    // });
  });
};

export const handleBackgroundGradient = (colors, type = "linear") => {
  const {canvas} = window;
  if (!canvas) return;
  const {width, height} = canvas;
  const length = colors.length;
  var color = new fabric.Gradient({
    type: type,
    coords: {
      x1: 0,
      y1: 0,
      x2: width,
      y2: height
    },
    colorStops: colors.map((item, index) => ({
      offset: item?.left ? item.left : index / length,
      color: item?.value || item
    }))
  });
  // canvas.set("backgroundColor", gradient.toLive());
  // canvas.backgroundColor = color.toLive(canvas.contextContainer);
  canvas.set({
    previousFill: canvas.backgroundColor,
    // backgroundColor: color.toLive(canvas.contextContainer),
    backgroundColor: color
  });
  canvas.renderAll();
};

export const handleRemoveBGGradient = () => {
  const {canvas} = window;
  if (!canvas) return;
  const {previousFill} = canvas;
  canvas.set({
    backgroundColor: previousFill || "#FFFCFC"
  });
  canvas.renderAll();
};

export const handleChangeBGGradType = (type, gradient) => {
  const {canvas} = window;
  if (!canvas) return;
  if (typeof canvas.backgroundColor != String) {
    const {width, height} = canvas;
    const colorStops = gradient.map((item) => ({
      offset: item.left,
      color: item.value
    }));
    var color = new fabric.Gradient({
      type: type,
      coords: {
        x1: 0,
        y1: 0,
        x2: width,
        y2: height
      },
      colorStops: colorStops
    });
    canvas.set({
      // backgroundColor: color.toLive(canvas.contextContainer),
      backgroundColor: color
    });
    canvas.renderAll();
  }
};

export const handleChangeBGGradProp = (gradient, type) => {
  const {canvas} = window;
  if (!canvas) return;
  if (typeof canvas.backgroundColor != String) {
    const {width, height} = canvas;
    const colorStops = gradient.colors.map((item) => ({
      offset: item.left / 100,
      color: item.value
    }));
    var color = new fabric.Gradient({
      type: type,
      coords: {
        x1: 0,
        y1: 0,
        x2: width,
        y2: height
      },
      colorStops: colorStops
    });
    canvas.set({
      // backgroundColor: color.toLive(canvas.contextContainer),
      backgroundColor: color
    });
    canvas.renderAll();
  }
};
