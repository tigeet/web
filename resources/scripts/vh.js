// type Version = {
//   version: string,
//   description: String,
//   type: "major" | "minor" | "patch",
// };

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

const versionHistory = [];

const createVersion = ({ version, desciption }) => {
  const vhItem = document.createElement("div");
  vhItem.classList.add("vh__item");

  const vhItemVersion = document.createElement("span");
  vhItemVersion.classList.add("vh__item-version");
  vhItemVersion.innerHTML = version;

  const vhItemDescription = document.createElement("span");
  vhItemDescription.classList.add("vh__item-description");
  vhItemDescription.innerHTML = desciption;

  vhItem.appendChild(vhItemVersion);
  vhItem.appendChild(vhItemDescription);
  return vhItem;
};
form.onsubmit = (e) => {
  e.preventDefault();
  e.stopPropagation();

  const version = formVersion?.value;
  const desciption = formDescription?.value;
  const type = formType?.value;
  const obj = { version, desciption, type };
  versionHistory.push(obj);

  vhList.innerHTML = null;
  versionHistory.forEach(({ version, desciption }) =>
    vhList.appendChild(createVersion({ version, desciption }))
  );
};
