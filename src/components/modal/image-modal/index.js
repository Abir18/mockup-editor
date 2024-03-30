import Button from "components/button";
import { useState } from "react";
// react-pintura
import { PinturaEditorModal } from "@pqina/react-pintura";

// pintura
import "@pqina/pintura/pintura.css";
import {
  // editor
  locale_en_gb,
  createDefaultImageReader,
  createDefaultImageWriter,
  createDefaultShapePreprocessor,

  // plugins
  setPlugins,
  plugin_crop,
  plugin_crop_locale_en_gb,
  plugin_finetune,
  plugin_finetune_locale_en_gb,
  plugin_finetune_defaults,
  plugin_filter,
  plugin_filter_locale_en_gb,
  plugin_filter_defaults,
  plugin_annotate,
  plugin_annotate_locale_en_gb,
  markup_editor_defaults,
  markup_editor_locale_en_gb,
} from "@pqina/pintura";
import { replaceImage } from "canvas-actions";
setPlugins(plugin_crop, plugin_finetune, plugin_filter, plugin_annotate);

const editorDefaults = {
  utils: ["crop", "finetune", "filter", "annotate"],
  imageReader: createDefaultImageReader(),
  imageWriter: createDefaultImageWriter(),
  shapePreprocessor: createDefaultShapePreprocessor(),
  ...plugin_finetune_defaults,
  ...plugin_filter_defaults,
  ...markup_editor_defaults,
  locale: {
    ...locale_en_gb,
    ...plugin_crop_locale_en_gb,
    ...plugin_finetune_locale_en_gb,
    ...plugin_filter_locale_en_gb,
    ...plugin_annotate_locale_en_gb,
    ...markup_editor_locale_en_gb,
  },
};
const ImageModal = ({
  imageSrc = "https://images.pexels.com/photos/6590699/pexels-photo-6590699.jpeg",
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
          onProcess={({ dest }) => handleReplaceImage(dest)}
        />
      )}
    </>
  );
};
export default ImageModal;
