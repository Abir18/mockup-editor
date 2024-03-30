import Collapse from "components/collapse";
import Button from "components/button";
import useDropShadowControl from "./useDropShadowControl";
import InputField from "components/input-field";
import ColorPicker from "components/color-picker";
const DropShadowControl = ({objectId}) => {
  const {
    shadow,
    handleAddShadow,
    handleRemoveShadow,
    handleChangeProp,
    activeObject,
  } = useDropShadowControl(objectId);
  const { active, offsetX, offsetY, blur } = shadow;
  return (
    <>
      <Collapse title="Drop Shadow">
        {active ? (
          <div className="inner-container">
            <ColorPicker
              activeObject={activeObject}
              title="Drop Shadow Color"
              objectKey="shadow"
              key={objectId}
            />
            <div className="d-flex justify-content-between align-center">
              <InputField
                icon="icon-word-x"
                type="number"
                value={offsetX}
                onChange={(value) => handleChangeProp("offsetX", value)}
                containerClass="w-per-45"
              />
              <InputField
                icon="icon-word-y"
                onChange={(value) => handleChangeProp("offsetY", value)}
                type="number"
                value={offsetY}
                containerClass="w-per-45"
              />
            </div>
            <InputField
              icon="icon-blur"
              type="number"
              onChange={(value) => handleChangeProp("blur", value)}
              value={blur}
              min={0}
              max={100}
            />
            <Button
              onClick={handleRemoveShadow}
              type="outline"
              title="Remove Border"
            />
          </div>
        ) : (
          <Button
            onClick={handleAddShadow}
            type="outline"
            title="Add Drop Shadow"
          />
        )}
      </Collapse>
    </>
  );
};
export default DropShadowControl;
