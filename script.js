let unitLength = 0;
const NUM_BUTTONS_PER_ROW = 4;
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

function customizeButton(button, width, backgroundColor, textContent) {
    button.style.width = width * unitLength + "px";
    button.style.height = unitLength / 2 + "px";
    button.style.backgroundColor = backgroundColor;
    button.textContent = textContent;
}

function main() {
    const calculator = document.querySelector(".calculator");
    const usableWidth = calculator.clientWidth - calculator.style.paddingLeft
    - calculator.style.paddingRight;
    const NUM_BUTTONS_PER_ROW = 4;
    const gap = calculator.style.gap;
    unitLength = (usableWidth - (NUM_BUTTONS_PER_ROW - 1) * gap)
    / NUM_BUTTONS_PER_ROW;

    const numberButtons = [];
    for (let i = 0; i <= 9; i++) {
        const button = document.createElement("button");
        button.setAttribute("id", "button" + i);
        numberButtons.push(i);
    }

    const buttonAdd = document.createElement("button");
    buttonAdd.setAttribute("id", "buttonAdd");

    const buttonSubtract = document.createElement("button");
    buttonSubtract.setAttribute("id", "buttonSubtract");

    const buttonMultiply = document.createElement("button");
    buttonMultiply.setAttribute("id", "buttonMultiply");

    const buttonDivide = document.createElement("button");
    buttonDivide.setAttribute("id", "buttonDivide");

    const buttonEquals = document.createElement("button");
    buttonEquals.setAttribute("id", "buttonEquals");

    const buttonDecimal = document.createElement("button");
    buttonDecimal.setAttribute("id", "buttonDecimal");

    const buttonAC = document.createElement("button");
    buttonAC.setAttribute("id", "buttonAC");

    const buttonNegate = document.createElement("button");
    buttonNegate.setAttribute("id", "buttonNegate");

    const operations = document.querySelector(".operations");
    const operationButtons = [buttonDivide, buttonMultiply, buttonSubtract,
        buttonAdd, buttonEquals
    ];
    for (let button of operationButtons) {
        if (button === buttonDivide) {
            customizeButton(button, 1, OPERATION_COLOR, "/");
        } else if (button === buttonMultiply) {
            customizeButton(button, 1, OPERATION_COLOR, "*");
        } else if (button === buttonSubtract) {
            customizeButton(button, 1, OPERATION_COLOR, "-");
        } else if (button === buttonAdd) {
            customizeButton(button, 1, OPERATION_COLOR, "+");
        } else {
            customizeButton(button, 1, EQUALS_COLOR, "=");
        }
        operations.appendChild(button);
    }
}

main();