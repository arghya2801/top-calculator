let num1 = 0;
let operator = null;
let num2 = 0;

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
        throw new Error("Cannot divide by zero");
    }
    return a / b;
}

let res = add(1,2);
console.log(res);

function operate(num1, operator, num2) {
    console.log("operate function");
    if (operator == 1) {
        add(num1, num2);
    }

    else if (operator == 2) {
        subtract(num1, num2);
    }

    else if (operator == 3) {
        multiply(num1, num2);
    }

    else if (operator == 4) {
        if (num2 == 0) {
            console.log("Division by 0 error");
        } else{
            divide(num1, num2);
        }
    }
}

let display_value = "0";

const updateDisplay = () => {
    document.getElementById("display").innerText = display_value;
}

const appendToDisplay = (value) => {
    if (display_value == "0") {
        display_value = value;
    } else {
        display_value += value;
    }
    updateDisplay();
};

const buttons = document.querySelectorAll(".numbers");
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.innerText;
        appendToDisplay(value);
    });
});

const clearDisplay = () => {
    display_value = "0";
    updateDisplay();
};

const button1 = document.getElementById("1")
button1.addEventListener("click", () => {
    console.log("1");
});

const button2 = document.getElementById("2")
button2.addEventListener("click", () => {
    console.log("2");
});

const button3 = document.getElementById("3")
button3.addEventListener("click", () => {
    console.log("3");
});

const button4 = document.getElementById("4")
button4.addEventListener("click", () => {
    console.log("4");
});

const button5 = document.getElementById("5")
button5.addEventListener("click", () => {
    console.log("5");
});

const button6 = document.getElementById("6")
button6.addEventListener("click", () => {
    console.log("6");
});

const button7 = document.getElementById("7")
button7.addEventListener("click", () => {
    console.log("7");
});

const button8 = document.getElementById("8")
button8.addEventListener("click", () => {
    console.log("8");
});

const button9 = document.getElementById("9")
button9.addEventListener("click", () => {
    console.log("9");
});

const button0 = document.getElementById("0")
button0.addEventListener("click", () => {
    console.log("0");
});

const buttonDot = document.getElementById(".")
buttonDot.addEventListener("click", () => {
    console.log(".");
});

const buttonPlus = document.getElementById("+")
buttonPlus.addEventListener("click", () => {
    console.log("+");
});

const buttonMinus = document.getElementById("-")
buttonMinus.addEventListener("click", () => {
    console.log("-");
});

const buttonMultiply = document.getElementById("*")
buttonMultiply.addEventListener("click", () => {
    console.log("*");
});

const buttonDivide = document.getElementById("/")
buttonDivide.addEventListener("click", () => {
    console.log("/");
});

const buttonAC = document.getElementById("AC")
buttonAC.addEventListener("click", () => {
    clearDisplay();
});

const buttonEqual = document.getElementById("=")
buttonEqual.addEventListener("click", () => {
    console.log("=");
});
