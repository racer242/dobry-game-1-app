import { isMobile, isLocal } from "../core/helpers";

const Game4Settings = {
  targetBounds: {
    width: 50,
    height: 50,
  },

  topSources: [
    {
      src: require("../images/game4/top1.png"),
      width: 55,
      height: 300,
      l: 11,
      b: 11,
      r: 11,
      t: 0,
    },
    {
      src: require("../images/game4/top2.png"),
      width: 50,
      height: 300,
      l: 7,
      b: 0,
      r: 3,
      t: 0,
    },
    {
      src: require("../images/game4/top3.png"),
      width: 49,
      height: 300,
      l: 2,
      b: 0,
      r: 0,
      t: 0,
    },
    {
      src: require("../images/game4/top4.png"),
      width: 58,
      height: 300,
      l: 10,
      b: 2,
      r: 3,
      t: 0,
    },
  ],
  bottomSources: [
    {
      src: require("../images/game4/bottom1.png"),
      width: 81,
      height: 300,
      l: 5,
      b: 0,
      r: 25,
      t: 0,
    },
    {
      src: require("../images/game4/bottom2.png"),
      width: 80,
      height: 300,
      l: 10,
      b: 0,
      r: 10,
      t: 3,
    },
    {
      src: require("../images/game4/bottom3.png"),
      width: 54,
      height: 300,
      l: 0,
      b: 0,
      r: 0,
      t: 0,
    },
    {
      src: require("../images/game4/bottom4.png"),
      width: 56,
      height: 300,
      l: 0,
      b: 0,
      r: 5,
      t: 0,
    },
  ],

  parallaxSpeed1: 2,
  parallaxSpeed2: 4,
  parallaxSpeed3: 10,

  columnDistance: 300,
  columnGap: 120,
  columnOffset: 180,
  startColumnCount: 5,

  bonusLife: 3,
  stepDuration: 100, //ms
  gameDuration: 100, //s
  stopDuration: 3000, //ms
  animationDuration: 4000, //ms
};

export default Game4Settings;
