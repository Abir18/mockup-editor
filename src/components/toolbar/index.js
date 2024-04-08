import AppIcon from "utils/app-icon";
import "./toolbar.scss";
// import { PenTool } from 'fabric-pen-tool';
import LibraryContainer from "components/library";
import {useDispatch, useSelector} from "react-redux";
import {toggleLibraryPanel} from "store/reducers/libraryMenuSlice";

const Toolbar = () => {
  const dispatch = useDispatch();
  const libraryPanel = useSelector((state) => state.libraryPanel);
  const handleLibraryOpen = (value) => {
    if (value === "Pen") {
      // const pt = new PenTool(window.canvas);
      // pt.open()
    } else {
      dispatch(toggleLibraryPanel({show: true, panelTitle: value}));
    }
  };
  return (
    <>
      <div className="toolbar-container">
        <div id="tool-bar" className="tool-bar">
          {toolbar_items.map((item) => (
            <div
              onClick={() => handleLibraryOpen(item.title)}
              key={`Tool Bar Item - ${item.title}`}
              className={`toolbar-item ${
                libraryPanel.panelTitle === item.title ? "active" : ""
              }`}
            >
              <AppIcon iconName={item.icon} classes="w-3 h-3" />
              <span>{item.title}</span>
            </div>
          ))}
        </div>
      </div>
      <LibraryContainer />
    </>
  );
};
export default Toolbar;

const toolbar_items = [
  {
    title: "Mockup",
    icon: "icon-library"
  },
  {
    title: "Text",
    icon: "icon-text"
  },
  {
    title: "Shapes",
    icon: "icon-star-outline"
  },
  {
    title: "Images",
    icon: "icon-image"
  },
  {
    title: "Layer",
    icon: "icon-layers"
  }
];

// Mockup Style
// Mockup Category
// Browse Gallery
// Crop Mockup
// Add Text
// Add Shapes
