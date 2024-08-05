let unitLength = 0;
const NUM_BUTTONS_PER_ROW = 4;
const NUMBER_COLOR = "gray";
const OPERATION_COLOR = "sandybrown";
const EQUALS_COLOR = "lightseagreen";

function operate(operand1, operand, operand2) {
    switch (operand) {
        case "buttonAdd":
            return operand1 + operand2;
        case "buttonSubtract":
            return operand1 - operand2;
        case "buttonMultiply":
            return operand1 * operand2;
        case "buttonDivide":
            if (operand2 == 0) {
                return null; // divide by zero error
            }
            return operand1 / operand2;
    }
}

function customizeButton(button, width, backgroundColor, textContent, id) {
    button.style.width = width * unitLength + "px";
    button.style.height = unitLength / 2 + "px";
    button.style.backgroundColor = backgroundColor;
    button.textContent = textContent;
    button.id = id;
}

function main() {
    const calculator = document.querySelector(".calculator");
    const usableWidth = calculator.clientWidth - calculator.style.paddingLeft
    - calculator.style.paddingRight;
    const gap = calculator.style.gap;
    unitLength = (usableWidth - (NUM_BUTTONS_PER_ROW - 1) * gap)
    / NUM_BUTTONS_PER_ROW;

    const numberButtons = [];
    for (let i = 0; i <= 9; i++) {
        const button = document.createElement("button");
        numberButtons.push(i);
    }

    const buttonAdd = document.createElement("button");

    const buttonSubtract = document.createElement("button");

    const buttonMultiply = document.createElement("button");

    const buttonDivide = document.createElement("button");

    const buttonEquals = document.createElement("button");

    const buttonDecimal = document.createElement("button");

    const buttonAC = document.createElement("button");

    const buttonNegate = document.createElement("button");

    const operations = document.querySelector(".operations");
    const operationButtons = [buttonDivide, buttonMultiply, buttonSubtract,
        buttonAdd, buttonEquals
    ];
    for (let button of operationButtons) {
        if (button === buttonDivide) {
            customizeButton(button, 1, OPERATION_COLOR, "/", "buttonDivide");
        } else if (button === buttonMultiply) {
            customizeButton(button, 1, OPERATION_COLOR, "*", "buttonMultiply");
        } else if (button === buttonSubtract) {
            customizeButton(button, 1, OPERATION_COLOR, "-", "buttonSubtract");
        } else if (button === buttonAdd) {
            customizeButton(button, 1, OPERATION_COLOR, "+", "buttonAdd");
        } else {
            customizeButton(button, 1, EQUALS_COLOR, "=", "buttonEquals");
        }
        operations.appendChild(button);
    }
}

main();