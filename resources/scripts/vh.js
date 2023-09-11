// type VersionType = "major" | "minor" | "patch";
// type Version = {
//   version: string;
//   description: string;
//   type: VersionType;
// };

const FILTER_TYPE_ANY = "any";

const formId = "vh-form";
const formVersionId = "vh-form-version";
const formDescriptionId = "vh-form-description";
const formTypeId = "vh-form-type";
const vhListId = "vh-list";

const form = document.getElementById(formId);
const formVersion = document.getElementById(formVersionId);
const formDescription = document.getElementById(formDescriptionId);
const formType = document.getElementById(formTypeId);
const vhList = document.getElementById(vhListId);
const filterSearch = document.getElementById("vh-filter-search");
const filterType = document.getElementById("vh-filter-type");

const versionHistory = [
  {
    version: "1.0.0",
    description: "Description for version 1.0.0",
    type: "major",
  },

  {
    version: "1.0.1",
    description: "Description for version 1.0.1",
    type: "patch",
  },
  {
    version: "1.0.2",
    description: "Description for version 1.0.2",
    type: "patch",
  },
  {
    version: "1.1.0",
    description: "Description for version 1.1.0",
    type: "minor",
  },
];

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

function render() {
  vhList.innerHTML = "";
  console.log(filterType.value);

  versionHistory
    .filter((version) => {
      if (filterType.value === FILTER_TYPE_ANY) return true;
      return version.type === filterType.value;
    })
    .filter((version) => version.description.includes(filterSearch.value))
    .map((version) => createVersionElement(version))
    .forEach((versionElement) => vhList.appendChild(versionElement));
}

form.onsubmit = (e) => {
  e.preventDefault();
  e.stopPropagation();

  const version = formVersion.value;
  const description = formDescription.value;
  const type = formType.value;
  const obj = { version, description, type };
  versionHistory.push(obj);

  render();
};

filterSearch.onchange = () => render();

filterType.onchange = () => render();
render();
