import InputField from "components/input-field";
import AppIcon from "utils/app-icon";
import useZoomCanvas from "./useZoomCanvas";
const ZoomCanvas = () => {
  const {zoom} = useZoomCanvas();
  return (
    <>
      <div className="zoom-action-container">
        <div
          onClick={() => zoom.setZoom(zoom.value - 10)}
          className="action-button"
        >
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
          style={{position: "relative", top: -1, left: -65, fontSize: "14px"}}
        >
          %
        </span>
        <div
          onClick={() => zoom.setZoom(zoom.value + 10)}
          className="action-button"
        >
          <AppIcon iconName="icon-plus" classes="w-3 h-3" />
        </div>
      </div>
    </>
  );
};
export default ZoomCanvas;
