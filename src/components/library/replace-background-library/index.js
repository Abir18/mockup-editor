import Button from "components/button";
import TextArea from "components/text-area";
import useReplaceBackground from "./useReplaceBackground";
import { InfoMessage } from "components/helpers";

const ReplaceBackgroundLibrary = () => {
    const { showComponent, selectedStyle, changeSelectedStyle } = useReplaceBackground();
    return (
        <>
            <div className="library-inner-container library-height overfloy-y-container">
                {
                    showComponent
                        ?
                        <>
                            <InfoMessage message="Make sure you remove the background of your image first." />
                            <TextArea className="h-20" placeholder="Enter prompt here" rows={5} />
                            <p class="controls-heading">Select an image style</p>
                            <div className="image-style-grid">
                                {
                                    imageAiStyles.map((style) => (
                                        <div onClick={() => changeSelectedStyle(style.title)} className={`ai-grid-box ${selectedStyle === style.title ? "ai-grid-box-active" : ""} `} key={`Replace Background Image ${style.title}`}>
                                            <img src={style.img} />
                                            <div className="style-text">
                                                <p>{style.title}</p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </>
                        :
                        <InfoMessage message="Select an image from uploads or your canvas to generate background variations with AI. Make sure you remove the background of your image first." />
                }
            </div>
            <div className="library-footer-container">
                <Button disabled={!showComponent} classes="w-100" title="Replace Background" />
            </div>
        </>
    )
}
export default ReplaceBackgroundLibrary;
const imageAiStyles = [
    {
        title: "Studio",
        img: "https://pebblely.b-cdn.net/samples/pebblely%20-%202023-03-17T164517.910.jpg"
    },
    {
        title: "Outdoor",
        img: "https://pebblely.b-cdn.net/samples/pebblely%20-%202023-03-18T133020.027.jpg"
    },
    {
        title: "Silk",
        img: "https://pebblely.b-cdn.net/samples/pebblely%20-%202023-03-18T161959.621.jpg"
    },
    {
        title: "Cafe",
        img: "https://pebblely.b-cdn.net/samples/sample_20221226_015008_22.jpg"
    },
    {
        title: "Tabletop",
        img: "https://pebblely.b-cdn.net/samples/pebblely%20-%202023-03-17T160622.039.jpg"
    },
    {
        title: "Kitchen",
        img: "https://pebblely.b-cdn.net/samples/sample_20230130_111500_1.jpg"
    },
    {
        title: "Flowers",
        img: "https://pebblely.b-cdn.net/samples/sample_20221226_013124_10.jpg"
    },
    {
        title: "Nature",
        img: "https://pebblely.b-cdn.net/samples/sample_20221226_013645_20.jpg"
    },
    {
        title: "Beach",
        img: "https://pebblely.b-cdn.net/samples/sample_20221226_015530_43.jpg"
    },
    {
        title: "Bathroom",
        img: "https://pebblely.b-cdn.net/samples/sample_20230204_1600_1.jpg"
    },
    {
        title: "Furniture",
        img: "https://pebblely.b-cdn.net/samples/sample_20230130_111900_1.jpg"
    },
    {
        title: "Paint",
        img: "https://pebblely.b-cdn.net/samples/sample_20221226_013926_38.jpg"
    },
    {
        title: "Fruits",
        img: "https://pebblely.b-cdn.net/samples/sample_20221226_013404_15.jpg"
    },
    {
        title: "Water",
        img: "https://pebblely.b-cdn.net/samples/sample_20221226_014207_43.jpg"
    },
    {
        title: "Pebbles",
        img: "https://pebblely.b-cdn.net/samples/sample_20221226_015811_32.jpg"
    },
    {
        title: "Snow",
        img: "https://pebblely.b-cdn.net/samples/sample_20221226_014447_27.jpg"
    },
]