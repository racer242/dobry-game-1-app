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

  objSources: [
    {
      src: require("../images/objects/o1.png"),
      bonus: 1,
      lifeProb: 2,
      lifeCount: 3,
      speed: 0.5,
    },
    {
      src: require("../images/objects/o2.png"),
      bonus: 1,
      lifeProb: 2,
      lifeCount: 3,
      speed: 0.5,
    },
    {
      src: require("../images/objects/o3.png"),
      bonus: -5,
      lifeProb: 5,
      lifeCount: 6,
      speed: 0.1,
    },
    {
      src: require("../images/objects/o4.png"),
      bonus: 1,
      lifeProb: 2,
      lifeCount: 3,
      speed: 0.5,
    },
    {
      src: require("../images/objects/o5.png"),
      bonus: 2,
      lifeProb: 1,
      lifeCount: 2,
      speed: 1,
    },
    {
      src: require("../images/objects/o6.png"),
      bonus: 1,
      lifeProb: 2,
      lifeCount: 3,
      speed: 0.5,
    },
  ],

  lifeProb: 0.6,
  switchToMobileWidth: 720,
  stepDuration: 1000, //ms
  transitionDuration: 1000, //ms
  newCount: 2,
  gridSize: 10,
  gameDuration: 60, //s
  stopDuration: 3000, //ms

  currentPage: "main",
};

export default settings;
