const GradientSelector = () => {
  return (
    <>
      <div className="gradient-selector">
        <div className="gradient-position">
          {gradientPositions.map((item) => (
            <div
              key={`Gradient Position ${item.title}`}
              className="gradient-position-button"
            >
              {item.icon}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default GradientSelector;

const gradientPositions = [
  {
    title: "right",
    icon: (
      <svg
        stroke="currentColor"
        fill="none"
        strokeWidth={2}
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
        focusable="false"
        height="1em"
        width="1em"
      >
        <line x1={5} y1={12} x2={19} y2={12} />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    ),
  },
  {
    title: "right-bottom",
    icon: (
      <svg
        stroke="currentColor"
        fill="none"
        strokeWidth={2}
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
        focusable="false"
        aria-hidden="true"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1={7} y1={7} x2={17} y2={17} />
        <polyline points="17 7 17 17 7 17" />
      </svg>
    ),
  },
  {
    title: "bottom",
    icon: (
      <svg
        stroke="currentColor"
        fill="none"
        strokeWidth={2}
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
        focusable="false"
        aria-hidden="true"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1={12} y1={5} x2={12} y2={19} />
        <polyline points="19 12 12 19 5 12" />
      </svg>
    ),
  },
  {
    title: "bottom-left",
    icon: (
      <svg
        stroke="currentColor"
        fill="none"
        strokeWidth={2}
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
        focusable="false"
        aria-hidden="true"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1={17} y1={7} x2={7} y2={17} />
        <polyline points="17 17 7 17 7 7" />
      </svg>
    ),
  },
  {
    title: "left",
    icon: (
      <svg
        stroke="currentColor"
        fill="none"
        strokeWidth={2}
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
        focusable="false"
        aria-hidden="true"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1={19} y1={12} x2={5} y2={12} />
        <polyline points="12 19 5 12 12 5" />
      </svg>
    ),
  },
  {
    title: "left-top",
    icon: (
      <svg
        stroke="currentColor"
        fill="none"
        strokeWidth={2}
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
        focusable="false"
        aria-hidden="true"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1={17} y1={17} x2={7} y2={7} />
        <polyline points="7 17 7 7 17 7" />
      </svg>
    ),
  },
  {
    title: "top",
    icon: (
      <svg
        stroke="currentColor"
        fill="none"
        strokeWidth={2}
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
        focusable="false"
        aria-hidden="true"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1={12} y1={19} x2={12} y2={5} />
        <polyline points="5 12 12 5 19 12" />
      </svg>
    ),
  },
  {
    title: "left-right",
    icon: (
      <svg
        stroke="currentColor"
        fill="none"
        strokeWidth={2}
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
        focusable="false"
        aria-hidden="true"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1={7} y1={17} x2={17} y2={7} />
        <polyline points="7 7 17 7 17 17" />
      </svg>
    ),
  },
];
