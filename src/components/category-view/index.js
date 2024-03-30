import { useState } from "react";
import AppIcon from "utils/app-icon";
const CategoryView = ({ data = [], onClick = () => { }, type = "shape" }) => {
  const [detailedView, setDetailedView] = useState(null);
  return (
    <>
      {detailedView !== null ? (
        <>
          <div className="library-inner-container  overfloy-y-container">
            <div
              onClick={() => setDetailedView(null)}
              className="category-header"
            >
              <p className="controls-heading"><AppIcon iconName="icon-angle-left" classes="w-2 h-2" /> {data[detailedView].type}</p>

            </div>
            <div className={`category-container category-${type}`}>
              {data[detailedView].items &&
                data[detailedView].items.map((item, index) => (
                  <div
                    onClick={() => onClick(item)}
                    className={`${type}-container`}
                    key={`Detailed View Shapes ${item} - ${index}`}
                  >
                    <img src={item} />
                  </div>
                ))}
            </div>
          </div>
        </>
      ) : (
        <div className="overfloy-y-container">
          {data &&
            data.map((shape, index) => (
              <>
                <div
                  key={`Compact View Shape Library ${shape.type} - ${index}`}
                  className="library-inner-container"
                >
                  <div
                    onClick={() => setDetailedView(index)}
                    className="category-header"
                  >
                    <p className="controls-heading">{shape.type}</p>
                    <AppIcon iconName="icon-angle-right" classes="w-2 h-2" />
                  </div>
                  <div className={`category-container category-${type}`}>
                    {shape.items &&
                      shape.items.map((item, index) =>
                        index < (type === "image" ? 6 : 4) ? (
                          <div
                            key={`Compact View Shape Childrens Library ${item} - ${index}`}
                            onClick={() => onClick(item)}
                            className={`${type}-container`}
                          >
                            <img src={item} />
                          </div>
                        ) : null
                      )}
                  </div>
                </div>
                <div className="divider" />
              </>
            ))}
        </div>
      )}
    </>
  );
};
export default CategoryView;
