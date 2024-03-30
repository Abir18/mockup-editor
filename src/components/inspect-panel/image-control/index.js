import ImageModal from "components/modal/image-modal";
import Button from "components/button";
import AppIcon from "utils/app-icon";
import useImageControl from "./useImageControl";
const ImageControls = () => {
  const { imageSrc, removeBackground } = useImageControl();
  return (
    <>
      <div className="text-controls">
        <p className="controls-heading">Image</p>
        <div className="image-control">
          <img src={imageSrc} />
          <div className="overflow-container">
            <Button title="Replace" />
          </div>
        </div>
        <ImageModal imageSrc={imageSrc} />
        <Button
          type="outline"
          onClick={() => removeBackground()}
          title={
            <>
              <AppIcon iconName="icon-remove-bg" classes="w-2 h-2" />
              <p>Remove background</p>
            </>
          }
        />
        <Button
          type="ai"
          title={
            <>
              <AppIcon iconName="icon-remove-bg" classes="w-2 h-2" />
              <p>More AI magic</p>
            </>
          }
        />
      </div>
      <div className="divider" />
    </>
  );
};
export default ImageControls;
