import globalControls from "./controls/global-controls";
const currentVersion = "1.0";
const customizeFabric = (params) => {
  
  globalControls();

};
export default customizeFabric;



export const propertiesToInclude = ["width", "height", "originalWidth", "originalHeight"];
export const projectPropertiesToInclude = [...propertiesToInclude, "pages", "activePage"];
