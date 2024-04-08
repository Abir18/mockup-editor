import {
  hexToHsva,
  hsvaToHex,
  hsvaToRgbaString,
  rgbaStringToHsva,
  validHex
} from "@uiw/color-convert";
import {
  addGradientToFill,
  handleBackgroundGradient,
  handleChangeBGGradProp,
  handleChangeBGGradType,
  handleChangeFillGradProp,
  handleRemoveBGGradient,
  removeGradientFill
} from "canvas-actions";
import {fabric} from "fabric";
import {cloneDeep} from "lodash";
import {useCallback, useEffect, useState} from "react";
import useEyeDropper from "use-eye-dropper";

const useColorPicker = (activeObject, objectKey) => {
  const {canvas} = window;
  // const activeObject = canvas?.getActiveObject();

  let currentColor;
  if (objectKey === "shadow") {
    currentColor = activeObject?.shadow?.color || "#000000";
  } else if (objectKey === "background") {
    const currentFill =
      canvas?.backgroundColor === "white"
        ? "#ffffff"
        : canvas?.backgroundColor || "#0000";
    currentColor = currentFill;
  } else if (objectKey === "image") {
    const currentFill =
      canvas?.backgroundColor === "white"
        ? "#ffffff"
        : canvas?.backgroundColor || "#0000";
    currentColor = currentFill;
  } else {
    currentColor = activeObject
      ? activeObject[objectKey]
      : canvas?.backgroundColor || "#0000";
  }

  const hsvaString = rgbaStringToHsva(currentColor);
  const [isOpen, setIsOpen] = useState(false);
  const [hex, setHex] = useState(hsvaToHex(hsvaString));
  const [documentColors, setDocumentColors] = useState([]);
  const [hsva, setHsva] = useState({h: 214, s: 43, v: 90, a: 1});
  const [isGrad, setIsGrad] = useState(false);
  const [gradType, setGradType] = useState("Linear");
  const [gradient, setGradient] = useState([
    {value: "rgba(96,93,93,1)", left: 0},
    {value: "rgba(255,255,255,1)", left: 1}
  ]);
  //   Eye Dropper
  const {open, close, isSupported} = useEyeDropper();

  const getDocumentColor = () => {
    if (!canvas) return;
    let object = canvas?._objects.map((obj) => obj.fill);
    setDocumentColors(object);
  };

  useEffect(() => {
    getDocumentColor();
  }, []);

  const checkIsGrad = () => {
    let gradient = [];
    if (
      objectKey === "background" &&
      typeof canvas.backgroundColor != "string"
    ) {
      gradient = canvas.backgroundColor;
      handleOpenGradient(gradient);
    } else if (objectKey === "fill") {
      const activeObject = canvas.getActiveObject();
      if (typeof activeObject.fill != "string") {
        gradient = activeObject.fill;
        handleOpenGradient();
      }
    }
  };

  const handleOpenGradient = (gradient) => {
    const colorStops = gradient.colorStops.map((item) => ({
      value: item.color,
      left: item.offset
    }));
    setGradient(cloneDeep(colorStops));
    setIsGrad(true);
  };

  const canvasChange = (color) => {
    console.log(color, "color");
    if (objectKey === "background") {
      canvas.set({backgroundColor: color, backgroundImage: null});
    }
    if (objectKey === "image") {
      console.log("objectKey", objectKey);
      // canvas.set({fill: color, backgroundImage: color});
    }
    if (activeObject) {
      if (objectKey === "shadow") {
        activeObject.shadow.color = color;
      } else if (objectKey === "image") {
        console.log("activeObject", activeObject);

        // const svg = canvas.toSVG();
        // console.log("svg", svg);

        // const coloredSVG = svg.replace("<image", '<image fill="red"');
        // console.log("coloredSVG", coloredSVG);

        // activeObject.backgroundColor = color;

        // activeObject.push(
        //   new fabric.Image.filters({
        //     color: color
        //   })
        // );
        // activeObject.applyFilters();
        // canvas.renderAll();

        // activeObject.color = "rgba(245, 40, 145, 0.8)";
        // activeObject.fill = "rgba(245, 40, 145, 0.8)";

        if (activeObject && activeObject.type === "image") {
          console.log("Executed");

          activeObject.filters = [
            new fabric.Image.filters.Tint({color: "#FF0000"})
          ]; // Change color to red
          activeObject.applyFilters();
          canvas.requestRenderAll();

          // if (activeObject && activeObject.canvas._objects) {
          //   for (var i = 0; i < activeObject.canvas._objects.length; i++) {
          //     activeObject.canvas._objects[i].set({
          //       fill: color
          //     });
          //   }
          // }
          // console.log(activeObject, "activeObject");
          // console.log(activeObject.canvas._objects[0].fill, "1st");

          // console.log(activeObject._objects[1].fill, "2st");
          // activeObject.paths.forEach(function (path) {
          //   path.fill = color;
          // });
          // activeObject.canvas._objects[0].fill = color;
          // activeObject.canvas._objects[1].fill = color;
          // activeObject.setAttribute("fill", "blue");
          // var obj = this.canvas.itemObj;
          // var color = '#ff00ff';

          // if (activeObject.canvas.item._objects) {
          //   for (var i = 0; i < obj._objects.length; i++) {
          //     obj._objects[i].set({
          //       fill: color
          //     });
          //   }
          // }

          // console.log(activeObject, "activeObject");
          // console.log(activeObject.canvas._objects[0].color, "fill");
          // activeObject.canvas._objects[0].color = "rgba(245, 40, 145, 0.8)";
          // activeObject.canvas._objects[0].fill = "rgba(245, 40, 145, 0.8)";
          // activeObject.color = "rgba(255,255,255,0.7)";
          // activeObject.paths.forEach(function (path) {
          //   path.fill = color;
          // });
          // activeObject.set("fill", color);
          // activeObject.set({color: color});
          // activeObject.filters = []; // Clear existing filters
          // activeObject.applyFilters(); // Apply changes
          // // Apply color overlay filter
          // activeObject.filters.push(
          //   new fabric.Image.filters.Tint({
          //     color: color
          //   })
          // );
          // activeObject.applyFilters();
          // var filter = new fabric.Image.filters.Tint({
          //   color: "#3513B0",
          //   opacity: 0.5
          // });
          // activeObject.filters.push(filter);
        }
      } else {
        activeObject.set({
          [objectKey]: color
        });
      }
    }
    canvas.renderAll();
  };

  const handleChangeColor = (color) => {
    const colorInHex = hsvaToHex(color);
    const colorInRgba = hsvaToRgbaString(color);
    setHsva(color);
    setHex(colorInHex);
    getDocumentColor();
    canvasChange(colorInRgba);
  };

  const pickColor = useCallback(() => {
    // Using async/await (can be used as a promise as-well)
    const openPicker = async () => {
      try {
        const color = await open();
        setHsva(hexToHsva(color.sRGBHex));
        setHex(color.sRGBHex);
        canvasChange(color.sRGBHex);
      } catch (e) {
        console.log(e);
      }
    };
    openPicker();
  }, [open, canvasChange]);

  const handleRandomColor = () => {
    const color = generateRandomHexColor();
    handleHexColors(color);
  };

  const handleHexColors = (color) => {
    const hsvaColor = hexToHsva(color);
    setHsva(hsvaColor);
    setHex(color);
    canvasChange(color);
  };

  const handleInputField = (value) => {
    if (validHex(value)) {
      const hsvaColor = hexToHsva(value);
      setHsva(hsvaColor);
      canvasChange(value);
    }
    setHex(value);
  };
  const handleAddGradient = () => {
    if (objectKey === "background") {
      if (isGrad) {
        // Removing Current Gradient
        handleRemoveBGGradient();
      } else if (canvas.backgroundColor instanceof fabric.Gradient) {
        //  Upgrade Gradient Here
      } else {
        // Adding New Gradient to the BG
        handleBackgroundGradient(gradient);
      }
    } else if (objectKey === "fill") {
      if (isGrad) {
        // Removing Current Gradient
        removeGradientFill();
      } else if (typeof canvas.getActiveObject().fill != "string") {
        //  Upgrade Gradient Here
      } else {
        // Adding New Gradient to the Object Fill
        addGradientToFill(gradient);
      }
    }
    setIsGrad(!isGrad);
  };
  const changeGradientType = (value) => {
    if (objectKey === "background") {
      handleChangeBGGradType(value.toLowerCase(), gradient);
    }
    setGradType(value);
  };
  const changeGradientProp = (grad) => {
    if (objectKey === "background") {
      handleChangeBGGradProp(grad, gradType.toLowerCase());
    } else if (objectKey === "fill") {
      handleChangeFillGradProp(grad, gradType.toLowerCase());
    }
    const colorStops = grad.colors.map((item) => ({
      offset: item.left / 100,
      color: item.value
    }));
    setGradient(cloneDeep(colorStops));
  };
  const openModel = () => {
    if (!isOpen) {
      checkIsGrad();
    }
    setIsOpen(!isOpen);
  };
  return {
    hex,
    handleChangeColor,
    openModal: {get: isOpen, set: openModel},
    hsva,
    documentColors,
    pickColor,
    handleHexColors,
    handleRandomColor,
    handleInputField,
    grad: {
      value: isGrad,
      type: gradType,
      gradientValue: gradient,
      set: handleAddGradient,
      changeType: changeGradientType,
      changeProp: changeGradientProp
    }
  };
};
export default useColorPicker;

const generateRandomHexColor = () => {
  // Generate a random number between 0 and 16777215 (decimal equivalent of FFFFFF in hex)
  const randomColorNumber = Math.floor(Math.random() * 16777216);

  // Convert the random number to hexadecimal and pad with zeros if necessary
  const hexColor = randomColorNumber.toString(16).padStart(6, "0");

  // Concatenate the hexadecimal color with a '#' symbol
  return `#${hexColor.toUpperCase()}`;
};
