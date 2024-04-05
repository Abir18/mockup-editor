import {useState} from "react";
import ColorPicker, {useColorPicker} from "react-best-gradient-color-picker";
const GradientPicker = ({
  onGradientChange = () => {},
  value = "linear-gradient(90deg, rgba(96,93,93,1) 0%, rgba(255,255,255,1) 100%)"
}) => {
  // console.log("value", value);
  const newValue =
    "linear-gradient(90deg, rgba(96,93,93,1) 0%, rgba(255,255,255,1) 100%)";
  const [color, setColor] = useState(value);
  const {getGradientObject} = useColorPicker(color, setColor);
  const handleChange = (value) => {
    const gradientObject = getGradientObject();
    onGradientChange(gradientObject);
    setColor(value);
  };
  return (
    <>
      <ColorPicker
        width={220}
        height={100}
        value={color}
        onChange={handleChange}
        hideControls={true}
        hideColorGuide={true}
        hidePresets={true}
        hideInputs={true}
        hideAdvancedSliders={true}
        hideColorTypeBtns={true}
      />
    </>
  );
};
export default GradientPicker;
