import SelectBox from "components/select-box";
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
        <SelectBox
          position="top"
          value={`${zoom.value}%`}
          innerContainerClass="h-3 w-9"
          onChange={(value) => zoom.setZoom(value)}
          options={[
            {title: "10%", value: 10},
            {title: "25%", value: 25},
            {title: "35%", value: 35},
            {title: "50%", value: 50},
            {title: "100%", value: 100},
            {title: "150%", value: 150},
            {title: "200%", value: 200}
          ]}
        />
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
