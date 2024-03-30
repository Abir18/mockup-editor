import { useState } from "react";
import { groupObjects, ungroupObject } from "canvas-actions";
const useGroupControl = (type) => {
  const [isGrouped, setIsGrouped] = useState(type === "group" ? true : false);
  const handleGroupObject = () => {
    if (isGrouped) {
      ungroupObject();
    } else {
      groupObjects();
    }
    setIsGrouped(!isGrouped);
  };
  return { isGrouped, handleGroupObject };
};
export default useGroupControl;
