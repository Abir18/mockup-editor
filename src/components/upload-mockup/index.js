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
      <p className="controls-heading" style={{marginLeft: "5px"}}>
        Upload Mockup
      </p>
      <input
        type="file"
        accept=".svg, .png, .jpg"
        multiple
        onChange={handleFileChange}
      />
      <div className="category-container">
        {selectedFiles.length > 0 && (
          <div
            style={{marginTop: "10px", marginLeft: "20px", cursor: "pointer"}}
          >
            <div style={{display: "flex", flexWrap: "wrap"}}>
              {selectedFiles.map((file, index) => (
                <div
                  className=" container"
                  key={index}
                  style={{marginRight: "10px", marginBottom: "10px"}}
                  onClick={() => onClick(imageUrls[index])}
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
    </div>
  );
};

export default UploadMockup;

// import { useState } from "react";

// const UploadMockup = () => {
//     const [selectedFiles, setSelectedFiles] = useState([]);
//     const [imageUrls, setImageUrls] = useState([]);

//     const handleFileChange = (event) => {
//       const files = event.target.files;
//       const urls = [];
//       for (let i = 0; i < files.length; i++) {
//         const file = files[i];
//         if (file) {
//           const fileType = file.type;
//           if (fileType === 'image/svg+xml' || fileType === 'image/png' || fileType === 'image/jpeg') {
//             setSelectedFiles((prevFiles) => [...prevFiles, file]);
//             const url = URL.createObjectURL(file);
//             urls.push(url);
//           } else {
//             alert(`File ${file.name} is not a valid SVG, PNG, or JPG file.`);
//           }
//         }
//       }
//       setImageUrls((prevUrls) => [...prevUrls, ...urls]);

//   return (
//     // <div>
//     //   <p className="controls-heading">Custom Mockup</p>
//     //   {selectedFile && (
//     //     <div>
//     //       {/* <p>Selected File: {selectedFile.name}</p> */}
//     //       <img
//     //         src={imageUrl}
//     //         alt="upload"
//     //         height={100}
//     //         width={100}
//     //         style={{margin: "10px 5px"}}
//     //       />
//     //     </div>
//     //   )}

//     //   <input
//     //     type="file"
//     //     accept=".svg, .png, .jpg"
//     //     onChange={handleFileChange}
//     //   />
//     //   <p className="controls-heading">Upload Mockup</p>
//     // </div>

//   )
// }

// export default UploadMockup;

// import AppIcon from "utils/app-icon";

// const UploadMockup = () => {
//   return (
//     <div className="overfloy-y-container">
//       <>
//         <div
//           key={`Compact View Shape Library `}
//           className="library-inner-container"
//         >
//           <div className="category-header">
//             <p className="controls-heading"></p>
//             <AppIcon iconName="icon-angle-right" classes="w-2 h-2" />
//           </div>
//           <div className={`category-container category-`}>
//             <div
//               key={`Compact View Shape Childrens Library `}
//               //   onClick={() => onClick(item)}
//               className={`-container`}
//             >
//               <img alt="" src="" />
//             </div>
//           </div>
//         </div>
//         <div className="divider" />
//       </>
//     </div>
//   );
// };

// export default UploadMockup;
