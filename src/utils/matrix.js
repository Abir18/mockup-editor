import {
    fabric
} from 'fabric';

/*!
 * Transformation Matrix JS v1.5 (c) Epistemex 2014
 * www.epistemex.com
 * License: MIT, this header required.
 */

/**
 * 2D transformation matrix object initialized with identity matrix.
 *
 * All values are handled as floating point values.
 *
 * @param {number[]} [matrix] - option matrix Array
 * @prop {number} a - scale x
 * @prop {number} b - skew y
 * @prop {number} c - skew x
 * @prop {number} d - scale y
 * @prop {number} e - translate x
 * @prop {number} f - translate y
 * @constructor
 */
/*!
 * Transformation Matrix JS v1.5 (c) Epistemex 2014
 * www.epistemex.com
 * License: MIT, this header required.
 */
/**
 * 2D transformation matrix object initialized with identity matrix.
 *
 * All values are handled as floating point values.
 *
 * @param {number[]} [matrix] - option matrix Array
 * @prop {number} a - scale x
 * @prop {number} b - skew y
 * @prop {number} c - skew x
 * @prop {number} d - scale y
 * @prop {number} e - translate x
 * @prop {number} f - translate y
 * @constructor
 */
export default class Matrix {
    constructor(matrix = [1, 0, 0, 1, 0, 0]) {
        this.a = matrix[0];
        this.b = matrix[1];
        this.c = matrix[2];
        this.d = matrix[3];
        this.e = matrix[4];
        this.f = matrix[5];
    }

    /**
     * @description returns the matrix as an array
     * @returns {number[]}
     */
    toArray() {
        return [this.a, this.b, this.c, this.d, this.e, this.f];
    }

    getScaleX() {
        return this.a;
    }

    getScaleY() {
        return this.d;
    }

    getScale() {
        return {
            scaleX: this.a,
            scaleY: this.d
        };
    }

    getAngleDeg() {
        return this.decompose().angle;
    }

    getAngle() {
        return fabric.util.degreesToRadians(this.decompose().angle);
    }

    decompose() {
        return fabric.util.qrDecompose(this.toArray());
    }

    /**
     * Flips the horizontal values.
     */
    flipX() {
        this.transform(-1, 0, 0, 1, 0, 0);
        return this;
    }

    /**
     * Flips the vertical values.
     */
    flipY() {
        this.transform(1, 0, 0, -1, 0, 0);
        return this;
    }

    /**
     * Short-hand to reset current matrix to an identity matrix.
     */
    reset() {
        this.a = this.d = 1;
        this.b = this.c = this.e = this.f = 0;
        return this;
    }

    /**
     * Rotates current matrix accumulative by angle.
     * @param {number} angle - angle in radians
     */
    rotate(angle, cx = 0, cy = 0) {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);

        this.translate(cx, cy);
        this.transform(cos, sin, -sin, cos, 0, 0);
        this.translate(-cx, -cy);

