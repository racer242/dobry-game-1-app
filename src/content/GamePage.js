import React, { Component } from "react";
import { setStoreData } from "../actions/appActions";

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
      ...this.state,
      countdown: 0,
      score: 0,
      finished: false,
    };

    this.closeButton_clickHandler = this.closeButton_clickHandler.bind(this);
    this.initCount = 0;
    this.counter = 0;
  }

  componentDidMount() {
    this.unsubscribe = this.store.subscribe(() => {
      this.onStoreChange();
    });
    this.mounted = true;
    this.startGame();
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

  startGame() {
    if (!this.started) {
      this.store.dispatch(setStoreData({ loadInit: true }));

      this.started = true;
      this.setState({
        ...this.state,
        finished: false,
      });
      this.stepGame();
      this.controlGame();
    }
  }

  controlGame() {
    if (this.doControl()) {
      if (this.countdownTimer != null) clearTimeout(this.countdownTimer);
      this.countdownTimer = setTimeout(this.controlGame.bind(this), 1000);
    }
  }

  stepGame() {
    this.doGame();
    if (this.gameTimer != null) clearTimeout(this.gameTimer);
    if (this.initCount > 1) {
      this.gameTimer = setTimeout(
        this.stepGame.bind(this),
        this.state.game1.stepDuration
      );
    } else {
      this.initCount++;
      this.gameTimer = setTimeout(
        this.stepGame.bind(this),
        this.state.game1.stepDuration / 100
      );
    }
  }

  stopGame() {
    if (this.gameTimer != null) clearTimeout(this.gameTimer);
    this.gameTimer = null;
    if (this.countdownTimer != null) clearTimeout(this.countdownTimer);
    this.countdownTimer = null;
    this.started = false;
    this.setState({
      ...this.state,
      finished: true,
    });
  }

  doControl() {
    if (this.state.countdown == this.state.game1.gameDuration) {
      this.stopGame();
      if (this.stopTimer != null) clearTimeout(this.stopTimer);
      this.stopTimer = setTimeout(() => {
        this.store.dispatch(
          setStoreData({
            currentPage: "finish",
            gameScore: this.state.score,
            saveScore: true,
          })
        );
      }, this.state.game1.stopDuration);

      return false;
    }
    this.setState({
      ...this.state,
      countdown: this.state.countdown + 1,
    });
    return true;
  }

  doGame() {}

  closeButton_clickHandler(event) {
    this.stopGame();
    this.store.dispatch(setStoreData({ currentPage: "main" }));
  }

  render() {
    let children = [];
    children.push(this.props.children);

    return (
      <div className="gamePage" ref={this.ref}>
        {children}
        {/* <div className="dark-button" onClick={this.closeButton_clickHandler}>
          Назад
        </div>
        */}
      </div>
    );
  }
}

export default GamePage;
