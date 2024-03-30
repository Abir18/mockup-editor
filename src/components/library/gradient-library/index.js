import { useState } from "react";
import GradientJson from "enums/gradients.json";
import { generateGradientCss } from "utils";
import InfiniteScroll from "react-infinite-scroll-component";
import { InifiniteEndMessage } from "components/helpers";
import { handleBackgroundGradient,addGradientToFill } from "canvas-actions";
const GradientLibrary = () => {
  const [load, setLoad] = useState(32);
  const handleLoadMore = () => {
    setLoad(load + 12);
  };
  const handleAddGradient = (grad) => {
    const { canvas } = window;
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();
    const gradient = grad.colors.map((color, index) => ({
      value: color,
      left: index / grad.colors.length,
    }));
    if(activeObject)
    {
      addGradientToFill(gradient);
    }else{
      handleBackgroundGradient(gradient);
    }
  };
  return (
    <>
      <div
        id="scrollableDiv"
        className="library-inner-container library-height overfloy-y-container"
      >
        <InfiniteScroll
          dataLength={load}
          next={handleLoadMore}
          hasMore={load < GradientJson.length}
          loader={<h4>Loading...</h4>}
          scrollableTarget="scrollableDiv"
          endMessage={<InifiniteEndMessage />}
        >
          <div className="gradient-library-wrapper gradient-grid four-grid-col">
            {GradientJson.map((grad, index) =>
              index < load ? (
                <div
                  className="gradient gradient-div"
                  onClick={() => handleAddGradient(grad)}
                  key={`Gradient Expand Asset Panel ${index}`}
                  style={{
                    background: generateGradientCss({
                      type: "linear-gradient",
                      orientation: "to right",
                      colors: grad.colors,
                    }),
                  }}
                />
              ) : null
            )}
          </div>
        </InfiniteScroll>
      </div>
    </>
  );
};
export default GradientLibrary;
