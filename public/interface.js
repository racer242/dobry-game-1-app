function onEditorAppReadyHandler(app) {
  function updateLayout() {
    app.resize(
      document.documentElement.clientWidth ||
        document.body.clientWidth ||
        window.innerWidth,
      document.documentElement.clientHeight ||
        document.body.clientHeight ||
        window.innerHeight
    );
  }

  var data = {};

  function initHandler() {
    updateLayout();
  }

  function resizeHandler() {
    updateLayout();
  }

  window.addEventListener("load", initHandler);
  window.addEventListener("resize", resizeHandler);

  console.log("onEditorAppReadyHandler");
  app.setData(data);
}
