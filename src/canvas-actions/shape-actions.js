import { fabric } from "fabric";
import Matrix from "utils/matrix";
const retinaScaling = 1;


export const ShapeActions = {
  addShape: (url) => {
    const canvas = window.canvas;
    if (!canvas) return;
    const vpt = canvas.viewportTransform.slice(0);
    const zoom = canvas.getZoom();
    const location = {
      x: (-vpt[4] + canvas.width / 2) / zoom,
      y: (-vpt[5] + canvas.height / 2) / zoom,
    };
    const defaultOptions = {
      left: location.x,
      top: location.y,
      originX: "center",
      originY: "center",
    };
    fabric.loadSVGFromURL(url, (objects, options) => {
      let object = fabric.util.groupSVGElements(objects, options);
      // object.scaleToHeight(activeCanvas.height / 2)
      object.set(defaultOptions);
      if (object.width > canvas.width) {
        object.scale(0.4);
      }
      canvas.add(object);
      canvas.centerObject(object);
      canvas.setActiveObject(object);
    });
  },
};
/**
 *
 * @param {fabric.IPatternOptions} options
 * @param {fabric.Object} target
 * @param {fabric.Canvas} canvas
 */
export const createDynamicPattern=(options, target, canvas)=> {
  return new Promise((resolve) => {
    const tempCanvasEl = document.createElement("canvas");
    const patternSourceCanvas = new fabric.StaticCanvas(tempCanvasEl, {
      enableRetinaScaling: false,
    });

    target.type === "circle" && (target.radius *= target.scaleX);

    new fabric.Image.fromURL(
      options.src,
      (image) => {
        image.set({
          scaleX: 1 / retinaScaling,
          scaleY: 1 / retinaScaling,
        });

        const W = target.getScaledWidth();
        const H = target.getScaledHeight();
        const K = H / W;
        const w = image.getScaledWidth();
        const h = image.getScaledHeight();
        const k = h / w;

        k < K ? image.scaleToHeight(H) : image.scaleToWidth(W);
        options.repeat = "no-repeat";

        const cellSizeX = image.getScaledWidth();
        const cellSizeY = image.getScaledHeight();

        patternSourceCanvas.setDimensions({
          width: cellSizeX,
          height: cellSizeY,
        });

        patternSourceCanvas.on("object:added", (opts) => {
          opts.target.set({
            originX: "center",
            originY: "center",
            left: cellSizeX / 2,
            top: cellSizeY / 2,
          });
          opts.target.scaleToWidth(cellSizeX);
          patternSourceCanvas.requestRenderAll();

          const matrix = new Matrix();
          const scaling = options.scaling;
          const cx = target.width;
          const cy = target.height;

          matrix
            .scale(scaling, scaling, cx, cy)
            .rotateDeg(options.rotation, cx, cy)
            .translate(cx - cellSizeX / 2, cy - cellSizeY / 2);

          const fabricPattern = new fabric.Pattern({
            crossOrigin: "anonymous",
            source: patternSourceCanvas.getElement(),
            patternSourceCanvas,
            src: options.src,
            patternTransform: matrix.toArray(),
            repeat: options.repeat,
            rotation: options.rotation,
            scaling,
            offsetX: options.hasOffset ? options.offsetX : 0,
            offsetY: options.hasOffset ? options.offsetY : 0,
          });

          patternSourceCanvas.requestRenderAll();

          target.set({
            fill: fabricPattern,
          });

          opts.target.setCoords();

          resolve(fabricPattern);
        });

        patternSourceCanvas.add(image);
        patternSourceCanvas.requestRenderAll();
        canvas.requestRenderAll();
      },
      {
        crossOrigin: "anonymous",
      }
    );
  });
}
