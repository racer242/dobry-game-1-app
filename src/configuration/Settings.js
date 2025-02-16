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
  objectLifeProb: 0.8,
  switchToMobileWidth: 720,
  stepDuration: 1500, //ms
  transitionDuration: 500, //ms
  newCount: 2,
  gridSize: 10,
  gameDuration: 10, //s

  currentPage: "main",
};

export default settings;
