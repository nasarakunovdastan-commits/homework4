const tabContents = document.querySelectorAll(".tab_content_block");
const tabButtons = document.querySelectorAll(".tab_content_item");

let currentTab = 0;

function showTab(index) {
  tabContents.forEach(function (item) {
    item.style.display = "none";
  });

  tabButtons.forEach(function (item) {
    item.classList.remove("tab_content_item_active");
  });

  tabContents[index].style.display = "block";
  tabButtons[index].classList.add("tab_content_item_active");

  currentTab = index;
}

tabButtons.forEach(function (button, index) {
  button.addEventListener("click", function () {
    showTab(index);
  });
});

setInterval(function () {
  currentTab++;

  if (currentTab >= tabButtons.length) {
    currentTab = 0;
  }

  showTab(currentTab);
}, 3000);

showTab(0);

// CARD SWITCHER

const card = document.querySelector(".card");
const btnNext = document.querySelector("#btn-next");
const btnPrev = document.querySelector("#btn-prev");

const TODO_API = (id = 1) => `https://jsonplaceholder.typicode.com/todos/${id}`;

let idTodo = 1;

const fetchTodo = async () => {
  try {
    idTodo++;

    if (idTodo > 200) {
      idTodo = 1;
    }

    const response = await fetch(TODO_API(idTodo));
    const { id, title, completed } = await response.json();

    const color = completed ? "green" : "red";

    card.style.borderColor = color;

    card.innerHTML = `
      <p>ID - ${id}</p>
      <p>${title}</p>
      <p style="color: ${color}">
        ${completed ? "Completed" : "Must to do"}
      </p>
    `;
  } catch (err) {
    console.warn("Произошла ошибка", err.message);
  }
};

const prevTodo = () => {
  idTodo -= 2;

  if (idTodo < 0) {
    idTodo = 199;
  }

  fetchTodo();
};

fetchTodo();

btnNext.onclick = fetchTodo;
btnPrev.onclick = prevTodo;

// CONVERTER

const somInput = document.querySelector("#som");
const usdInput = document.querySelector("#usd");
const error = document.querySelector("#error");
const eurInput = document.querySelector("#eur");

const converter = async (element) => {
  try {
    const response = await fetch("../data/converter.json");
    const { usd, eur } = await response.json();

    if (element.value == "") {
      somInput.value = "";
      usdInput.value = "";
      eurInput.value = "";
      return;
    }

    let som;

    if (element.id == "som") {
      som = Number(element.value);
    } else if (element.id == "usd") {
      som = Number(element.value) * usd;
    } else if (element.id == "eur") {
      som = Number(element.value) * eur;
    }

    somInput.value = som.toFixed(2);
    usdInput.value = (som / usd).toFixed(2);
    eurInput.value = (som / eur).toFixed(2);
  } catch (err) {
    error.style.color = "red";
    error.textContent = "Произошла ошибка";
  }
};

somInput.oninput = () => converter(somInput);
usdInput.oninput = () => converter(usdInput);
eurInput.oninput = () => converter(eurInput);
