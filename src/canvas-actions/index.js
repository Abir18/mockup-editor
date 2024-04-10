import {fabric} from "fabric";
import getCustomCursor from "fabric-overrides/cursor";
import html2canvas from "html2canvas";
import {jsPDF} from "jspdf";
import {cloneDeep} from "lodash";
import {convertToBlobUrl} from "utils";
export * from "./align-actions";
export * from "./background-actions";
export * from "./general-actions";
export * from "./gradient-actions";
export * from "./grid-actions";
export * from "./group-actions";
export * from "./image-actions";
export * from "./keyboard-events";
export * from "./multi-page-actions";
export * from "./shape-actions";
export * from "./text-actions";

export const canvasInit = (callBack = () => {}) => {
  return new Promise((resolve, reject) => {
    let canvasWidth = 1280,
      canvasHeight = 1080;
    const created_canvas = new fabric.Canvas("canvas", {
      width: canvasWidth,
      height: canvasHeight,
      backgroundColor: "white",
      borderColor: "rgba(23, 207, 51, 0.776)",
      selectionColor: "rgba(40, 123, 239, 0.25)",
      // selectionBorderColor: "rgba(40, 123, 239, 0.65)",
      selectionLineWidth: 1,
      preserveObjectStacking: true,
      defaultCursor:
        "https://app-dev.glorify.com/assets/designer/static/media/cursors/cursor.svg"
    });
    let defaultCursor = getCustomCursor("default");
    created_canvas.setCursor(defaultCursor);

    // Assign the canvas to a global variable if needed
    window.canvas = created_canvas;

    setCanvasInContrainer(canvasWidth, canvasHeight);

    // Creating Multiple Pages Property in Canvas
    created_canvas.pages = [
      {
        title: "Page # 1",
        json: JSON.stringify(
          created_canvas.toJSON([
            "width",
            "height",
            "originalWidth",
            "origianlHeight"
          ])
        ),
        id: 0,
        image: convertToBlobUrl(created_canvas.toDataURL("image/jpeg", 1.0))
      }
    ];

    created_canvas.activePage = 0;

    // Setting Undo Object in the window
    window.undoObject = [];

    callBack();

    // Wait for Fabric.js canvas to initialize
    created_canvas.on("after:render", () => {
      resolve(created_canvas);
    });

    // Handle any errors
    created_canvas.on("error", (error) => {
      reject(error);
    });
  });
};

export const canvasUtils = {
  getDims: (object) => {
    return object._getTransformedDimensions();
  }
};

export const setCanvasInContrainer = (width, height) => {
  const {canvas} = window;
  if (!canvas) return;
  const __mainEditorWrapperEl = document.getElementById("canvas-wrapper");
  const containerWidth = __mainEditorWrapperEl.offsetWidth;
  const containerHeight = __mainEditorWrapperEl.offsetHeight;
  const widthRatio = (containerWidth - 100) / width;
  const heightRatio = (containerHeight - 100) / height;
  const scale = Math.min(widthRatio, heightRatio);
  // Set the canvas scale
  // canvas.setZoom(scale);

  // Update the canvas dimensions
  canvas.setWidth(width * scale);
  canvas.setHeight(height * scale);

  canvas.set({
    originalWidth: width,
    originalHeight: height,
    scaleFactor: scale
  });

  canvas.renderAll();
};

export const downloadCanvas = async (format, quality = "Normal") => {
  const {canvas} = window;
  if (!canvas) return;

  const quality_enum = {
    Normal: 0.5,
    Good: 0.7,
    Excellent: 1
  };

  // Create a new canvas with dimensions matching the bounding box
  const {width, height, originalHeight, originalWidth} = canvas;
  const newCanvas = new fabric.StaticCanvas(null, {
    width: originalWidth || width,
    height: originalHeight || height
  });
  // Copy the objects from the original canvas to the new canvas
  canvas.getObjects().forEach((obj) => {
    // const clone = obj.clone();
    const clone = cloneDeep(obj);
    clone.set({
      width: 1 * obj.width,
      height: 1 * obj.height,
      scaleX: obj.scaleX,
      scaleY: obj.scaleX,
      left: obj.left,
      right: obj.right
    });
    newCanvas.add(clone);
  });
  // Create a temporary anchor element for downloading
  const downloadLink = document.createElement("a");
  if (["jpeg", "png"].includes(format)) {
    if (format === "jpeg") {
      newCanvas.set({backgroundColor: canvas?.backgroundColor});
    }

    // Export the new canvas
    const dataURL = newCanvas.toDataURL({
      format: format, // or 'jpeg' as needed
      quality: quality_enum[quality] // Image quality (0 to 1)
    });
    // Set the download link attributes
    downloadLink.href = dataURL;
    downloadLink.download = `design.${format}`;
  } else if (format === "svg") {
    const svgString = await newCanvas.toSVG({
      suppressPreamble: true, // Remove the XML preamble
      viewBox: {
        x: 0,
        y: 0,
        width: width,
        height: height
      },
      suppressWarnings: true // Suppress any Fabric.js warnings in the console
    });
    // Create a Blob containing the SVG data
    const blob = new Blob([svgString], {type: "image/svg+xml"});
    // Set the download link attributes
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = "design.svg";
  } else if (format === "pdf") {
    var imgData = canvas.toDataURL("image/jpeg", 1.0);
    var pdf = new jsPDF({
      unit: "px",
      format: [width, height]
    });
    pdf.addImage(imgData, "JPEG", 0, 0);
    pdf.save("design.pdf");
    return;
  }
  downloadLink.click();
};

