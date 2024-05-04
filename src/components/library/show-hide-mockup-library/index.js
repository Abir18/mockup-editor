import {addBackgroundImageOnCanvas} from "canvas-actions";
import Button from "components/button";
import {useState} from "react";
import blackBackground from "../../../assets/img/black-blackground.jpg";
import transparentBackground from "../../../assets/img/default-background-image.jpg";
import whiteBackground from "../../../assets/img/white_background.jpg";

const ShowHideMockup = () => {
  const {canvas} = window;
  const [image, setImage] = useState(canvas?.backgroundImage?.src || "");
  const [toggle, setToggle] = useState(false);
  //   const image =
  //     "https://mockups-design.com/wp-content/uploads/2021/04/Free_Pillow_Mockup_1.jpg";

  //   const image = canvas.backgroundImage.src;

  //   console.log(image, "canvas");

  console.log(toggle, "toggle");
  return (
    <>
      <div
        style={{
          margin: "10px 0px",
          padding: "0px 20px"
        }}
        onClick={() => {
          setToggle(!toggle);
          // console.log(toggle, "toggle");

          toggle
            ? addBackgroundImageOnCanvas(image)
            : addBackgroundImageOnCanvas("");
        }}
      >
        <Button title="Show/Hide Mockup" type="outline"></Button>
      </div>

      {toggle && (
        <div
          style={{
            position: "absolute",
            top: "8%",
            right: "25%",
            zIndex: 10,
            background: "#333"
          }}
        >
          <div
            style={{
              margin: "10px 15px",
              border: "1px solid black",
              maxWidth: "60px",
              cursor: "pointer"
            }}
            onClick={() => addBackgroundImageOnCanvas(whiteBackground)}
          >
            <img src={whiteBackground} height={40} width={40} alt="" />
          </div>
          <div
            style={{margin: "10px 15px", maxWidth: "60px", cursor: "pointer"}}
            onClick={() => addBackgroundImageOnCanvas(transparentBackground)}
          >
            <img src={transparentBackground} height={40} width={40} alt="" />
          </div>
          <div
            style={{margin: "10px 15px", maxWidth: "60px", cursor: "pointer"}}
            onClick={() => addBackgroundImageOnCanvas(blackBackground)}
          >
            <img src={blackBackground} height={40} width={40} alt="" />
          </div>
        </div>
      )}
    </>
  );
};

export default ShowHideMockup;
