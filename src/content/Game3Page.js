import React from "react";
import "../css/game3.css";
import GamePage from "./GamePage";

class Game3Page extends GamePage {
  constructor(props) {
    super(props);

    let objects = [];
    // for (let i = 0; i < this.state.game3.objSources.length; i++) {
    //   objects.push({
    //     ...this.state.game3.objSources[i],
    //     id: "obj" + this.counter++,
    //     status: "obj-off",
    //   });
    // }

    let cells = [];
    for (let i = 0; i < this.state.game3.matrixSize[0]; i++) {
      for (let j = 0; j < this.state.game3.matrixSize[1]; j++) {
        let cell = {
          id: i + " " + j,
          x:
            j *
            (this.state.game3.cellBounds.width +
              this.state.game3.cellBounds.gapX),
          y:
            i *
            (this.state.game3.cellBounds.height +
              this.state.game3.cellBounds.gapY),
          width: this.state.game3.cellBounds.width,
          height: this.state.game3.cellBounds.height,
          color: this.state.game3.cellColors[i],
        };
        cells.push(cell);
      }
    }
    console.log(cells);

    this.state = {
      ...this.state,
      gameDuration: this.state.game3.gameDuration,
      stopDuration: this.state.game3.stopDuration,
      stepDuration: this.state.game3.stepDuration,
      objects,
      cells,
      cellsWidth:
        this.state.game3.matrixSize[1] *
          (this.state.game3.cellBounds.width +
            this.state.game3.cellBounds.gapX) -
        this.state.game3.cellBounds.gapX,
      cellsHeight:
        this.state.game3.matrixSize[1] *
          (this.state.game3.cellBounds.height +
            this.state.game3.cellBounds.gapY) -
        this.state.game3.cellBounds.gapY,
      bonuses: [],
    };

    this.scene_moveHandler = this.scene_moveHandler.bind(this);
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
      }
      if (bonus.status == "bonus-on") {
        bonus.status = "bonus-show";
        bonus.life = this.state.game2.bonusLife;
      }
    }

    for (const obj of objects) {
      if (obj.status == "obj-show") {
        obj.status = "obj-on";
        break;
      }

      if (obj.status == "obj-hide") {
        obj.status = "obj-off";
        break;
      }

      if (obj.status == "obj-off") {
      }

      if (obj.status == "obj-on") {
      }
    }

    this.setState({
      ...this.state,
      objects,
      bonuses,
    });
  }

  scene_moveHandler(event) {
    if (this.state.finished) return;

    let objects = this.state.objects;
    let bonuses = this.state.bonuses;
    let score = 0;
    for (const obj of this.state.objects) {
      if (true) {
        if (true) {
          obj.status = "obj-off";
          let bonusValue = obj.type.bonus;
          score = Math.max(this.state.score + bonusValue, 0);
          bonuses.push({
            id: "bonus" + this.counter++,
            cssX: 0 + "px",
            cssY: 0 + "px",
            value: bonusValue,
            status: "bonus-on",
          });
          this.setState({
            ...this.state,
            objects,
            bonuses,
            score,
          });
        }
      }
    }
  }

  render() {
    let objs = [];
    let cells = [];
    for (let i = 0; i < this.state.cells.length; i++) {
      let cell = this.state.cells[i];
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
            width: cell.width + "px",
            height: cell.height + "px",

            transitionDuration: this.state.game3.transitionDuration + "ms",
          }}
          onClick={this.objButton_clickHandler}
        >
          <div
            className="g3-cellPlate"
            style={{ backgroundColor: cell.color }}
          ></div>
        </div>
      );

      // let obj = this.state.objects[i];
      // objs.push(
      //   <div
      //     className={
      //       "g3-gameObjectBox " +
      //       "g3-" +
      //       obj.status +
      //       (this.state.finished ? " g3-obj-stop" : "")
      //     }
      //     id={obj.id}
      //     key={obj.id}
      //     style={{
      //       left: obj.x,
      //       top: obj.y,
      //       width: obj.width,
      //       height: obj.height,
      //       transitionDuration: this.state.game3.transitionDuration + "ms",
      //       transitionDelay:
      //         Math.random() * this.state.game3.transitionDuration + "ms",
      //     }}
      //     onClick={this.objButton_clickHandler}
      //   >
      //     <div
      //       className={"g3-gameObject"}
      //       style={{
      //         backgroundImage: `url(${obj.type.src})`,
      //         pointerEvents: "none",
      //       }}
      //     ></div>
      //   </div>
      // );
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
            width: this.state.game3.objectBounds.width,
            height: this.state.game3.objectBounds.height,
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
            }}
            onPointerDown={this.scene_moveHandler}
            onPointerMove={this.scene_moveHandler}
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
            </div>
            {bonuses}
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

export default Game3Page;
