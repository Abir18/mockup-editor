import {fabric} from "fabric";
export const addImageOnCanvas = (url, options = {}, watermark = false) => {
  const {canvas} = window;
  if (!canvas) return;
  fabric.Image.fromURL(
    url,
    (img) => {
      // img.scaleToHeight(10);
      // img.scaleToWidth(10);

      img.set({
        // scaleX: 0.01,
        // scaleY: 0.01,
        top: 0,
        left: 0,

        objectCaching: false,
        originX: "center",
        originY: "center",
        centeredScaling: false,
        src: url,
        ...options
      });
      if (!watermark) {
        const W = canvas.width - 500;
        const H = canvas.height - 500;
        const K = H / W;
        const w = img.getScaledWidth();
        const h = img.getScaledHeight();
        const k = h / w;
        k < K ? img.scaleToHeight(H) : img.scaleToWidth(W);
      }
      // else {
      //   img.scaleToWidth(10);
      // }

      // Add the image to the canvas
      canvas.add(img);
      if (!watermark) {
        canvas.centerObject(img);
        canvas.setActiveObject(img);
      } else {
        img.set({
          top: canvas.height - 30,
          left: canvas.width - 30
        });
        canvas.set({
          watermark: true,
          watermarkPosition: "right-bottom"
        });
      }

      canvas.requestRenderAll();
    },
    {crossOrigin: "anonymous"}
  );
};

export const addBackgroundImageOnCanvas = (url) => {
  const {canvas} = window;
  if (!canvas) return;
  const {width, height} = canvas;
  fabric.Image.fromURL(url, function (img) {
    const W = width;
    const H = height;
    const K = H / W;
    const w = img.getScaledWidth();
    const h = img.getScaledHeight();
    const k = h / w;
    k < K ? img.scaleToHeight(H) : img.scaleToWidth(W);
    canvas.setBackgroundImage(
      img,
      canvas.renderAll.bind(canvas),
      {},
      {crossOrigin: "anonymous"}
    );
    img.set({
      left: 350,
      top: 300,
      scaleX: 0.2,
      scaleY: 0.2,
      selectable: true
    });
  });
};

export const replaceImage = (url) => {
  const {canvas} = window;
  if (!canvas) return;
  const activeObject = canvas.getActiveObject();
  if (!activeObject) return;
  activeObject.setSrc(url, function (img) {
    canvas.renderAll();
  });
};

export const changeWatermarkPosition = (new_position = "") => {
  const {canvas} = window;
  if (!canvas) return;
  var left, top;
  switch (new_position) {
    case "right": {
      top = canvas.height / 2 - 30;
      left = canvas.width - 30;
      break;
    }
    case "right-bottom": {
      top = canvas.height - 30;
      left = canvas.width - 30;
      break;
    }
    case "bottom": {
      top = canvas.height - 30;
      left = canvas.width / 2;
      break;
    }
    case "bottom-left": {
      top = canvas.height - 30;
      left = 30;
      break;
    }
    case "bottom-left": {
      top = canvas.height - 30;
      left = 20;
      break;
    }
    case "left": {
      top = canvas.height / 2;
      left = 20;
      break;
    }
    case "left-top": {
      top = 30;
      left = 30;
      break;
    }
    case "top": {
      top = 30;
      left = canvas.width / 2;
      break;
    }
    case "left-right": {
      top = 30;
      left = canvas.width - 30;
      break;
    }
  }
  if (new_position) {
    const watermark = canvas._objects.filter((x) => x.type === "watermark");
    if (watermark.length > 0) {
      watermark[0].set({
        left,
        top
      });
    }
  }
  canvas.set({
    waterPosition: new_position
  });
  canvas.renderAll();
};

export const removeWatermark = () => {
  const {canvas} = window;
  if (!canvas) return;
  const watermark = canvas._objects.filter((x) => x.type === "watermark");
  if (watermark.length > 0) {
    canvas.remove(watermark[0]);
    canvas.set({
      watermark: false,
      watermarkPosition: "right-bottom"
    });
    canvas.renderAll();
  }
};
