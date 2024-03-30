import { useState, useEffect } from "react";
import RangeSlider from "components/range-slider";
import Collapse from "components/collapse";
const TransperancyControl = ({ objectId }) => {
  const { canvas } = window;
  const activeObject = canvas?.getActiveObject();
  const [opacity, setOpacity] = useState((activeObject?.opacity || 1) * 100);
  useEffect(() => {
    setOpacity((activeObject?.opacity || 1) * 100);
  }, [objectId]);
  const handleSetOpacity = (value) => {
    if (!activeObject) return;
    activeObject.set({
      opacity: value / 100,
    });
    canvas.requestRenderAll();
    setOpacity(value);
  };
  return (
    <>
      <Collapse title="Transperancy">
        <RangeSlider
          min={0}
          max={100}
          onChange={(value) => handleSetOpacity(value)}
          value={opacity}
          // title="Opacity"
        />
      </Collapse>
    </>
  );
};
export default TransperancyControl;
