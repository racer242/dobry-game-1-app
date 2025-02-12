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
      <div className="scoresPage">
        <h1>У тебя 100500 очков и 123 место</h1>
        <h2>А вот топ-10</h2>
        <p>Таблица результатов</p>
        <div className="dark-button" onClick={this.closeButton_clickHandler}>
          Позже поиграю
        </div>
        <div className="light-button" onClick={this.startButton_clickHandler}>
          Играть еще раз
        </div>
      </div>
    );
  }
}

export default ScoresPage;
