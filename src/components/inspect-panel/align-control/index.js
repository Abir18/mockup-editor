import AppIcon from "utils/app-icon";
import { alignPositionOnCanvas } from "canvas-actions";
const AlignControl = () => {
  return (
    <>
      <div className="align-control">
        <p className="controls-heading">Align</p>
        <div className="align-options">
          {align_options.map((item) => (
            <div onClick={()=>alignPositionOnCanvas(item.action)} key={`Align Options ${item.action}`} className="align-button">
              <AppIcon classes="w-2 h-2" iconName={item.icon} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default AlignControl;

const align_options = [
  {
    icon: "icon-align-left",
    action: "left",
  },
  {
    icon: "icon-align-right",
    action: "right",
  },
  {
    icon: "icon-align-top",
    action: "top",
  },
  {
    icon: "icon-align-bottom",
    action: "bottom",
  },
  {
    icon: "icon-align-vertically",
    action: "center",
  },
  {
    icon: "icon-align-horizontally",
    action: "middle",
  },
];
