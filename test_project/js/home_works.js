// 1.1

const gmailInput = document.querySelector("#gmail_input");
const gmailButton = document.querySelector("#gmail_button");
const gmailResult = document.querySelector("#gmail_result");

const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

gmailButton.onclick = () => {
  if (gmailRegex.test(gmailInput.value)) {
    gmailResult.textContent = "Gmail правильный!";
    gmailResult.style.color = "green";
  } else {
    gmailResult.textContent = "Gmail неправильный!";
    gmailResult.style.color = "red";
  }
};

// 1.2

const parentBlock = document.querySelector(".parent_block");
const childBlock = document.querySelector(".child_block");

let positionX = 0;
let positionY = 0;
let direction = "right";

setInterval(() => {
  const maxX = parentBlock.clientWidth - childBlock.offsetWidth;
  const maxY = parentBlock.clientHeight - childBlock.offsetHeight;

  if (direction === "right") {
    positionX++;

    if (positionX >= maxX) {
      direction = "down";
    }
  } else if (direction === "down") {
    positionY++;

    if (positionY >= maxY) {
      direction = "left";
    }
  } else if (direction === "left") {
    positionX--;

    if (positionX <= 0) {
      direction = "up";
    }
  } else if (direction === "up") {
    positionY--;

    if (positionY <= 0) {
      direction = "right";
    }
  }

  childBlock.style.left = positionX + "px";
  childBlock.style.top = positionY + "px";
}, 10);

// 2

const seconds = document.querySelector("#seconds");
const start = document.querySelector("#start");
const stop = document.querySelector("#stop");
const reset = document.querySelector("#reset");

let counter = 0;
let interval = null;

start.addEventListener("click", () => {
  if (interval === null) {
    interval = setInterval(() => {
      counter++;
      seconds.textContent = counter;
    }, 1000);
  }
});

stop.addEventListener("click", () => {
  clearInterval(interval);
  interval = null;
});

reset.addEventListener("click", () => {
  clearInterval(interval);
  interval = null;

  counter = 0;
  seconds.textContent = counter;
});

lesson3

// 1

function delay(value, ms, shouldFail = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error(`Ошибка при обработке: ${value}`));
      } else {
        resolve(value);
      }
    }, ms);
  });
}

delay(1, 500)
  .then((value) => {
    console.log("Первый промис:", value);

    return delay(value + 1, 500, true);
  })
  .then((value) => {
    console.log("Второй промис:", value);

    return delay(value + 1, 500);
  })
  .then((value) => {
    console.log("Третий промис:", value);
  })
  .catch((error) => {
    console.warn("Произошла ошибка:", error.message);
  })
  .finally(() => {
    console.log("Цепочка промисов завершена");
  });

// 2

function delay(value, ms, shouldFail = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error(`Ошибка при обработке: ${value}`));
      } else {
        resolve(value);
      }
    }, ms);
  });
}

async function start() {
  try {
    let first = await delay(1, 500);
    console.log("Первый промис:", first);

    let second = await delay(first + 1, 500, true);
    console.log("Второй промис:", second);

    let third = await delay(second + 1, 500);
    console.log("Третий промис:", third);
  } catch (error) {
    console.log("Произошла ошибка:", error.message);
  } finally {
    console.log("Цепочка промисов завершена");
  }
}

start();

function delay(value, ms, shouldFail = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error(`Ошибка при обработке: ${value}`));
      } else {
        resolve(value);
      }
    }, ms);
  });
}

async function processArray() {
  let numbers = [1, 2, 3, 4];

  let results = [];

  for (let value of numbers) {
    try {
      let result = await delay(value, 500, Math.random() > 0.7);

      results.push({
        value: result,
        error: null,
      });
    } catch (error) {
      results.push({
        value: value,
        error: error.message,
      });
    }
  }

  console.log("Результат:", results);
}

processArray();

// 3

// 3.1
function delay(value, ms, shouldFail = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error(`Ошибка при обработке: ${value}`));
      } else {
        resolve(value);
      }
    }, ms);
  });
}

// 3.2

async function promiseAll() {
  try {
    let results = await Promise.all([
      delay(1, 1000),
      delay(2, 500, true),
      delay(3, 1500),
      delay(4, 2000),
    ]);

    console.log("Promise.all:", results);
  } catch (error) {
    console.log("Ошибка Promise.all:", error.message);
  }
}

promiseAll();

// 3.3

async function promiseAllSettled() {
  let results = await Promise.allSettled([
    delay(1, 1000),
    delay(2, 500, true),
    delay(3, 1500),
    delay(4, 2000),
  ]);

  let succeeded = [];
  let failed = [];

  results.forEach((result) => {
    if (result.status === "fulfilled") {
      succeeded.push(result.value);
    } else {
      failed.push(result.reason.message);
    }
  });

  console.log("Успешные:", succeeded);
  console.log("Ошибки:", failed);
}

promiseAllSettled();

// 3.4

async function promiseRace() {
  try {
    let result = await Promise.race([
      delay("Полезная операция", 2000),
      delay("Таймаут", 500, true),
    ]);

    console.log("Promise.race:", result);
  } catch (error) {
    console.log("Ошибка Promise.race:", error.message);
  }
}

promiseRace();

// hw5

const form = document.getElementById("userForm");
const result = document.getElementById("result");

const url = "https://jsonplaceholder.typicode.com/posts";

function checkAgreement() {
  const agreement = form.elements.agreement;

  if (!agreement.checked) {
    result.textContent = "Сначала поставьте галочку согласия!";
    return false;
  }

  return true;
}

function showError(error) {
  console.log("Ошибка:", error);
  result.textContent = "Произошла ошибка: " + error.message;
}

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  if (!checkAgreement()) {
    return;
  }

  try {
    if (!form.reportValidity()) {
      return;
    }

    const formData = new FormData(form);

    const user = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      age: Number(formData.get("age")),
      gender: formData.get("gender"),
    };

    result.textContent = "Отправка JSON...";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Ошибка сервера: " + response.status);
    }

    const data = await response.json();

    result.textContent = "JSON успешно отправлен! ID: " + data.id;

    console.log("JSON ответ:", data);
  } catch (error) {
    showError(error);
  }
});

document
  .getElementById("formDataBtn")
  .addEventListener("click", async function () {
    if (!checkAgreement()) {
      return;
    }

    try {
      if (!form.reportValidity()) {
        return;
      }

      const formData = new FormData(form);

      formData.delete("agreement");

      result.textContent = "Отправка FormData...";

      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Ошибка сервера: " + response.status);
      }

      const data = await response.json();

      result.textContent = "FormData успешно отправлен! ID: " + data.id;

      console.log("FormData ответ:", data);
    } catch (error) {
      showError(error);
    }
  });
