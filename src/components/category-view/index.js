import mockupLogo from "assets/img/download.svg";
import {addImageOnCanvas, changeCanvasBackground} from "canvas-actions";
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

  // console.log(data, "deta");
  // console.log(mockupData, "mockupData");

  useEffect(() => {
    const {canvas} = window;

    if (!canvas) return;

    // canvas.getContext("2d");
    // const obj = canvas.getActiveObject();

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
    changeCanvasBackground(image, {selectable: true});

    // addBackgroundImageOnCanvas(mockupData[query]);
    // canvas.renderAll();

    // Load mockup image
    // console.log(draggable, "draggable");
    // fabric.Image.fromURL(mockupData[query], function (img) {
    //   img.set({
    //     selectable: draggable
    //   });
    //   img.scaleToWidth(canvas.width);
    //   img.scaleToHeight(canvas.height);
    //   canvas.add(img);
    //   img.sendToBack();
    //   // canvas.renderAll();
    // });

    // Load logo
    // fabric.Image.fromURL(mockupData.thumbnail, function (logo) {
    //   logo.set({
    //     left: 350,
    //     top: 300,
    //     scaleX: 0.2,
    //     scaleY: 0.2,
    //     selectable: true
    //   });
    //   canvas.add(logo);
    //   // logo.bringToFront();
    //   // canvas.renderAll();
    // });

    // Clean up
    // return () => {
    //   canvas.dispose();
    //   canvas.remove(obj);
    // };
  }, [mockupData]);

  return (
    <>
      <div className="divider" />
      <div
        style={{margin: "10px 0px", padding: "0px 20px"}}
        onClick={() => {
          setToggle(!toggle);
          // console.log(toggle, "toggle");

          toggle ? changeCanvasBackground(image) : changeCanvasBackground("");
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
      {/* <button onClick={() => setDraggable(!draggable)}>hello</button> */}
    </>
  );
};
export default CategoryView;
