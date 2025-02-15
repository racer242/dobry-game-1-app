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
    };

    this.closeButton_clickHandler = this.closeButton_clickHandler.bind(this);
    this.finishButton_clickHandler = this.finishButton_clickHandler.bind(this);
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
    }
  }

  stepGame() {
    this.doGame();
    if (this.timer != null) clearTimeout(this.timer);
    this.timer = setTimeout(
      this.stepGame.bind(this),
      this.state.gameStepDuration
    );
  }

  stopGame() {
    if (this.timer != null) clearTimeout(this.timer);
    this.timer = null;
    this.started = false;
  }

  doGame() {
    let oldObjects = this.state.objects;
    let objSources = this.state.objSources;

    oldObjects = oldObjects.filter((v) => v.status != "obj-off");
    for (const obj of oldObjects) {
      if (obj.status == "obj-show" && Math.random() > 0.7) {
        obj.status = "obj-off";
      }
      if (obj.status == "obj-on") {
        obj.status = "obj-show";
      }
    }

    let x =
      "calc(" +
      Math.floor(Math.random() * 5) * 20 +
      "% + 10% - " +
      this.state.objectBounds.width / 2 +
      "px)";
    let y =
      "calc(" +
      Math.floor(Math.random() * 5) * 20 +
      "% + 10% - " +
      this.state.objectBounds.height / 2 +
      "px)";

    let found = oldObjects.filter((v) => v.x == x && v.y == y);

    let newObjects = [];
    if (found.length == 0) {
      newObjects = [
        {
          id: "obj" + this.counter++,
          x,
          y,
          type: objSources[Math.floor(Math.random() * objSources.length)],
          status: "obj-on",
          spin: Math.random() > 0.5 ? "spin-pl" : "spin-cw",
        },
      ];
    }

    let objects = [...oldObjects, ...newObjects];
    this.setState({ ...this.state, objects });
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
        <h1>Игра</h1>
        <div className="dark-button" onClick={this.closeButton_clickHandler}>
          Назад
        </div>
        <div className="light-button" onClick={this.finishButton_clickHandler}>
          Финиш
        </div>
      </div>
    );
  }
}

export default GamePage;
