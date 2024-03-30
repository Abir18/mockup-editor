import Button from "components/button";
import { InfoMessage } from "components/helpers";
import useImageUpscaling from "./useImageUpscaling";
const ImageUpscalingLibrary = () => {
    const { showComponent } = useImageUpscaling();
    return (
        <>
            <div className="library-inner-container overfloy-y-container">
                <InfoMessage message="Select an image from uploads or your canvas to generate background variations with AI." />
            </div>
            <div className="library-footer-container">
                <Button disabled={!showComponent} classes="w-100" title="Upscale Image" />
            </div>
        </>
    )
}
export default ImageUpscalingLibrary;