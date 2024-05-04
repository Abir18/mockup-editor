import {addImageOnCanvas} from "canvas-actions";
import Button from "components/button";
import {useState} from "react";

const UploadLogo = ({onClick = () => {}}) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const {canvas} = window;

  const handleFileChange = (event) => {
    const files = event.target.files;
    const urls = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file) {
        const fileType = file.type;
        if (
          fileType === "image/svg+xml" ||
          fileType === "image/png" ||
          fileType === "image/jpeg"
        ) {
          console.log(file, "file");
          console.log(urls, "urls");

          setSelectedFiles((prevFiles) => [...prevFiles, file]);
          const url = URL.createObjectURL(file);
          urls.push(url);
        } else {
          alert(`File ${file.name} is not a valid SVG, PNG, or JPG file.`);
        }
      }
    }
    // console.log(imageUrls, "imageUrls");
    setImageUrls((prevUrls) => [...prevUrls, ...urls]);
    // const {canvas} = window;
    // canvas.add(imageUrls[imageUrls.length - 1]);
  };

  return (
    <div>
      <div>
        <label
          htmlFor="logo"
          className="btn"
          style={{
            border: "1px solid black",
            margin: "10px 20px",
            fontSize: "15px",
            fontWeight: 700,
            color: "#ee206f"
          }}
        >
          Upload Logo
        </label>

        <label
          htmlFor="logo"
          className="btn"
          style={{
            border: "1px solid black",
            margin: "10px 20px",
            fontSize: "13px"
          }}
        >
          <Button type="outline" title="Upload Logo" />
        </label>

        <input
          id="logo"
          style={{visibility: "hidden"}}
          type="file"
          accept=".svg, .png, .jpg"
          onChange={handleFileChange}
        />
      </div>
      <div className="category-container">
        {selectedFiles.length > 0 && (
          <div style={{marginLeft: "20px", cursor: "pointer"}}>
            <div style={{display: "flex", flexWrap: "wrap"}}>
              {selectedFiles.map((file, index) => (
                <div
                  className=" container"
                  key={index}
                  style={{marginRight: "10px", marginBottom: "10px"}}
                  onClick={() => addImageOnCanvas(imageUrls[index])}
                >
                  <img
                    src={imageUrls[index]}
                    alt={`Selected  ${index + 1}`}
                    height={60}
                    width={60}
                    //   style={{maxWidth: "100px", maxHeight: "100px"}}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="divider" />
    </div>
  );
};

export default UploadLogo;
