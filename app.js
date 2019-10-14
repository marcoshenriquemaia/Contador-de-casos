import CriarElemento from "./components/shared/cria-elemento/index.js";

const $nameField = document.querySelector("#name-field");
const $addNameButton = document.querySelector(".add-name-button");
const $containerCases = document.querySelector(".container-cases");
const $date = document.querySelector(".atual-date");
const $body = document.querySelector("body");

const caseInformation = {
  _Id: undefined,
  name: "Marcos",
  caseAmount: null
};

const casesExist = JSON.parse(localStorage.getItem('casesStorage')) ? JSON.parse(localStorage.getItem('casesStorage')).value : [];
// console.log(casesExist);

if (!casesExist[0]){
  const casesList = {value: []};
  const JSONreadCaseList = JSON.stringify(casesList);
  localStorage.setItem("casesStorage", JSONreadCaseList);

}

const atualDate = new Date();
const day = atualDate.getDate();
const month = atualDate.getMonth() + 1;
const year = atualDate.getFullYear();

const setDate = () => {
  $date.textContent = `${day}/${month}/${year}`;
};

const setMonth = () => {
  const months = [...document.querySelectorAll(".months")];
  months.map(item => {
    item.classList.remove(".atual-month");
    if (item.classList.contains(`month-${month - 1}`))
      item.classList.add("atual-month");
  });
};

const Case = {
  build: ({ caseName, caseId }) => {
    const box = CriarElemento({ tipoElemento: "div", classes: ["box-case"] });
    const titleCase = CriarElemento({
      tipoElemento: "h1",
      classes: ["title-case"],
      conteudo: caseName
    });
    const value = CriarElemento({
      tipoElemento: "span",
      classes: ["case-value"],
      conteudo: "0"
    });
    const iconWrapper = CriarElemento({
      tipoElemento: "div",
      classes: ["icons-wrapper"]
    });
    const iconAdd = CriarElemento({
      tipoElemento: "img",
      classes: ["icons-add-remove", "icon-add"],
      imagem: "./assets/images/plus (1).png"
    });
    const iconRemove = CriarElemento({
      tipoElemento: "img",
      classes: ["icons-add-remove", "icon-remove"],
      imagem: "./assets/images/minus (1).png"
    });

    box.appendChild(titleCase);
    box.appendChild(value);
    box.appendChild(iconWrapper);
    iconWrapper.appendChild(iconRemove);
    iconWrapper.appendChild(iconAdd);

    iconAdd.addEventListener("click", () => {
      let valueInt = parseInt(value.textContent);
      valueInt++;
      value.textContent = valueInt;
      caseInformation._Id = `id-${day}-${month}-${year}-${titleCase.textContent}`;
      caseInformation.name = titleCase.textContent;
      caseInformation.caseAmount = valueInt;
    });
    iconRemove.addEventListener("click", () => {
      let valueInt = parseInt(value.textContent);
      if (valueInt == 0) return;
      valueInt--;
      value.textContent = valueInt;
      caseInformation._Id = `id-${day}-${month}-${year}-${titleCase.textContent}`;
      caseInformation.name = titleCase.textContent;
      caseInformation.caseAmount = valueInt;
    });

    return box;
  },
  remove: () => {
    const box = document.querySelector(".box-case");
    box.remove();
  }
};

const iniciation = () => {
  setDate();
  setMonth();
  impressCases();
};

const impressCases = () => {
  const cases = [...document.querySelectorAll(".box-case")];
  cases.map(item => item.remove());
  casesExist.map(item => {
    const newCase = Case.build({ caseName: item.name });
    $containerCases.appendChild(newCase);
  });
};

$addNameButton.addEventListener("click", () => {
  const newCase = {
    name: $nameField.value
  };
  const cases = [...document.querySelectorAll(".box-case")];
  if (cases.length == 6) return;
  casesExist.push(newCase);
  localStorage.setItem("casesStorage", JSON.stringify({value: casesExist}));
  $nameField.value = "";
  impressCases();
});

$body.onload = iniciation();
