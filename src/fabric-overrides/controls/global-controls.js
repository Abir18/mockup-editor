import { fabric } from "fabric";
import { isObjectLocked } from "canvas-actions";
//  Change Controls View
const BORDER_COLOR = "#1B44C8";
const HOVER_STROKE_COLOR = "#6775F8";
const BOTTOM_CONTROLS_COLOR = "#6775F8";
const globalControls = () => {
    const controlsUtils = fabric.controlsUtils;
    fabric.Object.prototype.transparentCorners = false;
    fabric.Object.prototype.cornerColor = "#FFFFFF";
    fabric.Object.prototype.cornerStrokeColor = BORDER_COLOR;
    fabric.Object.prototype.cornerSize = 7;
    fabric.Object.prototype.borderColor = BORDER_COLOR;
    fabric.Canvas.prototype.hoverStrokeColor = HOVER_STROKE_COLOR;
    fabric.Textbox.prototype.editingBorderColor = HOVER_STROKE_COLOR;
    fabric.Textbox.prototype.bottomControlsColor = BOTTOM_CONTROLS_COLOR;
    fabric.Object.prototype.borderOpacityWhenMoving = 1;
    fabric.Object.prototype.snapAngle = 1;
    const objectControls = fabric.Object.prototype.controls;
    const textBoxControls = fabric.Textbox.prototype.controls;
    objectControls.tl.render = renderCircle;
    objectControls.br.render = renderCircle;
    objectControls.tr.render = renderCircle;
    objectControls.bl.render = renderCircle;
    objectControls.mr.render = renderXControl;
    objectControls.ml.render = renderXControl;
    objectControls.mt.render = renderYControl;
    objectControls.mb.render = renderYControl;
    objectControls.mtr.render = renderMtr;
    textBoxControls.ml.render = renderXControl;
    textBoxControls.mr.render = renderXControl;
    // Action Handler
    objectControls.mtr.actionHandler = controlsUtils.wrapWithFireEvent('rotating', rotationWithSnapping);
}
export default globalControls;

const renderCircle = function (ctx, left, top, styleOverride, fabricObject) {
    styleOverride = styleOverride || {};
    var cornerSize =
        this.sizeX || styleOverride.cornerSize || fabricObject.cornerSize + 3,
        transparentCorners =
            typeof styleOverride.transparentCorners !== "undefined"
                ? styleOverride.transparentCorners
                : fabricObject.transparentCorners,
        methodName = transparentCorners ? "stroke" : "fill",
        stroke =
            !transparentCorners &&
            (styleOverride.cornerStrokeColor || fabricObject.cornerStrokeColor);

    ctx.save();
    ctx.fillStyle = styleOverride.cornerColor || fabricObject.cornerColor;
    ctx.strokeStyle = "#ffffff"; // You can change the stroke color here
    ctx.shadowColor = "rgba(0,0,0,0.66)";
    ctx.shadowBlur = 5;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.lineWidth = 1;
    ctx.translate(left, top);
    ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));

    // Draw a circle instead of a rectangle
    ctx.beginPath();
    ctx.arc(0, 0, cornerSize / 2, 0, 2 * Math.PI);
    ctx.closePath();

    // Fill and/or stroke the circle
    if (methodName === "fill") {
        ctx.fill();
    } else {
        ctx.stroke();
    }

    ctx.restore();
};

const renderXControl = function (ctx, left, top, styleOverride, fabricObject) {
    styleOverride = styleOverride || {};
    var xSize =
        this.sizeX || styleOverride.cornerSize || fabricObject.cornerSize + 5,
        ySize =
            this.sizeY || styleOverride.cornerSize || fabricObject.cornerSize + 2,
        transparentCorners =
            typeof styleOverride.transparentCorners !== "undefined"
                ? styleOverride.transparentCorners
                : fabricObject.transparentCorners,
        methodName = transparentCorners ? "stroke" : "fill",
        stroke =
            !transparentCorners &&
            (styleOverride.cornerStrokeColor || fabricObject.cornerStrokeColor);
    ctx.save();
    ctx.fillStyle = styleOverride.cornerColor || fabricObject.cornerColor;
    // ctx.strokeStyle =
    //   styleOverride.cornerStrokeColor || fabricObject.cornerStrokeColor;
    ctx.strokeStyle = "#ffffff";
    ctx.shadowColor = "rgba(0,0,0,0.66)";
    ctx.shadowBlur = 1;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.lineWidth = 1;
    ctx.translate(left, top);
    ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
    // ctx.translate(xSize, -ySize/2);
    // this does not work, and fixed with ( && ) does not make sense.
    // to have real transparent corners we need the controls on upperCanvas
    // transparentCorners || ctx.clearRect(-xSizeBy2, -ySizeBy2, xSize, ySize);
    ctx[methodName + "Rect"](-xSize / 4, -ySize, xSize / 2, ySize * 2);
    if (stroke) {
        ctx.strokeRect(-xSize / 4, -ySize, xSize / 2, ySize * 2);
    }
    ctx.restore();
};

