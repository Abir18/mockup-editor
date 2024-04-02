import {useEffect, useState} from "react";
const useZoomCanvas = () => {
  const {canvas} = window;
  const [zoom, setZoom] = useState(100);
  useEffect(() => {
    canvas.on("zoomToFit", () => {
      handleChangeZoom(100);
    });
    return () => {
      canvas.off("zoomToFit");
    };
  }, []);
  const handleChangeZoom = (value) => {
    if (value > 0 && value <= 200) {
      const element = document.getElementById("canvas-zoom-container");
      element.style.transform = `scale(${value / 100})`;
      setZoom(value);
    }
  };

  return {
    zoom: {value: zoom, setZoom: handleChangeZoom}
  };
};
export default useZoomCanvas;
