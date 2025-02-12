import { isMobile, isLocal } from "../core/helpers";

const settings = {
  assetsUrl: ".",
  localStoreName: "appState_291124",

  isMobile: isMobile(),
  isLocal: isLocal(),

  desktopBounds: {
    width: 1920,
    height: 1080,
  },
  mobileBounds: {
    width: 1080,
    height: 1920,
  },
  switchToMobileWidth: 720,
};

export default settings;
