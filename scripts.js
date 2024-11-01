/* 

// Copyright © 2023 Mehmet Ali KABA

// For more information or anything contact To@mehmetalikaba.com or find me on https://mehmetalikaba.com/links

*/


document.addEventListener('DOMContentLoaded', (event) => {

    document.addEventListener('keydown', function(event) {
        if (event.key === ' ') {
            event.preventDefault();
            clearAll();
        } else if (event.key === 'Backspace' || event.key === 'Delete') {
            event.preventDefault();
            deleteLastDigit();
        } else if ((event.key >= 0 && event.key <= 9) || event.key === '.') {
            appendValue(event.key);
        } else if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {
            operate(event.key);
        } else if (event.key === 'Enter' || event.key === '=') {
            event.preventDefault();
            calculate();
        }
    });
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            const buttonValue = button.textContent;
            if (buttonValue === 'AC') {
                clearAll();
            } else if (buttonValue === '+/-') {
                negative();
            } else if (buttonValue === '%') {
                percentage();
            } else if (buttonValue === '/' || buttonValue === '*' || buttonValue === '-' || buttonValue === '+') {
                operate(buttonValue);
            } else if (buttonValue === '=') {
                calculate();
            } else if(buttonValue === '←'){
                deleteLastDigit();
            }
            else {
                appendValue(buttonValue);
            }
        });
    });

   
});

let currentInput = "";
let currentOperation = null;
let previousInput = "";
let shouldResetScreen = false;

function appendValue(value) {
    if (shouldResetScreen) {
        document.getElementById('output').textContent = value;
        currentInput = value;
        shouldResetScreen = false;
    } else {
        currentInput += value;
        document.getElementById('output').textContent = currentInput;
    }
}

function clearAll() {
    currentInput = "";
    previousInput = "";
    currentOperation = null;
    shouldResetScreen = false;
    document.getElementById('output').textContent = "0";
}

function deleteLastDigit() {
    if (currentInput !== "") {
        currentInput = currentInput.slice(0, -1);
        document.getElementById('output').textContent = currentInput.length === 0 ? "0" : currentInput;
    }
}

function negative() {
    // Check if currentInput is empty, not a number, or equals "0"
    if (currentInput === "" || isNaN(currentInput) || currentInput === "0") {
        currentInput = "0";
    } else {
        // If currentInput is a valid number, toggle between negative and positive
        currentInput = currentInput.startsWith("-") ? currentInput.substr(1) : "-" + currentInput;
    }

    // Update the calculator display
    document.getElementById('output').textContent = currentInput;
}


function percentage() {
    currentInput = String(parseFloat(currentInput) / 100);
    document.getElementById('output').textContent = currentInput;
}

function operate(operator) {
    if (currentOperation !== null && currentInput !== "") {
        calculate();
    }
        
    shouldResetScreen = true;
    

    if (currentInput === "") currentInput = "0";
    previousInput = currentInput;

    currentOperation = operator;
    document.getElementById('output').textContent = operator;
}


function appendValue(value) {
    const output = document.getElementById('output');
    if (output.textContent === 'Error' || output.textContent === 'NaN') {
       
        clearAll();
    }

    if (shouldResetScreen) {
        currentInput = value;
        output.textContent = currentInput;
        shouldResetScreen = false;
    } else if (value === '.' && currentInput.includes('.')) {
       
        return;
    } else if (currentInput.length < 16) {
        currentInput += value;
        output.textContent = currentInput;
    }
}



function calculate() {
    if (currentOperation === null || shouldResetScreen) return;
    let operationResult;
    switch (currentOperation) {
        case "+":
            operationResult = parseFloat(previousInput) + parseFloat(currentInput);
            break;
        case "-":
            operationResult = parseFloat(previousInput) - parseFloat(currentInput);
            break;
        case "*":
            operationResult = parseFloat(previousInput) * parseFloat(currentInput);
            break;
        case "/":
            operationResult = parseFloat(previousInput) / parseFloat(currentInput);
            break;
        default:
            return;
    }


    currentInput = String(operationResult);
    if (currentInput.length > 16) {
        if (operationResult > 1e15) { 
            currentInput = operationResult.toExponential(9); 
        } else {
            currentInput = operationResult.toPrecision(15); 
        }
    }

    currentOperation = null;
    shouldResetScreen = true;
    document.getElementById('output').textContent = currentInput;

    

    
}

