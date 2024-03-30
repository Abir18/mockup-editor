import {addImageOnCanvas} from "canvas-actions";
import InputField from "components/input-field";
import {useState} from "react";
import {debounce} from "utils";
import AppIcon from "utils/app-icon";
const ImageLibraryView = ({
  imagesList = [],
  fetchMore = () => {},
  searchImages = () => {},
  libraries = [],
  getLibraryImages = () => {},
  resetParams = () => {}
}) => {
  const [search, setSearch] = useState("");
  const [activeLibrary, setActiveLibrary] = useState(null);
  const handleSearch = (value, title) => {
    setSearch(value);
    debounce(searchImages(title, value), 500);
  };
  const fetchImages = (title, value) => {
    setActiveLibrary(value);
    getLibraryImages(title);
  };

  const resetView = () => {
    resetParams();
    setActiveLibrary(null);
  };
  const handleOnImageClick = (url) => {
    const {canvas} = window;
    const activeObject = canvas.getActiveObject();
    // if (activeObject) {
    //   createDynamicPattern(
    //     { src: url, repeat: "no-repeat", rotation: 0, scaling: 1 },
    //     activeObject,
    //     canvas
    //   );
    // } else {
    addImageOnCanvas(url);
    // }
  };
  const dropChecking = (ev, url) => {
    ev.dataTransfer.setData("text", url);
  };
  return (
    <>
      {activeLibrary !== null ? (
        <>
          <div className="library-inner-container">
            <div className="category-header">
              <div className="category-image-container">
                {libraries[activeLibrary].logo ? (
                  <img
                    alt=""
                    width={20}
                    height={20}
                    src={libraries[activeLibrary].logo}
                  />
                ) : null}
                <p className="controls-heading">
                  {libraries[activeLibrary].title}
                </p>
              </div>
              <div onClick={resetView} className="d-flex align-center gap-1">
                <p className="controls-heading">See All</p>
                <AppIcon iconName="icon-angle-right" classes="w-2 h-2" />
              </div>
            </div>
            <InputField
              onChange={(value) =>
                handleSearch(value, libraries[activeLibrary].title)
              }
              value={search}
              placeholder="Search Image"
            />
            <div id="scrollableDiv" className="overfloy-y-container">
              <div className="category-container-2f">
                {imagesList &&
                  imagesList.map((item, index) => (
                    <div
                      key={`Image Library List - ${item.id} - ${index}`}
                      className="image-container"
                    >
                      <img
                        dataSrc={item.src.original}
                        src={`${item.src.original}?auto=compress&cs=tinysrgb&w=129`}
                        alt={item.alt}
                        onClick={() => handleOnImageClick(item.src.original)}
                        draggable={true}
                        onDragEnd={(e) => dropChecking(e, item.src.original)}
                      />
                    </div>
                  ))}
              </div>
              <div className="load-more">
                <div
                  onClick={() => fetchMore(libraries[activeLibrary].title)}
                  className="library-button mt-2"
                >
                  {/* <AppIcon iconName="icon-text" classes="w-2 h-2" /> */}
                  <p>Load More</p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        libraries &&
        libraries.map((library, index) => {
          const {title, logo, defaultImages} = library;
          return (
            <>
              <div
                key={`Mapping Image Library Non Active - ${title}`}
                className="library-inner-container"
              >
                <div className="category-header">
                  <div className="category-image-container">
                    {logo ? (
                      <img alt="" width={20} height={20} src={logo} />
                    ) : null}
                    <p className="controls-heading">{title}</p>
                  </div>
                  <div
                    onClick={() =>
                      fetchImages(title, activeLibrary === index ? null : index)
                    }
                    className="d-flex align-center gap-1"
                  >
                    <p className="controls-heading">See All</p>
                    <AppIcon iconName="icon-angle-right" classes="w-2 h-2" />
                  </div>
                </div>
                <div className="category-container-2f">
                  {defaultImages.map((item, index) => (
                    <div
                      onClick={() => handleOnImageClick(item)}
                      key={`Image Library - Default Images- ${title} - ${index}`}
                      className="image-container"
                    >
                      <img
                        alt=""
                        draggable={true}
                        onDragEnd={(e) => dropChecking(e, item)}
                        src={`${item}?auto=compress&cs=tinysrgb&w=129`}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="divider" />
            </>
          );
        })
      )}
    </>
  );
};
export default ImageLibraryView;
