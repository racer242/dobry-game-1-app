import React, { Component } from "react";
import { setStoreData } from "../actions/appActions";

class GamePage extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;

    this.ref = React.createRef();

    this.state = {};

    this.closeButton_clickHandler = this.closeButton_clickHandler.bind(this);
    this.finishButton_clickHandler = this.finishButton_clickHandler.bind(this);
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

  closeButton_clickHandler(event) {
    this.store.dispatch(setStoreData({ currentPage: "main" }));
  }

  finishButton_clickHandler(event) {
    this.store.dispatch(setStoreData({ currentPage: "finish" }));
  }

  render() {
    let children = [];
    children.push(this.props.children);

    return (
      <div className="gamePage" ref={this.ref}>
        <h1>Игра</h1>
        <div className="dark-button" onClick={this.closeButton_clickHandler}>
          Назад
        </div>
        <div className="light-button" onClick={this.finishButton_clickHandler}>
          Финиш
        </div>
      </div>
    );
  }
}

export default GamePage;
