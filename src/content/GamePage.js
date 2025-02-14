import React, { Component } from "react";
import { setStoreData } from "../actions/appActions";
import "../css/game.css";

class GamePage extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
    if (this.store) {
      this.state = {
        ...this.store.getState(),
      };
    } else this.state = {};

    this.ref = React.createRef();

    this.state = {
      objSources: [
        require("../images/objects/o1.png"),
        require("../images/objects/o2.png"),
        require("../images/objects/o3.png"),
        require("../images/objects/o4.png"),
        require("../images/objects/o5.png"),
        require("../images/objects/o6.png"),
      ],
    };

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

    let objs = [];

    for (let i = 1; i < 7; i++) {
      objs.push(
        <img
          class="spin"
          src={require("../images/objects/o" + i + ".png")}
        ></img>
      );
    }

    return (
      <div className="gamePage" ref={this.ref}>
        <h1>Игра</h1>
        <div className="dark-button" onClick={this.closeButton_clickHandler}>
          Назад
        </div>
        <div className="light-button" onClick={this.finishButton_clickHandler}>
          Финиш
        </div>

        {objs}
      </div>
    );
  }
}

export default GamePage;
