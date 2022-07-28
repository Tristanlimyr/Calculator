const buttons = document.querySelectorAll('.button');
const display = document.querySelector('.display');
const pressButtonColor = 'rgb(255,217,119)';
const numberButtonColor = 'rgb(242,173,0)';
const operatorButtonColor = 'rgb(255, 149, 0)';
const clearButtonColor = 'rgb(80, 80, 80)';
let retainResult = false;
let stack = ['0'];
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
        case "–": // subtraction
            return substract(a, b);
        case "x": // multiplication
            return multiply(a, b);
        case "÷": // division
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
    if (e.target.id == 'clear') {
        e.target.style.backgroundColor = 'rgb(217, 220, 224)';
    }
    else {
        e.target.style.backgroundColor = pressButtonColor;
    }
}

function changeBackColor(e) {
    if (e.target.classList.contains('operator')) {
        e.target.style.backgroundColor = operatorButtonColor;
    }
    else if (e.target.id == 'clear') {
        e.target.style.backgroundColor = 'rgb(80, 80, 80)';
    }
    else {
        e.target.style.backgroundColor = numberButtonColor;
    }
}

// stack will contain String type for numbers 
// String type for operators
function addToStack(input) {
    let prev = stack[stack.length - 1];
    let a;
    let b;
    let operator;
    if (isNumber(input)) { // input is a number
        retainResult = false;
        if (hasDecimalPoint(prev)) { // prev has decimal point
            stack.pop();
            prev += input;
            stack.push(prev);
            displayResult(prev);
        }
        else if (Number.isInteger(Number(prev))) { // prev is a integer
            stack.pop();
            prev = String((Number(prev) * 10) + Number(input));
            stack.push(prev);
            displayResult(prev);
        }
        else { // prev is operator or stack is empty
            stack.push(input);
            displayResult(input);
        }
    }
    else if (input == "=") { // input is equal
        if (stack.length == 3) { // have to evaluate 
            b = Number(stack.pop());
            operator = stack.pop();
            a = Number(stack.pop());
            stack = ['0']; // refresh stack 
            displayResult(operate(a, b, operator));
            retainResult = true;
        }
        else if (isOperator(prev)) { // prev is an operator
            operator = stack.pop();
            b = Number(stack.pop());
            stack = ['0'];
            addToStack(operate(b, b, operator));
        }
    }
    else if (input == "AC") { // input is reset
        stack = ['0'];
        display.textContent = '0';
    }
    else { // input is an operator
        if (input == "+/-") { // operator is change sign
            if (isOperator(prev)) { // prev is an operator
                b = stack.pop();
                a = stack.pop();
                a = String(Number(a) * -1);
                stack.push(a);
                stack.push(b);
                displayResult(a);
            }
            else if (retainResult) {
                retainResult = false;
                prev = display.textContent;
                prev = String(Number(prev) * -1);
                stack.push(prev);
                displayResult(prev);
            }
            else { // prev is number    
                stack.pop();
                prev = String(Number(prev) * -1);
                stack.push(prev);
                displayResult(prev);
            }
        }
        else if (input == ".") { // operator is decimal
            if (isOperator(prev)) { // prev is an operator 
                stack.push('0');
                displayResult('0.');
            }
            else { // prev is number
                stack.pop();
                prev += "."
                stack.push(prev);
                displayResult(prev);
            }
        }
        else if (stack.length == 3) { // have to evaluate and update
            b = stack.pop();
            operator = stack.pop();
            a = stack.pop();
            let result = operate(a, b, operator);
            displayResult(result);
            addToStack(result);
            addToStack(input);
        }
        else { // add into stack
            if (isOperator(prev)) { // prev is an operator
                stack.pop();  // remove previous operator
            }
            if (retainResult) {
                retainResult = false;
                addToStack(display.textContent);
            }
            if (stack.length == 0) { // stack is empty
                console.log("hi");
                stack.push('0');
            }
            stack.push(input);
        }
    }
}



// AUXILIARY FUNCTIONS

// display result
function displayResult(result) {
    display.textContent = String(result);
}

// check if input has decimal point
function hasDecimalPoint(input) {
    for (let i = 0; i < input.length; i++) {
        if (input[i] == '.') {
            return true;
        }
    }
    return false;
}

function isOperator(input) {
    if (!Number(input) && input != '0') {
        return true;
    }
    return false;
}

function isNumber(input) {
    if (Number(input) || input == '0') {
        return true;
    }
    return false;
}