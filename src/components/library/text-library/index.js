import AppIcon from "utils/app-icon";
import { CanvasTextActions } from "canvas-actions";
const TextLibrary = () => {
  return (
    <>
      <div className="library-height overfloy-y-container">
        <div className="library-inner-container">
          <div className="predefined-actions">
            <div
              onClick={() => CanvasTextActions.addTextBox("add:heading")}
              className="library-button"
            >
              <AppIcon iconName="icon-text" classes="w-2 h-2" />
              <p>Heading</p>
            </div>
            <div
              onClick={() => CanvasTextActions.addTextBox("add:subtitle")}
              className="library-button"
            >
              <AppIcon iconName="icon-text-h2" classes="w-2 h-2" />
              <p>Subheading</p>
            </div>
            <div
              onClick={() => CanvasTextActions.addTextBox("add:body-text")}
              className="library-button"
            >
              <AppIcon iconName="icon-paragraph" classes="w-2 h-2" />
              <p>Body Text</p>
            </div>
          </div>
        </div>
        <div className="divider" />
        <div className="library-inner-container">
          <p className="controls-heading">Font Collection</p>
        </div>
      </div>
    </>
  );
};
export default TextLibrary;
