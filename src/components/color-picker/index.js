import "./color-picker.scss";
import AppIcon from "utils/app-icon";
import { Wheel, Slider, Alpha } from "@uiw/react-color";
import InputField from "components/input-field";
import useColorPicker from "./useColorPicker";
import Draggable from "react-draggable";
import ToggleSwitch from "components/toggle-switch";
import SelectBox from "components/select-box";
import GradientPicker from "./gradient-picker";
const ColorPicker = ({
  activeObject,
  objectKey = "fill",
  title = "Color",
  containerClass = "",
  hasGradient = false,
}) => {
  const {
    hex,
    openModal,
    handleChangeColor,
    hsva,
    documentColors,
    pickColor,
    handleHexColors,
    handleRandomColor,
    handleInputField,
    grad,
  } = useColorPicker(activeObject, objectKey);
  const location = { x: 0, y: -70 };
  return (
    <>
      <div
        onClick={() => openModal.set(!openModal.get)}
        className={`color-picker ${containerClass}`}
      >
        <div className={`left-container`}>
          <div style={{ backgroundColor: hex }} className="color-div" />
          <p>{hex}</p>
        </div>
        <AppIcon
          classes={openModal.get ? "w-2 h-2" : "w-3 h-3"}
          iconName={openModal.get ? "icon-close" : "icon-angle-down"}
        />
      </div>
      {openModal.get ? (
        <Draggable handle=".drag-handle" defaultPosition={location}>
          <div className="color-picker-modal ">
            <div className="inspect-heading">
              <div className="d-flex align-center" style={{ gap: 5 }}>
                <AppIcon
                  iconName="icon-drag-handle"
                  classes="w-3 h-3 drag-handle cursor-pointer"
                />
                <p>{title}</p>
              </div>
              <div
                onClick={() => openModal.set(!openModal.get)}
                className="cursor-pointer h-100"
              >
                <AppIcon iconName="icon-close" classes="w-2 h-2" />
              </div>
            </div>
            <div className="divider" />

            {hasGradient ? (
              <>
                <div className="inner-container-model gradient-options">
                  <ToggleSwitch
                    value={grad.value}
                    onChange={(value) => grad.set(value)}
                    title="Gradient"
                  />
                  {grad.value ? (
                    <SelectBox
                      innerContainerClass="gradient-select-box"
                      value={grad.type}
                      onChange={(value) => grad.changeType(value)}
                      options={[
                        {
                          title: "Linear",
                          value: "Linear",
                        },
                        {
                          title: "Radial",
                          value: "Radial",
                        },
                      ]}
                    />
                  ) : null}
                </div>
                <div className="divider" />
              </>
            ) : null}

            {grad.value ? null : (
              <>
                <div className="inner-container-model">
                  <div className="wheel-container">
                    <Wheel
                      onChange={(color) =>
                        handleChangeColor({ ...hsva, ...color.hsva })
                      }
                      width={90}
                      height={70}
                      color={hsva}
                    />
                    <div className="right-partner">
                      <InputField
                        onChange={(value) => handleInputField(value)}
                        value={hex}
                        type="text"
                      />
                      <div className="d-flex gap-1 justify-content-between">
                        <div
                          onClick={handleRandomColor}
                          className="library-button"
                        >
                          <AppIcon
                            iconName="icon-assets-ai-images"
                            classes="w-2 h-2"
                          />
                          <p>Random</p>
                        </div>
                        <div onClick={pickColor} className="library-button">
                          <AppIcon iconName="icon-picker" classes="w-2 h-2" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="divider" />
              </>
            )}
            {grad.value ? (
              <>
                <div className="gradient-color-container inner-container-model">
                  <GradientPicker
                    value={generateLinearGradientString(grad.gradientValue)}
                    onGradientChange={grad.changeProp}
                  />
                </div>
                <div className="divider" />
              </>
            ) : (
              <>
                <div className="inner-container-model">
                  <Alpha
                    hsva={hsva}
                    onChange={(newAlpha) => {
                      handleChangeColor({ ...hsva, ...newAlpha });
                    }}
                  />
                </div>
                <div className="divider" />

                <div className="inner-container-model">
                  <Slider
                    onChange={(newAlpha) => {
                      handleChangeColor(newAlpha.hsva);
                    }}
                    color={hsva}
                  />
                </div>
                <div className="divider" />
              </>
            )}
            <div className="scroll-container overfloy-y-container">
              <div className="inner-container-model">
                <p className="controls-heading">Document Colors</p>
                <div className="recommended-colors-container">
                  {documentColors &&
                    documentColors.map((color) => (
                      <div
                        key={`Document Colors Div ${color}`}
                        style={{ backgroundColor: color }}
                        onClick={() => handleHexColors(color)}
                        className="color-div"
                      />
                    ))}
                  {documentColors && documentColors.length === 0 ? (
                    <p style={{ color: "grey" }} className="controls-heading">
                      No Colors Found
                    </p>
                  ) : null}
                </div>
              </div>
              <div className="divider" />
              <div className="inner-container-model">
                <p className="controls-heading">Recommended Colors</p>
                <div className="recommended-colors-container">
                  {recommended_colors.map((color) => (
                    <div
                      key={`Recommended Colors Div ${color}`}
                      style={{ backgroundColor: color }}
                      onClick={() => handleHexColors(color)}
                      className="color-div"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Draggable>
      ) : null}
    </>
  );
};
export default ColorPicker;

const recommended_colors = [
  "#E1E1E1",
  "#0DBECE",
  "#FFFCFC",
  "#29445B",
  "#F5F5F5",
  "#000000",
  "#A2D6F9",
  "#BEE2FB",
  "#949494",
  "#36434C",
  "#FCF300",
  "#FF1611",
  "#F8DE4F",
  "#929292",
  "#070707",
  "#FF4B8F",
];

const generateLinearGradientString = (colorsArray) => {
  const gradientStops = colorsArray.map(
    ({ value, left }) => `${value} ${left * 100}%`
  );
  const linearGradientString = `linear-gradient(90deg, ${gradientStops.join(
    ", "
  )})`;
  return linearGradientString;
};
