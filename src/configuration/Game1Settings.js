import { isMobile, isLocal } from "../core/helpers";

const Game1Settings = {
  objectBounds: {
    width: 100,
    height: 100,
  },

  objSources: [
    {
      src: require("../images/game1/objects/o1.png"),
      bonus: 1,
      lifeProb: 2,
      lifeCount: 3,
      speed: 0.5,
    },
    {
      src: require("../images/game1/objects/o2.png"),
      bonus: 1,
      lifeProb: 2,
      lifeCount: 3,
      speed: 0.5,
    },
    {
      src: require("../images/game1/objects/o3.png"),
      bonus: -5,
      lifeProb: 5,
      lifeCount: 6,
      speed: 0.1,
    },
    {
      src: require("../images/game1/objects/o4.png"),
      bonus: 1,
      lifeProb: 2,
      lifeCount: 3,
      speed: 0.5,
    },
    {
      src: require("../images/game1/objects/o5.png"),
      bonus: 2,
      lifeProb: 1,
      lifeCount: 2,
      speed: 1,
    },
    {
      src: require("../images/game1/objects/o6.png"),
      bonus: 1,
      lifeProb: 2,
      lifeCount: 3,
      speed: 0.5,
    },
  ],

  newCount: 2,
  gridSize: 10,
  transitionDuration: 1000, //ms

  bonusLife: 3,

  stepDuration: 1000, //ms
  gameDuration: 100, //s
  stopDuration: 3000, //ms
};

export default Game1Settings;
