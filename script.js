const buttons = document.querySelectorAll('.button');
const display = document.querySelector('.display');
const pressButtonColor = 'rgb(255,217,119)';
const defaultButtonColor = 'rgb(255, 244, 234)';
let retainResult = false;
let stack = [0];
let buttonPressed;

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

function modulo(a, b) {
    return a % b;
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
        case "%": // modulo
            return modulo(a, b);
    }
}

// listen to button pressed
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        buttonPressed = button.textContent; // String
        addToStack(buttonPressed);
        console.log(stack);
    })
})

buttons.forEach((button) => {
    button.addEventListener('mousedown', changeColor);
    button.addEventListener('mouseup', changeBackColor);
})

function changeColor(e) {
    e.target.style.backgroundColor = pressButtonColor;
}

function changeBackColor(e) {
    e.target.style.backgroundColor = defaultButtonColor;
}

// stack will contain Number type for numbers 
// String type for operators
function addToStack(input) {
    let prev = stack[stack.length - 1];
    let a;
    let b;
    let operator;
    if (Number(input) || Number(input) == 0) { // input is a number
        if (Number(prev) || prev == 0) { // prev is a number
            stack.pop();
            prev = (Number(prev) * 10) + Number(input);
            stack.push(prev);
        }
        else { // prev is operator or stack is empty
            stack.push(Number(input));
        }
    }
    else {
        if (input == "=") { // input is equal
            if (stack.length == 3) { // have to evaluate 
                b = stack.pop();
                operator = stack.pop();
                a = stack.pop();
                stack = [0]; // refresh stack 
                displayResult(operate(a, b, operator));
                retainResult = true;
            }
            else if (!Number(prev)) { // have to evaluate but with one number
                operator = stack.pop();
                b = stack.pop();
                addToStack(operate(b, b, operator));
            }
        }
        else if (input == "AC") {
            stack = [0];
            display.textContent = 0;
        }
        else { // input is an operator
            if (stack.length == 3) { // have to evaluate and update
                b = stack.pop();
                operator = stack.pop();
                a = stack.pop();
                let result = operate(a, b, operator);
                displayResult(result);
                addToStack(result);
                addToStack(input);
            }
            else { // add into stack
                if (typeof (prev) == 'string') { // remove previous operator
                    stack.pop();
                }
                if (retainResult) {
                    retainResult = false;
                    addToStack(Number(display.textContent));
                }
                if (stack.length == 0) { // stack is empty
                    console.log("hi");
                    stack.push(0);
                }
                stack.push(input);
            }
        }
    }
}

// display result
function displayResult(result) {
    display.textContent = String(result);
}
