// DOM Elements
const currentDisplay = document.getElementById("display-current");
const previousDisplay = document.getElementById("display-previous");
const numberButtons = document.querySelectorAll(".num");
const buttonComma = document.getElementById("btn-comma");
const operationButtons = document.querySelectorAll(".op");
const buttonEquals = document.getElementById("btn-equals");
const buttonAllClear = document.getElementById("btn-ac");
const buttonPositiveNegative = document.getElementById("btn-posneg");
const buttonModulo = document.getElementById("btn-modulo");

// Button mapping
const buttonTaskIndex = {
  "btn-add": 1,
  "btn-subtract": 2,
  "btn-divide": 3,
  "btn-multiply": 4
};

// Global vaiables
const defaultValue = 0;
let currentOperandArray = [];
let currentOperand = null;
let previousOperand = null;
let currentOperator = null;
let result = null;
let shouldResetCurrentOperand = false;

// Display functions
function displayCurrent() {
  currentDisplay.textContent =
    currentOperand !== null ? currentOperand : defaultValue;
}
function resetDisplayCurrent() {
  currentDisplay.textContent = defaultValue;
}
function displayPrevious() {
  previousDisplay.textContent = previousOperand !== null ? previousOperand : "";
}
function resetDisplayPrevious() {
  previousDisplay.textContent = "";
}

function displayZeroDivisionError() {
  currentDisplay.textContent = "Error";
}

// Reset functions
function resetCalculator() {
  resetOperands();
  resetDisplayCurrent();
  resetDisplayPrevious();
}

function resetOperands() {
  currentOperandArray = [];
  currentOperand = null;
  previousOperand = null;
  currentOperator = null;
}

function resetArray() {
  currentOperandArray = [];
}

// Mathematical operations
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => {
  if (b === 0) {
    displayZeroDivisionError();
    return;
  }
  return a / b;
};
const modulo = (a, b) => a % b;

function resetOnOperation() {
  previousOperand = currentOperand;
  resetDisplayCurrent();
  displayPrevious();
  resetArray();
}

function operate(op, a, b) {
  switch (op) {
    case 1:
      result = add(a, b);
      break;
    case 2:
      result = subtract(a, b);
      break;
    case 3:
      result = divide(a, b).toFixed(3);
      break;
    case 4:
      result = multiply(a, b);
      break;
  }

  if (result !== null) {
    currentOperand = result;
  }
  shouldResetCurrentOperand = true;

  displayCurrent();
  resetDisplayPrevious();
}

// Event listeners
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const num = button.textContent;

    if (shouldResetCurrentOperand) {
      resetArray();
      shouldResetCurrentOperand = false;
    }

    currentOperandArray.push(num);
    currentOperand = Number(currentOperandArray.join(""));

    displayCurrent();
  });
});

buttonAllClear.addEventListener("click", () => {
  resetCalculator();
});

operationButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (currentOperand === null) return;

    const buttonId = e.target.id;

    if (
      previousOperand !== null &&
      currentOperator !== null &&
      !shouldResetCurrentOperand
    ) {
      operate(currentOperator, previousOperand, currentOperand);
    }

    currentOperator = buttonTaskIndex[buttonId];
    resetOnOperation();
  });
});

buttonEquals.addEventListener("click", () => {
  if (
    currentOperator === null ||
    previousOperand === null ||
    currentOperand === null
  ) {
    return;
  }

  operate(currentOperator, previousOperand, currentOperand);
});
