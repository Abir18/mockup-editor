import Collapse from "components/collapse";
import RangeSlider from "components/range-slider";
import ColorPicker from "components/color-picker";
import useBorderControl from "./useBorderControl";
import Button from "components/button";
const BorderControl = ({objectId}) => {
  const { border, handleBorderChange, activeObject,handleAddBorder,handleRemoveBorder} = useBorderControl(objectId);
  const { active, width } = border;
  return (
    <>
      <Collapse title="Border">
          {active ? (
            <>
              <div className="inner-container">
                <RangeSlider
                  min={1}
                  max={10}
                  title="Width"
                  onChange={(value) => handleBorderChange("width", value)}
                  value={width}
                />
                <ColorPicker
                  activeObject={activeObject}
                  title="Border Color"
                  objectKey="stroke"
                  key={objectId}
                />
                <Button
                   onClick={handleRemoveBorder}
                  type="outline"
                  title="Remove Border"
                />
              </div>
            </>
          ) : (
            <Button
              onClick={handleAddBorder}
              type="outline"
              title="Add Border"
            />
          )}

      </Collapse>
    </>
  );
};
export default BorderControl;
