import InputField from "components/input-field";
import { ShapeActions } from "canvas-actions";
import CategoryView from "components/category-view";
const ShapesLibrary = () => {
  return (
    <>
      <div className="library-inner-container">
        <InputField placeholder="Quick find" />
      </div>
      <div className="divider" />
      <CategoryView
        onClick={(value) => ShapeActions.addShape(value)}
        data={shapes_library}
      />
    </>
  );
};
export default ShapesLibrary;

const shapes_library = [
  {
    type: "Basic Shapes",
    items: [
      "https://admin-storage.glorify.com/uploads/admin/Asset_15.svg",
      "https://admin-storage.glorify.com/uploads/admin/Asset_26.svg",
      "https://admin-storage.glorify.com/uploads/admin/Asset_25.svg",
      "https://admin-storage.glorify.com/uploads/admin/Asset_24.svg",
      "https://admin-storage.glorify.com/uploads/admin/Asset_18.svg",
      "https://admin-storage.glorify.com/uploads/admin/Asset_22.svg",
      "https://admin-storage.glorify.com/uploads/admin/Asset_21.svg",
      "https://admin-storage.glorify.com/uploads/admin/Asset_23.svg",
      "https://admin-storage.glorify.com/uploads/admin/Asset_29.svg",
      "https://admin-storage.glorify.com/uploads/admin/Asset_30.svg",
      "https://admin-storage.glorify.com/uploads/admin/Asset_27.svg",
      "https://admin-storage.glorify.com/uploads/admin/Asset_28.svg",
      "https://admin-storage.glorify.com/uploads/admin/basic_shape16.svg",
      "https://admin-storage.glorify.com/uploads/admin/Asset_19.svg",
      "https://admin-storage.glorify.com/uploads/admin/Asset_20.svg",
      "https://admin-storage.glorify.com/uploads/admin/Asset_16.svg",
      "https://admin-storage.glorify.com/uploads/admin/Asset_10.svg",
      "https://admin-storage.glorify.com/uploads/admin/Asset_9.svg",
      "https://admin-storage.glorify.com/uploads/admin/Asset_2.svg",
      "https://admin-storage.glorify.com/uploads/admin/Asset_12.svg",
      "https://admin-storage.glorify.com/uploads/admin/Asset_31.svg",
      "https://admin-storage.glorify.com/uploads/admin/Asset_17.svg",
      "https://admin-storage.glorify.com/uploads/admin/Asset_8.svg",
      "https://admin-storage.glorify.com/uploads/admin/Asset_14.svg",
      "https://admin-storage.glorify.com/uploads/admin/Asset_6.svg",
      "https://admin-storage.glorify.com/uploads/admin/Asset_33.svg",
      "https://admin-storage.glorify.com/uploads/admin/Asset_32.svg",
      "https://admin-storage.glorify.com/uploads/admin/Asset_13.svg",
      "https://admin-storage.glorify.com/uploads/admin/Asset_7.svg",
      "https://admin-storage.glorify.com/uploads/admin/Asset_3.svg",
      "https://admin-storage.glorify.com/uploads/admin/Asset_4.svg",
      "https://admin-storage.glorify.com/uploads/admin/Asset_5.svg",
    ],
  },
  {
    type: "Rounded",
    items: [
      "https://admin-storage.glorify.com/uploads/admin/Rounded_(13).svg",
      "https://admin-storage.glorify.com/uploads/admin/Rounded_(22).svg",
      "https://admin-storage.glorify.com/uploads/admin/Rounded_(21).svg",
      "https://admin-storage.glorify.com/uploads/admin/Rounded_(20).svg",
      "https://admin-storage.glorify.com/uploads/admin/Rounded_(25).svg",
      "https://admin-storage.glorify.com/uploads/admin/Rounded_(18).svg",
      "https://admin-storage.glorify.com/uploads/admin/Rounded_(17).svg",
      "https://admin-storage.glorify.com/uploads/admin/Rounded_(19).svg",
      "https://admin-storage.glorify.com/uploads/admin/Rounded_(26).svg",
      "https://admin-storage.glorify.com/uploads/admin/Rounded_(23).svg",
      "https://admin-storage.glorify.com/uploads/admin/Rounded_(24).svg",
      "https://admin-storage.glorify.com/uploads/admin/Rounded_(4).svg",
      "https://admin-storage.glorify.com/uploads/admin/Rounded_(9).svg",
      "https://admin-storage.glorify.com/uploads/admin/Rounded_(15).svg",
      "https://admin-storage.glorify.com/uploads/admin/Rounded_(16).svg",
      "https://admin-storage.glorify.com/uploads/admin/Rounded_(14).svg",
      "https://admin-storage.glorify.com/uploads/admin/Rounded_(8).svg",
      "https://admin-storage.glorify.com/uploads/admin/Rounded_(2).svg",
      "https://admin-storage.glorify.com/uploads/admin/Rounded_(10).svg",
      "https://admin-storage.glorify.com/uploads/admin/Rounded_(12).svg",
      "https://admin-storage.glorify.com/uploads/admin/Rounded_(1).svg",
      "https://admin-storage.glorify.com/uploads/admin/Rounded_(5).svg",
      "https://admin-storage.glorify.com/uploads/admin/Rounded_(27).svg",
      "https://admin-storage.glorify.com/uploads/admin/Rounded_(7).svg",
      "https://admin-storage.glorify.com/uploads/admin/Rounded_(28).svg",
      "https://admin-storage.glorify.com/uploads/admin/Rounded_(11).svg",
      "https://admin-storage.glorify.com/uploads/admin/Rounded_(6).svg",
      "https://admin-storage.glorify.com/uploads/admin/Rounded_(3).svg",
    ],
  },
  {
    type: "Outline",
    items: [
      "https://admin-storage.glorify.com/uploads/admin/Outlines_(42).svg",
      "https://admin-storage.glorify.com/uploads/admin/Outlines_(53).svg",
      "https://admin-storage.glorify.com/uploads/admin/Outlines_(52).svg",
      "https://admin-storage.glorify.com/uploads/admin/Outlines_(51).svg",
      "https://admin-storage.glorify.com/uploads/admin/Outlines_(45).svg",
      "https://admin-storage.glorify.com/uploads/admin/Outlines_(49).svg",
      "https://admin-storage.glorify.com/uploads/admin/Outlines_(48).svg",
      "https://admin-storage.glorify.com/uploads/admin/Outlines_(50).svg",
      "https://admin-storage.glorify.com/uploads/admin/Outlines_(56).svg",
      "https://admin-storage.glorify.com/uploads/admin/Outlines_(57).svg",
      "https://admin-storage.glorify.com/uploads/admin/Outlines_(54).svg",
      "https://admin-storage.glorify.com/uploads/admin/Outlines_(55).svg",
      "https://admin-storage.glorify.com/uploads/admin/Outlines_(38).svg",
      "https://admin-storage.glorify.com/uploads/admin/Outlines_(46).svg",
      "https://admin-storage.glorify.com/uploads/admin/Outlines_(47).svg",
      "https://admin-storage.glorify.com/uploads/admin/Outlines_(43).svg",
      "https://admin-storage.glorify.com/uploads/admin/Outlines_(37).svg",
      "https://admin-storage.glorify.com/uploads/admin/Outlines_(36).svg",
      "https://admin-storage.glorify.com/uploads/admin/Outlines_(29).svg",
      "https://admin-storage.glorify.com/uploads/admin/Outlines_(39).svg",
      "https://admin-storage.glorify.com/uploads/admin/Outlines_(58).svg",
      "https://admin-storage.glorify.com/uploads/admin/Outlines_(44).svg",
      "https://admin-storage.glorify.com/uploads/admin/Outlines_(35).svg",
      "https://admin-storage.glorify.com/uploads/admin/Outlines_(41).svg",
      "https://admin-storage.glorify.com/uploads/admin/Outlines_(33).svg",
      "https://admin-storage.glorify.com/uploads/admin/Outlines_(60).svg",
      "https://admin-storage.glorify.com/uploads/admin/Outlines_(59).svg",
      "https://admin-storage.glorify.com/uploads/admin/Outlines_(40).svg",
    ],
  },
];
