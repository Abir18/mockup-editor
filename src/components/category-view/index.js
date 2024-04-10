import mockupLogo from "assets/img/download.svg";
import {addBackgroundImageOnCanvas, addImageOnCanvas} from "canvas-actions";
import Button from "components/button";
import {fabric} from "fabric";
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
  const [draggable, setDraggable] = useState(true);

  // console.log(data, "deta");
  // console.log(mockupData, "mockupData");

  useEffect(() => {
    const {canvas} = window;

    if (!canvas) return;

    canvas.getContext("2d");
    const obj = canvas.getObjects();

    // console.log(obj, "obj");

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
    // replaceImage(image, {selectable: draggable});

    // console.log(mockupData.thumbnail, "thu");

    // mockupData.thumbnail.paths.forEach(function (path) {
    //   path.fill = "red";
    // });
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

    // fabric.loadSVGFromString(mockupData.thumbnail, function (objects, options) {
    //   var svgImage = fabric.util.groupSVGElements(objects, options);
    //   svgImage.set({
    //     height: 300,
    //     width: 300
    //     // left: 350,
    //     // top: 300,
    //     // scaleX: 0.2,
    //     // scaleY: 0.2,
    //     // selectable: true
    //   });
    //   canvas.add(svgImage);
    //   canvas.renderAll();
    // });

    // Clean up
    // return () => {
    //   canvas.dispose();
    //   canvas.remove(obj);
    // };
  }, [mockupData]);

  // const initializeCanvas = () => {
  //   const {canvas} = window;
  //   console.log(canvas, "canvas start");
  //   // const canvas2 = new fabric.Canvas(canvas, {
  //   //   width: 800,
  //   //   height: 600,
  //   // });

  //   fabric.Image.fromURL(image, function (img) {
  //     canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
  //       selectable: draggable,
  //       scaleX: canvas.width / img.width,
  //       scaleY: canvas.height / img.height
  //     });
  //   });

  //   canvas.on("mouse:down", function (options) {
  //     console.log(canvas, "mouse down");
  //     canvas.backgroundImage.selectable = draggable;
  //     if (options.target) {
  //       console.log("options target 1", options.target);
  //       canvas.on("mouse:move", function (options) {
  //         console.log("mouse down");
  //         if (draggable) {
  //           const pointer = canvas.getPointer(options.e);
  //           console.log("draggableS");
  //           console.log(pointer, "pointer");
  //           console.log("options target 2", options.target);

  //           options.target.set({
  //             draggable: true
  //             // left: pointer.x - options.target.width / 2,
  //             // top: pointer.y - options.target.height / 2
  //           });
  //           canvas.renderAll();
  //         }
  //       });
  //     }
  //   });

  //   canvas.on("mouse:up", function () {
  //     canvas.off("mouse:move");
  //     console.log("mouse:move");
  //   });
  // };

  // useEffect(() => {
  //   initializeCanvas();
  // }, []);

  useEffect(() => {
    const {canvas} = window;

    if (!draggable) {
      return;
    }

    console.log(canvas, "top canvas");

    // Load background image
    fabric.Image.fromURL(image, function (img) {
      img.set({
        selectable: true
      });
      canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
        scaleX: canvas.width / img.width,
        scaleY: canvas.height / img.height,
        selectable: true
      });
    });

    // console.log(canvas, "bttm canvas");

    // canvas.on("mouse:move", function (options) {
    //   if (canvas.isDragging) {
    //     console.log(canvas, "cann");
    //     const e = options.e;
    //     const delta = new fabric.Point(e.movementX, e.movementY);
    //     canvas.relativePan(delta);
    //     // canvas.relativePan();
    //   }
    // });

    // Enable moving background image

    canvas.on("mouse:move", function (options) {
      if (canvas.isDragging) {
        console.log(canvas, "cann");
        const e = options.e;
        const delta = new fabric.Point(e.movementX, e.movementY);
        canvas.relativePan(delta);
        // canvas.relativePan();
      }
    });

    canvas.on("mouse:down", function (options) {
      const e = options.e;
      if (e.button === 1) {
        // Middle mouse button
        // canvas.isDragging = draggable;
        // canvas.selection = draggable;

        canvas.lastPosX = e.clientX;
        canvas.lastPosY = e.clientY;
      }
    });

    canvas.on("mouse:up", function () {
      canvas.isDragging = draggable;
      canvas.selection = draggable;
      canvas.off("mouse:move");
    });

    // if (canvas.isDragging === false) {
    //   canvas.off("mouse:move");
    // }

    canvas.on("mouse:up", function () {
      canvas.off("mouse:move");
      setDraggable(!draggable);
      canvas.isDragging = draggable;
      canvas.selection = draggable;
    });
    // canvas.on("mouse:down", function () {
    //   canvas.on("mouse:move");
    // });

    // return () => {
    //   canvas.dispose(); // Clean up Fabric.js canvas
    // };
  }, [draggable]);

  return (
    <>
      <div className="divider" />
      <div style={{margin: "10px 0px", padding: "0px 20px"}}>
        <Button
          // type="outline"
          title={draggable ? "Drag Off" : "Drag On"}
          onClick={() => {
            // addBackgroundImageOnCanvas(image, {selectable: draggable});

            const {canvas} = window;
            // canvas.backgroundImage.selectable = draggable;
            // canvas.renderAll();
            // console.log(canvas, "can");
            // const objects = canvas.getObjects();
            // console.log(objects, "objects");
            // objects.
            // console.log(objects[0].canvas.backgroundImage.selectable, "00");
            // objects[0].canvas.backgroundImage.selectable = draggable;
            // objects[0].selectable = draggable;
            // console.log(objects[1], "1");

            // Find the bottom layer object
            // const bottomLayer = objects.find((obj) => !obj.selectable);
            // bottomLayer.selectable = draggable;
            setDraggable(!draggable);
          }}
        />
      </div>

      <div
        style={{margin: "10px 0px", padding: "0px 20px"}}
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
