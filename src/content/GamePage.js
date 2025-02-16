import React, { Component } from "react";
import { setStoreData } from "../actions/appActions";
import "../css/game.css";

class GamePage extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
    if (this.store) {
      this.state = {
        ...this.store.getState(),
      };
    } else this.state = {};

    this.ref = React.createRef();

    this.state = {
      ...this.state,
      objSources: [
        { src: require("../images/objects/o1.png"), bonus: 1 },
        { src: require("../images/objects/o2.png"), bonus: 1 },
        { src: require("../images/objects/o3.png"), bonus: -1 },
        { src: require("../images/objects/o4.png"), bonus: 1 },
        { src: require("../images/objects/o5.png"), bonus: 2 },
        { src: require("../images/objects/o6.png"), bonus: 1 },
      ],
      objects: [],
      countdown: 0,
      score: 0,
    };

    this.closeButton_clickHandler = this.closeButton_clickHandler.bind(this);
    this.finishButton_clickHandler = this.finishButton_clickHandler.bind(this);
    this.initCount = 0;
    this.counter = 0;
  }

  componentDidMount() {
    this.unsubscribe = this.store.subscribe(() => {
      this.onStoreChange();
    });
    this.mounted = true;
    this.startGame();
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
    this.mounted = false;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  onStoreChange() {
    if (this.mounted) {
      let state = this.store.getState();
      this.setState({
        ...this.state,
        ...state,
      });
    }
  }

  startGame() {
    if (!this.started) {
      this.started = true;
      this.stepGame();
      this.controlGame();
    }
  }

  controlGame() {
    if (this.doControl()) {
      if (this.countdownTimer != null) clearTimeout(this.countdownTimer);
      this.countdownTimer = setTimeout(this.controlGame.bind(this), 1000);
    }
  }

  stepGame() {
    this.doGame();
    if (this.gameTimer != null) clearTimeout(this.gameTimer);
    if (this.initCount > 1) {
      this.gameTimer = setTimeout(
        this.stepGame.bind(this),
        this.state.stepDuration
      );
    } else {
      this.initCount++;
      this.gameTimer = setTimeout(
        this.stepGame.bind(this),
        this.state.stepDuration / 100
      );
    }
  }

  stopGame() {
    if (this.gameTimer != null) clearTimeout(this.gameTimer);
    this.gameTimer = null;
    if (this.countdownTimer != null) clearTimeout(this.countdownTimer);
    this.countdownTimer = null;
    this.started = false;
    console.log("STOP!!!!");
  }

  doControl() {
    if (this.state.countdown == this.state.gameDuration) {
      this.stopGame();
      return false;
    }
    this.setState({
      ...this.state,
      countdown: this.state.countdown + 1,
    });
    return true;
  }

  doGame() {
    let objects = this.state.objects;
    let objSources = this.state.objSources;

    objects = objects.filter((v) => v.status != "obj-off");
    for (const obj of objects) {
      if (
        obj.status == "obj-show" &&
        Math.random() > this.state.objectLifeProb
      ) {
        obj.status = "obj-off";
      }
      if (obj.status == "obj-on") {
        obj.status = "obj-show";
      }
    }
    for (let i = 0; i < this.state.newCount; i++) {
      let x =
        "calc(" +
        Math.floor(Math.random() * this.state.gridSize) *
          (100 / this.state.gridSize) +
        "% + " +
        50 / this.state.gridSize +
        "% - " +
        this.state.objectBounds.width / 2 +
        "px)";
      let y =
        "calc(" +
        Math.floor(Math.random() * this.state.gridSize) *
          (100 / this.state.gridSize) +
        "% + " +
        50 / this.state.gridSize +
        "% - " +
        this.state.objectBounds.height / 2 +
        "px)";

      let found = objects.filter((v) => v.x == x && v.y == y);

      if (found.length == 0) {
        objects.push({
          id: "obj" + this.counter++,
          x,
          y,
          type: objSources[Math.floor(Math.random() * objSources.length)],
          status: "obj-on",
          spin: Math.random() > 0.5 ? "spin-pl" : "spin-cw",
        });
      }
    }

    this.setState({
      ...this.state,
      objects,
    });
  }

  closeButton_clickHandler(event) {
    this.store.dispatch(setStoreData({ currentPage: "main" }));
  }

  finishButton_clickHandler(event) {
    this.stopGame();
    this.store.dispatch(setStoreData({ currentPage: "finish" }));
  }

  render() {
    let children = [];
    children.push(this.props.children);

    let objs = [];

    for (let i = 0; i < this.state.objects.length; i++) {
      let obj = this.state.objects[i];
      objs.push(
        <div
          className={"gameObjectBox " + obj.status}
          id={obj.id}
          key={obj.id}
          style={{
            left: obj.x,
            top: obj.y,
            width: this.state.objectBounds.width,
            height: this.state.objectBounds.height,
            transitionDuration: this.state.transitionDuration + "ms",
            transitionDelay:
              Math.random() * this.state.transitionDuration + "ms",
          }}
        >
          <div
            className={"gameObject " + obj.spin}
            style={{ backgroundImage: `url(${obj.type.src})` }}
          ></div>
        </div>
      );
    }

    return (
      <div className="gamePage" ref={this.ref}>
        <div className="gameScene">{objs}</div>
        <div className="countdown">
          {this.state.gameDuration - this.state.countdown}
        </div>

        {/* <div className="dark-button" onClick={this.closeButton_clickHandler}>
          Назад
        </div>
        <div className="light-button" onClick={this.finishButton_clickHandler}>
          Финиш
        </div> */}
      </div>
    );
  }
}

export default GamePage;
