import InputField from "components/input-field";
import {cloneDeep} from "lodash";
import {useEffect, useMemo, useState} from "react";
import useOnclickOutside from "react-cool-onclickoutside";
import AppIcon from "utils/app-icon";
import "./select-box.scss";
const SelectBox = ({
  containerClass,
  innerContainerClass,
  defaultText,
  onChange,
  value,
  disabled,
  options,
  hasSearch,
  position
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState(defaultText);
  const [mappingOptions, setMapOptions] = useState(options || []);
  const [filteredOptions, setFilteredOptions] = useState(options || []);
  const [searchTerm, setSearchTerm] = useState("");
  const ref = useOnclickOutside(() => {
    setIsOpen(false);
  });
  const handleOnChange = (title, value) => {
    if (!disabled) {
      if (value !== text) {
        onChange(value);
        setText(title);
      }
      setIsOpen(!isOpen);
      setSearchTerm("");
    }
  };
  useEffect(() => {
    setMapOptions(options);
    setFilteredOptions(options);
  }, [options]);
  const handleSearch = (value) => {
    const alloptions = cloneDeep(mappingOptions);
    const filterItems = alloptions.filter((x) =>
      x.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredOptions(cloneDeep(filterItems));
    setSearchTerm(value);
  };
  const dropdownStyles = useMemo(
    () => getDropDownPosition(position),
    [position]
  );

  return (
    <>
      <div ref={ref} className={`select-box-container ${containerClass}`}>
        <div
          onClick={() => (!disabled ? setIsOpen(!isOpen) : {})}
          className={`container ${innerContainerClass} `}
        >
          <p>{value === "" ? "Please Select" : value}</p>
          <AppIcon
            classes="w-3 h-3"
            iconName={isOpen ? "icon-angle-up" : "icon-angle-down"}
          />
        </div>
        {isOpen ? (
          <div className="select-open-container" style={dropdownStyles}>
            {hasSearch ? (
              <>
                <InputField
                  type="text"
                  value={searchTerm}
                  containerClass="container-padding"
                  placeholder="Quick find"
                  onChange={(value) => handleSearch(value)}
                />
                <div className="divider" />
              </>
            ) : null}

            {filteredOptions &&
              filteredOptions.map((item, index) => (
                <div
                  key={`Select Options ${item.title} - ${index}`}
                  onClick={() => handleOnChange(item.title, item.value)}
                  className="select-option"
                >
                  <p>{item.title}</p>
                </div>
              ))}
            {filteredOptions.length === 0 ? (
              <div className="container-padding">
                <p>Nothing found here</p>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </>
  );
};

SelectBox.defaultProps = {
  onChange: () => {},
  disabled: false,
  containerClass: "",
  defaultText: "Please select",
  children: null,
  value: "",
  options: [],
  hasSearch: false,
  innerContainerClass: "",
  position: "bottom"
};

export default SelectBox;

const getDropDownPosition = (position) => {
  var dropdownStyles = {};
  if (position === "bottom") {
    dropdownStyles.top = 40;
  } else {
    dropdownStyles.bottom = 38;
  }
  return dropdownStyles;
};
