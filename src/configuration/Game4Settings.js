import { isMobile, isLocal } from "../core/helpers";

const Game4Settings = {
  bonusBounds: {
    width: 100,
    height: 100,
  },

  heroBounds: {
    width: 86,
    height: 45,
  },

  prizeBounds: {
    width: 28,
    height: 47,
    gap: 10,
    glow: 72,
  },

  topSources: [
    {
      src: require("../images/game4/top1.png"),
      width: 55,
      height: 300,
      ml: 11,
      mb: 11,
      mr: 11,
      mt: 0,
    },
    {
      src: require("../images/game4/top2.png"),
      width: 50,
      height: 300,
      ml: 7,
      mb: 0,
      mr: 3,
      mt: 0,
    },
    {
      src: require("../images/game4/top3.png"),
      width: 49,
      height: 300,
      ml: 2,
      mb: 0,
      mr: 0,
      mt: 0,
    },
    {
      src: require("../images/game4/top4.png"),
      width: 58,
      height: 300,
      ml: 10,
      mb: 2,
      mr: 3,
      mt: 0,
    },
  ],
  bottomSources: [
    {
      src: require("../images/game4/bottom1.png"),
      width: 81,
      height: 300,
      ml: 5,
      mb: 0,
      mr: 25,
      mt: 0,
    },
    {
      src: require("../images/game4/bottom2.png"),
      width: 80,
      height: 300,
      ml: 10,
      mb: 0,
      mr: 10,
      mt: 3,
    },
    {
      src: require("../images/game4/bottom3.png"),
      width: 54,
      height: 300,
      ml: 0,
      mb: 0,
      mr: 0,
      mt: 0,
    },
    {
      src: require("../images/game4/bottom4.png"),
      width: 56,
      height: 300,
      ml: 0,
      mb: 0,
      mr: 5,
      mt: 0,
    },
  ],

  parallaxSpeed1: 2,
  parallaxSpeed2: 4,
  parallaxSpeed3: 10,

  columnDistance: 300,
  columnGap: 200,
  columnOffset: 180,
  startColumnCount: 5,

  heroStartPosition: -100,
  heroXPosition: 100,
  pushPower: 10,
  heroWeight: 3,

  prizeProb: 0,
  prizeValue: 1,

  bonusLife: 3,
  stepDuration: 100, //ms
  gameDuration: 100, //s
  startDuration: 500, //ms
  stopDuration: 3000, //ms
  animationDuration: 4000, //ms
  goHorizontalDuration: 1000, //m s
};

export default Game4Settings;
