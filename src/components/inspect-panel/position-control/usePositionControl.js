import { useState, useEffect } from "react";
import { debounce } from "utils";
import { setCanvasInContrainer } from "canvas-actions";
const usePositionControl = (objectKey = "background") => {
  const { canvas } = window;
  const [basicProp, setBasicProp] = useState(
    getCurrentState(canvas, objectKey)
  );
  useEffect(() => {
    canvas.on("object:modified", () => {
      setBasicProp(getCurrentState(canvas, objectKey));
    });
    return () => {
      canvas.off("object:modified");
    };
  }, []);
  const handleChange = (name, value) => {
    let newProps = { ...basicProp };
    newProps[name] = value;
    if (objectKey === "background") {
      debounce(setCanvasInContrainer(newProps.width, newProps.height), 500);
    } else if (objectKey === "shape") {
      const activeObject = canvas.getActiveObject();
      if (!activeObject) return;
      if (name === "borderRadius") {
        activeObject.set({
          rx: value,
          ry: value,
        });
      } else {
        const difference = value - basicProp[name];
        activeObject.set({
          [name]: activeObject[name] + difference,
        });
      }
      getCurrentState();
      canvas.requestRenderAll();
    }

    setBasicProp(newProps);
  };

  const resizeModalCallBack = () => {
    setBasicProp(getCurrentState(canvas, objectKey));
  };

  return { basicProp, handleChange, resizeModalCallBack };
};
export default usePositionControl;

const getCurrentState = (canvas, objectKey) => {
  let props = {};
  if (!canvas) return;
  if (objectKey === "background") {
    const { originalWidth, originalHeight } = canvas;
    props.width = originalWidth;
    props.height = originalHeight;
  } else {
    const activeObject = canvas.getActiveObject();
    const { width, height, left, top } = activeObject.getBoundingRect(true);
    const { rx } = activeObject;
    props.width = width;
    props.height = height;
    props.left = left;
    props.top = top;
    props.borderRadius = rx;
  }
  return props;
};
