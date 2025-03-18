import { isMobile, isLocal } from "../core/helpers";

const Game5Settings = {
  scenes: [
    {
      objects: [{ area: "s26", x: 7, y: 51 }],
      src: require("../images/game5/scene1.png"),
    },
    {
      objects: [{ area: "s12", x: 60, y: 183 }],
      src: require("../images/game5/scene2.png"),
    },
    {
      objects: [{ area: "s4", x: 6, y: 409 }],
      src: require("../images/game5/scene3.png"),
    },
  ],

  objectRadius: 20,

  sectionCount: 36,
  sceneWidth: 2377, //3200, //3607,
  sceneHeight: 440,
  idleSpeed: 0.5,
  inertia: 3,

  stepDuration: 200, //ms
  gameDuration: 60, //s
  stopDuration: 2000, //ms
  dragDuration: 0,
};

export default Game5Settings;
