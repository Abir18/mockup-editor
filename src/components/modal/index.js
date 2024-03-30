import { createPortal } from "react-dom";
import "./modal.scss";
import AppIcon from "utils/app-icon";
import useOnclickOutside from "react-cool-onclickoutside";
const Modal = ({
  width,
  height,
  title,
  children,
  bodyClasses,
  isOpen,
  onClose,
  footer,
  fixedHeader,
}) => {
  const ref = useOnclickOutside(() => {
    onClose();
  });
  return (
    <>
      {isOpen ? (
        <>
          {createPortal(
            <div className="modal-outer-container">
              <div ref={ref} className="modal-inner-container">
                <div className="modal-title">
                  <p>{title}</p>
                  <div onClick={onClose} className="cursor-pointer h-100">
                    <AppIcon iconName="icon-close" classes="w-2 h-2" />
                  </div>
                </div>
                <div className="divider" />
                {fixedHeader ? (
                  <>
                    {fixedHeader}
                    <div className="divider" />
                  </>
                ) : null}
                {children ? (
                  <div
                    style={{
                      width,
                      height,
                      maxWidth: width,
                      maxHeight: height,
                      overflowY: "auto",
                      overflowX: "hidden"
                    }}
                    className={`modal-body ${bodyClasses} overfloy-y-container`}
                  >
                    {children}
                  </div>
                ) : null}
                {footer ? (
                  <>
                    <div className="divider" />
                    <div className="modal-footer">{footer}</div>
                  </>
                ) : null}
              </div>
            </div>,
            document.body
          )}
        </>
      ) : null}
    </>
  );
};
Modal.defaultProps = {
  width: 400,
  height: 400,
  title: "Modal Title",
  children: null,
  bodyClasses: "",
  isOpen: false,
  onClose: () => { },
  footer: null,
  fixedHeader: null,
};
export default Modal;
