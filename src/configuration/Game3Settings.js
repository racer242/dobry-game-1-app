import { isMobile, isLocal } from "../core/helpers";

const Game3Settings = {
  cellBounds: {
    width: 88,
    height: 100,
    gapX: 10,
    gapY: 10,
  },

  objSources: [
    {
      type: {
        src: require("../images/game3/objects/o1.png"),
        bonus: 1,
      },
    },
    {
      type: {
        src: require("../images/game3/objects/o2.png"),
        bonus: 1,
      },
    },
    {
      type: {
        src: require("../images/game3/objects/o3.png"),
        bonus: 1,
      },
    },
    {
      type: {
        src: require("../images/game3/objects/o4.png"),
        bonus: 1,
      },
    },
    {
      type: {
        src: require("../images/game3/objects/o5.png"),
        bonus: 1,
      },
    },
    {
      type: {
        src: require("../images/game3/objects/o6.png"),
        bonus: 1,
      },
    },
    {
      type: {
        src: require("../images/game3/objects/o7.png"),
        bonus: 1,
      },
    },
    {
      type: {
        src: require("../images/game3/objects/o8.png"),
        bonus: 1,
      },
    },
  ],

  cellColors: ["#5D279E", "#A71FE1", "#FF49B8", "#E11F26"],
  matrixSize: [4, 4],

  lifeCount: 3,
  deadCount: 4,
  killingCount: 1,
  killCount: 3,
  lightSize: 100,

  bonusLife: 3,

  newCount: 2,
  transitionDuration: 300, //ms
  detectionSize: 50,

  stepDuration: 200, //ms
  gameDuration: 100, //s
  stopDuration: 3000, //ms
};

export default Game3Settings;
