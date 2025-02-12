// Функция инициализации приложения
function onAppReadyHandler(app) {
  // Функция обработки ресайза страницы.
  // Берется элемент-контейнер и передается его размер в приложение.
  function updateLayout() {
    var container = document.getElementById("container");
    app.resize(container.clientWidth, container.clientHeight);
  }

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
  var data = {};

  app.setData(data);
}
