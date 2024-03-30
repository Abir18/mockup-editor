import TextArea from "components/text-area";
import Button from "components/button";
import SelectBox from "components/select-box";
import useTextToImage from "./useTextToImage";
import AiImageViewModal from "components/modal/ai-image-view-modal";
const TextToImageLibrary = () => {
    const { promptModel, changeProperties, modal, loading, handleGenerateImages, artifacts } = useTextToImage();
    return (
        <>
            <div className="library-inner-container library-height overfloy-y-container">
                <TextArea value={promptModel.prompt} onChange={(value) => changeProperties("prompt", value)} className="h-20" placeholder="Ask our AI to generate any image you like (250 words max)" rows={3} />
                <div className="d-flex justify-content-between align-center">
                    <p class="controls-heading">Select variations</p>
                    <SelectBox containerClass="w-12" value={promptModel.variations} onChange={(value) => changeProperties("variations", parseInt(value))} options={variations} />
                </div>
                <p class="controls-heading">Select an image style</p>
                <div className="image-style-grid">
                    {
                        stabilityAIStyles.map((style) => (
                            <div onClick={() => changeProperties("style", style.value)} className={`ai-grid-box ${promptModel.style === style.value ? "ai-grid-box-active" : ""} `} key={`Text to Image ${style.title}`}>
                                <img src={style.img} />
                                <div className="style-text">
                                    <p>{style.title}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="library-footer-container">
                <Button onClick={handleGenerateImages} disabled={promptModel.prompt === ""} classes="w-100" title="Generate Image" />
            </div>
            {
                modal.value
                    ?
                    <AiImageViewModal images={artifacts} loading={loading} open={modal.value} onClose={modal.set} />
                    :
                    null
            }
        </>
    )
}
export default TextToImageLibrary;

const variations = [
    {
        title: "1",
        value: "1"
    },
    {
        title: "2",
        value: "2"
    },
    {
        title: "3",
        value: "3"
    },
    {
        title: "4",
        value: "4"
    },
]


const stabilityAIStyles = [
    {
        title: "None",
        value: "none",
        img: "https://pebblely.b-cdn.net/samples/pebblely%20-%202023-03-17T164517.910.jpg"
    },
    {
        title: "Enhance",
        value: "enhance",
        img: "https://app-dev.glorify.com/assets/designer/static/media/images/ai-styles/fantasy-world-generator-thumb.jpg"
    },
    {
        title: "Anime",
        value: "anime",
        img: "https://app-dev.glorify.com/assets/designer/static/media/images/ai-styles/anime-portrait-generator-thumb.jpg"
    },
    {
        title: "Photographic",
        value: "photographic",
        img: "https://app-dev.glorify.com/assets/designer/static/media/images/ai-styles/cyberpunk-generator-thumb.jpg"
    },
    {
        title: "Digital Art",
        value: "digital-art",
        img: "https://app-dev.glorify.com/assets/designer/static/media/images/ai-styles/old-style-generator-thumb.jpg"
    },
    {
        title: "Comic Book",
        value: "comic-book",
        img: "https://app-dev.glorify.com/assets/designer/static/media/images/ai-styles/abstract-painting-generator-thumb.jpg"
    },
    {
        title: "Fantasy Art",
        value: "fantasy-art",
        img: "https://pebblely.b-cdn.net/samples/sample_20230130_111500_1.jpg"
    },
    {
        title: "Line Art",
        value: "line-art",
        img: "https://pebblely.b-cdn.net/samples/sample_20221226_013124_10.jpg"
    },
    {
        title: "Analog Film",
        value: "analog-film",
        img: "https://pebblely.b-cdn.net/samples/sample_20221226_013645_20.jpg"
    },
    {
        title: "Neon Punk",
        value: "neon-punk",
        img: "https://pebblely.b-cdn.net/samples/sample_20221226_015530_43.jpg"
    },
    {
        title: "Isometric",
        value: "isometric",
        img: "https://pebblely.b-cdn.net/samples/sample_20230204_1600_1.jpg"
    },
    {
        title: "Low poly",
        value: "low-poly",
        img: "https://pebblely.b-cdn.net/samples/sample_20230130_111900_1.jpg"
    },
    {
        title: "Origami",
        value: "origami",
        img: "https://pebblely.b-cdn.net/samples/sample_20221226_013926_38.jpg"
    },
    {
        title: "Modeling Compound",
        value: "modeling-compound",
        img: "https://pebblely.b-cdn.net/samples/sample_20221226_013404_15.jpg"
    },
    {
        title: "Cinematic",
        value: "cinematic",
        img: "https://pebblely.b-cdn.net/samples/sample_20221226_014207_43.jpg"
    },
    {
        title: "3D Model",
        value: "3d-model",
        img: "https://pebblely.b-cdn.net/samples/sample_20221226_015811_32.jpg"
    },
    {
        title: "Pixel Art",
        value: "pixel-art",
        img: "https://pebblely.b-cdn.net/samples/sample_20221226_014447_27.jpg"
    },
    {
        title: "Tile Texture",
        value: "tile-texture",
        img: "https://pebblely.b-cdn.net/samples/pebblely%20-%202023-03-17T164517.910.jpg"
    },
]