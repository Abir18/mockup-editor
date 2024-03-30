import { useRef } from "react";
import Button from "components/button";
import ImageLibraryView from "components/image-library-view";
import PexelLogo from "assets/img/pexel.png";
import PixabayLogo from "assets/img/pixabay.svg";
import UnsplashLogo from "assets/img/unsplash.png";
import useImageLibray from "./useImageLibrary";

const ImageLibrary = () => {
  const {
    activeTab,
    handleExpandLibrary,
    imagesList,
    fetchMore,
    handleSearch,
    resetParams,
    handleUploadImage,
  } = useImageLibray();
  const inputRef = useRef(null);
  return (
    <>
      <div className="library-inner-container">
        <input ref={inputRef} onChange={handleUploadImage} type="file" className="d-none" />
        <Button onClick={() => inputRef.current.click()} title="Upload" />
      </div>
      <div className="divider" />
      <div
        className={`${activeTab ? "" : "overfloy-y-container"}`}
      >
        <ImageLibraryView
          libraries={imageLibraries}
          resetParams={resetParams}
          getLibraryImages={handleExpandLibrary}
          imagesList={imagesList?.photos || []}
          fetchMore={fetchMore}
          searchImages={handleSearch}
        />
      </div>
    </>
  );
};
export default ImageLibrary;

const imageLibraries = [
  {
    title: "Pexels",
    logo: PexelLogo,
    defaultImages: [
      "https://images.pexels.com/photos/6590699/pexels-photo-6590699.jpeg",
      "https://images.pexels.com/photos/9638689/pexels-photo-9638689.jpeg",
      "https://images.pexels.com/photos/16948299/pexels-photo-16948299.jpeg",
      "https://images.pexels.com/photos/16059681/pexels-photo-16059681.jpeg",
    ],
  },
  {
    title: "Pixabay",
    logo: PixabayLogo,
    defaultImages: [
      "https://images.pexels.com/photos/6590699/pexels-photo-6590699.jpeg",
      "https://images.pexels.com/photos/9638689/pexels-photo-9638689.jpeg",
      "https://images.pexels.com/photos/16948299/pexels-photo-16948299.jpeg",
      "https://images.pexels.com/photos/16059681/pexels-photo-16059681.jpeg",
    ],
  },
  {
    title: "Unsplash",
    logo: UnsplashLogo,
    defaultImages: [
      "https://images.unsplash.com/photo-1682686580433-2af05ee670ad?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHx8",
      "https://images.unsplash.com/photo-1700157646951-801cd3df4092?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHx8",
      "https://images.unsplash.com/photo-1682685797743-3a7b6b8d8149?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxMXx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1699264971363-8e71bb67daad?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
];
