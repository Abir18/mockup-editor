import AppIcon from "utils/app-icon";
import "./input.scss";
const InputField = ({
  placeholder,
  onChange,
  disabled,
  type,
  className,
  containerClass,
  icon,
  value,
  min,
  max,
  onBlur,
  step
}) => {
  let extraProps = {};
  if (type === "number") {
    extraProps.min = min;
    extraProps.max = max;
    extraProps.step = step;
  }
  return (
    <>
      <div className={`input-field-container ${containerClass}`}>
        {icon ? (
          <span className="input-icon">
            <AppIcon classes="w-3 h-3" iconName={icon} />
          </span>
        ) : null}
        <input
          className={`input-field w-100 ${className} ${
            icon ? "icon-pending" : ""
          }`}
          onChange={(e) =>
            onChange(
              type === "number" ? parseFloat(e.target.value) : e.target.value
            )
          }
          onBlur={(e) =>
            onBlur(
              type === "number" ? parseFloat(e.target.value) : e.target.value
            )
          }
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          value={value}
          {...extraProps}
        />
      </div>
    </>
  );
};
InputField.defaultProps = {
  placeholder: "Text Goes Here",
  onChange: () => {},
  onBlur: () => {},
  disabled: false,
  type: "text",
  className: "",
  icon: "",
  value: "",
  containerClass: "",
  min: 0,
  max: 200000,
  step: 1
};
export default InputField;
