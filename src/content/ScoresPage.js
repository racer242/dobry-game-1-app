import React, { Component } from "react";
import { setStoreData } from "../actions/appActions";

class ScoresPage extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;

    this.state = {};

    this.closeButton_clickHandler = this.closeButton_clickHandler.bind(this);
    this.startButton_clickHandler = this.startButton_clickHandler.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = this.store.subscribe(() => {
      this.onStoreChange();
    });
    this.mounted = true;
    this.store.dispatch(setStoreData({ loadStatusTable: true }));
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
  closeButton_clickHandler(event) {
    this.store.dispatch(setStoreData({ currentPage: "main" }));
  }

  render() {
    let children = [];
    children.push(this.props.children);

    return (
      <div className="scoresPage common">
        <div className="pageBg"></div>
        <div className="head appear-opacity">
          <h1>Участие в розыгрышах</h1>
        </div>
        <div className="scores-layout">
          <div className="scores-info with-plate appear-top">
            <div className="scores-info-plate">
              <h3>У тебя</h3>
              <h2 className="yellow">240 очков и</h2>
              <h2 className="pink">1145-е место</h2>
              <h3>в рейтинге текущей недели</h3>
            </div>
            <p className="scores-info-comment small">
              Чтобы участвовать в розыгрыше, нужно войти в Топ-500 по очкам на
              неделе, сответствующей розыгрышу.
            </p>
          </div>
          <div className="scores-info with-table appear-top delay500ms">
            <h3>Статусы по неделям</h3>
            <div className="scores-table table">
              <ul className="scores-head white">
                <li>Розыгрыш</li>
                <li>Место</li>
                <li>Участие</li>
              </ul>
              <div className="scores-body black">
                <ul className="scores-row">
                  <li>01.04-07.04</li>
                  <li>4234</li>
                  <li>нет</li>
                </ul>
                <ul className="scores-row">
                  <li>01.04-07.04</li>
                  <li>4234</li>
                  <li>нет</li>
                </ul>
                <ul className="scores-row">
                  <li>01.04-07.04</li>
                  <li>4234</li>
                  <li>нет</li>
                </ul>
                <ul className="scores-row">
                  <li>01.04-07.04</li>
                  <li>4234</li>
                  <li>нет</li>
                </ul>
                <ul className="scores-row">
                  <li>01.04-07.04</li>
                  <li>4234</li>
                  <li>нет</li>
                </ul>
                <ul className="scores-row">
                  <li>01.04-07.04</li>
                  <li>4234</li>
                  <li>нет</li>
                </ul>
                <ul className="scores-row">
                  <li>01.04-07.04</li>
                  <li>4234</li>
                  <li>нет</li>
                </ul>
                <ul className="scores-row">
                  <li>01.04-07.04</li>
                  <li>4234</li>
                  <li>нет</li>
                </ul>
                <ul className="scores-row">
                  <li>01.04-07.04</li>
                  <li>4234</li>
                  <li>нет</li>
                </ul>
                <ul className="scores-row">
                  <li>01.04-07.04</li>
                  <li>4234</li>
                  <li>нет</li>
                </ul>
                <ul className="scores-row">
                  <li>01.04-07.04</li>
                  <li>4234</li>
                  <li>нет</li>
                </ul>
                <ul className="scores-row">
                  <li>01.04-07.04</li>
                  <li>4234</li>
                  <li>нет</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="button-group appear-bottom">
          <div
            className="secondary-button"
            onClick={this.closeButton_clickHandler}
          >
            Играть позже
          </div>
          <div
            className="primary-button"
            onClick={this.startButton_clickHandler}
          >
            Играть заново
          </div>
        </div>
      </div>
    );
  }
}

export default ScoresPage;
