import { object_types } from "canvas-actions";
import AlignControl from "./align-control";
import TextControls from "./text-control";
import BorderControl from "./border-control";
import TransperancyControl from "./transperancy-control";
import DropShadowControl from "./drop-shadow-control";
import BackgroundControl from "./background-control";
import GroupControl from "./group-control";
import ImageControls from "./image-control";
import PositionControl from "./position-control";
import ShapeControl from "./shape-control";
import { useSelector } from "react-redux";
const ControlsView = () => {
    const activeObjectType = useSelector((state) => state.activeObject);
    const { type, id: objectId } = activeObjectType;
    const fixedHeaderHeight = ["gridLine", null, undefined].includes(type)
        ? 47
        : 100;
    return (
        <>
            <div style={{ height: `${fixedHeaderHeight}px` }}>
                <div className="inspect-heading d-flex justify-conten-between align-center">
                    <p>{object_types[type]}</p>
                </div>
                <div className="divider" />
                {!["gridLine", null, undefined].includes(type) ? (
                    <>
                        <AlignControl /> <div className="divider" />
                    </>
                ) : null}
            </div>
            <div
                style={{ height: `calc(100% - ${fixedHeaderHeight}px - 40px)` }}
                className="inspect-panel-height overflow-y-auto overfloy-y-container"
            >
                {["polygon", "rect", "path", "ellipse"].includes(type) ? (
                    <>
                        <ShapeControl objectId={objectId} />
                        <BorderControl objectId={objectId} />
                        <TransperancyControl objectId={objectId} />
                        <DropShadowControl objectId={objectId} />
                        <PositionControl objectKey="shape" />
                    </>
                ) : null}
                {type === "image" ? (
                    <>
                        <ImageControls objectId={objectId} />
                        <BorderControl objectId={objectId} />
                        <TransperancyControl objectId={objectId} />
                        <DropShadowControl objectId={objectId} />
                        {/* <PositionControl objectKey="shape" /> */}
                    </>
                ) : null}
                {type === "textbox" ? (
                    <>
                        <TextControls objectId={objectId} />
                        <div className="divider" />
                        <BorderControl objectId={objectId} />
                        <TransperancyControl objectId={objectId} />
                        <DropShadowControl objectId={objectId} />
                    </>
                ) : null}
                {["gridLine", null, undefined].includes(type) ? (
                    <>
                        {/* <PositionControl objectKey="background" /> */}
                        <BackgroundControl />
                    </>
                ) : null}
                {["activeSelection", "group"].includes(type) ? (
                    <>
                        <GroupControl type={type} />
                        <TransperancyControl />
                    </>
                ) : null}
            </div>
        </>
    )
}
export default ControlsView;