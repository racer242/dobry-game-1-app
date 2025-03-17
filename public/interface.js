window.gameId = "MATCH";

// Функция инициализации приложения
function onAppReadyHandler(app) {
  // Функция обработки ресайза страницы.
  // Берется элемент-контейнер и передается его размер в приложение.
  function updateLayout() {
    var container = document.getElementById("container");
    app.resize(container.clientWidth, container.clientHeight);
  }
  updateLayout();

  // Инициализация веб-страницы
  function initHandler() {
    updateLayout();
  }

  // Ресайз веб-страницы
  function resizeHandler() {
    updateLayout();
  }

  // Подписываемся на события изменения, чтобы вызывать updateLayout
  // Обновление размеров приложения можно делать и иначе -
  // здесь просто пример использования

  window.addEventListener("load", initHandler);
  window.addEventListener("resize", resizeHandler);

  // Настройки приложения
  var data = {
    games: {
      1: { id: "VIBE", request: { url: "/api/TentGame.json", method: "GET" } },
      2: {
        id: "SPOTLIGHTS",
        request: { url: "/api/SpotLights.json", method: "GET" },
      },
      3: { id: "MATCH", request: { url: "/api/Match.json", method: "GET" } },
      4: { id: "STAGE", request: { url: "/api/Stage.json", method: "GET" } },
      5: { id: "FIVE", request: { url: "/api/Stage.json", method: "GET" } },
      index: { VIBE: 1, SPOTLIGHTS: 2, MATCH: 3, STAGE: 4, FIVE: 5 },
    },
  };
  data.gameIndex = data.games.index[window.gameId];
  data.gameData = data.games[data.gameIndex];

  app.setData(data);
}
