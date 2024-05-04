import {changeCanvasBackground} from "canvas-actions";
import Button from "components/button";
import ColorPicker from "components/color-picker";
import {gradients} from "enums";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {toggleLibraryPanel} from "store/reducers/libraryMenuSlice";
import {generateGradientCss} from "utils";

const GradientGrid = ({onClick = () => {}}) => {
  const activeObjectType = useSelector((state) => state.activeObject);

  const {type, id: objectId} = activeObjectType;
  const dispatch = useDispatch();

  const [color, setColor] = useState("#ffffff");

  const {canvas} = window;
  // useEffect(() => {}, [canvas, color]);

  const activeObject = canvas?.getActiveObject();

  const handleLibraryOpen = () => {
    dispatch(
      toggleLibraryPanel({
        show: true,
        panelTitle: "Library",
        subChild: "Gradient"
      })
    );
  };

  const [toggle, setToggle] = useState(false);
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
              style={{background: generateGradientCss(grad)}}
              key={`Background Control Gradient ${grad.title}`}
              className="gradient gradient-div"
            />
          ))}
        </div>
      </div>

      <div className="divider" />
      <div className="text-controls">
        <div className="d-flex justify-content-between align-center">
          <p className="controls-heading">Color</p>
        </div>
        <ColorPicker
          activeObject={activeObject}
          objectKey="background"
          objectId={objectId}
        />
      </div>
      <div className="divider" />
      <div style={{margin: "20px 15px"}}>
        <Button
          title="Remove Background"
          type="outline"
          onClick={() => {
            if (!canvas) return;
            setColor(color);
            canvas.set({
              backgroundColor: color,
              backgroundImage: null
            });
            changeCanvasBackground("");
          }}
        ></Button>
      </div>
      {/* <div style={{margin: "10px 15px"}}>
        <h4 className="controls-heading">Select Background</h4>
      </div>
      <div
        style={{margin: "10px 15px", maxWidth: "60px", cursor: "pointer"}}
        onClick={() => addBackgroundImageOnCanvas(defaultBackground)}
      >
        <img src={defaultBackground} height={60} width={60} alt="" />
      </div>
      <div
        style={{margin: "10px 15px", maxWidth: "60px", cursor: "pointer"}}
        onClick={() => addBackgroundImageOnCanvas(blackBackground)}
      >

        <img src={blackBackground} height={60} width={60} alt="" />
      </div>
      <div
        style={{
          margin: "10px 15px",
          border: "1px solid black",
          maxWidth: "60px",
          cursor: "pointer"
        }}
        onClick={() => addBackgroundImageOnCanvas(whiteBackground)}
      >

        <img src={whiteBackground} height={60} width={60} alt="" />
      </div> */}
    </>
  );
};
export default GradientGrid;
