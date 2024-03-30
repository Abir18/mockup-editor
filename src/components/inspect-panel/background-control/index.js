import GradientGrid from "components/gradient-grid";
import BackgroundLibraryPreview from "components/background-library-preview";
import useBackgroundControl from "./useBackgroundControl";
import {
  mesh_gradients,
  point_backgrounds,
  bluured_backgrounds,
  dark_backgrounds,
  comics_backgrounds,
  bubbles_backgrounds,
} from "enums";
const BackgroundControl = () => {
  const { backgroundOption, addGradientToBg, grid, watermark } =
    useBackgroundControl();
  return (
    <>
      {/* <div className="text-controls">
        <p className="controls-heading">Background Type</p>
        <SelectBox
          value={backgroundOption.get}
          onChange={(value) => backgroundOption.set(value)}
          options={[
            {
              title: "Colors",
              value: "Colors",
            },
            {
              title: "Mesh Gradient",
              value: "Mesh Gradient",
            },
            {
              title: "Paint",
              value: "Paint",
            },
            {
              title: "Blurred",
              value: "Bluured",
            },
            {
              title: "Dark",
              value: "Dark",
            },
            {
              title: "Comics",
              value: "Comics",
            },
            {
              title: "Bubbles",
              value: "Bubbles",
            },
          ]}
        />
      </div> */}
      {/* {backgroundOption.get === "Colors" ? (
        <>
          <div className="divider" />
          <div className="custom-padding">
            <ColorPicker
              hasGradient={true}
              objectKey="background"
              title="Background Color"
            />
          </div>
        </>
      ) : null} */}

      {backgroundOption.get === "Colors" ? (
        <>
          <GradientGrid onClick={(colors) => addGradientToBg(colors)} />
        </>
      ) : (
        <BackgroundLibraryPreview
          title={backgroundOption.get}
          records={getBackgroundLibraryData(backgroundOption.get)}
        />
      )}
      {/* <div className="text-controls">
        <p className="controls-heading">General Options</p>
        <div className="d-flex align-center justify-content-between">
          <ToggleSwitch
            value={grid.value}
            onChange={(value) => grid.set(value)}
            title="Grid"
            containerClass="w-per-50"
          />
          {grid.value ? (
            <InputField
              className="h-per-10"
              containerClass="w-per-30"
              type="number"
              onChange={(value) => grid.setGridColumn(value)}
              value={grid.gridColumns}
              min={2}
              step={2}
              max={40}
            />
          ) : null}
        </div>
        <div className="d-flex align-center justify-content-between">
          <ToggleSwitch
            value={watermark.value}
            onChange={(value) => watermark.set(value)}
            containerClass="w-per-50"
            title="Watermark"
          />
        </div>
        {watermark.value ? (
          <div className="gradient-selector">
            <div className="gradient-position">
              {gradientPositions.map((item) => (
                <div
                  onClick={()=>watermark.changePosition(item.title)}
                  key={`Watermark Position ${item.title}`}
                  className={`gradient-position-button ${item.title===watermark?.watermarkPosition ? "active":""}`}
                >
                  {item.icon}
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div> */}
      {/* <div className="divider"/> */}
    </>
  );
};
export default BackgroundControl;

const getBackgroundLibraryData = (value) => {
  switch (value) {
    case "Mesh Gradient": {
      return mesh_gradients;
    }
    case "Paint": {
      return point_backgrounds;
    }
    case "Bluured": {
      return bluured_backgrounds;
    }
    case "Dark": {
      return dark_backgrounds;
    }
    case "Comics": {
      return comics_backgrounds;
    }
    case "Bubbles": {
      return bubbles_backgrounds;
    }
    case "Colors": {
      return [];
    }
  }
};

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
