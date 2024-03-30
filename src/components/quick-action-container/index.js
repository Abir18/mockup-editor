import AppIcon from "utils/app-icon";

const QuickActionContainer = () => {
  return (
    <>
      <div className="quick-action-container">
      <div className="vertical-divider" />
        <div className="action-button">
          <AppIcon iconName="icon-undo" classes="w-3 h-3" />
        </div>
        <div className="action-button">
          <AppIcon iconName="icon-redo" classes="w-3 h-3" />
        </div>
        
      </div>
    </>
  );
};
export default QuickActionContainer;
