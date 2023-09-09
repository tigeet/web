const containerId = "footer-nav__metric";
const pageLoadId = "footer-nav__page-load";

(function () {
  const start = Date.now();
  window.onload = () => {
    const loadTime = Date.now() - start;

    const container = document.getElementById(containerId);
    container.style.visibility = "visible";

    const pageLoad = document.getElementById(pageLoadId);
    pageLoad.innerHTML = loadTime;
  };
})();
