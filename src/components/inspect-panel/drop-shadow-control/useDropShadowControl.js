import { useState,useEffect } from "react";
import { fabric } from "fabric";
const useDropShadowControl = (objectId) => {
  const { canvas } = window;
  const activeObject = canvas?.getActiveObject();
  const [shadow, setShadow] = useState({
    active: false,
    color: "#00000",
    offsetX: 0,
    offsetY: 0,
    blur: 0,
  });
  useEffect(()=>{
    
  },[objectId])
  const handleChangeProp = (key, value) => {
    activeObject.shadow[key] = value;
    canvas.renderAll();
    setShadow({ ...shadow, [key]: value });
  };
  const handleAddShadow = () => {
    if (!activeObject) return;
    const tempShadow = new fabric.Shadow(default_shadow);
    activeObject.set({ shadow: tempShadow });
    canvas.renderAll();
    setShadow({ ...default_shadow, active: true });
  };
  const handleRemoveShadow = () => {
    if (!activeObject) return;
    activeObject.set({ shadow: null });
    canvas.renderAll();
    setShadow({ ...default_shadow, active: false });
  };
  return { shadow, handleAddShadow, handleRemoveShadow, handleChangeProp,activeObject };
};
export default useDropShadowControl;

const default_shadow = {
  color: "#000000",
  offsetX: 2,
  offsetY: 2,
  blur: 10,
};
