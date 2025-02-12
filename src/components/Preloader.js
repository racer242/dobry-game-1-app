import React, { Component } from "react";
import Preload from "react-preload";
import { preloadComplete } from "../actions/appActions";
import { ReactComponent as X } from "../images/x.svg";
import { ReactComponent as Logo } from "../images/logo.svg";

class Preloader extends Component {
  constructor(props) {
    super(props);
    this.preloader_completeHandler = this.preloader_completeHandler.bind(this);
    this.preloader_errorHandler = this.preloader_errorHandler.bind(this);

    this.store = this.props.store;

    this.state = {};
    this.images = [
      require("../images/bg.png"),
      require("../images/bg_mob.png"),
      require("../images/bottom.png"),
      require("../images/copyright.png"),
      require("../images/logo.png"),
      require("../images/screen1.png"),
      require("../images/screen2.png"),
      require("../images/screen3.png"),
      require("../images/sol.png"),
      require("../images/wowow.png"),

      "comps/runway.png",
      "comps/sixnews.png",
      "comps/zimaletto.png",
      "comps/budapest.svg",
      "comps/choam.svg",
      "comps/ghost.svg",
      "comps/kahuna.svg",
      "comps/krusty.svg",
      "comps/laguna.svg",
      "comps/ollivanders.svg",
      "comps/redapple.svg",
      "comps/stark.svg",

      "agency/cats.png",
      "agency/creativepeople.png",
      "agency/directors.png",
      "agency/hate.png",
      "agency/rassvet.png",
      "agency/rodnya.png",
      "agency/sol.png",
      "agency/wowow.png",
      "agency/aprel.svg",
      "agency/depot.svg",
      "agency/diglab.svg",
      "agency/grape.svg",
      "agency/makelove.svg",
      "agency/mart.svg",
      "agency/sense.svg",
    ];
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

  preloader_completeHandler(event) {
    console.log("Preload complete");
    // return;
    setTimeout(() => {
      setTimeout(() => {
        this.store.dispatch(preloadComplete());
      }, 2000);
      this.setState({
        ...this.state,
        isComplete: true,
      });
    }, 2000);
  }

  preloader_errorHandler(event) {
    console.log("Preload error");
    this.preloader_completeHandler();
  }

  render() {
    return (
      <div
        id="Preloader"
        key="Preloader"
        style={{ opacity: this.state.isComplete ? 0 : 1 }}
      >
        <Preload
          children={<div></div>}
          loadingIndicator={<div></div>}
          images={this.images}
          autoResolveDelay={3000}
          onError={this.preloader_errorHandler}
          onSuccess={this.preloader_completeHandler}
          resolveOnError={true}
          mountChildren={true}
        />
        <div className="preloader-logo">
          <div className="preloader-logo-frame">
            <div className="preloader-logo-scale zoom">
              <img
                src={require("../images/preload1.png")}
                className="preloader-logo-frame-image spin-pl"
              ></img>
              <img
                src={require("../images/preload2.png")}
                className="preloader-logo-frame-image-1 spin-cw"
              ></img>
            </div>
          </div>
          <Logo className="preloader-logo-image" />
        </div>
      </div>
    );
  }
}

export default Preloader;