// Function to download active object as SVG
export const downloadActiveObjectAsSVG = () => {
  const {canvas} = window;

  const activeObject = canvas.getActiveObject();

  if (activeObject) {
    // const svgString = encodeURIComponent(activeObject.toSVG());
    const svgString = activeObject.toSVG();
    // Sanitize the SVG string
    const sanitizedSVGString = svgString.replace(
      /&(amp|lt|gt);/g,
      (match, entity) => {
        const entities = {
          amp: "&",
          lt: "<",
          gt: ">"
        };
        return entities[entity];
      }
    );

    console.log("SVG String:", svgString);
    // console.log("Sanitized SVG String:", sanitizedSVGString);

    const blob = new Blob([sanitizedSVGString], {type: "image/svg+xml"});
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "active_object.svg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  } else {
    console.log("No active object selected.");
  }
};

// export const downloadActiveObjectAsSVG = () => {
//   const {canvas} = window;
//   const activeObject = canvas.getActiveObject();

//   if (activeObject) {
//     const svgString = encodeURIComponent(activeObject.toSVG());
//     const blob = new Blob([svgString], {type: "image/svg+xml"});
//     const url = URL.createObjectURL(blob);

//     const link = document.createElement("a");
//     link.href = url;
//     link.download = "active_object.svg";
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);

//     URL.revokeObjectURL(url);
//   } else {
//     console.log("No active object selected.");
//   }
// };

// export const downloadActiveObjectAsSVG = () => {
//   const {canvas} = window;
//   const activeObject = canvas.getActiveObject();

//   if (activeObject) {
//     const svgString = activeObject.toSVG();
//     const dataURL = "data:image/svg+xml," + encodeURIComponent(svgString);

//     const link = document.createElement("a");
//     link.href = dataURL;
//     link.download = "active_object.svg";
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   } else {
//     console.log("No active object selected.");
//   }
// };

// Function to download active object as SVG
// export const downloadActiveObjectAsSVG = () => {
//   const {canvas} = window;
//   const activeObject = canvas.getActiveObject();

//   if (activeObject) {
//     const svgString = encodeURIComponent(activeObject.toSVG());
//     const svgArray = new Uint8Array(svgString.length);
//     for (let i = 0; i < svgString.length; i++) {
//       svgArray[i] = svgString.charCodeAt(i);
//     }
//     const svgBlob = new Blob([svgArray], {type: "image/svg+xml"});
//     const url = URL.createObjectURL(svgBlob);

//     const link = document.createElement("a");
//     link.href = url;
//     link.download = "active_object.svg";
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);

//     URL.revokeObjectURL(url);
//   } else {
//     console.log("No active object selected.");
//   }
// };

// =============================================

export const downloadCanvasAsSVG = () => {
  const {canvas} = window;
  if (!canvas) return;

  const {width, height} = canvas;
  const svgString = canvas.toSVG({
    // suppressPreamble: true, // Remove the XML preamble
    // viewBox: {
    //   x: 0,
    //   y: 0,
    //   width: width,
    //   height: height
    // }
    // suppressWarnings: true // Suppress any Fabric.js warnings in the console
  });
  const blob = new Blob([svgString], {type: "image/svg"});
  const a = document.createElement("a");
  const url = URL.createObjectURL(blob);
  a.href = url;
  a.download = "mockup.svg";
  // Append the link to the document, trigger a click, and remove the link
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  // Release the Blob URL
  URL.revokeObjectURL(url);
};

export const downloadCanvasAsJpeg = () => {
  const {canvas} = window;
  if (!canvas) return;
  const {width, height} = canvas;

  // const canvas = canvasRef.current;

  // Create a new Fabric.js canvas instance if it doesn't exist
  if (!canvas) {
    return;
  }

  var canvasPromise = html2canvas(document.body, {
    allowTaint: true,
    foreignObjectRendering: true,
    useCORS: true
  });
  canvasPromise.then(function (canvas) {
    document.body.appendChild(canvas);
    console.log(canvas);

    canvas.toDataURL({format: "jpeg"});
  });

  // Convert canvas to data URL with JPEG format
  // const dataURL = canvas.toDataURL({
  //   format: "jpeg",
  //   quality: 0.8 // Adjust quality if needed
  // });

  // Create a temporary anchor element to trigger download
  const downloadLink = document.createElement("a");
  downloadLink.href = canvasPromise;
  downloadLink.download = "canvas_image.jpg";
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};

// export const downloadCanvasAsJpeg = () => {
//   // debugger;
//   const {canvas} = window;
//   if (!canvas) return;
//   const newCanvas = new fabric.StaticCanvas(null, {
//     width: canvas.width,
//     height: canvas.height
//   });

//   canvas.getObjects().forEach((obj) => {
//     // const clone = obj.clone();
//     const clone = cloneDeep(obj);
//     newCanvas.add(clone);
//   });

//   const downloadLink = document.createElement("a");
//   const dataURL = canvas.toDataURL(
//     {
//       format: "jpeg", // or 'jpeg' as needed
//       quality: 1 // Image quality (0 to 1)
//     },
//     {crossOrigin: "anonymous"}
//   );
//   // Set the download link attributes
//   downloadLink.href = dataURL;
//   downloadLink.download = `design.jpeg`;
//   downloadLink.click();
// };

export const object_types = {
  textbox: "Text",
  null: "Background",
  gridLine: "Background",
  image: "Image",
  activeSelection: "Selection",
  group: "Group",
  polygon: "Shape",
  rect: "Shape",
  path: "Shape",
  ellipse: "Shape"
};

export const defaultCanvasJson = JSON.stringify({
  background: "white",
  height: 760,
  objects: [],
  originalWidth: 1080,
  originalHeight: 1080,
  version: "5.3.0",
  width: 760
});
