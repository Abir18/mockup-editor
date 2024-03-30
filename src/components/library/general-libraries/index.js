import { useState, useEffect } from "react";
import GradientPicture from "assets/img/gradient-library.png";
import AppIcon from "utils/app-icon";
import GradientLibrary from "../gradient-library";
import TutorialsContent from "../tutorials-library"
import ReplaceBackgroundLibrary from "../replace-background-library";
import TextToImageLibrary from "../text-to-image-library";
import InputField from "components/input-field";
import { InifiniteEndMessage } from "components/helpers";
const GeneralLibraries = ({ childProps = "" }) => {
  const [extendedView, setExtendedView] = useState(childProps);
  useEffect(() => {
    setExtendedView(childProps);
  }, [childProps]);
  return (
    <>
      {extendedView ? (
        <>
          <div className="library-inner-container">
            <div className="d-flex align-center justify-content-between">
              <div
                onClick={() => setExtendedView(false)}
                className="d-flex align-center gap-1 cursor-pointer"
              >
                <AppIcon iconName="icon-arrow-left" classes="w-2 h-2" />
                <p className="controls-heading">{extended_view_components[extendedView] ? extended_view_components[extendedView].title : "Nothing Here"}</p>
              </div>
              {
                extended_view_components[extendedView]?.hasSearch ?
                  <InputField containerClass="w-per-50" placeholder="Search Here" /> : null
              }

            </div>
          </div>
          <div className="divider" />

          {
            extended_view_components[extendedView]
              ?
              extended_view_components[extendedView]?.component
              :
              <div className="library-inner-container library-height overfloy-y-container">
                <InifiniteEndMessage />
              </div>
          }
        </>
      ) : (
        <div className="library-inner-container library-height overfloy-y-container">
          {inner_libraries.map((item) => (
            <div
              key={`Library List Container ${item.title}`}
              className="library-list-container"
            >
              <div className="general-library-heading">
                <p className="controls-heading">{item.title}</p>
                {item.isBeta ? (
                  <span className="pill beta-pill">BETA</span>
                ) : null}
                {item.isHot ? (
                  <span className="pill beta-pill">HOT</span>
                ) : null}
                {item.isNew ? <span className="pill new-pill">NEW</span> : null}
                {item.isComingSoon ? (
                  <span className="pill coming-soon-pill">COMING SOON</span>
                ) : null}
              </div>
              {item.childrens.map((item, index) => (
                <div
                  onClick={() => setExtendedView(item.value)}
                  key={`Library List Inner Container ${item.title} - ${index}`}
                  className="list-inner-container"
                >
                  <div className="library-image-container">
                    <img src={item.img} />
                  </div>
                  <div className="description-container">
                    <p className="library-title">{item.title}</p>
                    <p className="library-desc">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </>
  );
};
export default GeneralLibraries;

const inner_libraries = [
  {
    title: "General",
    isComingSoon: false,
    isNew: false,
    isBeta: false,
    isHot: false,
    childrens: [
      {
        title: "Templates",
        value: "templates",
        description: "Search high-converting templates",
        img: "https://app-dev.glorify.com/assets/designer/static/media/images/libraries/list/libraries-main-templates.png?v=100",

      },
      {
        img: "https://app-dev.glorify.com/assets/designer/static/media/images/libraries/list/libraries-main-tutorials.png?v=100",
        description: "Search high-converting templates",
        value: "tutorials",
        title: "Tutorials",

      },

    ],
  },
  {
    title: "AI",
    isNew: false,
    isHot: true,
    isBeta: false,
    isComingSoon: false,
    childrens: [
      {
        title: "Replace Background",
        img: "https://static.clipdrop.co/web/apis/replace-background/output.png",
        value: "replaceBackground",
        description: "Replace the background",

      },
      {
        img: "https://static.clipdrop.co/web/apis/sketch-to-image/sketch-to-image-after-1280-720.webp",
        description: "Sketch to image converter",
        value: "sketchToImage",
        title: "Sketch To Image",

      },
      {
        img: "https://static.clipdrop.co/web/apis/text-to-image/text-to-image-after-1280-720.webp",
        description: "Generate a picture from text",
        value: "textToImage",
        title: "Text To Image",

      },
      {
        img: "https://static.clipdrop.co/web/apis/remove-text/photo.webp",
        description: "Remove the text that appears",
        value: "removeText",
        title: "Remove Text",

      },
      // {
      //   img: "https://static.clipdrop.co/web/apis/super-resolution/output.jpg",
      //   description: "Upscale the image",
      //   value: "imageUpscaling",
      //   title: "Image upscaling",
      //   
      // },
      {
        img: "https://static.clipdrop.co/web/apis/reimagine/reimagine-after-1280-720.webp",
        description: "Create variations of your images,",
        value: "reimagine",
        title: "Reimagine",

      },
    ],
  },
  {
    title: "Gradients",
    isComingSoon: false,
    isHot: false,
    isBeta: false,
    isNew: true,
    childrens: [
      {
        img: GradientPicture,
        description: "Search high-converting templates",
        value: "gradients",
        title: "Gradients",

      },
    ],
  },
  {
    title: "Files",
    isComingSoon: true,
    isNew: false,
    isHot: false,
    isBeta: false,
    childrens: [
      {
        img: "https://app-dev.glorify.com/assets/designer/static/media/images/libraries/list/libraries-ai-writers.png?v=100",
        description: "Search high-converting templates",
        value: "uploads",
        title: "Uploads",

      },
      {
        img: "https://app-dev.glorify.com/assets/designer/static/media/images/libraries/list/libraries-ai-writers.png?v=100",
        description: "Search high-converting templates",
        value: "favourites",
        title: "Favourites",

      },
    ],
  },
  {
    title: "Basic",
    isComingSoon: false,
    isNew: false,
    isHot: false,
    isBeta: false,
    childrens: [
      {
        img: "https://app-dev.glorify.com/assets/designer/static/media/images/libraries/list/libraries-ai-writers.png?v=100",
        value: "images",
        title: "Images",
        description: "Search high-converting templates",

      },
      {
        img: "https://app-dev.glorify.com/assets/designer/static/media/images/libraries/list/libraries-ai-writers.png?v=100",
        description: "Search high-converting templates",
        value: "backgrounds",
        title: "Backgrounds",

      },
      {
        img: "https://app-dev.glorify.com/assets/designer/static/media/images/libraries/list/libraries-ai-writers.png?v=100",
        description: "Search high-converting templates",
        value: "shapes",
        title: "Shapes",

      },
      {
        img: "https://app-dev.glorify.com/assets/designer/static/media/images/libraries/list/libraries-ai-writers.png?v=100",
        description: "Search high-converting templates",
        value: "icons",
        title: "Icons",

      },
      {
        img: "https://app-dev.glorify.com/assets/designer/static/media/images/libraries/list/libraries-ai-writers.png?v=100",
        value: "famousLogos",
        title: "Famous Logos",
        description: "Search high-converting templates",

      },
      {
        img: "https://app-dev.glorify.com/assets/designer/static/media/images/libraries/list/libraries-ai-writers.png?v=100",
        value: "blob",
        title: "Blob",
        description: "Search high-converting templates",

      },
      {
        img: "https://app-dev.glorify.com/assets/designer/static/media/images/libraries/list/libraries-ai-writers.png?v=100",
        description: "Search high-converting templates",
        value: "annotations",
        title: "Annotations",

      },
    ],
  },
];


const extended_view_components = {
  gradients: {
    hasSearch: true,
    title: "Gradients",
    component: <GradientLibrary />
  },
  tutorials: {
    hasSearch: true,
    title: "Tutorials",
    component: <TutorialsContent />
  },
  replaceBackground: {
    title: "Replace Background",
    hasSearch: false,
    component: <ReplaceBackgroundLibrary />
  },
  textToImage: {
    title: "Text to Image",
    hasSearch: false,
    component: <TextToImageLibrary />
  },
}