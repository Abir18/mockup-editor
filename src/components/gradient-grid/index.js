import { generateGradientCss } from "utils";
import { gradients } from "enums";
import { useDispatch } from "react-redux";
import { toggleLibraryPanel } from "store/reducers/libraryMenuSlice";
const GradientGrid = ({ onClick = () => {} }) => {
  const dispatch = useDispatch();
  const handleLibraryOpen = () => {
    dispatch(
      toggleLibraryPanel({
        show: true,
        panelTitle: "Library",
        subChild: "Gradient",
      })
    );
  };
  return (
    <>
      <div className="divider" />
      <div className="text-controls">
        <div className="d-flex justify-content-between align-center">
          <p className="controls-heading">Gradients</p>
        </div>
        <div className="gradient-grid four-grid-col">
          {gradients.map((grad) => (
            <div
              onClick={() => onClick(grad.colors)}
              style={{ background: generateGradientCss(grad) }}
              key={`Background Control Gradient ${grad.title}`}
              className="gradient gradient-div"
            />
          ))}
        </div>
      </div>
      <div className="divider" />
    </>
  );
};
export default GradientGrid;
