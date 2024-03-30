import InputField from "components/input-field";
import usePositionControl from "./usePositionControl";
import ResizeModal from "components/modal/resize-modal";
const PositionControl = ({ objectKey = "background" }) => {
  const { basicProp, handleChange, resizeModalCallBack } =
    usePositionControl(objectKey);
  return (
    <>
      <div className="text-controls">
        <p className="controls-heading">Basic Setting</p>
        <div className="d-flex gap-1 justify-content-between align-center">
          <p className="controls-heading">Width</p>
          <InputField
            onChange={(value) => handleChange("width", value)}
            value={basicProp?.width}
            type="number"
            max={3000}
            min={1}
          />
        </div>
        <div className="d-flex gap-1 justify-content-between align-center">
          <p className="controls-heading">Height</p>
          <InputField
            onChange={(value) => handleChange("height", value)}
            value={basicProp?.height}
            type="number"
            max={3000}
            min={1}
          />
        </div>
        {objectKey === "shape" ? (
          <>
            <div className="d-flex gap-1 justify-content-between align-center">
              <p className="controls-heading">Border Radius</p>
              <InputField
                onChange={(value) => handleChange("borderRadius", value)}
                value={basicProp?.borderRadius || 0}
                type="number"
                max={3000}
                min={1}
              />
            </div>
            <div className="d-flex gap-1 justify-content-between align-center">
              <p className="controls-heading">X-Axis</p>
              <InputField
                onChange={(value) => handleChange("left", value)}
                value={basicProp?.left}
                type="number"
                max={3000}
                min={1}
              />
            </div>
            <div className="d-flex gap-1 justify-content-between align-center">
              <p className="controls-heading">Y-Axis</p>
              <InputField
                onChange={(value) => handleChange("top", value)}
                value={basicProp?.top}
                type="number"
                max={3000}
                min={1}
              />
            </div>
          </>
        ) : null}
        {objectKey === "background" ? (
          <ResizeModal callBack={resizeModalCallBack} />
        ) : null}
      </div>
      <div className="divider" />
    </>
  );
};
export default PositionControl;
