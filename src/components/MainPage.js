import React, { Component } from "react";
import AboutPopup from "./AboutPopup";
import { nextMatchSelected, setStoreData } from "../actions/appActions";

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;

    this.ref = React.createRef();

    this.state = {};

    this.aboutButton_clickHandler = this.aboutButton_clickHandler.bind(this);
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

  aboutButton_clickHandler(event) {
    this.store.dispatch(setStoreData({ aboutPopup: true }));
  }

  render() {
    let children = [];
    children.push(this.props.children);

    return (
      <div
        id="PageContainer"
        key="PageContainer"
        style={{
          background: "rgba(255,0,0,0.5)",
        }}
        ref={this.ref}
      >
        <h1>Test text</h1>
        <div className="dark-button" onClick={this.aboutButton_clickHandler}>
          Что это?
        </div>
      </div>
    );
  }
}

export default MainPage;
