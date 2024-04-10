import {fabric} from "fabric";

// Function to download the top layer as SVG
export const downloadTopLayerAsSVG = () => {
  const {canvas} = window;
  const objects = canvas.getObjects();
  const topObject = objects[objects.length - 1]; // Get the topmost object

  // console.log(objects, "objects");
  // console.log(topObject, "topObject");

  // Convert the top layer object to SVG
  const svgData = canvas.toSVG(topObject);

  // Create a blob from the SVG data
  const blob = new Blob([svgData], {type: "image/svg+xml"});

  // Create a URL for the blob
  const url = window.URL.createObjectURL(blob);

  const encodedImageUrl = encodeURIComponent(url);

  // Create a temporary anchor element to initiate the download
  const a = document.createElement("a");
  a.href = encodedImageUrl;
  a.download = "top_layer.svg";
  document.body.appendChild(a);
  a.click();

  // Clean up: remove the anchor element and revoke the blob URL
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
};

// Function to replace the top layer image
export const replaceTopLayerImage = (newImageUrl, watermark = false) => {
  const {canvas} = window;
  const objects = canvas.getObjects();
  const topObject = objects[objects.length - 1]; // Get the topmost object

  // Remove the topmost object (assuming it's an image)
  canvas.remove(topObject);

  // Load and add the new image
  fabric.Image.fromURL(newImageUrl, function (img) {
    img.set({
      // scaleX: 0.01,
      // scaleY: 0.01,
      top: 0,
      left: 0,

      objectCaching: false,
      originX: "center",
      originY: "center",
      centeredScaling: false
      // src: url,
      // ...options
    }); // Maintain position of the replaced image

    if (!watermark) {
      const W = canvas.width - 500;
      const H = canvas.height - 500;
      const K = H / W;
      const w = img.getScaledWidth();
      const h = img.getScaledHeight();
      const k = h / w;
      k < K ? img.scaleToHeight(H) : img.scaleToWidth(W);
    }

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

    canvas.add(img);
    canvas.renderAll();
  });
};

export const addImageOnCanvas = (url, options = {}, watermark = false) => {
  const {canvas} = window;
  if (!canvas) return;

  fabric.Image.fromURL(
    url,
    (img) => {
      // img.scaleToHeight(10);
      // img.scaleToWidth(10);

      // img.bringToFront();

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
      // canvas.setBackgroundImage(
      //   img,
      //   canvas.renderAll.bind(canvas),
      //   {},
      //   {crossOrigin: "anonymous"}
      // );
    },
    {crossOrigin: "anonymous"}
  );
};

export const addBackgroundImageOnCanvas = (
  url,
  options = {},
  watermark = false
) => {
  console.log(options, "op");
  const {canvas} = window;

  if (!canvas) return;

  // const activeObject = canvas.getActiveObject();
  // console.log(activeObject, "activeObject");

  // canvas.clear();

  // canvas.set({
  //   backgroundImage: null
  // });

  fabric.Image.fromURL(url, (img) => {
    // img.scaleToHeight(10);
    // img.scaleToWidth(10);

    // img.sendToBack();

    // canvas.set({
    //   backgroundImage: img
    // });

    if (options.selectable) {
      // addBackgroundImageOnCanvas("");
      // canvas.set({backgroundColor: "green"});
      // canvas.set({backgroundImage: null});
      // canvas.add(img);
      // replaceImage(url);
      img.set({
        selectable: true
      });
      // return;
    } else {
      // canvas.set({backgroundColor: "red"});
      img.set({
        selectable: false
      });
      // return;

      // canvas.set({backgroundImage: null});
    }

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
      const W = canvas.width;
      const H = canvas.height;
      const K = H / W;
      const w = img.getScaledWidth();
      const h = img.getScaledHeight();
      const k = h / w;
      k < K ? img.scaleToHeight(H) : img.scaleToWidth(W);
    }
    // else {
    //   img.scaleToWidth(10);
    // }

    // canvas.add(img);
    // Add the image to the canvas
    // console.log(options, "op");

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
        // backgroundImage: img
      });
    }

    canvas.requestRenderAll();
    canvas.setBackgroundImage(
      img,
      canvas.renderAll.bind(canvas),
      {},
      {crossOrigin: "anonymous"}
    );
  });
};

// export const addBackgroundImageOnCanvas = (url) => {
//   const {canvas} = window;
//   if (!canvas) return;
//   const {width, height} = canvas;
//   fabric.Image.fromURL(url, function (img) {
//     const W = width;
//     const H = height;
//     const K = H / W;
//     const w = img.getScaledWidth();
//     const h = img.getScaledHeight();
//     const k = h / w;
//     k < K ? img.scaleToHeight(H) : img.scaleToWidth(W);
//     canvas.setBackgroundImage(
//       img,
//       canvas.renderAll.bind(canvas),
//       {},
//       {crossOrigin: "anonymous"}
//     );
//   });
// };

export const replaceImage = (url) => {
  const {canvas} = window;
  if (!canvas) return;
  const activeObject = canvas.getActiveObject();
  console.log(activeObject, "activeObject");
  if (!activeObject) return;
  activeObject.setSrc(url, function (img) {
    canvas.renderAll();
  });
  // const svg = activeObject._toSVG();
  // const coloredSVG = svg.replace("<svg", '<svg fill="red"');
  // console.log(svg, "svg");
  // console.log(coloredSVG, "coloredSVG");
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
