import React, { Component } from "react";
import { setStoreData } from "../actions/appActions";

class Main5Page extends Component {
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
      <div className="g5 mainPage">
        <div className="pageBg"></div>

        <div className="bg"></div>
        <div className="fade-left"></div>
        <div className="fade-right"></div>
        <div className="head appear-zoom">
          <div className="logo floating"></div>
          <h1>Будь готов к&nbsp;Добрый Fest на&nbsp;все&nbsp;360°!</h1>
        </div>
        <div className="plate appear-top delay500ms">
          <p>
            Найди за 30 секунд брендированный объект. Крути изображение, ищи и
            нажимай.
          </p>
          <p className="green-plate">У тебя 2 попытки</p>
        </div>
        <div
          className="primary-button button appear-bottom delay1s"
          onClick={this.startButton_clickHandler}
        >
          Искать
        </div>
      </div>
    );
  }
}

export default Main5Page;
