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
      power: false,
      parallax1: 0,
      parallax2: 0,
      parallax3: 0,
      position,
      columns,
      heroX: this.state.game4.heroStartPosition,
      heroY: this.state.desktopBounds.height / 2,
      heroPower: 0,
    };

    this.game_downHandler = this.game_downHandler.bind(this);
    this.game_upHandler = this.game_upHandler.bind(this);
  }

  doStart() {
    super.doStart();
    if (this.startTimer != null) clearTimeout(this.startTimer);
    this.startTimer = setTimeout(() => {
      this.setState({
        ...this.state,
        heroX: this.state.game4.heroXPosition,
      });
      this.startTimer = null;
    }, this.state.game4.stepDuration);
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

    let heroY = this.state.heroY;
    let heroPower = this.state.heroPower;

    if (this.state.power) {
      heroPower += this.state.game4.pushPower;
    }
    heroPower -= this.state.game4.heroWeight;

    heroY -= heroPower;

    if (heroY < 0) {
      heroY = 0;
      heroPower = 0;
    }
    if (heroY > this.state.desktopBounds.height) {
      heroY =
        this.state.desktopBounds.height - this.state.game4.heroBounds.height;
      heroPower = 0;
    }

    // let found = columns.filter((v) => v.x);

    this.setState({
      ...this.state,
      objects,
      bonuses,
      parallax1,
      parallax2,
      parallax3,
      position,
      columns,
      heroY,
      heroPower,
    });
    return true;
  }

  game_downHandler() {
    this.setState({
      ...this.state,
      power: true,
    });
  }
  game_upHandler() {
    this.setState({
      ...this.state,
      power: false,
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

    if (Math.random() > this.state.game4.bonusProp)
      column.bonus = {
        status: "bonus-on",
        ...this.state.game4.bonusBounds,
        x: (column.width - this.state.game4.bonusBounds.width) / 2,
        y: this.state.game4.bonusBounds.gap,
        glow: this.state.game4.bonusBounds.glow,
        glowX: (column.width - this.state.game4.bonusBounds.glow) / 2,
      };

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
            {column.bonus && (
              <>
                <div
                  className="g4-bonus-glow"
                  style={{
                    left: column.bonus.glowX,
                    width: column.bonus.glow,
                    height: column.bonus.glow,
                    bottom: column.bottom.height,
                  }}
                ></div>
                <div
                  className="g4-bonus"
                  style={{
                    left: column.bonus.x,
                    width: column.bonus.width,
                    height: column.bonus.height,
                    bottom: column.bottom.height + column.bonus.y,
                  }}
                ></div>
              </>
            )}
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

    let mobileScale =
      this.state.mobileBounds.height / this.state.desktopBounds.height;

    return (
      <div className="gamePage">
        <div
          className="gameScene"
          onPointerDown={this.game_downHandler}
          onPointerUp={this.game_upHandler}
        >
          <div
            className="g4-gameScene"
            style={{
              left: this.props.bounds.mobileSize
                ? (this.state.desktopBounds.width * mobileScale -
                    this.state.desktopBounds.width) /
                    2 -
                  this.state.game4.heroXPosition * mobileScale +
                  "px"
                : "50%",
              top: "50%",
              transform: this.props.bounds.mobileSize
                ? "translate(0, -50%)" + " scale(" + mobileScale + ")"
                : "translate(-50%, -50%)" + "",
              width: this.state.desktopBounds.width,
              height: this.state.desktopBounds.height,
            }}
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
            <div
              className="g4-hero"
              style={{
                left: this.state.heroX,
                transform: "translateY(" + this.state.heroY + "px)",
                width: this.state.game4.heroBounds.width,
                height: this.state.game4.heroBounds.height,
                transition:
                  "transform " +
                  this.state.game4.stepDuration +
                  "ms steps(100), " +
                  "left " +
                  this.state.game4.goHorizontalDuration +
                  "ms ease-out",
              }}
            >
              <div
                className="g4-hero-flame-container"
                style={
                  this.state.power
                    ? { transform: "rotate(-20deg) translateY(10px)" }
                    : {}
                }
              >
                <div className="g4-hero-flame"></div>
              </div>
              <div
                className="g4-hero-guitar"
                style={this.state.power ? { transform: "rotate(-20deg)" } : {}}
              ></div>
              <div
                className="g4-hero-cap"
                style={
                  this.state.heroPower < 0
                    ? {
                        transform: "translateY(" + this.state.heroPower + "px)",
                      }
                    : {}
                }
              ></div>
              <div
                className="g4-hero-glasses"
                style={
                  this.state.heroPower < 0
                    ? {
                        transform:
                          "translateY(" + this.state.heroPower / 2 + "px)",
                      }
                    : {}
                }
              ></div>
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
