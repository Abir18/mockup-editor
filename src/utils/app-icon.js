import monoIcons from "assets/svg/icons.svg";

const AppIcon = ({ iconName, classes = "" }) => {
  let href = `${monoIcons}#${iconName}`;
  return (
    <svg role="img" className={`icon ${classes}`}>
      <use xlinkHref={href} />
    </svg>
  );
};

export default AppIcon;
