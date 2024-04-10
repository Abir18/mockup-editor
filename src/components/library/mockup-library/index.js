import {
  addBackgroundImageOnCanvas,
  changeCanvasBackground,
  replaceTopLayerImage
} from "canvas-actions";
import CategoryView from "components/category-view";
import InputField from "components/input-field";
import UploadLogo from "components/upload-logo";
import UploadMockup from "components/upload-mockup";
import {useState} from "react";

const MockupLibrary = () => {
  const [draggable, setDraggable] = useState(true);

  const {canvas} = window;

  const objects = canvas.getObjects();

  // Find the bottom layer object
  // const bottomLayer = objects.find((obj) => !obj.selectable);
  const topObject = objects[objects.length - 1];

  console.log(objects, "objects");
  console.log(topObject, "topObject");

  // useEffect(()=>{
  //   addBackgroundImageOnCanvas(image, {selectable: draggable});

  // },[])

  return (
    <>
      {/* <button onClick={() => setDraggable(!draggable)}>Drag</button> */}

      <div className="library-inner-container">
        <InputField placeholder="Quick find" />
      </div>

      <UploadLogo onClick={(value) => replaceTopLayerImage(value)} />
      <UploadMockup onClick={(value) => changeCanvasBackground(value)} />
      {/* <div className="divider" /> */}
      <CategoryView
        type="image"
        onClick={(value) => {
          addBackgroundImageOnCanvas(value, {selectable: true});
        }}
        data={shapes_library}
      />
      {/* <button onClick={() => setDraggable(!draggable)}>hello</button> */}
    </>
  );
};
export default MockupLibrary;

