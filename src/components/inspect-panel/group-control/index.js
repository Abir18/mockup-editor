import Button from "components/button";
import useGroupControl from "./useGroupControl";
const GroupControl = ({type="activeSelection"}) => {
  const { isGrouped, handleGroupObject } = useGroupControl(type);
  return (
    <>
      <div className="collapse-content">
        <p className="controls-heading">Selection</p>
        <Button
          icon="icon-group"
          type="outline"
          onClick={handleGroupObject}
          title={isGrouped ? "Ungroup objects" : "Group objects"}
        />
      </div>
      <div className="divider"/>
    </>
  );
};
export default GroupControl;
