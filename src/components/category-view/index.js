import mockupLogo from "assets/img/download.svg";
import {addBackgroundImageOnCanvas, addImageOnCanvas} from "canvas-actions";
import Button from "components/button";
import {useEffect, useState} from "react";
import AppIcon from "utils/app-icon";

const CategoryView = ({data = [], onClick = () => {}, type = "shape"}) => {
  const [detailedView, setDetailedView] = useState(null);

  const response = {
    thumbnail: mockupLogo,

    // thumbnail:
    //   "https://www.svgheart.com/wp-content/uploads/2023/06/bow-silhouette_826-430-min.png",

    tshirt:
      "https://mockuptree.com/wp-content/uploads/edd/2023/04/free-t-shirt-mockup--960x640.jpg",
    mug: "https://pics.craiyon.com/2023-07-11/31b3d44717c34e7ab82f001d0ec6be4c.webp",
    bag: "https://www.freemockupworld.com/wp-content/uploads/2023/02/Shopping-Bag-with-Box-Free-Mockup-01.jpg",
    pillow:
      "https://mockups-design.com/wp-content/uploads/2021/04/Free_Pillow_Mockup_1.jpg"
  };

  const [mockupData, setMockupData] = useState(response);
  const [image, setImage] = useState(response.bag);
  const [toggle, setToggle] = useState(false);

  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const {canvas} = window;

    if (!canvas) return;

    canvas.getContext("2d");

    // API Call

    //const url = https://svgheart.test/wp-json/mockup/v1/get-preview/31422
    // fetch(url)
    //   .then((data) => {
    //     setMockupData(data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    const query = "bag"; // Parse query from url

    // setMockupData(response);

    setImage(mockupData[query]);

    addImageOnCanvas(mockupData.thumbnail, {selectable: true});
    // addImageOnCanvas(image, {selectable: true});
    // changeCanvasBackground(image, {selectable: true});

    addBackgroundImageOnCanvas(image);
  }, [mockupData]);

  const toggleDragging = () => {
    setIsDragging(!isDragging);
  };

  useEffect(() => {
    if (!isDragging) return;

    let {canvas} = window;

    // Enable dragging canvas
    // canvas.isDragging = false;
    canvas.on("mouse:down", function (options) {
      if (isDragging) {
        const pointer = canvas.getPointer(options.e);
        canvas.lastPosX = pointer.x;
        canvas.lastPosY = pointer.y;
        canvas.isDragging = true;
      }
    });

    canvas.on("mouse:move", function (options) {
      if (!isDragging) {
        canvas.isDragging = false;
      }
      if (isDragging && canvas.isDragging) {
        const pointer = canvas.getPointer(options.e);
        const deltaX = pointer.x - canvas.lastPosX;
        const deltaY = pointer.y - canvas.lastPosY;
        canvas.viewportTransform[4] += deltaX;
        canvas.viewportTransform[5] += deltaY;
        canvas.requestRenderAll();
        canvas.lastPosX = pointer.x;
        canvas.lastPosY = pointer.y;
      }
    });

    canvas.on("mouse:up", function () {
      // setIsDragging(!isDragging);
      canvas.isDragging = false;
      // canvas.selection = isDragging;
    });

    return () => {
      // Remove all event listeners
      canvas.off("mouse:down");
      canvas.off("mouse:move");
      canvas.off("mouse:up");
    };
  }, [isDragging]);

  return (
    <>
      <div className="divider" />

      <button
        style={{
          background: "#A2D6F9",
          padding: "8px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          position: "absolute",
          left: "72%",
          top: "94%",
          zIndex: 10
        }}
        onClick={toggleDragging}
      >
        {isDragging ? "Drag Off" : "Drag"}
      </button>

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
      {detailedView !== null ? (
        <>
          <div className="library-inner-container  overfloy-y-container">
            <div
              onClick={() => setDetailedView(null)}
              className="category-header"
            >
              <p className="controls-heading">
                <AppIcon iconName="icon-angle-left" classes="w-2 h-2" />{" "}
                {data[detailedView].type}
              </p>
            </div>
            <div className={`category-container category-${type}`}>
              {data[detailedView].items &&
                data[detailedView].items.map((item, index) => (
                  <div
                    onClick={() => onClick(item)}
                    className={`${type}-container`}
                    key={index}
                    // key={`Detailed View Shapes ${item} - ${index}`}
                  >
                    <img alt="" src={item} />
                  </div>
                ))}
            </div>
          </div>
        </>
      ) : (
        <div className="overfloy-y-container">
          {data &&
            data.map((shape, index) => (
              <>
                <div
                  key={`Compact View Shape Library ${shape.type} - ${index}`}
                  className="library-inner-container"
                >
                  <div
                    onClick={() => setDetailedView(index)}
                    className="category-header"
                  >
                    <p className="controls-heading">{shape.type}</p>
                    <AppIcon iconName="icon-angle-right" classes="w-2 h-2" />
                  </div>
                  <div className={`category-container category-${type}`}>
                    {shape.items &&
                      shape.items.map((item, index) =>
                        index < (type === "image" ? 6 : 4) ? (
                          <div
                            key={`Compact View Shape Childrens Library ${item} - ${index}`}
                            onClick={() => {
                              setImage(item);
                              onClick(item);
                            }}
                            // onClick={() => onClick(item)}
                            className={`${type}-container`}
                          >
                            <img alt="" src={item} />
                          </div>
                        ) : null
                      )}
                  </div>
                </div>
                <div className="divider" />
              </>
            ))}
        </div>
      )}
    </>
  );
};
export default CategoryView;
