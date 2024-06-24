// display
const currentDisplay = document.getElementById("display-current");
const previousDisplay = document.getElementById("display-previous");

// advanced operations
const buttonAllClear = document.getElementById("btn-ac");
const buttonPositiveNegative = document.getElementById("btn-posneg");
const buttonModulo = document.getElementById("btn-modulo");

// basic operations
const buttonDivide = document.getElementById("btn-divide");
const buttonMultiply = document.getElementById("btn-multiply");
const buttonSubtract = document.getElementById("btn-subtract");
const buttonAdd = document.getElementById("btn-add");
const buttonEquals = document.getElementById("btn-equals");

const operationButtons = [
  buttonDivide,
  buttonMultiply,
  buttonSubtract,
  buttonAdd
];

// numbers
const buttonComma = document.getElementById("btn-comma");

const buttonZero = document.getElementById("btn-zero");
const buttonOne = document.getElementById("btn-one");
const buttonTwo = document.getElementById("btn-two");
const buttonThree = document.getElementById("btn-three");
const buttonFour = document.getElementById("btn-four");
const buttonFive = document.getElementById("btn-five");
const buttonSix = document.getElementById("btn-six");
const buttonSeven = document.getElementById("btn-seven");
const buttonEight = document.getElementById("btn-eight");
const buttonNine = document.getElementById("btn-nine");

const numberButtons = [
  buttonZero,
  buttonOne,
  buttonTwo,
  buttonThree,
  buttonFour,
  buttonFive,
  buttonSix,
  buttonSeven,
  buttonEight,
  buttonNine
];

let currentMode;

const operationObj = {
  add: 1,
  subtract: 2,
  multiply: 3,
  divide: 4
};

let previousNumber;
let currentNumberArray = [];
let currentNumber;

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const num = button.textContent;

    currentNumberArray.push(num);
    currentNumber = currentNumberArray.join("");

    displayCurrent();
  });
});

// display
function displayCurrent() {
  currentDisplay.textContent = currentNumber;
}

function resetDisplayCurrent() {
  currentDisplay.textContent = 0;
}

function displayPrevious() {
  previousNumber = currentNumber;
  previousDisplay.textContent = previousNumber;
}

function resetDisplayPrevious() {
  previousDisplay.textContent = "";
}

// reset calculator
buttonAllClear.addEventListener("click", () => {
  resetCalculator();
});

function resetCalculator() {
  resetArray();
  currentDisplay.textContent = 0;
  previousDisplay.textContent = "";
}

// reset array
function resetArray() {
  currentNumberArray = [];
}

// mathematical operations
const addNumbers = (a, b) => a + b;
const subtractNumbers = (a, b) => a - b;
const multiplyNumbers = (a, b) => a * b;
const divideNumbers = (a, b) => a / b;
const moduloNumbers = (a, b) => a % b;

function resetOnOperation() {
  displayPrevious();
  resetDisplayCurrent();
  resetArray();
}

operationButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const buttonId = e.target.id;

    let buttonTaskIndex = {
      "btn-add": operationObj.add,
      "btn-subtract": operationObj.subtract,
      "btn-divide": operationObj.divide,
      "btn-multiply": operationObj.multiply
    };

    currentMode = buttonTaskIndex[buttonId];
    resetOnOperation();
    console.log(currentMode);
  });
});