const renderYControl = function (ctx, left, top, styleOverride, fabricObject) {
    styleOverride = styleOverride || {};
    var xSize =
        this.sizeX || styleOverride.cornerSize || fabricObject.cornerSize + 5,
        ySize =
            this.sizeY || styleOverride.cornerSize || fabricObject.cornerSize + 2,
        transparentCorners = (transparentCorners =
            typeof styleOverride.transparentCorners !== "undefined"
                ? styleOverride.transparentCorners
                : fabricObject.transparentCorners),
        methodName = transparentCorners ? "stroke" : "fill",
        stroke =
            !transparentCorners &&
            (styleOverride.cornerStrokeColor || fabricObject.cornerStrokeColor),
        xSizeBy2 = xSize / 2,
        ySizeBy2 = ySize / 2;
    ctx.save();
    ctx.fillStyle = styleOverride.cornerColor || fabricObject.cornerColor;
    // ctx.strokeStyle =
    // styleOverride.cornerStrokeColor || fabricObject.cornerStrokeColor;
    ctx.strokeStyle = "#ffffff";
    ctx.shadowColor = "rgba(0,0,0,0.66)";
    ctx.shadowBlur = 1;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    ctx.lineWidth = 1;
    ctx.translate(left, top);
    ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
    // this does not work, and fixed with ( && ) does not make sense.
    // to have real transparent corners we need the controls on upperCanvas
    // transparentCorners || ctx.clearRect(-xSizeBy2, -ySizeBy2, xSize, ySize);
    ctx[methodName + "Rect"](-xSize, -ySize / 4, xSize * 2, ySize / 2);
    if (stroke) {
        ctx.strokeRect(-xSize, -ySize / 4, xSize * 2, ySize / 2);
    }
    ctx.restore();
};

export const renderMtr = function (ctx, left, top, _, target) {
    const isLocked = isObjectLocked(target);
    ctx.save();
    ctx.translate(left, top);
    ctx.rotate(fabric.util.degreesToRadians(target.angle));
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = BORDER_COLOR;
    ctx.arc(0, 0, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    if (isLocked) {
        ctx.translate(-10, -11);
    } else {
        ctx.translate(-8, -8);
    }
    ctx.lineWidth = 0.2;
    ctx.fillStyle = BORDER_COLOR;
    let pathData = isLocked ? "M10.08,5.15A2.77,2.77,0,0,0,7.32,7.91V8.7H6.53a.79.79,0,0,0-.79.79v4.74a.79.79,0,0,0,.79.79h7.11a.79.79,0,0,0,.79-.79V9.49a.79.79,0,0,0-.79-.79h-.79V7.91a2.75,2.75,0,0,0-2.63-2.73A.32.32,0,0,0,10.08,5.15Zm0,.79a2,2,0,0,1,2,2V8.7h-4V7.91A2,2,0,0,1,10.08,5.94Z" : "M8 2.667c1.473 0 2.8.6 3.766 1.567l1.567-1.567v4.667H8.666l2.147-2.147A3.943 3.943 0 008 4C5.793 4 4 5.794 4 8c0 2.207 1.793 4 4 4 1.74 0 3.22-1.113 3.766-2.666h1.387c-.594 2.3-2.667 4-5.153 4A5.326 5.326 0 012.673 8 5.326 5.326 0 018 2.667z";
    let path = new Path2D(pathData);
    ctx.fill(path);
    ctx.stroke(path);
    ctx.closePath();
    ctx.restore();
};


export function rotationWithSnapping({ shiftKey }, transform, x, y) {
    const t = transform;
    const target = t.target;

    if (target.centeredRotation) target._setOriginToCenter();

    const pivotPoint = target.translateToOriginPoint(target.getCenterPoint(), t.originX, t.originY);

    if (target.group) {
        setGroupedPivotRecursively(target.group, pivotPoint, t.originX, t.originY);
    }

    if (target.lockRotation) return false;

    const lastAngle = Math.atan2(t.ey - pivotPoint.y, t.ex - pivotPoint.x);
    const curAngle = Math.atan2(y - pivotPoint.y, x - pivotPoint.x);
    var angle = fabric.util.radiansToDegrees(curAngle - lastAngle + t.theta);
    var hasRotated = true;

    const snapAngle = shiftKey ? 15 : 1;

    const snapThreshold = target.snapThreshold || snapAngle;
    const rightAngleLocked = Math.ceil(angle / snapAngle) * snapAngle;
    const leftAngleLocked = Math.floor(angle / snapAngle) * snapAngle;

    if (Math.abs(angle - leftAngleLocked) < snapThreshold) {
        angle = leftAngleLocked;
    } else if (Math.abs(angle - rightAngleLocked) < snapThreshold) {
        angle = rightAngleLocked;
    }

    // normalize angle to positive value
    if (angle < 0) {
        angle = 360 + angle;
    }
    angle %= 360;

    hasRotated = target.angle !== angle;
    target.angle = angle;

    if (target.centeredRotation) target._resetOrigin();

    return hasRotated;
}

export function setGroupedPivotRecursively(group, pivotPoint, originX, originY) {
    pivotPoint.x += group.translateToOriginPoint(group.getCenterPoint(), originX, originY).x;
    pivotPoint.y += group.translateToOriginPoint(group.getCenterPoint(), originX, originY).y;

    if (group.group) {
        setGroupedPivotRecursively(group.group, pivotPoint, originX, originY);
    }
}