import { useState } from "react";
import AppIcon from "utils/app-icon";
const Collapse = ({ title = "", children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div onClick={() => setIsOpen(!isOpen)} className="collapse">
        <p className="controls-heading">{title}</p>
        <AppIcon
          iconName={isOpen ? "icon-angle-up" : "icon-angle-down"}
          classes="w-3 h-3"
        />
      </div>
      {isOpen ? (
        <>
          {children ? (
            <>
              <div className="collapse-content">{children}</div>
              <div className="divider" />
            </>
          ) : null}
        </>
      ) : (
        <div className="divider" />
      )}
    </>
  );
};
export default Collapse;
