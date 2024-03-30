import { useState } from "react";
import { generateTextToImage } from "services";
import { convertToDataURL } from "utils";
const useTextToImage = () => {
    const [promptModel, setPromptModel] = useState({
        prompt: "",
        variations: 1,
        style: "none"
    })
    const [openNodal, setOpenNodal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [artifacts, setArtifacts] = useState([]);
    const handleModelChange = (title, value) => {
        setPromptModel({ ...promptModel, [title]: value })
    }

    const closeModal=()=>{
        setOpenNodal(false);
        setLoading(false);
        setArtifacts([]);
    }

    const handleGenerateImages = () => {
        const dataUrls = [];
        setLoading(true);
        setOpenNodal(true);
        generateTextToImage(promptModel).then((result) => {
            result.artifacts.forEach((item, index) => {
                // Convert base64 to Blob
                const byteCharacters = atob(item.base64);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                const blob = new Blob([byteArray], { type: 'image/png' }); // Adjust the type as per your image format

                // Create a File object
                const fileName = `image_${index + 1}.png`; // Change the file name as needed
                const file = new File([blob], fileName, { type: blob.type });

                var reader = new FileReader();
                reader.onload = function (event) {
                    var imgObj = new Image();
                    convertToDataURL(event.target.result, function (url) {
                        imgObj.src = url;
                        imgObj.onload = function () {
                            dataUrls.push(url);
                            // If this is the last image, you can use the dataUrls array as needed
                            if (index === result.artifacts.length - 1) {
                                setArtifacts(dataUrls);
                                setLoading(false);
                            }
                        };
                    });
                };
                reader.readAsDataURL(file);
            });


        })
    }

    return {
        promptModel,
        changeProperties: handleModelChange,
        modal: {
            value: openNodal,
            set: closeModal
        },
        loading,
        handleGenerateImages,
        artifacts
    }
}
export default useTextToImage;