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
        status: "obj-on",
        life: 0,
      });
    }

    this.state = {
      ...this.state,
      objects,
      bonuses: [],
    };

    this.objButton_clickHandler = this.objButton_clickHandler.bind(this);
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
        obj.life++;
        if (obj.life > obj.type.lifeCount + Math.random() * obj.type.lifeProb) {
          obj.status = "obj-off";
        }
      }

      if (obj.status == "obj-on") {
        obj.status = "obj-show";
      }
    }

    this.setState({
      ...this.state,
      objects,
      bonuses,
    });
  }

  objButton_clickHandler(event) {}

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
            transitionDuration:
              obj.status === "obj-show"
                ? this.state.game2.transitionDuration + "ms"
                : "",
            transitionDelay:
              obj.status === "obj-show"
                ? Math.random() * this.state.game2.transitionDuration + "ms"
                : "0ms",
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
      <div className="gamePage" ref={this.ref}>
        <div className="gameScene">
          {objs}
          {bonuses}
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
