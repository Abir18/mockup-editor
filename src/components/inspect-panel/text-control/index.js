import TextArea from "components/text-area";
import AppIcon from "utils/app-icon";
import SelectBox from "components/select-box";
import InputField from "components/input-field";
import GoogleFonts from "enums/google-fonts.json";
import useTextControl from "./useTextControl";
import ColorPicker from "components/color-picker";
const TextControls = ({objectId}) => {
  const {
    fontProp,
    handlePropertyChange,
    variants,
    changeVariant,
    activeObject,
  } = useTextControl(objectId);
  return (
    <>
      <div className="text-controls">
        <p className="controls-heading">Typography</p>
        <TextArea
          value={fontProp.text}
          onChange={(value) => handlePropertyChange("text", value)}
          placeholder="Text will go here"
        />
        <div
          style={{ width: "fit-content", gap: "1rem" }}
          className="group-button"
        >
          {justify_text_options.map((item) => (
            <div
              onClick={() => handlePropertyChange("textAlign", item.action)}
              key={`Text Justify Options ${item.action}`}
              className={`justify-options panel-icon-button ${
                fontProp.textAlign === item.action ? "active-button" : ""
              }`}
            >
              <AppIcon iconName={item.icon} classes="w-1rem h-1rem" />
            </div>
          ))}
        </div>
        <ColorPicker
          hasGradient={true}
          title="Text Color"
          objectKey="fill"
          activeObject={activeObject}
          key={objectId}
        />
        <SelectBox
          value={fontProp.fontFamily}
          onChange={(value) => handlePropertyChange("fontFamily", value)}
          defaultText="Inter"
          options={GoogleFonts.items.map((font) => ({
            title: font.family,
            value: JSON.stringify(font),
          }))}
          hasSearch={true}
        />
        <div className="d-flex justify-content-between">
          <SelectBox
            onChange={(value) => changeVariant(value)}
            value={fontProp.fontVariant}
            containerClass="w-per-45"
            disabled={variants.length === 0}
            options={variants.map((item) => ({
              title: item,
              value: item,
            }))}
          />
          <InputField
            type="number"
            placeholder=""
            icon="icon-text-size"
            containerClass="w-per-45"
            value={fontProp.fontSize}
            onChange={(value) => handlePropertyChange("fontSize", value)}
          />
        </div>
        <div className="d-flex justify-content-between">
          <InputField
            type="number"
            placeholder=""
            icon="icon-letter-spacing"
            containerClass="w-per-45"
            value={fontProp.isLetterSpacing}
            onChange={(value) => handlePropertyChange("isLetterSpacing", value)}
          />
          <InputField
            type="number"
            placeholder=""
            icon="icon-text-line-height"
            containerClass="w-per-45"
            value={fontProp.isLineHeight}
            onChange={(value) => handlePropertyChange("isLineHeight", value)}
          />
        </div>
        <div className="group-button">
          {other_text_options.map((item) => (
            <div
              onClick={() =>
                handlePropertyChange(item.state, !fontProp[item.state])
              }
              key={`Text Other Options ${item.state}`}
              className={`justify-options panel-icon-button ${
                fontProp[item.state] ? "active-button" : ""
              }`}
            >
              <AppIcon iconName={item.icon} classes="w-1rem h-1rem" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default TextControls;

const justify_text_options = [
  {
    icon: "icon-justify-left",
    action: "left",
    state: "textAlign",
  },
  {
    icon: "icon-justify-center",
    state: "textAlign",
    action: "center",
  },
  {
    icon: "icon-justify-right",
    state: "textAlign",
    action: "right",
  },
];

const other_text_options = [
  {
    icon: "icon-text-bold",
    state: "isBold",
  },
  {
    icon: "icon-text-underline",
    state: "isUnderline",
  },
  // {
  //   icon: "icon-text-smallcaps",
  //   state: "",
  // },
  {
    icon: "icon-text-strikethrough",
    state: "isStrikeThrough",
  },
  {
    icon: "icon-text-italic",
    state: "isItalic",
  },
  {
    icon: "icon-text-uppercase",
    state: "isUpperCase",
  },
  // {
  //   icon: "icon-text-index",
  //   state: "",
  // },
];
