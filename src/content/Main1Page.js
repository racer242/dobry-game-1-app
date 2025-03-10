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

    this.state = {};

    this.startButton_clickHandler = this.startButton_clickHandler.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = this.store.subscribe(() => {
      this.onStoreChange();
    });
    this.mounted = true;
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

  startButton_clickHandler(event) {
    this.store.dispatch(setStoreData({ currentPage: "game" }));
  }

  render() {
    let children = [];
    children.push(this.props.children);

    return (
      <div className="mainPage">
        <div className="pageBg g1 pulsing"></div>
        <div className="head">
          <div className="logo g1 floating"></div>
          <h1>Лови Вайб</h1>
        </div>
        <div className="plate">
          <h2>
            Лови вайб на Добрый Fest! Тапай на то, что даёт плюс вайб на
            фестивале, и набирай очки.
          </h2>
          <p>
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
          className="primary-button button"
          onClick={this.startButton_clickHandler}
        >
          Стартуем!
        </div>
      </div>
    );
  }
}

export default Main1Page;
