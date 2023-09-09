const linkSelector = ".nav_link";
const linkModifier = "link-active";

(function () {
  const url = window.location.href;

  const links = document.querySelectorAll(linkSelector);
  for (const link of links) {
    if (link.href !== url) continue;

    link.classList.add(linkModifier);
  }
})();
