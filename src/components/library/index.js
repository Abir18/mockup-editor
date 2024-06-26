import React, {Suspense} from "react";
import {useSelector} from "react-redux";
import LibraryLoader from "./library-loader";
const LibraryContainer = () => {
  const libraryPanel = useSelector((state) => state.libraryPanel);
  const LazyTextLibrary = React.lazy(() => import("./text-library"));
  const LazyShapesLibrary = React.lazy(() => import("./shapes-library"));
  const LazyImagesLibrary = React.lazy(() => import("./image-library"));
  const LazyGeneralLibrary = React.lazy(() => import("./general-libraries"));
  const LazyMockupLibrary = React.lazy(() => import("./mockup-library"));
  const LazyLayerLibrary = React.lazy(() => import("./layer-library"));
  const LazyShowHideMockupLibrary = React.lazy(() =>
    import("./show-hide-mockup-library")
  );
  const LazyUploadLogoLibrary = React.lazy(() =>
    import("./upload-logo-library")
  );
  const LazyUploadMockupLibrary = React.lazy(() =>
    import("./upload-mockup-library")
  );
  const activeModule = {
    Mockup: (
      <Suspense fallback={<LibraryLoader />}>
        <LazyMockupLibrary />
      </Suspense>
    ),
    Text: (
      <Suspense fallback={<LibraryLoader />}>
        <LazyTextLibrary />
      </Suspense>
    ),
    Shapes: (
      <Suspense fallback={<LibraryLoader />}>
        <LazyShapesLibrary />
      </Suspense>
    ),
    // Images: (
    //   <Suspense fallback={<LibraryLoader />}>
    //     <LazyImagesLibrary />
    //   </Suspense>
    // ),
    Layer: (
      <Suspense fallback={<LibraryLoader />}>
        <LazyLayerLibrary />
      </Suspense>
    ),
    ShowHideMockup: (
      <Suspense fallback={<LibraryLoader />}>
        <LazyShowHideMockupLibrary />
      </Suspense>
    ),
    UploadLogo: (
      <Suspense fallback={<LibraryLoader />}>
        <LazyUploadLogoLibrary />
      </Suspense>
    ),
    UploadMockup: (
      <Suspense fallback={<LibraryLoader />}>
        <LazyUploadMockupLibrary />
      </Suspense>
    ),
    Library: (
      <Suspense fallback={<LibraryLoader />}>
        <LazyGeneralLibrary />
      </Suspense>
    )
  };
  return (
    <>
      <div className="library-container  overfloy-y-container">
        <div className="inspect-heading">
          <div className="d-flex align-center" style={{gap: 5}}>
            <p>{libraryPanel.panelTitle}</p>
          </div>
        </div>
        <div className="divider" />
        {React.cloneElement(activeModule[libraryPanel.panelTitle], {
          childProps: libraryPanel.subChild
        })}
      </div>
    </>
  );
};
export default LibraryContainer;

// defaultPosition={{ x: libraryPanel.position.x, y: libraryPanel.position.y }}
