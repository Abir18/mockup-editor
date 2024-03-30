import ObjectID from "bson-objectid";
import {
  ShapeActions,
  addImageOnCanvas,
  canvasInit,
  startKeyboardEvents
} from "canvas-actions";
import Header from "components/header";
import InspectPanel from "components/inspect-panel";
import Toolbar from "components/toolbar";
import ZoomCanvas from "components/zoom-canvas";
import {AlignGuidelines} from "fabric-guideline-plugin";
import getCustomCursor from "fabric-overrides/cursor";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {changeActiveObject} from "store/reducers/activeObjectSlice";
import {debounce, getFileExtension} from "utils";

const Editor = () => {
  const dispatch = useDispatch();
  const [canvasLoaded, setCanvasLoaded] = useState(false);
  useEffect(() => {
    canvasInit(canvasCallBack).then((canvas) => {
      startKeyboardEvents(canvas);
      setCanvasLoaded(true);

      const guideline = new AlignGuidelines({
        canvas: canvas,
        aligningOptions: {
          lineColor: "#f1052f",
          lineWidth: 1,
          lineMargin: 1
        }
      });

      guideline.init();

      canvas.on("selection:cleared", function (e) {
        dispatch(changeActiveObject({type: null, id: null}));
        let defaultCursor = getCustomCursor("default");
        canvas.setCursor(defaultCursor);
        canvas.renderAll();
      });
    });
  }, []);

  const canvasCallBack = () => {
    setCanvasLoaded(true);
    const {canvas} = window;
    const canvasElement = document.querySelector(".canvas-container");
    canvas.on("object:added", function (e) {
      const type = e?.target?.type;
      e?.target?.set({
        title: type,
        id: ObjectID().id
      });
      if (type !== "watermark") {
        dispatch(changeActiveObject(type));
      }
    });
    canvas.on("dragenter", function () {
      canvasElement.style.border = "2px solid #6366f1";
    });
    canvas.on("dragleave", function () {
      canvasElement.style.border = "unset";
    });
    canvas.on("drop", function (event) {
      const {e} = event;
      canvasElement.style.border = "unset";
      var data = e.dataTransfer.getData("text");
      const extension = getFileExtension(data);
      if (extension === "svg") {
        ShapeActions.addShape(data);
      } else {
        addImageOnCanvas(data.replace("?auto=compress&cs=tinysrgb&w=129", ""));
      }
    });
    canvas.on("selection:created", function () {
      let defaultCursor = getCustomCursor("default");
      canvas.setCursor(defaultCursor);
      const activeObject = canvas.getActiveObject();
      const {type, id} = activeObject;
      dispatch(changeActiveObject({type, id}));
    });
    canvas.on("selection:updated", function (e) {
      const activeObject = canvas.getActiveObject();
      const {type, id} = activeObject;
      dispatch(changeActiveObject({type, id}));
    });
    canvas.on("after:render", function () {
      saveToDatabase();
    });
  };

  const saveToDatabase = debounce(function () {
    const {canvas} = window;
    // if (canvas) canvas.saveToDatabaseSync();
  }, 500);

  return (
    <>
      {canvasLoaded ? <Header /> : null}
      <main className="main-container">
        <Toolbar />
        <div className="canvas-outer-container" id="canvas-wrapper">
          <div id="canvas-zoom-container">
            <canvas id="canvas"></canvas>
          </div>
          {canvasLoaded ? <ZoomCanvas /> : null}
        </div>

        {canvasLoaded ? <InspectPanel /> : null}
      </main>
    </>
  );
};
export default Editor;
