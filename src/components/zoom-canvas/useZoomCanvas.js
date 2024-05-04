import {useEffect, useState} from "react";
const useZoomCanvas = () => {
  const {canvas} = window;
  const [zoom, setZoom] = useState(100);
  const [zoomLevel, setZoomLevel] = useState(1);
  useEffect(() => {
    canvas.on("zoomToFit", () => {
      handleChangeZoom(100);
    });
    return () => {
      canvas.off("zoomToFit");
    };
  }, []);

  useEffect(() => {
    if (canvas) {
      canvas.setZoom(zoomLevel);

      canvas.viewportTransform[4] =
        canvas.width / 2 - (canvas.width * zoomLevel) / 2;
      canvas.viewportTransform[5] =
        canvas.height / 2 - (canvas.height * zoomLevel) / 2;

      canvas.renderAll();
    }
  }, [zoomLevel]);

  const handleZoomIn = () => {
    setZoomLevel((prevZoomLevel) => Math.min(prevZoomLevel + 0.1));
    setZoom((prev) => prev + 10);
  };

  const handleZoomOut = () => {
    if (zoom < 15) return;
    setZoomLevel((prevZoomLevel) => Math.max(prevZoomLevel - 0.1));
    setZoom((prev) => (prev = prev - 10));
  };

  const handleChangeZoom = (value) => {
    if (value > 0 && value <= 200000) {
      setZoom(value);
      setZoomLevel(value / 100);
    }
  };

  return {
    zoom: {
      value: zoom,
      setZoom: handleChangeZoom,
      zoomIn: handleZoomIn,
      zoomOut: handleZoomOut
    }
  };
};
export default useZoomCanvas;
