import FontFaceObserver from "fontfaceobserver";
/**
 * Main is the path to the font file
 * _id must be unique to each custom font
 * Name is the font family name that will be used later on
 * Format is the font file format (opentype|truetype|etc)
 * @param {{_id: ObjectID, Main: string, Name: string, Format: string}} customFont
 */

export const loadCustomFontsAsync = (customFont, immediateLoading = true) => {
  return new Promise((resolve) => {
    if (!customFont || !customFont.title) return resolve(null);

    const existingFont = document.getElementById("font-" + customFont.title);
    const fontToLoad = new FontFaceObserver(customFont.title);
    let fontValue = customFont.value;

    if (!existingFont) {
      var css = `
            @font-face {
              font-family: "${customFont.title}";
              src: url("${fontValue}") format("truetype");
            }`;

      const style = document.createElement("style");
      const head = document.head || document.getElementsByTagName("head")[0];
      style.id = "font-" + customFont.title;
      style.appendChild(document.createTextNode(css));

      head.appendChild(style);
      // console.log(css)
    }
    if (immediateLoading) {
      fontToLoad
        .load(null, 20000)
        .then(() => {
          resolve(css);
        })
        .catch((error) => {
          console.error(error);
          resolve(false);
        });
    }
  });
};

/**
 *  Get File Extension
 */
export const getFileExtension = (fileName) => {
  // Use the String.lastIndexOf() method to find the last dot in the file name
  const lastDotIndex = fileName.lastIndexOf(".");

  if (lastDotIndex === -1) {
    // If there's no dot in the file name, return an empty string or handle it as needed
    return "";
  }

  // Use the String.slice() method to extract the file extension
  const fileExtension = fileName.slice(lastDotIndex + 1);

  return fileExtension;
};

export const rgbToHex = (rgb) => {
  // Ensure the input is in the correct format (e.g., 'rgb(255, 0, 0)')
  const match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

  if (!match) {
    throw new Error("Invalid RGB color format");
  }

  // Extract the RGB components
  const [, red, green, blue] = match.map(Number);

  // Convert each component to hexadecimal and pad with zeros if necessary
  const hexRed = red.toString(16).padStart(2, "0");
  const hexGreen = green.toString(16).padStart(2, "0");
  const hexBlue = blue.toString(16).padStart(2, "0");

  // Concatenate the components to form the hexadecimal color
  const hexColor = `#${hexRed}${hexGreen}${hexBlue}`;

  return hexColor.toUpperCase(); // Optionally convert to uppercase
};

export const debounce = (fn, delay = 1000) => {
  let timerId = null;
  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn(...args), delay);
  };
};

export const generateGradientCss = (gradientObject) => {
  const { type, orientation, colors } = gradientObject;
  const gradientCSS = `${type}(${orientation}, ${colors.join(", ")})`;
  return gradientCSS;
};

/**
 *  Convert Image to Data Url
 *  @param {string} url Image Url
 *  @param {func} callback callback
 */
export const convertToDataURL = (url, callback) => {
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    var reader = new FileReader();
    reader.onloadend = function () {
      callback(reader.result);
    };
    reader.readAsDataURL(xhr.response);
  };
  xhr.open("GET", url);
  xhr.responseType = "blob";
  xhr.send();
};

export const imageUrlToFile = (imageUrl, fileName = "image.jpg") => {
  return fetch(imageUrl)
    .then((response) => response.blob())
    .then((blob) => new File([blob], fileName, { type: "image/jpeg" }))
    .catch((error) => {
      console.error("Error fetching image:", error);
      throw error; // Optionally handle the error or rethrow it
    });
};


export const convertToBlobUrl = (result) => {
  // Convert the base64 image to a Blob
  var byteCharacters = atob(result.split(",")[1]);
  var byteNumbers = new Array(byteCharacters.length);
  for (var i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  var byteArray = new Uint8Array(byteNumbers);
  var blob = new Blob([byteArray], { type: "image/png" });
  // Create a URL for the Blob
  var imageUrl = URL.createObjectURL(blob);
  return imageUrl;
}
