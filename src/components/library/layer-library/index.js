import img1 from "assets/layer/hiars.png";
import img2 from "assets/layer/mockup.png";
import img3 from "assets/layer/shades.png";
import img4 from "assets/layer/shades2.png";
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
        <img src={img1} alt="layer" width={80} />
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
        <img src={img2} alt="layeri" width={80} />
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
        <img src={img3} alt="layeri" width={80} />
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
        <img src={img4} alt="layeri" width={80} />
      </div>
    </>
  );
};

export default LayerLibrary;
