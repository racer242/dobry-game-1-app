import React, { Component } from "react";
import MainPage from "../content/MainPage";
import FinishPage from "../content/FinishPage";
import ScoresPage from "../content/ScoresPage";
import Game1Page from "../content/Game1Page";
import Game2Page from "../content/Game2Page";
import Game3Page from "../content/Game3Page";
import Game4Page from "../content/Game4Page";

class PageStack extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
    if (this.store) {
      this.state = {
        ...this.store.getState(),
      };
    } else this.state = { currentPage: "main" };
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

  render() {
    return (
      <div className="pageContainer">
        {this.state.currentPage === "main" && (
          <MainPage bounds={this.props.bounds} store={this.store} />
        )}
        {this.state.currentPage === "game" &&
          ((this.state.gameIndex == 1 && (
            <Game1Page bounds={this.props.bounds} store={this.store} />
          )) ||
            (this.state.gameIndex == 2 && (
              <Game2Page bounds={this.props.bounds} store={this.store} />
            )) ||
            (this.state.gameIndex == 3 && (
              <Game3Page bounds={this.props.bounds} store={this.store} />
            )) ||
            (this.state.gameIndex == 4 && (
              <Game4Page bounds={this.props.bounds} store={this.store} />
            )))}
        {this.state.currentPage === "finish" && (
          <FinishPage bounds={this.props.bounds} store={this.store} />
        )}
        {this.state.currentPage === "scores" && (
          <ScoresPage bounds={this.props.bounds} store={this.store} />
        )}
      </div>
    );
  }
}

export default PageStack;
