import "./button.scss";
import AppIcon from "utils/app-icon";
const Button = ({ title, onClick, disabled, type, classes, icon }) => {
  return (
    <>
      <button
        className={`btn ${classes} ${disabled ? "disabled-button" : button_types[type]
          }`}
        disabled={disabled}
        onClick={onClick}
      >
        {icon ? <AppIcon iconName={icon} classes="w-2 h-2" /> : null}
        {title}
      </button>
    </>
  );
};
Button.defaultProps = {
  title: "",
  onClick: () => { },
  disabled: false,
  type: "primary",
  classes: "",
  icon: null,
};
export default Button;

const button_types = {
  primary: "primary-button",
  outline: "outline-button",
  ghost: "ghost-button",
  ai: "artificial-intelligence-button",
};
