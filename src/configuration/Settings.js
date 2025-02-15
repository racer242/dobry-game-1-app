import { isMobile, isLocal } from "../core/helpers";

const settings = {
  assetsUrl: ".",
  localStoreName: "appState_120225",

  isMobile: isMobile(),
  isLocal: isLocal(),

  desktopBounds: {
    width: 960,
    height: 540,
  },
  mobileBounds: {
    width: 540,
    height: 960,
  },
  objectBounds: {
    width: 100,
    height: 100,
  },
  switchToMobileWidth: 720,

  gameStepDuration: 1000,

  currentPage: "main",
};

export default settings;
