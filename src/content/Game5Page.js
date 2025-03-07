import React from "react";
import "../css/game5.css";
import GamePage from "./GamePage";

class Game5Page extends GamePage {
  constructor(props) {
    super(props);

    let objects = [];
    for (let i = 0; i < this.state.game5.objSources.length; i++) {
      let obj = {
        ...this.state.game5.objSources[i],
        id: "obj" + this.counter++,
        status: "obj-off",
        isFound: false,
      };
      objects.push(obj);
    }

    let zRadius = Math.floor(this.state.game5.sceneWidth / (2 * Math.PI)) - 3;

    this.state = {
      ...this.state,
      gameDuration: this.state.game5.gameDuration,
      stopDuration: this.state.game5.stopDuration,
      stepDuration: this.state.game5.stepDuration,
      objects,
      idle: true,
      rotation: 0,
      speed: this.state.game5.idleSpeed,
      rotation: 0,
      startRotation: 0,
      zRadius,
    };

    this.obj_clickHandler = this.obj_clickHandler.bind(this);
    this.scene_downHandler = this.scene_downHandler.bind(this);
    this.scene_moveHandler = this.scene_moveHandler.bind(this);
    this.scene_upHandler = this.scene_upHandler.bind(this);
  }

  doStart() {
    super.doStart();
  }

  doGame() {
    let objects = this.state.objects;

    let rotation = this.state.rotation;
    let speed = this.state.speed;

    if (this.state.idle) {
      let sign = Math.sign(speed);
      if (sign === 0) sign = 1;
      speed = Math.abs(speed);
      speed -= this.state.game5.inertia;
      if (speed < this.state.game5.idleSpeed)
        speed = this.state.game5.idleSpeed;
      speed *= sign;
      rotation += speed;
    }

    this.setState({
      ...this.state,
      objects,
      rotation,
      speed,
    });
    return true;
  }

  obj_clickHandler(event) {
    if (this.state.finished) return;
    this.stopGame();
    this.finishGame();
  }

  scene_downHandler(event) {
    if (this.state.finished) return;
    let idle = false;
    let speed = 0;
    let rotation = this.state.rotation;
    this.setState({
      ...this.state,
      idle,
      speed,
      startRotation: rotation,
    });
  }

  scene_moveHandler(event) {
    if (this.state.finished) return;
    if (!this.state.idle) {
      let speed = this.state.speed;
      let startRotation = this.state.startRotation;
      let rotation = this.state.rotation;

      rotation += (event.movementX * 180) / (this.state.zRadius * Math.PI);

      speed = event.movementX;
      this.setState({
        ...this.state,
        speed,
        rotation,
      });
    }
  }

  scene_upHandler(event) {
    if (this.state.finished) return;
    let idle = true;
    this.setState({
      ...this.state,
      idle,
    });
  }

  render() {
    let sections = [];
    let zRadius = this.state.zRadius;
    for (let i = 0; i < this.state.game5.sectionCount; i++) {
      sections.push(
        <div
          className="g5-section"
          id={"section" + i}
          key={"section" + i}
          style={{
            left: 0,
            top: 0,
            width:
              this.state.game5.sceneWidth / this.state.game5.sectionCount +
              "px",
            height: this.state.game5.sceneHeight + "px",
            backgroundSize:
              this.state.game5.sceneWidth +
              "px " +
              this.state.game5.sceneHeight +
              "px",
            backgroundPosition:
              (i * this.state.game5.sceneWidth) /
                this.state.game5.sectionCount +
              "px 0px",
            transform:
              "rotateY(" +
              -(i * 360) / this.state.game5.sectionCount +
              "deg) translateZ(" +
              zRadius +
              "px)",
          }}
        ></div>
      );
    }

    return (
      <div className="gamePage">
        <div
          className="gameScene"
          onPointerDown={this.scene_downHandler}
          onPointerMove={this.scene_moveHandler}
          onPointerUp={this.scene_upHandler}
          onPointerLeave={this.scene_upHandler}
        >
          <div
            className="g5-gameScene"
            style={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: this.props.bounds.mobileSize
                ? this.state.mobileBounds.width
                : this.state.desktopBounds.width,
              height: this.props.bounds.mobileSize
                ? this.state.mobileBounds.height
                : this.state.desktopBounds.height,
              pointerEvents: this.state.activityEnabled ? "all" : "none",
            }}
          >
            <div
              className="g5-frame"
              style={{
                transform:
                  "rotateX(10deg) rotateY(0deg) rotateZ(0deg) translate3d(" +
                  this.state.desktopBounds.width / 2 +
                  "px,50px, 0px)",
              }}
            >
              <div
                className="g5-cylinder"
                style={{
                  width: 0,
                  height: 0,
                  left: 0,
                  top: 0,
                  transform:
                    "scale(1) rotateY(" +
                    this.state.rotation +
                    "deg) translateX(-20px)",
                  transition: this.state.idle
                    ? "transform " + this.state.game5.stepDuration + "ms linear"
                    : "transform " +
                      this.state.game5.dragDuration +
                      "ms linear",
                }}
              >
                {sections}
                <div
                  key="obj"
                  className="g5-obj"
                  style={{
                    top: 60,
                    transform:
                      "rotateY(" +
                      133 +
                      "deg) translateZ(" +
                      (zRadius + 10) +
                      "px)",
                  }}
                  onClick={this.obj_clickHandler}
                ></div>
              </div>
            </div>
            <div className="g5-fade-left"></div>
            <div className="g5-fade-right"></div>
          </div>
        </div>
        <div className="countdown g5-countdown">
          {this.state.game5.gameDuration - this.state.countdown}
        </div>
      </div>
    );
  }
}

export default Game5Page;
