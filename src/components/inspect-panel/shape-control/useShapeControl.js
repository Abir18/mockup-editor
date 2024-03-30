import { useDispatch } from "react-redux";
import { toggleLibraryPanel } from "store/reducers/libraryMenuSlice";
const useShapeControl = () => {
  const dispatch = useDispatch();
  const addImage = () => {
    dispatch(
      toggleLibraryPanel({
        show: true,
        panelTitle: "Images",
        subChild: "",
      })
    );
  };
  return { addImage };
};
export default useShapeControl;
