const linkSelector = ".nav__link";
const linkModifier = "link-active";

const getResource = (pathname) => pathname.split("/").at(-1);

const isIndex = (pathname) => {
  const resource = getResource(pathname);
  return resource === "" || resource === "index.html";
};

const areUrlsEqual = (at, pathname) => {
  if (isIndex(at) && isIndex(pathname)) return true;
  return at === pathname;
};

(function () {
  const at = window.location.pathname;

  const links = document.querySelectorAll(linkSelector);

  for (const link of links) {
    if (!areUrlsEqual(at, link.pathname)) continue;

    link.classList.add(linkModifier);
  }
})();
