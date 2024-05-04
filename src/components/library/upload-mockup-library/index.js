import {changeCanvasBackground} from "canvas-actions";
import {useState} from "react";

const UploadMockup = ({onClick = () => {}}) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

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
          setSelectedFiles((prevFiles) => [...prevFiles, file]);
          const url = URL.createObjectURL(file);
          urls.push(url);
        } else {
          alert(`File ${file.name} is not a valid SVG, PNG, or JPG file.`);
        }
      }
    }
    setImageUrls((prevUrls) => [...prevUrls, ...urls]);
  };

  return (
    <div>
      <div>
        <div>
          <label
            htmlFor="mockup"
            className="btn"
            style={{
              border: "1px solid black",
              margin: "10px 20px",
              fontSize: "13px"
            }}
          >
            Upload Mockup
          </label>

          <input
            id="mockup"
            style={{visibility: "hidden"}}
            type="file"
            accept=".svg, .png, .jpg"
            multiple
            onChange={handleFileChange}
          />
        </div>
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
                  onClick={() => changeCanvasBackground(imageUrls[index])}
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

export default UploadMockup;