const shapes_library = [
  {
    type: "Shirt",
    items: [
      "https://unblast.com/wp-content/uploads/2023/10/Blank-T-shirt-Mockup-PSD.jpg",
      "https://mockups-design.com/wp-content/uploads/2021/08/Hanging_T-Shirt_Mockup_2.jpg",
      "https://unblast.com/wp-content/uploads/2023/09/Hanging-T-shirt-Mockup.jpg",
      "https://mrmockup.com/wp-content/uploads/2023/07/Free-T-Shirt-on-Men-Mockup-01.jpg",
      "https://unblast.com/wp-content/uploads/2023/08/Hanging-T-shirt-Mockup.jpg",
      "https://d1wnwqwep8qkqc.cloudfront.net/uploads/stage/stage_image/133555/optimized_large_thumb_26378.jpg",
      "https://mockuptree.com/wp-content/uploads/edd/2023/04/free-t-shirt-mockup--960x640.jpg",
      "https://unblast.com/wp-content/uploads/2022/04/Freestanding-T-Shirt-Mockup.jpg",
      "https://mockuptree.com/wp-content/uploads/edd/2023/09/free-t-shirt-mockup-template-960x640.jpg",
      "https://mockups-design.com/wp-content/uploads/2021/07/Free_T-Shirt_Mockup_3.jpg",
      "https://mrmockup.com/wp-content/uploads/2023/11/Free-Beard-Man-Wearing-T-Shirt-Mockup-01-1024x683.jpg?x55669"
    ]
  },
  {
    type: "Cup",
    items: [
      "https://img.freepik.com/free-psd/premium-quality-mockup-ready-use_53876-57715.jpg?size=626&ext=jpg&ga=GA1.1.632798143.1705881600&semt=ais",
      "https://mockups-design.com/wp-content/uploads/2021/05/Free_Mug_Mockup_1-1.jpg",
      "https://mockuptree.com/wp-content/uploads/edd/2022/07/Free-Coffee-Cup-Mockup.jpg",
      "https://www.svgheart.com/wp-content/uploads/2021/11/cat-face-sleeping-pet-lover-free-svg-file-SvgHeart.Com.png",
      "https://www.psdmockups.com/wp-content/uploads/2022/11/Stacked-Paper-Cup-Mockups.jpg",
      "https://unblast.com/wp-content/uploads/2021/08/Paper-Coffee-Cup-with-Sleeve-Mockup.jpg",
      "https://graphberry-imgs.imgix.net/coffee-cup-psd-mockup.jpg?auto=compress,format&q=80&w=800",
      "https://unblast.com/wp-content/uploads/2019/08/2-Floating-Coffee-Cups-Mockup-1.jpg",
      "https://pics.craiyon.com/2023-07-11/31b3d44717c34e7ab82f001d0ec6be4c.webp",
      "https://goodmockups.com/wp-content/uploads/2020/09/Free-Premium-Paper-Coffee-Cup-Mockup-PSD-Set-1.jpg",
      "https://mockups-design.com/wp-content/uploads/2023/07/Free_Mug_Mockup_1-1.jpg",
      "https://www.freemockupworld.com/wp-content/uploads/2022/04/Free-Paper-Cup-Mockup-01.jpg",
      "https://images.pixeden.com/images/psd-coffee-cup-mockup_full_preview_retina.jpg",
      "https://mockuptree.com/wp-content/uploads/edd/2022/11/Free_Stacked_Cups_Mockup_psd-960x640.jpg",
      "https://mockupsforfree.com/wp-content/uploads/2020/05/Paper_Cup_MockupsForFree.jpg"
    ]
  },
  {
    type: "Frame",
    items: [
      "https://img.freepik.com/free-psd/photo-frames-mockup_53876-57736.jpg?size=626&ext=jpg&ga=GA1.1.632798143.1705795200&semt=ais",
      "https://unblast.com/wp-content/uploads/2019/01/Wood-Photo-Frame-Mockup.jpg",
      "https://t3.ftcdn.net/jpg/04/95/64/58/360_F_495645822_1S5z3w4sdPs3P2yUqnLkkvRGd1Eo5Vni.jpg",
      "https://img.freepik.com/free-psd/photo-frames-mockup_53876-57749.jpg?size=626&ext=jpg&ga=GA1.1.632798143.1705795200&semt=ais",
      "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/4cb46c142149809.62614e9ee9cde.jpg",
      "https://unblast.com/wp-content/uploads/2018/07/Free-Industrial-Interior-Poster-Frame-Mockup-PSD.jpg",
      "https://mockuptree.com/wp-content/uploads/edd/2022/07/Free-Frame-Mockup.jpg",
      "https://graphicsfamily.com/wp-content/uploads/edd/2020/11/Painting-Frame-Mockup-scaled.jpg",
      "https://elements-cover-images-0.imgix.net/46bb8998-7b16-4b94-bc7b-2c74d20562b8?auto=compress%2Cformat&w=900&fit=max&s=f0de113cebd4ed9002ee59ab973791ec",
      "https://www.free-mockup.com/wp-content/uploads/edd/2023/04/Poster-Frame-Free-Mock-Up-1000x750.jpg",
      "https://img.freepik.com/free-photo/dark-photo-frame-plant-arrangement_23-2149454943.jpg",
      "https://mockupbee.com/wp-content/uploads/2022/09/Square-Frame-Mockup.jpg",
      "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTEwL3JtNDMwLXBmLWIyOC1tb2NrdXAuanBn.jpg",
      "https://mockups-design.com/wp-content/uploads/2022/11/Free_Wooden_Frame_Mockup.jpg",
      "https://goodmockups.com/wp-content/uploads/2017/12/Free-3D-Scene-Photo-Poster-Frame-Mockup-PSD.jpg",
      "https://zippypixels.com/wp-content/uploads/2018/05/Wood-frame-mockup.jpg",
      "https://images.pixeden.com/images/psd-poster-frame-mockup-vol6_full_preview_retina.jpg"
    ]
  },
  {
    type: "Bag",
    items: [
      "https://unblast.com/wp-content/uploads/2019/06/Shopping-Bag-Mockup.jpg",
      "https://mockups-design.com/wp-content/uploads/2022/08/Gift_Bag_Mockup_1.jpg",
      "https://mockuphunt.co/cdn/shop/products/shopping-bag-on-street-mockup_62becbf7298ea_2000x.png?v=1660543983",
      "https://mockuptree.com/wp-content/uploads/edd/2023/12/Free-Recycle-Paper-Shopping-Bag-Mockup-960x640.jpg",
      "https://www.mockupworld.co/wp-content/uploads/2015/08/Shopping-Bag-PSD-MockUp.jpg",
      "https://img.freepik.com/free-photo/white-tote-bag-isolated_125540-757.jpg?size=626&ext=jpg&ga=GA1.1.632798143.1705708800&semt=ais",
      "https://resourceboy.com/wp-content/uploads/2024/01/perspective-view-of-shopping-bag-mockup-with-box-thumbnail.jpg",
      "https://www.freemockupworld.com/wp-content/uploads/2023/02/Shopping-Bag-with-Box-Free-Mockup-01.jpg",
      "https://unblast.com/wp-content/uploads/2020/03/Shopping-Bag-Mockup-1.jpg",
      "https://graphberry-imgs.imgix.net/coffee-bag-mockup.png?auto=compress,format&q=80&w=800",
      "https://mockups-design.com/wp-content/uploads/2024/01/Paper_Bag_Mockup_1.jpg",
      "https://webflow-assets.ls.graphics/625816a3416990dd61391b9b/64443293668ffdadeed73fce_62582a3645deff8638c49c3e_604f5556048ad6841b14ce0c_2000-.webp",
      "https://imockups.com/storage/product/284/6XoK85z9vdIgYuitOAJT.png",
      "https://www.pacagemockup.com/wp-content/uploads/2020/01/Paper-Shopping-Bags-Mockup-pacagemockup.jpg",
      "https://mir-s3-cdn-cf.behance.net/projects/404/cfe0ec185278211.Y3JvcCwzMDAwLDIzNDYsMCww.jpg"
    ]
  },
  {
    type: "Pillow",
    items: [
      "https://img.freepik.com/free-psd/set-blank-pillow-isolated_176382-1609.jpg",
      "https://img.freepik.com/free-psd/white-soft-pillow_176382-1116.jpg",
      "https://mockups-design.com/wp-content/uploads/2021/04/Free_Pillow_Mockup_1.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/496e2171581085.5bc9f53abed3b.jpg",
      "https://unblast.com/wp-content/uploads/2019/01/Rectangular-Pillow-Mockup.jpg",
      "https://t4.ftcdn.net/jpg/04/70/67/53/360_F_470675300_ojxKJIMuTbpoBW19Hi4a8xKHXYk2LaXQ.jpg",
      "https://www.free-mockup.com/wp-content/uploads/edd/2019/06/Free-Square-Pillow-Mockup.jpg",
      "https://goodmockups.com/wp-content/uploads/2021/09/Free-Cushion-Mockup-PSD-2.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/565ed171581085.5bc9f53abe211.jpg",
      "https://resourceboy.com/wp-content/uploads/2023/07/forepart-sight-of-pillow-mockup-on-sofa-1.jpg",
      "https://mockuptree.com/wp-content/uploads/edd/2022/08/Free-Pillow-Mockup.jpg",
      "https://www.creativefabrica.com/wp-content/uploads/2023/01/31/Pillow-mockup-Graphics-59591625-1-1-580x387.jpg",
      "https://mockup.love/wp-content/uploads/edd/2019/04/Multiple-Square-Pillow-Mockup-1000x750.jpg",
      "https://goodmockups.com/wp-content/uploads/2017/09/Free-Square-Pillows-Mockup-PSD-Files-2.jpg",
      "https://assets.mediamodifier.com/mockups/5b054111306e03fd32cc5e88/pillow-on-couch-online-mockup-generator.jpg",
      "https://www.pixpine.com/wp-content/uploads/2021/11/free-two-pillows-mockup-1.jpg",
      "https://unblast.com/wp-content/uploads/2018/10/Pillow-Mockup.jpg",
      "https://erinplewes.com/cdn/shop/products/erin-plewes-mockups-pillow-mockup-square-pillow-mockup-with-rustic-wood-background-for-lifestyle-stock-photography-white-pillow-mock-up-jpeg-digital-download-15387262877738.jpg?v=1617883716&width=1946",
      "https://erinplewes.com/cdn/shop/products/erin-plewes-mockups-pillow-mockup-square-pillow-mockup-with-rustic-wood-background-for-lifestyle-stock-photography-white-pillow-mock-up-jpeg-digital-download-15387262877738.jpg?v=1617883716&width=1946",
      "https://erinplewes.com/cdn/shop/products/erin-plewes-mockups-pillow-mockup-square-pillow-mockup-with-rustic-wood-background-for-lifestyle-stock-photography-white-pillow-mock-up-jpeg-digital-download-15387262877738.jpg?v=1617883716&width=1946"
    ]
  }
];
