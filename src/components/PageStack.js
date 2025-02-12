import React, { Component } from "react";
import MainPage from "../content/MainPage";
import GamePage from "../content/GamePage";
import FinishPage from "../content/FinishPage";
import ScoresPage from "../content/ScoresPage";

class PageStack extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
    this.state = {};
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
    let children = [];
    children.push(this.props.children);

    return (
      <div className="pageContainer">
        {this.state.currentPage === "main" && <MainPage store={this.store} />}
        {this.state.currentPage === "game" && <GamePage store={this.store} />}
        {this.state.currentPage === "finish" && (
          <FinishPage store={this.store} />
        )}
        {this.state.currentPage === "scores" && (
          <ScoresPage store={this.store} />
        )}
      </div>
    );
  }
}

export default PageStack;
