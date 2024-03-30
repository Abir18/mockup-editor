const TextArea = ({ className, placeholder, onChange, rows,value }) => {
  return (
    <>
      <textarea
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`input-field min-height-text-area ${className}`}
        rows={rows}
        value={value}
      ></textarea>
    </>
  );
};
TextArea.defaultProps = {
  placeholder: "Text Goes Here",
  onChange: () => {},
  disabled: false,
  className: "",
  rows: 2,
  value:""
};
export default TextArea;
