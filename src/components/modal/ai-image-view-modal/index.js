import { useRef, useEffect } from "react";
import Modal from "components/modal";
import Button from "components/button";
import Slider from "react-slick";
import AppIcon from "utils/app-icon";
import { convertToDataURL } from "utils";
import { addImageOnCanvas } from "canvas-actions";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const AiImageViewModal = ({ open, onClose, loading, images }) => {
    const sliderRef = useRef();
    const loaderRef = useRef();
    const settings = {
        className: "ai-image-container",
        dots: false,
        slidesToScroll: 1,
        infinite: true,
        autoplay: false,
        autoplaySpeed: 1000,
    };
    useEffect(() => {
        loaderRef?.current?.play();
    }, [])

    const addImagesToCanvas = () => {
        images.forEach((base64, index) => {
            var imgObj = new Image();
            convertToDataURL(base64, function (dataUrl) {
                imgObj.src = dataUrl;
                imgObj.onload = function () {
                    addImageOnCanvas(dataUrl);
                    if (index === images.length-1) {
                        onClose();
                    }
                };
            });
        });
    }
    return (
        <Modal
            isOpen={open}
            onClose={() => onClose(false)}
            width={300}
            height={300}
            title="AI Generated Results"
            footer={
                <>
                    <Button onClick={addImagesToCanvas} disabled={images.length == 0} classes="w-100" title="Add To Canvas" />
                </>
            }
        >
            {
                loading
                    ?
                    <video ref={loaderRef} playsinline autoplay muted loop  >
                        <source src="https://img6.wsimg.com/serpimg/img/solutionsimg/conversationalSearch/aiLoadThumb.webm" type="video/webm" />
                    </video>
                    :
                    <div>
                        <Slider ref={sliderRef} {...settings}>
                            {
                                images && images.map((item, index) => (
                                    <div key={`Ai Image View ${index}`} className="ai-image-view">
                                        <img src={item} />
                                    </div>
                                ))
                            }

                        </Slider>
                        <div className="d-flex justify-content-center align-center gap-1">
                            <div onClick={() => sliderRef.current.slickPrev()} class="library-button">
                                <AppIcon iconName="icon-arrow-left" classes="w-2 h-2" />
                            </div>
                            <div onClick={() => sliderRef.current.slickNext()} class="library-button">
                                <AppIcon iconName="icon-arrow-right" classes="w-2 h-2" />
                            </div>
                        </div>
                    </div>
            }

        </Modal>
    )
}
AiImageViewModal.defaultProps = {
    open: false,
    onClose: () => { },
    loading: false,
    images: []
};
export default AiImageViewModal;