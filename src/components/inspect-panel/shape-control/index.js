import ColorPicker from "components/color-picker";
import AppIcon from "utils/app-icon";
import useShapeControl from "./useShapeControl";
const ShapeControl = ({ objectId }) => {
  const { canvas } = window;
  const activeObject = canvas.getActiveObject();
  const { addImage } = useShapeControl();
  return (
    <>
      <div className="text-controls">
        <p className="controls-heading">Shape</p>
        {/* <div onClick={addImage} className="add-image-banner">
          <AppIcon iconName="icon-plus" classes="w-3 h-3" />
          <p className="controls-heading">Add Image</p>
        </div> */}
        <ColorPicker
          hasGradient={true}
          title="Shape Color"
          objectKey="fill"
          activeObject={activeObject}
          key={objectId}
        />
      </div>
      <div className="divider" />
    </>
  );
};
export default ShapeControl;
