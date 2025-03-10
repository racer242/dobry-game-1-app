import React from "react";
import "../css/game1.css";
import GamePage from "./GamePage";

class Game1Page extends GamePage {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      objects: [],
      bonuses: [],
      gameDuration: this.state.game1.gameDuration,
      stopDuration: this.state.game1.stopDuration,
      stepDuration: this.state.game1.stepDuration,
    };

    this.objButton_clickHandler = this.objButton_clickHandler.bind(this);
  }

  updateObjBounds(obj) {
    obj.cssX =
      "calc(" +
      obj.x * (100 / this.state.game1.gridSize) +
      "% + " +
      50 / this.state.game1.gridSize +
      "% - " +
      this.state.game1.objectBounds.width / 2 +
      "px)";
    obj.cssY =
      "calc(" +
      obj.y * (100 / this.state.game1.gridSize) +
      "% + " +
      50 / this.state.game1.gridSize +
      "% - " +
      this.state.game1.objectBounds.height / 2 +
      "px)";
    return obj;
  }

  doGame() {
    let objects = this.state.objects;
    let objSources = this.state.game1.objSources;
    let bonuses = this.state.bonuses;

    bonuses = bonuses.filter((v) => v.status != "bonus-destroy");
    for (const bonus of bonuses) {
      if (bonus.status == "bonus-show") {
        bonus.life--;
        if (bonus.life < 0) {
          bonus.status = "bonus-destroy";
        }
      }
      if (bonus.status == "bonus-on") {
        bonus.status = "bonus-show";
        bonus.life = this.state.game2.bonusLife;
      }
    }

    objects = objects.filter((v) => v.status != "obj-destroy");
    for (const obj of objects) {
      if (obj.status == "obj-off") {
        obj.status = "obj-destroy";
      }

      if (obj.status == "obj-kill-1") {
        obj.status = "obj-destroy";
      }
      if (obj.status == "obj-kill") {
        obj.status = "obj-kill-1";
      }

      if (obj.status == "obj-show") {
        obj.life++;
        obj.x = obj.baseX + Math.sign(Math.random() * 1 - 0.5) * obj.type.speed;
        obj.y = obj.baseY + Math.sign(Math.random() * 1 - 0.5) * obj.type.speed;

        this.updateObjBounds(obj);
        if (obj.life > obj.type.lifeCount + Math.random() * obj.type.lifeProb) {
          obj.status = "obj-off";
        }
      }

      if (obj.status == "obj-on") {
        obj.status = "obj-show";
      }
    }
    for (let i = 0; i < this.state.game1.newCount; i++) {
      let x = Math.floor(Math.random() * this.state.game1.gridSize);
      let y = Math.floor(Math.random() * this.state.game1.gridSize);

      let found = objects.filter((v) => v.baseX == x && v.baseY == y);
      if (found.length > 0) continue;

      objects.push({
        id: "obj" + this.counter++,
        x,
        y,
        baseX: x,
        baseY: y,
        ...this.updateObjBounds({ x, y }),
        type: objSources[Math.floor(Math.random() * objSources.length)],
        status: "obj-on",
        life: 0,
      });
    }

    this.setState({
      ...this.state,
      objects,
      bonuses,
    });

    return true;
  }

  objButton_clickHandler(event) {
    let objects = this.state.objects;
    let bonuses = this.state.bonuses;
    let bonusValue = 0;
    let objs = objects.filter((v) => v.id == event.target.id);
    if (objs.length > 0) {
      let obj = objs[0];

      bonusValue = obj.type.bonus;
      bonuses.push({
        id: "bonus" + this.counter++,
        cssX: event.target.offsetLeft,
        cssY: event.target.offsetTop,
        value: bonusValue,
        status: "bonus-on",
      });

      obj.status = "obj-kill";
      event.target.classList.add("g1-obj-kill");
    }
    let score = Math.max(this.state.score + bonusValue, 0);

    this.setState({
      ...this.state,
      objects,
      bonuses,
      score,
    });
  }

  render() {
    let objs = [];
    for (let i = 0; i < this.state.objects.length; i++) {
      let obj = this.state.objects[i];
      objs.push(
        <div
          className={
            "g1-gameObjectBox " +
            "g1-" +
            obj.status +
            (this.state.finished ? " g1-obj-stop" : "")
          }
          id={obj.id}
          key={obj.id}
          style={{
            left: obj.cssX,
            top: obj.cssY,
            width: this.state.game1.objectBounds.width,
            height: this.state.game1.objectBounds.height,
            transitionDuration:
              obj.status === "obj-show"
                ? this.state.game1.transitionDuration + "ms"
                : "",
            transitionDelay:
              obj.status === "obj-show"
                ? Math.random() * this.state.game1.transitionDuration + "ms"
                : "0ms",
          }}
          onClick={this.objButton_clickHandler}
        >
          <div
            className={"g1-gameObject swing"}
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
          className="g1-gameBonusBox bonusUp"
          id={bonus.id}
          key={bonus.id}
          style={{
            left: bonus.cssX,
            top: bonus.cssY,
            width: this.state.game1.bonusBounds.width,
            height: this.state.game1.bonusBounds.height,
          }}
        >
          <div
            className={
              "g1-gameBonus" + (bonus.value > 0 ? "" : " g1-negativeBonus")
            }
            style={{
              backgroundImage: `url(${require("../images/game1/bonus.svg")})`,
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
          <div className="pageBg g1 pulsing"></div>
          {objs}
          {bonuses}
        </div>
        <div className="countdown g1-countdown">
          {this.state.game1.gameDuration - this.state.countdown}
        </div>
        <div className="score display g1">{this.state.score}</div>
      </div>
    );
  }
}

export default Game1Page;
