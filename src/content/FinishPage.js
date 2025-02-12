import React, { Component } from "react";
import { setStoreData } from "../actions/appActions";

class FinishPage extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;

    this.ref = React.createRef();

    this.state = {};

    this.closeButton_clickHandler = this.closeButton_clickHandler.bind(this);
    this.startButton_clickHandler = this.startButton_clickHandler.bind(this);
    this.scoresButton_clickHandler = this.scoresButton_clickHandler.bind(this);
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

  scoresButton_clickHandler(event) {
    this.store.dispatch(setStoreData({ currentPage: "scores" }));
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
      <div className="gamePage" ref={this.ref}>
        <h1>Игра закончена</h1>
        <p>У тебя 100500 ошибок!</p>
        <div className="dark-button" onClick={this.closeButton_clickHandler}>
          Позже поиграю
        </div>
        <div className="light-button" onClick={this.scoresButton_clickHandler}>
          Смотреть результаты
        </div>
        <div className="light-button" onClick={this.startButton_clickHandler}>
          Играть еще раз
        </div>
      </div>
    );
  }
}

export default FinishPage;
