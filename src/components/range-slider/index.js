import AppIcon from "utils/app-icon";
import "./range-slider.scss";
const RangeSlider = ({ value, onChange, min, max, title }) => {
  return (
    <>
      <div className="input-slider-label-container">
        {title ? <p className="controls-heading">{title}</p> : null}
        <div className={`range-slider ${title ? "" : "w-per-100"}`}>
          <input
            onChange={(e) => onChange(parseFloat(e.target.value))}
            type="range"
            value={value}
            min={min}
            max={max}
          />
          <div className="text-container">
            <p>{value}</p>
            <AppIcon iconName="icon-px" classes="w-3 h-3" />
          </div>
        </div>
      </div>
    </>
  );
};
RangeSlider.defaultProps = {
  value: 1,
  onChange: () => {},
  min: 1,
  max: 100,
  steps: 10,
};
export default RangeSlider;
