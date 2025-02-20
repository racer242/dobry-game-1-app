import React from "react";
import "../css/game2.css";
import GamePage from "./GamePage";

class Game2Page extends GamePage {
  constructor(props) {
    super(props);

    let objects = [];
    for (let i = 0; i < this.state.game2.objSources.length; i++) {
      objects.push({
        ...this.state.game2.objSources[i],
        id: "obj" + this.counter++,
        status: "obj-off",
        life: Math.random() * this.state.game2.deadCount,
      });
    }

    this.state = {
      ...this.state,
      gameDuration: this.state.game2.gameDuration,
      stopDuration: this.state.game2.stopDuration,
      stepDuration: this.state.game2.stepDuration,
      objects,
      bonuses: [],
    };

    this.refLight = React.createRef();
    this.refScene = React.createRef();

    this.scene_moveHandler = this.scene_moveHandler.bind(this);
  }

  doStart() {
    super.doStart();
    this.lightContainer = this.refLight.current;
    this.lightScene = this.refScene.current;
  }

  doGame() {
    let objects = this.state.objects;
    let bonuses = this.state.bonuses;

    bonuses = bonuses.filter((v) => v.status != "bonus-destroy");
    for (const bonus of bonuses) {
      if (bonus.status == "bonus-show") {
        bonus.status = "bonus-destroy";
      }
      if (bonus.status == "bonus-on") {
        bonus.status = "bonus-show";
      }
    }

    for (const obj of objects) {
      if (obj.status == "obj-show") {
        obj.status = "obj-on";
        obj.life =
          Math.random() * this.state.game2.lifeCount +
          this.state.game2.lifeCount;
      }

      if (obj.status == "obj-off") {
        obj.life--;
        if (obj.life < 0) {
          obj.status = "obj-show";
        }
      }

      if (obj.status == "obj-on") {
        obj.life--;
        if (obj.life < 0) {
          obj.status = "obj-off";
          obj.life =
            Math.random() * this.state.game2.deadCount +
            this.state.game2.deadCount;
        }
      }

      if (obj.status == "obj-kill") {
        obj.life--;
        if (obj.life < 0) {
          obj.status = "obj-off";
          obj.life =
            Math.random() * this.state.game2.deadCount +
            this.state.game2.deadCount;
        }
      }

      if (obj.status == "obj-killing") {
        obj.life--;
        if (obj.life < 0) {
          obj.status = "obj-kill";
          obj.life =
            Math.random() * this.state.game2.killCount +
            this.state.game2.killCount;
        }
      }
    }

    this.setState({
      ...this.state,
      objects,
      bonuses,
    });
  }

  scene_moveHandler(event) {
    let b = event.currentTarget.getBoundingClientRect();
    let x = (event.clientX - b.x) / this.props.bounds.pageScale;
    let y = (event.clientY - b.y) / this.props.bounds.pageScale;

    if (this.props.bounds.mobileSize) {
      x /= this.state.mobileBounds.height / this.state.desktopBounds.height;
      y /= this.state.mobileBounds.height / this.state.desktopBounds.height;
    }

    let lx = x - this.state.game2.lightSize / 2;
    let ly = y - this.state.game2.lightSize / 2;

    this.lightContainer.style.left = lx + "px";
    this.lightContainer.style.top = ly + "px";
    this.lightScene.style.left = -lx + "px";
    this.lightScene.style.top = -ly + "px";

    let changed = false;
    let objects = this.state.objects;
    let bonuses = this.state.bonuses;
    let score = 0;
    for (const obj of this.state.objects) {
      if (
        x > obj.x &&
        x < obj.x + obj.width &&
        y > obj.y &&
        y < obj.y + obj.height
      ) {
        if (obj.status == "obj-on") {
          obj.status = "obj-killing";
          obj.life = this.state.game2.killingCount;
          changed = true;

          let bonusValue = obj.type.bonus;
          score = Math.max(this.state.score + bonusValue, 0);
          bonuses.push({
            id: "bonus" + this.counter++,
            cssX: lx + "px",
            cssY: ly + "px",
            value: bonusValue,
            status: "bonus-on",
          });
        }
      }
    }
    if (changed) {
      this.setState({
        ...this.state,
        objects,
        bonuses,
        score,
      });
    }
  }

  render() {
    let objs = [];
    for (let i = 0; i < this.state.objects.length; i++) {
      let obj = this.state.objects[i];
      objs.push(
        <div
          className={
            "g2-gameObjectBox " +
            "g2-" +
            obj.status +
            (this.state.finished ? " g2-obj-stop" : "")
          }
          id={obj.id}
          key={obj.id}
          style={{
            left: obj.x,
            top: obj.y,
            width: obj.width,
            height: obj.height,
            transitionDelay:
              Math.random() * this.state.game2.transitionDuration + "ms",
          }}
          onClick={this.objButton_clickHandler}
        >
          <div
            className={"g2-gameObject swing"}
            style={{
              backgroundImage: `url(${obj.type.src})`,
              pointerEvents: "none",
            }}
          ></div>
        </div>
      );
    }

    let bonuses = [];
    for (let i = 0; i < this.state.bonuses.length; i++) {
      let bonus = this.state.bonuses[i];
      bonuses.push(
        <div
          className="g2-gameBonusBox bonusUp"
          id={bonus.id}
          key={bonus.id}
          style={{
            left: bonus.cssX,
            top: bonus.cssY,
            width: this.state.game2.objectBounds.width,
            height: this.state.game2.objectBounds.height,
          }}
        >
          <div
            className={
              "g2-gameBonus" + (bonus.value > 0 ? "" : " g2-negativeBonus")
            }
            style={{
              backgroundImage: `url(${require("../images/game2/bonus.png")})`,
              pointerEvents: "none",
            }}
          >
            {bonus.value > 0 ? "+" + bonus.value : bonus.value}
          </div>
        </div>
      );
    }

    return (
      <div className="gamePage">
        <div className="gameScene">
          <div
            className="g2-gameScene"
            style={{
              left: "50%",
              top: "50%",
              transform:
                "translate(-50%, -50%)" +
                (this.props.bounds.mobileSize
                  ? " scale(" +
                    this.state.mobileBounds.height /
                      this.state.desktopBounds.height +
                    ")"
                  : ""),
              width: this.state.desktopBounds.width,
              height: this.state.desktopBounds.height,
            }}
            onPointerDown={this.scene_moveHandler}
            onPointerMove={this.scene_moveHandler}
          >
            <div className="g2-inactiveLayer">{objs}</div>

            <div
              className="g2-light"
              ref={this.refLight}
              style={{
                width: this.state.game2.lightSize,
                height: this.state.game2.lightSize,
              }}
            >
              <div
                className="g2-lightScene"
                ref={this.refScene}
                style={{
                  width: this.state.desktopBounds.width,
                  height: this.state.desktopBounds.height,
                }}
              >
                {objs}
              </div>
            </div>
            {bonuses}
          </div>
        </div>
        <div className="countdown g2-countdown">
          {this.state.game2.gameDuration - this.state.countdown}
        </div>
        <div className="score g2-score">{this.state.score}</div>
      </div>
    );
  }
}

export default Game2Page;
