import { useState, useEffect } from "react";
const useBorderControl = (objectId) => {
  const { canvas } = window;
  const activeObject = canvas?.getActiveObject();
  const [border, setBorder] = useState({
    active: activeObject.stroke ? true : false,
    width: activeObject.strokeWidth || 1,
    color: activeObject.stroke || "#ffff",
  });
  useEffect(() => {
    setBorder({
      active: activeObject.stroke ? true : false,
      width: activeObject.strokeWidth || 1,
      color: activeObject.stroke || "#ffff",
    });
  }, [objectId]);
  const handleBorderChange = (key, value) => {
    activeObject.set({
      strokeWidth: value,
    });
    canvas.requestRenderAll();
    setBorder({ ...border, [key]: value });
  };
  const handleAddBorder = () => {
    activeObject.set({
      stroke: "#000000",
    });
    canvas.renderAll();
    setBorder({ ...border, active: true, color: "#000000" });
  };
  const handleRemoveBorder = () => {
    activeObject.set({
      stroke: null,
    });
    canvas.renderAll();
    setBorder({ ...border, active: false, color: "#000000" });
  };
  return {
    border,
    handleBorderChange,
    activeObject,
    handleAddBorder,
    handleRemoveBorder,
  };
};
export default useBorderControl;
