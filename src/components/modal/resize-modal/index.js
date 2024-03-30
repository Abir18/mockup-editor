import Modal from "../index";
import Button from "components/button";
import { useState } from "react";
import SelectBox from "components/select-box";
import AppIcon from "utils/app-icon";
import { setCanvasInContrainer } from "canvas-actions";
const ResizeModal = ({ callBack }) => {
  const [isOpen, onClose] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Suggested");
  const [activeSelection, setActiveSelection] = useState({});
  const handleResize = () => {
    if (activeSelection?.width) {
      setCanvasInContrainer(activeSelection.width, activeSelection.height);
      callBack();
      setActiveSelection({});
      onClose(false);
    }
  };
  const handleCategoryChange = (value) => {
    setSelectedOption(value);
  };
  return (
    <>
      <Button
        onClick={() => onClose(true)}
        title="Browse Sizes"
        type="outline"
      />
      <Modal
        isOpen={isOpen}
        onClose={() => onClose(false)}
        width={350}
        // height={85}
        title="Resize Options"
        footer={
          <>
            <Button
              disabled={!Object.keys(activeSelection).length > 0}
              onClick={handleResize}
              classes="w-100"
              title="Resize"
            />
          </>
        }
        fixedHeader={
          <>
            <div className="text-controls">
              <SelectBox
                onChange={(value) => handleCategoryChange(value)}
                value={selectedOption}
                options={resize_options}
              />
            </div>
          </>
        }
      >
        {resize_options_details.Suggested.map((resize_option) => (
          <div
            key={`Resize Options ${resize_option.title}`}
            onClick={() => setActiveSelection(resize_option)}
            className="d-flex justify-content-between align-center cursor-pointer"
          >
            <p className="controls-heading">{`${resize_option.title} | ${resize_option.width} x ${resize_option.height}`}</p>
            {activeSelection?.title === resize_option.title ? (
              <AppIcon
                iconName="icon-circle-checkbox-checked"
                classes="primary-color w-3 h-3"
              />
            ) : null}
          </div>
        ))}
      </Modal>
    </>
  );
};
export default ResizeModal;

const resize_options = [
  {
    title: "Suggested",
    value: "Suggested",
  },
  {
    title: "All Categories",
    value: "All Categories",
  },
  {
    title: "Headers & Covers",
    value: "Headers & Covers",
  },
  {
    title: "Adverts",
    value: "Adverts",
  },
  {
    title: "Posts & Content",
    value: "Posts & Content",
  },
  {
    title: "Print",
    value: "Print",
  },
  {
    title: "Ebook",
    value: "Ebook",
  },
];

const resize_options_details = {
  Suggested: [
    { title: "Youtube Thumbnail", width: 1280, height: 720 },
    { title: "Hero Image", width: 2000, height: 2000 },
    { title: "Mockup Scene", width: 1680, height: 1200 },
    { title: "HD Banner", width: 1920, height: 1080 },
    { title: "Story Post", width: 1080, height: 1920 },
    { title: "Square Post", width: 1080, height: 1080 },
    { title: "Infographic", width: 800, height: 2000 },
    { title: "Call to Action Page", width: 1410, height: 2250 },
    { title: "Front Cover", width: 1410, height: 2250 },
    { title: "HD Panoroma", width: 1920, height: 675 },
    { title: "Profile Banner", width: 1200, height: 480 },
    { title: "Twitter Cover", width: 1500, height: 500 },
    { title: "Tweet Image", width: 1024, height: 512 },
    { title: "Company Background", width: 1536, height: 768 },
  ],
};

// { title: "", width: 2000, height: 2000 },
