import { useState, useEffect } from "react";
import { changeFontFamily, changeTextProperty } from "canvas-actions";
import { cloneDeep } from "lodash";
const useTextControl = (objectId) => {
  const { canvas } = window;
  const activeObject = canvas?.getActiveObject();
  const [variants, setVariants] = useState([]);
  const [fontProp, setFontProp] = useState({
    fontFamily: "Roboto",
    fontVariant: "",
    isBold: false,
    isItalic: false,
    isStrikeThrough: false,
    isUnderline: false,
    isUpperCase: false,
    isLineHeight: 1.4,
    isLetterSpacing: 0,
    fontSize: 26,
    fill: "rgb(0,0,0)",
    textAlign: "left",
    text: "",
  });
  useEffect(() => {
    if (!activeObject) return;
    getObjectProperties();
    //  Saving Event to Change State when object property changes
    canvas.on("object:modified", function (e) {
      getObjectProperties();
    });
    canvas.on("object:resizing", function (e) {
      getObjectProperties();
    });
    return () => {
      canvas.off("object:modified", getObjectProperties);
      canvas.off("object:resizing", getObjectProperties);
    };
  }, []);
  useEffect(() => {
    if (!activeObject) return;
    getObjectProperties();
  }, [objectId]);
  const getObjectProperties = () => {
    const {
      fontWeight,
      underline,
      linethrough,
      fontStyle,
      fontFamily,
      lineHeight,
      charSpacing,
      fontSize,
      fill,
      textAlign,
      text,
      fontVariant,
    } = activeObject;
    setFontProp({
      fontFamily,
      isBold: fontWeight === "bold" ? true : false,
      isUnderline: underline ? true : false,
      isItalic: fontStyle === "italic" ? true : false,
      isStrikeThrough: linethrough ? true : false,
      isLineHeight: lineHeight ? lineHeight : 1.4,
      isLetterSpacing: charSpacing ? charSpacing : 0,
      fontSize: fontSize ? fontSize : 26,
      fill: fill ? fill : "rgb(0,0,0)",
      textAlign: textAlign ? textAlign : "left",
      text,
      fontVariant: fontVariant,
    });
  };
  const handlePropertyChange = (propName, propValue) => {
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();
    if (!activeObject) return;
    switch (propName) {
      case "fontFamily": {
        const parsedFontFamily = JSON.parse(propValue);
        const finalValue = parsedFontFamily.family;
        setFontProp({
          ...fontProp,
          fontVariant: parsedFontFamily.variants[0],
          [propName]: finalValue,
        });
        setVariants(cloneDeep(parsedFontFamily.variants));
        const fontToLoad =
          parsedFontFamily.family + "-" + parsedFontFamily.variants[0];
        changeFontFamily(fontToLoad, parsedFontFamily.variants[0],parsedFontFamily.files);
        return;
        break;
      }
      case "text": {
        changeTextProperty("text", propValue);
        break;
      }
      case "isBold": {
        changeTextProperty("fontWeight", propValue ? "bold" : "normal");
        break;
      }
      case "isUnderline": {
        changeTextProperty("underline", propValue);
        break;
      }
      case "isStrikeThrough": {
        changeTextProperty("linethrough", propValue);
        break;
      }
      case "isItalic": {
        changeTextProperty("fontStyle", propValue ? "italic" : "normal");
        break;
      }
      case "isUpperCase": {
        const text = activeObject.text;
        changeTextProperty(
          "text",
          propValue ? text.toLowerCase() : text.toUpperCase()
        );
        break;
      }
      case "isLineHeight": {
        changeTextProperty("lineHeight", propValue);
        break;
      }
      case "isLetterSpacing": {
        changeTextProperty("charSpacing", propValue);
        break;
      }
      case "fontSize": {
        changeTextProperty("fontSize", propValue);
        break;
      }
      case "fill": {
        changeTextProperty("fill", propValue);
        break;
      }
      case "textAlign": {
        changeTextProperty("textAlign", propValue);
        break;
      }
      default:
    }
    setFontProp({
      ...fontProp,
      [propName]: propValue,
    });
  };

  const changeVariant = (value) => {
    let props = {
      fontFamily: fontProp.fontFamily,
      fontVariant: value,
    };
    if (value.toLowerCase().includes("italic")) {
      props.isItalic = true;
    } else {
      props.isItalic = false;
    }
    const fontToLoad = fontProp.fontFamily + "-" + value;
    changeFontFamily(fontToLoad);
    setFontProp({
      ...fontProp,
      ...props,
    });
  };
  return {
    fontProp,
    handlePropertyChange,
    variants,
    changeVariant,
    activeObject,
  };
};
export default useTextControl;
