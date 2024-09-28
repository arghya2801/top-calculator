let num1 = null;
let operator = null;
let num2 = null;

function add(a,b) {
    return a + b;
}

function subtract(a,b) {
    return a - b;
}

function multiply(a,b) {
    return a * b;
}

function divide(a,b) {
    if (b === 0) {
        return "Cannot divide by zero";
    }
    return a / b;
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

let display_value = "0";

const updateDisplay = () => {
    document.getElementById("display").innerText = display_value;
};

const appendToDisplay = (value) => {
    if (display_value === "0") {
        display_value = value;
    } else {
        display_value += value;
    }
    updateDisplay();
};

const buttons = document.querySelectorAll(".numbers, .operators");
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.innerText;

        if (!isNaN(value) || value === ".") {
            appendToDisplay(value);
        } else if (value === "AC") {
            clearDisplay();
        } else if (value === "=") {
            if (num1 !== null && operator !== null && display_value !== "0") {
                num2 = parseFloat(display_value);
                const result = operate(num1, operator, num2);
                display_value = String(result);
                updateDisplay();
                
                num1 = null;
                operator = null;
            }
        } else {
            if (num1 === null) {
                num1 = parseFloat(display_value);
            } else if (operator !== null) {
                num2 = parseFloat(display_value);
                const result = operate(num1, operator, num2);
                display_value = String(result);
                updateDisplay();
                num1 = result;
            }
            operator = value;
            display_value = "0";
        }
    });
});

const clearDisplay = () => {
    display_value = "0";
    num1 = null;
    operator = null;
    updateDisplay();
};

updateDisplay();