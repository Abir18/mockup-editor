import "./header.scss";
import Button from "components/button";
import ThemeSwitcher from "components/theme-switcher";
import QuickActionContainer from "components/quick-action-container";
import useHeader from "./useHeader";
import {downloadCanvasAsSVG,downloadCanvasAsJpeg} from "canvas-actions";
const Header = () => {
  const { } = useHeader();
  return (
    <>
      <header className="header">
        <div className="header-right-panel">
          <img width={60} src="https://www.test.svgheart.com/wp-content/uploads/2023/10/logo.png" />
          <QuickActionContainer />
        </div>
        <div className="d-flex gap-1">
          <Button onClick={downloadCanvasAsSVG} title="Download SVG" type="outline" />
          <Button onClick={downloadCanvasAsJpeg} title="Download Mockup" />
          <ThemeSwitcher />
        </div>
      </header>
    </>
  );
};
export default Header;