import React, { Component } from "react";
import { setStoreData } from "../actions/appActions";

import { ReactComponent as RAY_RED } from "../images/game2/ray-red.svg";
import { ReactComponent as RAY_PINK } from "../images/game2/ray-pink.svg";
import { ReactComponent as RAY_PURPLE } from "../images/game2/ray-purple.svg";
import { ReactComponent as RAY_YELLOW } from "../images/game2/ray-yellow.svg";

class Main2Page extends Component {
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
      <div className="g2 mainPage">
        <div className="pageBg"></div>

        <div className="rays-left">
          <RAY_YELLOW className="ray" style={{ left: -98 }} />
          <RAY_PURPLE className="ray" style={{ left: -64 }} />
          <RAY_YELLOW className="ray" style={{ left: -18 }} />
          <RAY_PINK className="ray" style={{ left: 30 }} />
          <RAY_YELLOW className="ray" style={{ left: 67 }} />
          <RAY_PURPLE className="ray" style={{ left: 128 }} />
        </div>
        <div className="rays-right">
          <RAY_PINK className="ray" style={{ left: -93 }} />
          <RAY_YELLOW className="ray" style={{ left: -41 }} />
          <RAY_PURPLE className="ray" style={{ left: -6 }} />
          <RAY_YELLOW className="ray" style={{ left: 46 }} />
          <RAY_PINK className="ray" style={{ left: 80 }} />
          <RAY_YELLOW className="ray" style={{ left: 127 }} />
        </div>
        <div className="lamps-left"></div>
        <div className="lamps-right"></div>
        <div className="people"></div>
        <div className="head appear-zoom">
          <div className="logo floating"></div>
          <h1>В свете софитов</h1>
        </div>
        <div className="plate appear-top delay500ms">
          <h3>
            Сделай настоящее шоу со звездой на сцене! Главное - не упускать ее
            из виду прожекторов, ведь она так любит внезапно появляться в разных
            местах сцены.
          </h3>
          <p className="orange">
            Звезда появляется на сцене, а ты подсвечивай её прожектором, для
            этого подведи луч к звезде за 2 секунды. Если пропустил три попытки
            поймать образ, то игра прекращается. Игра продлится 60 секунд, а за
            каждую удачную подсветку начисляется +1.
          </p>
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

export default Main2Page;
