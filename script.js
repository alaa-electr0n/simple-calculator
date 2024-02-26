// togelling the theme
const btnTheme = document.querySelector(".themes__toggle");

const toggletheme = function () {
  btnTheme.classList.toggle("themes__toggle--isActive");
};

btnTheme.addEventListener("click", toggletheme);
btnTheme.addEventListener("keydown", function (event) {
  const key = event.key;
  key === "Enter" && toggletheme();
});
///////////////////////////////////////////////////////////////////////

let currentNum = "";
let storedNum = "";
let operation;
const avaliableNumbers = [
  ".",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
];
const availaibleOperation = ["+", "-", "*", "/"];
const allKeys = [
  ...avaliableNumbers,
  ...availaibleOperation,
  "Backspace",
  "Enter",
  "c",
];

//Loop Once not twice for better Performace

const btnsElement = document.querySelectorAll("[data-type]");
const screenResult = document.querySelector(".calc__result");

const updatingUI = function (value) {
  screenResult.textContent = !value ? "0" : value;
};

//if the keytype is number
const numbersHandler = function (keyvalue) {
  //if the key type is "."
  if (keyvalue === "." && currentNum.includes(".")) return;
  //if the key type is "0"
  if (keyvalue === "0" && !currentNum) return;
  //otherwise current value = current value + key value
  currentNum += keyvalue;
  updatingUI(currentNum);
};

//if the keytype is Reset
const resetValues = function () {
  storedNum = "";
  currentNum = "";
  operation;
  updatingUI(currentNum);
};

//if the keytype operation is delete
const deleteValues = function () {
  if (!currentNum || currentNum === "0") return;
  //substring returns the string from the start and not including the end
  currentNum = currentNum.substring(0, currentNum.length - 1);

  updatingUI(currentNum);
};

//showing the result of operation
const equalOperation = function () {
  if (currentNum && storedNum && operation) {
    switch (operation) {
      case "+":
        storedNum = parseFloat(storedNum) + parseFloat(currentNum);
        break;
      case "-":
        storedNum = parseFloat(storedNum) - parseFloat(currentNum);
        break;
      case "*":
        storedNum = parseFloat(storedNum) * parseFloat(currentNum);
        break;
      case "/":
        storedNum = parseFloat(storedNum) / parseFloat(currentNum);
        break;
    }
    currentNum = "";
    updatingUI(storedNum);
  }
};
//if the operation is clicked
const operationExcution = function (operationvalue) {
  if (!currentNum && !storedNum) return; // Exit if no numbers are involved.

  if (currentNum) {
    if (!storedNum) {
      // If there's a current number but no stored number, store the current number and wait for the next input.
      storedNum = currentNum;
      currentNum = "";
    } else {
      // If there's a stored number and a current number, perform the calculation before setting the new operation.
      equalOperation();
    }

    // Set the new operation after handling the current and stored numbers.
    operation = operationvalue;
  }

  console.log({ storedNum });
  console.log({ currentNum });
  console.log({ operation });
};

const btnHandler = function (key) {
  const keyType = key.dataset.type;
  key.addEventListener("click", function () {
    if (keyType === "number") {
      numbersHandler(key.dataset.value);
    } else if (keyType === "operation") {
      switch (key.dataset.value) {
        case "c":
          resetValues();
          break;
        case "Backspace":
          deleteValues();
          break;
        case "Enter":
          equalOperation();
          break;
        default:
          operationExcution(key.dataset.value);
      }
    }
  });
};

btnsElement.forEach(btnHandler);

/// Keyboard Accessibilty
document.addEventListener("keydown", (event) => {
  let key = event.key;
  if (allKeys.includes(key)) {
    const element = document.querySelector(`[data-value="${key}"]`);
    element.classList.add("hover");
    element.click();
    setTimeout(() => {
      element.classList.remove("hover");
    }, 100);
  }
});
