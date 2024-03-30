
const useImageControl = () => {
  const { canvas } = window;
  const activeObject = canvas.getActiveObject();
  const { src } = activeObject;

  return {
    imageSrc: src,
    removeBackground: () => { },
  };
};
export default useImageControl;
