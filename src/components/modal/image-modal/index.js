import Button from "components/button";
import {useState} from "react";
// react-pintura
import {PinturaEditorModal} from "@pqina/react-pintura";

// pintura
import {
  colorStringToColorArray,
  createDefaultColorOptions,
  createDefaultImageReader,
  createDefaultImageWriter,
  createDefaultShapePreprocessor,
  // editor
  locale_en_gb,
  markup_editor_defaults,
  markup_editor_locale_en_gb,
  plugin_annotate,
  plugin_annotate_locale_en_gb,
  plugin_crop,
  plugin_crop_locale_en_gb,
  plugin_fill,
  plugin_filter,
  plugin_filter_defaults,
  plugin_filter_locale_en_gb,
  plugin_finetune,
  plugin_finetune_defaults,
  plugin_finetune_locale_en_gb,
  // plugins
  setPlugins
} from "@pqina/pintura";
import "@pqina/pintura/pintura.css";
import {replaceImage} from "canvas-actions";
setPlugins(
  plugin_crop,
  plugin_finetune,
  plugin_filter,
  plugin_annotate,
  plugin_fill
);

const editorDefaults = {
  utils: ["crop", "finetune", "filter", "annotate", "fill"],
  imageReader: createDefaultImageReader(),
  imageWriter: createDefaultImageWriter(),
  shapePreprocessor: createDefaultShapePreprocessor(),
  ...plugin_finetune_defaults,
  ...plugin_filter_defaults,
  ...markup_editor_defaults,
  ...plugin_fill,
  locale: {
    ...locale_en_gb,
    ...plugin_crop_locale_en_gb,
    ...plugin_finetune_locale_en_gb,
    ...plugin_filter_locale_en_gb,
    ...plugin_annotate_locale_en_gb,
    ...markup_editor_locale_en_gb,
    ...plugin_fill
  }
};
const ImageModal = ({
  imageSrc = "https://images.pexels.com/photos/6590699/pexels-photo-6590699.jpeg"
}) => {
  const [result, setResult] = useState("");
  const [visible, setVisible] = useState(false);

  const handleReplaceImage = (dest) => {
    const url = URL.createObjectURL(dest);
    replaceImage(url);
  };

  return (
    <>
      <Button onClick={() => setVisible(true)} title="Edit Image" />
      {visible && (
        <PinturaEditorModal
          {...editorDefaults}
          src={imageSrc}
          //   onLoad={(res) => console.log("load modal image", res)}
          onHide={() => setVisible(false)}
          onProcess={({dest}) => handleReplaceImage(dest)}
          fillOptions={[
            // Transparent default value
            [0, 0, 0, 0],

            // Red
            [1, 0, 0, 1],

            // Using the default markup editor colors
            ...Object.values(createDefaultColorOptions()),

            // Transparent Purple as CSS color using colorStringToColorArray
            colorStringToColorArray("rgba(0, 0, 255, .5)")

            // Using a PNG as background image
            // "mesh-gradient-01.png"
          ]}
        />
      )}
    </>
  );
};
export default ImageModal;
