// type VersionType = "major" | "minor" | "patch";
// type Version = {
//   version: string;
//   description: string;
//   type: VersionType;
// };

const FILTER_TYPE_ANY = "any";

(function () {
  const form = document.getElementById("vh-form");
  const formVersion = document.getElementById("vh-form-version");
  const formDescription = document.getElementById("vh-form-description");
  const formType = document.getElementById("vh-form-type");
  const vhList = document.getElementById("vh-list");
  const filterSearch = document.getElementById("vh-filter-search");
  const filterType = document.getElementById("vh-filter-type");

  function createVersionElement({ version, description }) {
    const vhItem = document.createElement("div");
    vhItem.classList.add("vh__item");

    const vhItemVersion = document.createElement("span");
    vhItemVersion.classList.add("vh__item-version");
    vhItemVersion.innerHTML = version;

    const vhItemDescription = document.createElement("p");
    vhItemDescription.classList.add("vh__item-description");
    vhItemDescription.innerHTML = description;

    vhItem.appendChild(vhItemVersion);
    vhItem.appendChild(vhItemDescription);
    return vhItem;
  }

  async function render() {
    vhList.innerHTML = "";
    const spinner = document.getElementById("spinner");
    spinner.classList.remove("hidden");
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts/1/comments"
    );

    if (!response.ok) {
      vhList.innerHTML = "";
      const error = document.createElement("div", { classList: ["error"] });
      error.innerHTML = `error ${response.status}`;
      vhList.appendChild(error);
    } else {
      const data = await response.json();
      const versionHistory = data.map((comment) => ({
        version: comment.id,
        description: comment.body,
        type: "major",
      }));
      // const versionHistory = JSON.parse(localStorage.getItem("vh")) ?? [];
      versionHistory
        .filter((version) => {
          if (filterType.value === FILTER_TYPE_ANY) return true;
          return version.type === filterType.value;
        })
        .filter((version) => version.description.includes(filterSearch.value))
        .map((version) => createVersionElement(version))
        .forEach((versionElement) => vhList.appendChild(versionElement));
    }
    spinner.classList.add("hidden");
  }

  form.onsubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const version = formVersion.value;
    const description = formDescription.value;
    const type = formType.value;
    const obj = { version, description, type };

    const versionHistory = JSON.parse(localStorage.getItem("vh")) ?? [];
    const updated = JSON.stringify([...versionHistory, obj]);
    localStorage.setItem("vh", updated);

    render();
  };

  filterSearch.oninput = () => render();
  filterType.onchange = () => render();

  render();
})();
