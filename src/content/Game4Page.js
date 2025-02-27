import React from "react";
import "../css/game4.css";
import GamePage from "./GamePage";

class Game4Page extends GamePage {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      gameDuration: this.state.game3.gameDuration,
      stopDuration: this.state.game3.stopDuration,
      stepDuration: this.state.game3.stepDuration,
      bonuses: [],
    };

    this.game_clickHandler = this.game_clickHandler.bind(this);
  }

  doStart() {
    super.doStart();
  }

  doGame() {
    let objects = this.state.objects;
    let bonuses = this.state.bonuses;

    bonuses = bonuses.filter((v) => v.status != "bonus-destroy");
    for (const bonus of bonuses) {
      if (bonus.status == "bonus-show") {
        bonus.life--;
        if (bonus.life < 0) {
          bonus.status = "bonus-destroy";
        }
        continue;
      }
      if (bonus.status == "bonus-on") {
        bonus.status = "bonus-show";
        bonus.life = this.state.game2.bonusLife;
        continue;
      }
    }

    this.setState({
      ...this.state,
      objects,
      bonuses,
    });
    return true;
  }

  game_clickHandler(event) {
    let objects = this.state.objects;
    let bonuses = this.state.bonuses;
    let bonusValue = 0;

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
    let cells = [];
    for (let i = 0; i < this.state.cells.length; i++) {
      let cell = this.state.cells[i];
      let obj = cell.obj;
      cells.push(
        <div
          className={
            "g3-cellBox" + (this.state.finished ? " g3-cell-stop" : "")
          }
          id={cell.id}
          key={cell.id}
          style={{
            left: cell.x + "px",
            top: cell.y + "px",
            transitionDuration: this.state.game3.transitionDuration + "ms",
          }}
          onPointerDown={this.game_clickHandler}
        >
          <div
            className="g3-cellPlate"
            style={{
              backgroundColor: cell.color,
              transitionDuration: this.state.game3.transitionDuration + "ms",
              animationDelay:
                this.state.aniMode == "rows"
                  ? (this.state.game3.animationDuration / 4) * cell.row + "ms"
                  : this.state.aniMode == "columns"
                  ? (this.state.game3.animationDuration / 4) * cell.column +
                    "ms"
                  : (this.state.game3.animationDuration / 4) *
                      (cell.column + cell.row) +
                    "ms",
              animationName: "color-switch",
              animationDuration: this.state.game3.animationDuration + "ms",
              animationIterationCount: "infinite",
            }}
          >
            <div
              className={
                "g3-gameObjectBox " +
                "g3-" +
                obj.status +
                (this.state.finished ? " g3-obj-stop" : "")
              }
              id={obj.id}
              key={obj.id}
              style={{
                transitionDuration: this.state.game3.transitionDuration + "ms",
              }}
            >
              <div
                className={"g3-gameObject"}
                style={{
                  backgroundImage: `url(${obj.type.src})`,
                  pointerEvents: "none",
                }}
              ></div>
            </div>
          </div>
        </div>
      );
    }

    let bonuses = [];
    for (let i = 0; i < this.state.bonuses.length; i++) {
      let bonus = this.state.bonuses[i];
      bonuses.push(
        <div
          className="g3-gameBonusBox bonusUp"
          id={bonus.id}
          key={bonus.id}
          style={{
            left: bonus.cssX,
            top: bonus.cssY,
            width: this.state.game3.bonusBounds.width,
            height: this.state.game3.bonusBounds.height,
          }}
        >
          <div
            className={
              "g3-gameBonus" + (bonus.value > 0 ? "" : " g3-negativeBonus")
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
            className="g3-gameScene"
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
              className="g3-gameSceneBg"
              style={{
                width: this.props.bounds.mobileSize
                  ? this.state.mobileBounds.height
                  : this.state.desktopBounds.width,
                height: this.props.bounds.mobileSize
                  ? this.state.mobileBounds.width
                  : this.state.desktopBounds.height,
                left: "50%",
                top: "50%",
                transform:
                  "translate(-50%, -50%) " +
                  (this.props.bounds.mobileSize ? "rotate(270deg)" : ""),
              }}
            ></div>

            <div
              className="g3-gameCellsBlock"
              style={{
                width: this.state.cellsWidth,
                height: this.state.cellsHeight,
                left: this.props.bounds.mobileSize ? "45%" : "50%",
                top: this.props.bounds.mobileSize ? "50%" : "45%",
              }}
            >
              {cells}
              {bonuses}
            </div>
          </div>
        </div>
        <div className="countdown g3-countdown">
          {this.state.game3.gameDuration - this.state.countdown}
        </div>
        <div className="score g3-score">{this.state.score}</div>
      </div>
    );
  }
}

export default Game4Page;
