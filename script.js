let displayValue = "";
let num1 = null;
let operator = null;
let num2 = null;
let waitingForSecondOperand = false;

const MAX_DISPLAY_LENGTH = 10;

const displayElement = document.getElementById("display");
const updateDisplay = () => {
    displayElement.innerText = displayValue || "0";
};

const appendToDisplay = (value) => {
    if (waitingForSecondOperand) {
        displayValue = value;
        waitingForSecondOperand = false;
    } else if (displayValue === "0" && value !== ".") {
        displayValue = value;
    } else if (displayValue.includes(".") && value === ".") {
        return;
    } else if (displayValue.length < MAX_DISPLAY_LENGTH) {
        displayValue += value;
    }
    updateDisplay();
};

const clearDisplay = () => {
    displayValue = "";
    num1 = null;
    operator = null;
    num2 = null;
    waitingForSecondOperand = false;
    updateDisplay();
};

const handleOperator = (op) => {
    if (displayValue === "") return;
    if (num1 !== null && operator !== null && !waitingForSecondOperand) {
        num2 = parseFloat(displayValue);
        num1 = operate(num1, operator, num2);
        displayValue = String(num1) + op; // Show result and the new operator
        updateDisplay();
    } else {
        num1 = parseFloat(displayValue);
        displayValue += op; // Show the operator
        updateDisplay();
    }
    operator = op;
    waitingForSecondOperand = true;
};

const handleFunction = (func) => {
    if (displayValue === "") return;
    const currentValue = parseFloat(displayValue);
    let result;
    switch (func) {
        case "sqrt":
            result = Math.sqrt(currentValue);
            break;
        case "log":
            result = Math.log10(currentValue);
            break;
        case "ln":
            result = Math.log(currentValue);
            break;
        case "inv":
            if (currentValue === 0) {
                result = "Error: Division by zero";
            } else {
                result = 1 / currentValue;
            }
            break;
        case "sin":
            result = Math.sin(currentValue * Math.PI / 180);
            break;
        case "cos":
            result = Math.cos(currentValue * Math.PI / 180);
            break;
        case "tan":
            result = Math.tan(currentValue * Math.PI / 180);
            break;
        case "fact":
            result = factorial(currentValue);
            if (result === null) {
                result = "Error: Invalid input";
            }
            break;
        case "pow":
            num1 = currentValue;
            operator = "^";
            displayValue += "^";
            waitingForSecondOperand = true;
            return;
        case "logy":
            num1 = currentValue;
            operator = "logy";
            displayValue += "log(";
            waitingForSecondOperand = true;
            return;
        default:
            return;
    }
    displayValue = String(result);
    updateDisplay();
};

const handleConstant = (constant) => {
    if (waitingForSecondOperand) {
        displayValue = constant;
        waitingForSecondOperand = false;
    } else if (displayValue === "0") {
        displayValue = constant;
    } else if (displayValue.length < MAX_DISPLAY_LENGTH) {
        displayValue += constant;
    }
    updateDisplay();
};

const handleEquals = () => {
    if (operator === null || num1 === null || displayValue === "") return;
    const parts = displayValue.split(operator);
    const secondOperandStr = parts[parts.length - 1];
    num2 = parseFloat(secondOperandStr);

    let result;
    switch (operator) {
        case "+":
            result = num1 + num2;
            break;
        case "-":
            result = num1 - num2;
            break;
        case "*":
            result = num1 * num2;
            break;
        case "/":
            if (num2 === 0) {
                result = "Error: Division by zero";
            } else {
                result = num1 / num2;
            }
            break;
        case "^":
            result = Math.pow(num1, num2);
            break;
        case "logy":
            if (num1 <= 0 || num1 === 1 || num2 <= 0) {
                result = "Error: Invalid input";
            } else {
                result = Math.log(num2) / Math.log(num1);
            }
            break;
        default:
            return;
    }
    displayValue = String(result);
    updateDisplay();
    num1 = null;
    operator = null;
    waitingForSecondOperand = false;
};

const handlePercent = () => {
    if (displayValue === "") return;
    displayValue = String(parseFloat(displayValue) / 100);
    if (displayValue.length > MAX_DISPLAY_LENGTH) {
        displayValue = displayValue.slice(0, MAX_DISPLAY_LENGTH);
    }
    updateDisplay();
};

const handleNegate = () => {
    if (displayValue === "" || displayValue === "0") return;
    displayValue = String(-parseFloat(displayValue));
    if (displayValue.startsWith("-") && displayValue.length > MAX_DISPLAY_LENGTH + 1) {
        displayValue = displayValue.slice(0, MAX_DISPLAY_LENGTH + 1);
    } else if (displayValue.length > MAX_DISPLAY_LENGTH) {
        displayValue = displayValue.slice(0, MAX_DISPLAY_LENGTH);
    }
    updateDisplay();
};

const handleBackspace = () => {
    if (displayValue.length > 0) {
        displayValue = displayValue.slice(0, -1);
        updateDisplay();
    }
};

function factorial(n) {
    if (n < 0 || !Number.isInteger(n)) {
        return null;
    }
    if (n === 0) {
        return 1;
    }
    let result = 1;
    for (let i = 1; i <= n; i++) {
        result *= i;
    }
    return String(result).length > MAX_DISPLAY_LENGTH ? parseFloat(String(result).slice(0, MAX_DISPLAY_LENGTH)) : result;
}

const numberButtons = document.querySelectorAll(".number");
numberButtons.forEach(button => {
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

const functionButtons = document.querySelectorAll(".function");
functionButtons.forEach(button => {
    button.addEventListener("click", () => {
        handleFunction(button.id);
    });
});

const constantButtons = document.querySelectorAll(".constant");
constantButtons.forEach(button => {
    button.addEventListener("click", () => {
        handleConstant(button.innerText === "π" ? String(Math.PI).slice(0, MAX_DISPLAY_LENGTH) : String(Math.E).slice(0, MAX_DISPLAY_LENGTH));
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

const backspaceButton = document.querySelector(".backspace");
backspaceButton.addEventListener("click", handleBackspace);

updateDisplay();