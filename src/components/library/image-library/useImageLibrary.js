import { useState } from "react";
import { getPixelsImages, getPixabayImages, getUnsplashImages } from "services";
import { cloneDeep } from "lodash";
import { getFileExtension, convertToDataURL } from "utils";
import { addImageOnCanvas } from "canvas-actions";
const useImageLibray = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [params, setParams] = useState({
    page: 1,
    term: "nature",
  });
  const [imagesList, setImagesList] = useState({});
  const handleExpandLibrary = (title) => {
    if (title === "Pexels") {
      searchPixelImages(params, true);
    } else if (title === "Pixabay") {
      searchPixabayImages(params, true);
    } else if (title === "Unsplash") {
      searchUnsplashImages(params, true);
    }
  };

  const resetParams = () => {
    setParams({
      page: 1,
      term: "nature",
    });
  };

  const searchPixelImages = (params, replace = false) => {
    getPixelsImages(params).then((result) => {
      if (result.status === 200) {
        if (replace) {
          setImagesList(result.data);
        } else {
          const images = cloneDeep(imagesList.photos || []);
          result.data.photos.forEach((item) => {
            images.push(item);
          });
          setImagesList({ ...result.data, photos: cloneDeep(images) });
        }
      }
    });
  };

  const searchUnsplashImages = (params, replace = false) => {
    getUnsplashImages(params).then((result) => {
      if (result.status === 200) {
        if (replace) {
          setImagesList({
            photos: result.data.results.map((x) => ({
              id: x.id,
              alt: x.alt_description,
              src: { original: x.urls.raw },
            })),
          });
        } else {
          const images = cloneDeep(imagesList.photos || []);
          result.data.results.forEach((item) => {
            const modifiedObject = {
              id: item.id,
              alt: item.alt_description,
              src: { original: item.urls.raw },
            };
            images.push(modifiedObject);
          });
          setImagesList({ ...result.data, photos: cloneDeep(images) });
        }
      }
    });
  };

  const searchPixabayImages = (params, replace = false) => {
    getPixabayImages(params).then((result) => {
      debugger;
      if (result.status === 200) {
        if (replace) {
          setImagesList(result.data);
        } else {
          const images = cloneDeep(imagesList.photos || []);
          result.data.photos.map((item) => {
            images.push(item);
          });
          setImagesList({ ...result.data, photos: cloneDeep(images) });
        }
      }
    });
  };

  const fetchMore = (title) => {
    const newParams = { ...params };
    newParams.page++;
    if (title === "Pexels") {
      searchPixelImages(newParams);
    } else if (title === "Pixabay") {
      searchPixabayImages(params);
    } else if (title === "Unsplash") {
      searchUnsplashImages(params);
    }
    setParams(newParams);
  };

  const handleSearch = (title, value) => {
    const newParams = { ...params };
    newParams.term = value;
    if (title === "Pexels") {
      searchPixelImages(newParams, true);
    } else if (title === "Pixabay") {
      searchPixabayImages(params, true);
    } else if (title === "Unsplash") {
      searchUnsplashImages(params, true);
    }
  };

  const handleUploadImage = (e) => {
    const { files } = e.target;
    const file = files[0];
    var reader = new FileReader();
    reader.onload = function (event) {
      var imgObj = new Image();
      convertToDataURL(event.target.result, function (dataUrl) {
        imgObj.src = dataUrl;
        imgObj.onload = function () {
          addImageOnCanvas(dataUrl);
          // const extension = getFileExtension(lastUploadedFile.asset);
          // if (file.type === "image/svg+xml") {
          //   addShapeOnCanvas(dataUrl);
          // } else {
          //   setImageOnCanvas(dataUrl);
          // }
        };
      });
    };
    reader.readAsDataURL(file);
  };

  return {
    activeTab,
    handleExpandLibrary,
    imagesList,
    fetchMore,
    handleSearch,
    resetParams,
    handleUploadImage,
  };
};
export default useImageLibray;
