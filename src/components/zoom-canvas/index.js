import InputField from "components/input-field";
import AppIcon from "utils/app-icon";
import useZoomCanvas from "./useZoomCanvas";
const ZoomCanvas = () => {
  const {zoom} = useZoomCanvas();
  return (
    <>
      <div className="zoom-action-container">
        <div onClick={zoom.zoomOut} className="action-button">
          <AppIcon iconName="icon-minus" classes="w-3 h-3" />
        </div>

        <InputField
          // innerContainerClass="h-3 w-9"
          placeholder=""
          type="number"
          value={zoom.value}
          containerClass="w-per-45"
          onChange={(value) => zoom.setZoom(value)}
        />

        <span
          className="input-field"
          style={{position: "relative", left: -55, fontSize: "14px"}}
        >
          %
        </span>

        <div onClick={zoom.zoomIn} className="action-button">
          <AppIcon iconName="icon-plus" classes="w-3 h-3" />
        </div>
      </div>
    </>
  );
};
export default ZoomCanvas;
