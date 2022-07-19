// Math operators
function add(a, b) {
    return a + b;
}

function substract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

// operate
function operate(a, b, operator) {
    switch (operator) {
        case "+": // addition
            return add(a, b);
        case "-": // subtraction
            return substract(a, b);
        case "*": // multiplication
            return multiply(a, b);
        case "/": // division
            return divide(a, b);
    }
}

let stack = [];


