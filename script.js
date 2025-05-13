let num1 = null;
let operator = null;
let num2 = null;

function add(a, b) {
    return parseFloat((a + b).toFixed(10));
}

function subtract(a, b) {
    return parseFloat((a - b).toFixed(10));
}

function multiply(a, b) {
    return parseFloat((a * b).toFixed(10));
}

function divide(a, b) {
    if (b === 0) {
        return "Cannot divide by zero";
    }
    return parseFloat((a / b).toFixed(10));
}

function percent(a) {
    return parseFloat((a / 100).toFixed(10));
}

function negate(a) {
    return parseFloat((-a).toFixed(10));
}

function operate(num1, operator, num2) {
    switch (operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "*":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
        default:
            return null;
    }
}

let displayValue = "";

const displayElement = document.getElementById("display");
const updateDisplay = () => {
    displayElement.innerText = displayValue || "0";
};

const appendToDisplay = (value) => {
    if (displayValue === "0" && value !== ".") {
        displayValue = value;
    } else if (displayValue.includes(".") && value === ".") {
        return;
    } else {
        displayValue += value;
    }
    updateDisplay();
};

const clearDisplay = () => {
    displayValue = "";
    num1 = null;
    operator = null;
    num2 = null;
    updateDisplay();
};

const handleOperator = (op) => {
    if (displayValue === "") return;
    if (num1 !== null && operator !== null) {
        num2 = parseFloat(displayValue);
        num1 = operate(num1, operator, num2);
        displayValue = String(num1);
        updateDisplay();
    }
    num1 = parseFloat(displayValue);
    operator = op;
    displayValue = "";
};

const handleEquals = () => {
    if (operator === null || num1 === null || displayValue === "") return;
    num2 = parseFloat(displayValue);
    const result = operate(num1, operator, num2);
    displayValue = String(result);
    updateDisplay();
    num1 = null;
    operator = null;
};

const handlePercent = () => {
    if (displayValue === "") return;
    displayValue = String(percent(parseFloat(displayValue)));
    updateDisplay();
};

const handleNegate = () => {
    if (displayValue === "" || displayValue === "0") return;
    displayValue = String(negate(parseFloat(displayValue)));
    updateDisplay();
};

const buttons = document.querySelectorAll(".number");
buttons.forEach(button => {
    button.addEventListener("click", () => {
        appendToDisplay(button.innerText);
    });
});

const operatorButtons = document.querySelectorAll(".operation");
operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        handleOperator(button.innerText);
    });
});

const equalsButton = document.querySelector(".equals");
equalsButton.addEventListener("click", handleEquals);

const clearButton = document.querySelector(".clear");
clearButton.addEventListener("click", clearDisplay);

const percentButton = document.querySelector(".percent");
percentButton.addEventListener("click", handlePercent);

const negateButton = document.querySelector(".negate");
negateButton.addEventListener("click", handleNegate);

updateDisplay();