import { fabric } from "fabric";
import FontFaceObserver from "fontfaceobserver";
export const CanvasTextActions = {
  addTextBox: (eventName) => {
    const { canvas } = window;
    if (!canvas) return;
    let options = {
      top: 100,
      left: 100,
      originX: "center",
      originY: "center",
    };
    switch (eventName) {
      case "add:heading": {
        options = {
          ...options,
          text: "Add Heading Text",
          fontSize: 36,
          width: 280,
          fontWeight: "normal",
          fontFamily: defaultFont.font_name,
          fontFace: defaultFont.familyName,
          fontType: "admin",
          fontPath: defaultFont.font_value,
          title: "Heading",
          uniformScaling: true,
        };
        break;
      }

      case "add:subtitle": {
        options = {
          ...options,
          text: "Add Subheading Text",
          fontSize: 20,
          fontFamily: defaultFont.font_name,
          fontFace: defaultFont.familyName,
          fontType: "admin",
          fontPath: defaultFont.font_value,
          fontWeight: "normal",
          title: "Subtitle",
          uniformScaling: true,
        };
        break;
      }
      case "add:bullet": {
        let text = "First\nSecond\n";
        const overrides = {
          contents: {
            ops: [
              {
                insert: text,
                attributes: {
                  list: "bullet",
                },
              },
            ],
          },
          fill: "rgb(0,0,0)",
          fontFamily: defaultFont.font_name,
          fontFace: defaultFont.familyName,
          fontType: "admin",
          fontPath: defaultFont.font_value,
          fontSize: 16,
          fontStyle: "normal",
          fontWeight: "400",
          lineHeight: 1.2,
          custom: { type: "paragraph" },
          textAlign: "left",
          uniformScaling: true,
        };
        let bulletText = new fabric.BulletText(text, { ...overrides });
        canvas.add(bulletText);
        canvas.centerObject(bulletText);
        canvas.setActiveObject(bulletText);
        canvas.requestRenderAll();
        break;
      }
      case "add:body-text": {
        options = {
          ...options,
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam elit mauris",
          fontSize: 16,
          fontFamily: defaultFont.font_name,
          fontFace: defaultFont.familyName,
          fontType: "admin",
          fontPath: defaultFont.font_value,
          width: 500,
          title: "Paragraph",
          uniformScaling: true,
        };
        break;
      }
      default:
    }
    const _textBox = new fabric.Textbox(options.text, {
      ...options,
    });
    canvas.add(_textBox);
    canvas.centerObject(_textBox);
    canvas.setActiveObject(_textBox);
    canvas.requestRenderAll();
  },
};

export const changeFontFamily = (familyName,fontVariant,fontPath) => {
  const { canvas } = window;
  if (!canvas) return;
  const activeObject = canvas.getActiveObject();
  if (!activeObject) return;
  var myfont = new FontFaceObserver(familyName);
  myfont
    .load()
    .then(function () {
      activeObject.set({
        fontFamily: familyName,
        fontPath:fontPath,
        fontVariant:fontVariant
      })
      canvas.requestRenderAll();
    })
    .catch(function (e) {
      console.log(e);
    });
};

export const changeTextProperty = (propName, propValue) => {
  const { canvas } = window;
  if (!canvas) return;
  const activeObject = canvas.getActiveObject();
  if (!activeObject) return;
  activeObject.set({ [propName]: propValue });
  activeObject.canvas.renderAll();
};

export const defaultFont = {
  familyName: "Roboto regular",
  font_name: "Roboto regular",
  font_value: "uploads/Roboto-Regular.ttf",
};
