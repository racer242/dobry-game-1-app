import React, { Component } from "react";
import { setStoreData } from "../actions/appActions";

import { ReactComponent as MINUS } from "../images/game1/minus.svg";
import { ReactComponent as PLUS } from "../images/game1/plus.svg";
import { ReactComponent as LEFT } from "../images/game1/left.svg";
import { ReactComponent as RIGHT } from "../images/game1/right.svg";

class Main1Page extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
    if (this.store) {
      this.state = {
        ...this.store.getState(),
      };
    } else this.state = {};

    this.startButton_clickHandler = this.startButton_clickHandler.bind(this);
  }

  startButton_clickHandler(event) {
    this.store.dispatch(
      setStoreData({
        currentPage: "game",
      })
    );
  }

  render() {
    let children = [];
    children.push(this.props.children);

    return (
      <div className="mainPage g1">
        <div className="pageBg pulsing"></div>
        <div className="head appear-zoom">
          <div className="logo floating"></div>
          <h1>Лови Вайб</h1>
        </div>
        <div className="plate appear-top delay500ms">
          <h3>
            Лови вайб на Добрый Fest! Тапай на то, что даёт плюс вайб на
            фестивале, и набирай очки.
          </h3>
          <p className="orange">
            Нажимай на всё, что создаёт музыкальный вайб и получай +1 за каждый
            предмет. Если нажмешь на то, что его портит, очки вычитаются.
            Время игры - 60 секунд.
          </p>
          <div className="help">
            <img
              src={require("../images/game1/objects/bad/o1.png")}
              className="help-item"
              style={{ opacity: 0.3 }}
            ></img>
            <img
              src={require("../images/game1/objects/bad/o3.png")}
              className="help-item"
              style={{ opacity: 0.6 }}
            ></img>
            <img
              src={require("../images/game1/objects/bad/o4.png")}
              className="help-item"
            ></img>
            <MINUS className="help-item" />
            <LEFT className="help-item" />
            <RIGHT className="help-item" />
            <PLUS className="help-item" />
            <img
              src={require("../images/game1/objects/good/o5.png")}
              className="help-item"
            ></img>
            <img
              src={require("../images/game1/objects/good/o3.png")}
              className="help-item"
              style={{ opacity: 0.6 }}
            ></img>
            <img
              src={require("../images/game1/objects/good/o9.png")}
              className="help-item"
              style={{ opacity: 0.3 }}
            ></img>
          </div>
        </div>
        <div
          className="primary-button button appear-bottom delay1s"
          onClick={this.startButton_clickHandler}
        >
          Играть
        </div>
      </div>
    );
  }
}

export default Main1Page;
