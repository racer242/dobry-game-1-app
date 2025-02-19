import { isMobile, isLocal } from "../core/helpers";

const Game2Settings = {
  objectBounds: {
    width: 100,
    height: 100,
  },

  objSources: [
    {
      x: 341,
      y: 359,
      width: 75,
      height: 63,
      type: {
        src: require("../images/game2/objects/o1.png"),
        bonus: 1,
        lifeProb: 2,
        lifeCount: 3,
        speed: 0.5,
      },
    },
    {
      x: 556,
      y: 361,
      width: 54,
      height: 64,
      type: {
        src: require("../images/game2/objects/o2.png"),
        bonus: 1,
        lifeProb: 2,
        lifeCount: 3,
        speed: 0.5,
      },
    },
    {
      x: 453,
      y: 357,
      width: 93,
      height: 80,
      type: {
        src: require("../images/game2/objects/o3.png"),
        bonus: 1,
        lifeProb: 2,
        lifeCount: 3,
        speed: 0.5,
      },
    },
    {
      x: 355,
      y: 51,
      width: 37,
      height: 66,
      type: {
        src: require("../images/game2/objects/o4.png"),
        bonus: 1,
        lifeProb: 2,
        lifeCount: 3,
        speed: 0.5,
      },
    },
    {
      x: 524,
      y: 90,
      width: 52,
      height: 90,
      type: {
        src: require("../images/game2/objects/o5.png"),
        bonus: 1,
        lifeProb: 2,
        lifeCount: 3,
        speed: 0.5,
      },
    },
  ],

  lifeProb: 0.6,
  stepDuration: 1000, //ms
  transitionDuration: 1000, //ms
  newCount: 2,
  gridSize: 10,
  gameDuration: 100, //s
  stopDuration: 3000, //ms
};

export default Game2Settings;
