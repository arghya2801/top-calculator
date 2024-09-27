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
}