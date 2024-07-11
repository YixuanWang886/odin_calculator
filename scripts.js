// Create buttons for numbers
const numberButtons = "1234567890".split("");
numberButtons.forEach((number) => {
  createButton(number, "numbers", () => {
    display(number.toString());
  });
});

// Create buttons for operations
const operationButtons = "+-*/=C".split("");

operationButtons.forEach((operation) => {
  createButton(operation, "operations", () => {
    if (operation !== "=" && operation !== "C") {
      display(operation);
    }
  });
});

// Display function
function display(content) {
  const panel = document.getElementById("display");
  if (content === "C") {
    panel.innerHTML = "";
  } else {
    panel.innerHTML += content;
  }
}

// Math operations
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return "error!";
  }
  return a / b;
}

// Button event listeners
function createButton(content, parentId, clickHandler) {
  const button = document.createElement("button");
  button.innerHTML = content;
  button.setAttribute("id", `button_${content}`);
  button.addEventListener("click", clickHandler);
  document.getElementById(parentId).appendChild(button);
}

// Equals button event listener
const equalsButton = document.getElementById("button_=");
let result = 0;
if (equalsButton) {
  equalsButton.addEventListener("click", () => {
    const operations = "+*/-";
    const displayContent = document.getElementById("display").innerHTML;
    const numbers = displayContent
      .split(new RegExp(`[${operations}]`))
      .map((num) => parseInt(num));
    const operatorMatch = displayContent.match(new RegExp(`[${operations}]`));
    const operator = operatorMatch ? operatorMatch[0] : null;
    let result = numbers[0]; // Initialize result to the first number

    switch (operator) {
      case "+":
        result = numbers.reduce(add);
        break;

      case "-":
        result = numbers.reduce(subtract);
        break;

      case "*":
        result = numbers.reduce(multiply);
        break;

      case "/":
        result = numbers.reduce(divide);
        break;

      default:
        console.error("Unsupported operation.");
    }

    document.getElementById("display").innerHTML = result;
  });
} else {
  console.error("Button with ID 'button_=' not found.");
}
// Clear button event listener
const clearButton = document.getElementById("button_C");
if (clearButton) {
  clearButton.addEventListener("click", () => {
    document.getElementById("display").innerHTML = "";
  });
}
