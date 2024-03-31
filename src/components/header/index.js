import {downloadCanvasAsJpeg, downloadCanvasAsSVG} from "canvas-actions";
import Button from "components/button";
import QuickActionContainer from "components/quick-action-container";
import ThemeSwitcher from "components/theme-switcher";
import "./header.scss";
import useHeader from "./useHeader";
const Header = () => {
  const {} = useHeader();
  return (
    <>
      <header className="header">
        <div className="header-right-panel">
          <img
            alt="header-logo"
            width={40}
            height={30}
            src="https://www.svgheart.com/wp-content/uploads/2022/07/heart-made-of-hearts_479-430-min.png"
          />
          <QuickActionContainer />
        </div>
        <div className="d-flex gap-1">
          <Button
            onClick={downloadCanvasAsSVG}
            title="Download SVG"
            type="outline"
          />
          <Button onClick={downloadCanvasAsJpeg} title="Download Mockup" />
          <ThemeSwitcher />
        </div>
      </header>
    </>
  );
};
export default Header;
