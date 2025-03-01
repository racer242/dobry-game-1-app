import React from "react";
import "../css/game4.css";
import GamePage from "./GamePage";

class Game4Page extends GamePage {
  constructor(props) {
    super(props);

    let columns = [];
    for (let i = 0; i < this.state.game4.startColumnCount; i++) {
      this.addColumn(columns);
    }

    let position = this.state.desktopBounds.width;

    this.state = {
      ...this.state,
      gameDuration: this.state.game4.gameDuration,
      stopDuration: this.state.game4.stopDuration,
      stepDuration: this.state.game4.stepDuration,
      bonuses: [],
      parallax1: 0,
      parallax2: 0,
      parallax3: 0,
      position,
      columns,
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

    let parallax1 = this.state.parallax1 - this.state.game4.parallaxSpeed1;
    let parallax2 = this.state.parallax2 - this.state.game4.parallaxSpeed2;
    let parallax3 = this.state.parallax3 - this.state.game4.parallaxSpeed3;
    let position = this.state.position - this.state.game4.parallaxSpeed3;
    let columns = this.state.columns;
    if (
      -position + this.state.desktopBounds.width >
      columns.length * this.state.game4.columnDistance
    ) {
      this.addColumn(columns);
    }

    this.setState({
      ...this.state,
      objects,
      bonuses,
      parallax1,
      parallax2,
      parallax3,
      position,
      columns,
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

  addColumn(columns) {
    let column = {
      id: "column" + this.counter++,
      top: {
        ...this.state.game4.topSources[
          Math.floor(Math.random() * this.state.game4.topSources.length)
        ],
      },
      bottom: {
        ...this.state.game4.bottomSources[
          Math.floor(Math.random() * this.state.game4.topSources.length)
        ],
      },
    };
    let numColumns = columns.length;
    column.width = Math.max(column.top.width, column.bottom.width);
    column.height =
      column.top.height + column.bottom.height + this.state.game4.columnGap;

    column.x = numColumns * this.state.game4.columnDistance;
    column.y =
      (this.state.desktopBounds.height - column.height) / 2 +
      (0.5 - Math.random()) * this.state.game4.columnOffset;
    columns.push(column);
  }

  render() {
    let objs = [];
    let columns = [];

    for (let i = 0; i < this.state.columns.length; i++) {
      let column = this.state.columns[i];
      if (column.x + this.state.position > -column.width)
        columns.push(
          <div
            className="g4-column"
            id={column.id}
            key={column.id}
            style={{
              left: column.x,
              top: column.y,
              width: column.width,
              height: column.height,
            }}
          >
            <div
              className="g4-columnTop"
              style={{
                backgroundImage: `url(${column.top.src})`,
                width: column.top.width,
                height: column.top.height,
                top: 0,
              }}
            ></div>
            <div
              className="g4-columnBottom"
              style={{
                backgroundImage: `url(${column.bottom.src})`,
                width: column.bottom.width,
                height: column.bottom.height,
                bottom: 0,
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
          className="g3-gameBonusBox bonusUp"
          id={bonus.id}
          key={bonus.id}
          style={{
            left: bonus.cssX,
            top: bonus.cssY,
            width: this.state.game4.bonusBounds.width,
            height: this.state.game4.bonusBounds.height,
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
            className="g4-gameScene"
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
            onPointerDown={this.game_clickHandler}
          >
            <div
              className="g4-parallax1"
              style={{
                backgroundPositionX: this.state.parallax1,
                transitionDuration: this.state.game4.stepDuration + "ms",
              }}
            ></div>
            <div
              className="g4-parallax2"
              style={{
                backgroundPositionX: this.state.parallax2,
                transitionDuration: this.state.game4.stepDuration + "ms",
              }}
            ></div>
            <div
              className="g4-parallax3"
              style={{
                backgroundPositionX: this.state.parallax3,
                transitionDuration: this.state.game4.stepDuration + "ms",
              }}
            ></div>
            <div
              className="g4-columns"
              style={{
                transform: "translateX(" + this.state.position + "px)",
                transitionDuration: this.state.game4.stepDuration + "ms",
              }}
            >
              {columns}
            </div>
            {bonuses}
          </div>
        </div>
        <div className="countdown g4-countdown">
          {this.state.game2.gameDuration - this.state.countdown}
        </div>
        <div className="score g4-score">{this.state.score}</div>
      </div>
    );
  }
}

export default Game4Page;
