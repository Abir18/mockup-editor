import AppIcon from "utils/app-icon";
import { changeCanvasBackground } from "canvas-actions";
const BackgroundLibraryPreview = ({
  records = [],
  title = "Mesh Gradient",
}) => {
  return (
    <>
      <div className="divider" />
      <div className="text-controls">
        <div className="d-flex justify-content-between align-center">
          <p className="controls-heading">{title}</p>
          <div className="d-flex align-center gap-1 cursor-pointer">
            <p className="controls-heading">See All</p>
            <AppIcon iconName="icon-angle-right" classes="w-2 h-2" />
          </div>
        </div>
        <div className="gradient-grid two-grid-col">
          {records.map((grad, index) => (
            <div
              key={`Background Control Gradient ${index}`}
              className="gradient gradient-image"
              onClick={() => changeCanvasBackground(grad)}
            >
              <img src={`${grad}?tr=h-80,w-120`} />
            </div>
          ))}
        </div>
      </div>
      <div className="divider" />
    </>
  );
};
export default BackgroundLibraryPreview;
