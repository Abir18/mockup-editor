export const Loader = ({ size = 24 }) => {
    return (
        <svg
            width={`${size}px`}
            height={`${size}px`}
            viewBox="0 0 24 24"
            shapeRendering="geometricPrecision"
            textRendering="geometricPrecision"
        >
            <circle
                r="9"
                transform="matrix(1 0 0 1 12 12)"
                fill="none"
                stroke="rgb(246,246,246)"
                strokeWidth="2"
            ></circle>
            <g transform="rotate(111 12 12)">
                <path
                    d="M3,12C3,10.8181,3.23279,9.64778,3.68508,8.55585C4.13738,7.46392,4.80031,6.47177,5.63604,5.63604C6.47177,4.80031,7.46392,4.13738,8.55585,3.68508C9.64778,3.23279,10.8181,3,12,3"
                    fill="none"
                    stroke="rgb(221,221,221)"
                    strokeWidth="2"
                >
                    <animateTransform
                        attributeName="transform"
                        type="rotate"
                        repeatCount="indefinite"
                        dur="1s"
                        values="0 12 12;360 12 12"
                        keyTimes="0;1"
                    ></animateTransform>
                </path>
            </g>
        </svg>
    )
}
export default Loader;