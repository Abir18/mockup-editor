import { useState } from "react";
import { handleBackgroundGradient } from "canvas-actions";
import {
  addGridOnCanvas,
  removeGridsFromCanvas,
  addImageOnCanvas,
  changeWatermarkPosition,
  removeWatermark,
} from "canvas-actions";
const useBackgroundControl = () => {
  const { canvas } = window;
  const [backgroundOption, setBackgroundOption] = useState("Colors");
  const [addGrid, setAddGrid] = useState(canvas?.gridActive || false);
  const [watermark, setWatermark] = useState(canvas?.watermark || false);
  const [waternarkPosition, setWaternarkPosition] = useState(
    canvas?.watermarkPosition || ""
  );
  const [gridColumn, setGridColumn] = useState(canvas?.gridColumns || 2);
  const addGradientToBg = (colors) => {
    handleBackgroundGradient(colors);
  };
  const toggleGrid = (value) => {
    if (value) {
      addGridOnCanvas(gridColumn);
    } else {
      removeGridsFromCanvas();
    }
    setAddGrid(value);
  };
  const handleGridColumn = (value) => {
    addGridOnCanvas(value);
    setGridColumn(value);
  };
  const handleAddWatermark = (value) => {
    const { canvas } = window;
    if (!canvas) return;
    if (value) {
      addImageOnCanvas(
        "http://localhost:3000/static/media/logo.1be2fc32a5953bd66510f9fea9a17b58.svg",
        {
          seletable: false,
          lockMovementX: true,
          lockMovementY: true,
          lockScalingY: true,
          lockScalingX: true,
          evented: false,
          // angle:360,
          type: "watermark",
        },
        true
      );
    } else {
      removeWatermark();
    }

    setWaternarkPosition("right-bottom");
    setWatermark(value);
  };
  const handleChangePosition = (newPosition) => {
    changeWatermarkPosition(newPosition);
    setWaternarkPosition(newPosition);
  };
  return {
    backgroundOption: {
      get: backgroundOption,
      set: setBackgroundOption,
    },
    grid: {
      value: addGrid,
      gridColumns: gridColumn,
      setGridColumn: handleGridColumn,
      set: toggleGrid,
    },
    watermark: {
      value: watermark,
      set: handleAddWatermark,
      watermarkPosition: waternarkPosition,
      changePosition: handleChangePosition,
    },
    addGradientToBg,
  };
};
export default useBackgroundControl;
