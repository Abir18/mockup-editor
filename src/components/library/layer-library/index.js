import img1 from "assets/layer/hiars.png";
import img2 from "assets/layer/mockup.png";
import img3 from "assets/layer/shades.png";
import img4 from "assets/layer/shades2.png";
import Button from "components/button";
import {fabric} from "fabric";

const LayerLibrary = () => {
  return (
    <>
      <div
        onClick={() => {
          const {canvas} = window;
          fabric.Image.fromURL(img1, function (img) {
            img.scaleToWidth(canvas.width - 500);
            img.scaleToHeight(canvas.height - 500);
            canvas.add(img);
          });
        }}
      >
        <div style={{margin: "10px 30px"}}>
          <Button title="Layer 1" type="outline"></Button>
        </div>
      </div>
      <div
        onClick={() => {
          const {canvas} = window;
          fabric.Image.fromURL(img2, function (img) {
            img.scaleToWidth(canvas.width - 500);
            img.scaleToHeight(canvas.height - 500);
            canvas.add(img);
          });
        }}
      >
        <div style={{margin: "10px 30px"}}>
          <Button title="Layer 2" type="outline"></Button>
        </div>
      </div>
      <div
        onClick={() => {
          const {canvas} = window;
          fabric.Image.fromURL(img3, function (img) {
            img.scaleToWidth(canvas.width - 500);
            img.scaleToHeight(canvas.height - 500);
            canvas.add(img);
          });
        }}
      >
        <div style={{margin: "10px 30px"}}>
          <Button title="Layer 3" type="outline"></Button>
        </div>
      </div>
      <div
        onClick={() => {
          const {canvas} = window;
          fabric.Image.fromURL(img4, function (img) {
            img.scaleToWidth(canvas.width - 500);
            img.scaleToHeight(canvas.height - 500);
            canvas.add(img);
          });
        }}
      >
        <div style={{margin: "10px 30px"}}>
          <Button title="Layer 4" type="outline"></Button>
        </div>
      </div>
    </>
  );
};

export default LayerLibrary;
