import "./toggle-switch.scss";
const ToggleSwitch = ({ title, value, onChange, containerClass }) => {
  return (
    <>
      <div className={`d-flex gap-1 justify-content-between align-center ${containerClass}`}>
        {title ? <p className="controls-heading">{title}</p> : null}
        <label className="toggle-button">
          <input
            onChange={(e) => onChange(e.target.checked)}
            type="checkbox"
            checked={value}
          />
          <span className="knob"></span>
        </label>
      </div>
    </>
  );
};
ToggleSwitch.defaultProps = {
  title: null,
  value: false,
  onChange: () => {},
  containerClass:""
};
export default ToggleSwitch;
