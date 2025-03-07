import { isMobile, isLocal } from "../core/helpers";

const Game5Settings = {
  objSources: [
    {
      left: 100,
      top: 100,
      width: 60,
      height: 60,
    },
    {
      left: 300,
      top: 100,
      width: 60,
      height: 60,
    },
  ],

  sectionCount: 36,
  sceneWidth: 1500, //3200, //3607,
  sceneHeight: 540,
  idleSpeed: 1.5,
  inertia: 3,

  stepDuration: 200, //ms
  gameDuration: 500, //s
  stopDuration: 3000, //ms
  dragDuration: 100,
};

export default Game5Settings;