        return this;
    }

    /**
     * Helper method to make a rotation based on an angle in degrees.
     * @param {number} angle - angle in degrees
     */
    rotateDeg(angle, cx = 0, cy = 0) {
        this.rotate(fabric.util.degreesToRadians(angle), cx, cy);

        return this;
    }

    /**
     * Scales current matrix accumulative.
     * @param {number} sx - scale factor x (1 does nothing)
     * @param {number} sy - scale factor y (1 does nothing)
     */
    scale(sx, sy, cx = 0, cy = 0) {
        this.translate(cx, cy);
        this.transform(sx, 0, 0, sy, -cx / 2, -cy / 2);
        this.translate(-cx, -cy);

        return this;
    }

    /**
     * Scales current matrix on x axis accumulative.
     * @param {number} sx - scale factor x (1 does nothing)
     */
    scaleX(sx) {
        this.transform(sx, 0, 0, 1, 0, 0);

        return this;
    }

    /**
     * Scales current matrix on y axis accumulative.
     * @param {number} sy - scale factor y (1 does nothing)
     */
    scaleY(sy) {
        this.transform(1, 0, 0, sy, 0, 0);

        return this;
    }

    /**
     * Apply skew to the current matrix accumulative.
     * @param {number} sx - amount of skew for x
     * @param {number} sy - amount of skew for y
     */
    skew(sx, sy) {
        this.transform(1, sy, sx, 1, 0, 0);

        return this;
    }

    /**
     * Apply skew for x to the current matrix accumulative.
     * @param {number} sx - amount of skew for x
     */
    skewX(sx) {
        this.transform(1, 0, sx, 1, 0, 0);

        return this;
    }

    /**
     * Apply skew for y to the current matrix accumulative.
     * @param {number} sy - amount of skew for y
     */
    skewY(sy) {
        this.transform(1, sy, 0, 1, 0, 0);

        return this;
    }

    /**
     * Set current matrix to new absolute matrix.
     * @param {number} a - scale x
     * @param {number} b - skew y
     * @param {number} c - skew x
     * @param {number} d - scale y
     * @param {number} e - translate x
     * @param {number} f - translate y
     */
    setTransform(a, b, c, d, e, f) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.e = e;
        this.f = f;

        return this;
    }

    /**
     * Translate current matrix accumulative.
     * @param {number} tx - translation for x
     * @param {number} ty - translation for y
     */
    translate(tx, ty) {
        this.transform(1, 0, 0, 1, tx, ty);

        return this;
    }

    /**
     * Translate current matrix on x axis accumulative.
     * @param {number} tx - translation for x
     */
    translateX(tx) {
        this.transform(1, 0, 0, 1, tx, 0);

        return this;
    }

    /**
     * Translate current matrix on y axis accumulative.
     * @param {number} ty - translation for y
     */
    translateY(ty) {
        this.transform(1, 0, 0, 1, 0, ty);

        return this;
    }

    /**
     * Multiplies current matrix with new matrix values.
     * @param {number} a2 - scale x
     * @param {number} b2 - skew y
     * @param {number} c2 - skew x
     * @param {number} d2 - scale y
     * @param {number} e2 - translate x
     * @param {number} f2 - translate y
     */
    transform(a2, b2, c2, d2, e2, f2) {
        const a1 = this.a;
        const b1 = this.b;
        const c1 = this.c;
        const d1 = this.d;
        const e1 = this.e;
        const f1 = this.f;

        /* matrix order (canvas compatible):
         * ace
         * bdf
         * 001
         */
        this.a = a1 * a2 + c1 * b2;
        this.b = b1 * a2 + d1 * b2;
        this.c = a1 * c2 + c1 * d2;
        this.d = b1 * c2 + d1 * d2;
        this.e = a1 * e2 + c1 * f2 + e1;
        this.f = b1 * e2 + d1 * f2 + f1;

        return this;
    }

    /**
     * Get an inverse matrix of current matrix. The method returns a new
     * matrix with values you need to use to get to an identity matrix.
     * @returns {Matrix}
     */
    getInverse() {
        const a = this.a;
        const b = this.b;
        const c = this.c;
        const d = this.d;
        const e = this.e;
        const f = this.f;
        const m = new Matrix();
        const dt = (a * d - b * c);

        m.a = d / dt;
        m.b = -b / dt;
        m.c = -c / dt;
        m.d = a / dt;
        m.e = (c * f - d * e) / dt;
        m.f = -(a * f - b * e) / dt;

        return m;
    }

    /**
     * Interpolate this matrix with another and produce a new matrix.
     * t is a value in the range [0.0, 1.0] where 0 is this instance and
     * 1 is equal to the second matrix. The t value is not constrained.
     *
     *
     * @param {Matrix} m2 - the matrix to interpolate with.
     * @param {number} t - interpolation [0.0, 1.0]
     * @returns {Matrix} - new instance with the interpolated result
     */
    interpolate(m2, t) {
        var m = new Matrix();

        m.a = this.a + (m2.a - this.a) * t;
        m.b = this.b + (m2.b - this.b) * t;
        m.c = this.c + (m2.c - this.c) * t;
        m.d = this.d + (m2.d - this.d) * t;
        m.e = this.e + (m2.e - this.e) * t;
        m.f = this.f + (m2.f - this.f) * t;

        return m;
    }

    /**
     * Apply current matrix to x and y point.
     * Returns a point object.
     *
     * @param {number} x - value for x
     * @param {number} y - value for y
     * @returns {{x: number, y: number}} A new transformed point object
     */
    applyToPoint(x, y) {
        return {
            x: x * this.a + y * this.c + this.e,
            y: x * this.b + y * this.d + this.f
        };
    }

    /**
     * Apply current matrix to array with point objects or point pairs.
     * Returns a new array with points in the same format as the input array.
     *
     * A point object is an object literal:
     *
     * {x: x, y: y}
     *
     * so an array would contain either:
     *
     * [{x: x1, y: y1}, {x: x2, y: y2}, ... {x: xn, y: yn}]
     *
     * or
     * [x1, y1, x2, y2, ... xn, yn]
     *
     * @param {Array} points - array with point objects or pairs
     * @returns {Array} A new array with transformed points
     */
    applyToArray(points) {
        var i = 0,
            p, l, mxPoints = [];

        if (typeof points[0] === 'number') {
            l = points.length;
            while (i < l) {
                p = this.applyToPoint(points[i++], points[i++]);
                mxPoints.push(p.x, p.y);
            }
        } else {
            for (let i = 0, p = points[i]; i < points.length; i++) {
                mxPoints.push(this.applyToPoint(p.x, p.y));
            }
        }

        return mxPoints;
    }

    /**
     * Apply current matrix to a typed array with point pairs. Although
     * the input array may be an ordinary array, this method is intended
     * for more performant use where typed arrays are used. The returned
     * array is regardless always returned as a Float32Array.
     *
     * @param {*} points - (typed) array with point pairs
     * @returns {Float32Array} A new array with transformed points
     */
    applyToTypedArray(points) {
        var i = 0,
            p,
            l = points.length,
            mxPoints = new Float32Array(l);

        while (i < l) {
            p = this.applyToPoint(points[i], points[i + 1]);
            mxPoints[i++] = p.x;
            mxPoints[i++] = p.y;
        }

        return mxPoints;
    }

    /**
     * Returns true if matrix is an identity matrix (no transforms applied).
     * @returns {boolean} True if identity (not transformed)
     */
    isIdentity() {
        return (
            this._isEqual(this.a, 1) &&
            this._isEqual(this.b, 0) &&
            this._isEqual(this.c, 0) &&
            this._isEqual(this.d, 1) &&
            this._isEqual(this.e, 0) &&
            this._isEqual(this.f, 0)
        );
    }
    /**
     * Compares current matrix with another matrix. Returns true if equal
     * (within epsilon tolerance).
     * @param {number[]} m - matrix to compare this matrix with
     * @returns {boolean}
     */
    isEqual(m) {
        return (
            this._isEqual(this.a, m[0]) &&
            this._isEqual(this.b, m[1]) &&
            this._isEqual(this.c, m[2]) &&
            this._isEqual(this.d, m[3]) &&
            this._isEqual(this.e, m[4]) &&
            this._isEqual(this.f, m[5])
        );
    }
    /**
     * Compares floating point values with some tolerance (epsilon)
     * @param {number} f1 - float 1
     * @param {number} f2 - float 2
     * @returns {boolean}
     * @private
     */
    _isEqual(f1, f2) {
        return Math.abs(f1 - f2) < 1e-14;
    }
}