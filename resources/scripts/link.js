const linkSelector = ".nav_link";
const linkModifier = "link-active";

const urlToPage = (url) => url.pathname.substring(1).split(".")[0];
(function () {
  const url = window.location;

  const currentPage = urlToPage(url);
  console.log(currentPage);

  const links = document.querySelectorAll(linkSelector);
  for (const link of links) {
    const linkValue = urlToPage(new URL(link.href));
    if (linkValue !== currentPage) continue;

    link.classList.add(linkModifier);
  }
})();
