import { useEffect, useState } from "react";
const useReplaceBackground = () => {
    const { canvas } = window;
    const [show, setShow] = useState(canvas?.getActiveObject()?.type === "image" || false);
    const [selectedStyle, setSelectedStyle] = useState("");
    useEffect(() => {
        handleEvents();
    }, [])
    const handleEvents = () => {
        if (!canvas) return;
        canvas.on("selection:created", () => {
            checkCondition();
        })
        canvas.on("selection:updated", () => {
            checkCondition();
        })
        canvas.on("selection:cleared", () => {
            setShow(false);
        })
    }
    const checkCondition = () => {
        const activeObject = canvas?.getActiveObject();
        setShow(activeObject?.type === "image");
    }


    return {
        showComponent: show,
        selectedStyle,
        changeSelectedStyle: (value) => setSelectedStyle(value)
    }
}
export default useReplaceBackground;