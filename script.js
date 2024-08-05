let unitLength = 0;
const GAP = 2;
const NUM_BUTTONS_PER_ROW = 4;
const NUMBER_COLOR = "lightgray";
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
    button.style.width = width * unitLength + GAP * (width - 1) + "px";
    button.style.height = unitLength / 2 + "px";
    button.style.backgroundColor = backgroundColor;
    button.textContent = textContent;
    button.id = id;
    button.style.borderRadius = BORDER_RADIUS + "px";
    
    button.addEventListener("mouseenter", e => {
      e.currentTarget.style.opacity = "0.9";
    });
    
    button.addEventListener("mouseleave", e => {
      e.currentTarget.style.opacity = "1";
    });
}

function addRow(numberButtonContainer, newRow, buttonList) {
  newRow.style.display = "flex";
  newRow.style.gap = GAP + "px";
  buttonList.forEach(button => newRow.appendChild(button));
  numberButtonContainer.appendChild(newRow);
}

function main() {
    const calculator = document.querySelector(".calculator");
    calculator.style.gap = GAP + "px";
    const leftPadding = getComputedStyle(calculator).getPropertyValue("padding-left");
    const usableWidth = calculator.clientWidth -
    2 * leftPadding.substring(0, leftPadding.length - 2);
    unitLength = (usableWidth - (NUM_BUTTONS_PER_ROW - 1) * GAP)
    / NUM_BUTTONS_PER_ROW;
    const buttons = document.querySelector(".buttons");
    buttons.style.gap = GAP + "px";

    const numberButtons = [];
    for (let i = 0; i <= 9; i++) {
        const button = document.createElement("button");
        numberButtons.push(button);
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
    operations.style.gap = GAP + "px";
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
    
    const numberButtonContainer = document.querySelector(".numbers");
    numberButtonContainer.style.gap = GAP + "px";
    
    customizeButton(buttonAC, 1, NUMBER_COLOR, "AC", "buttonAC");
    customizeButton(buttonNegate, 2, NUMBER_COLOR, "+/-", "buttonNegate");
    addRow(numberButtonContainer, document.createElement("div"), [buttonAC, buttonNegate]);
    
    for (let i = 7; i >= 1; i -= 3) {
      const buttonList = [];
      for (let j = 0; j < 3; j++) {
        let num = i + j;
        customizeButton(numberButtons[num], 1, NUMBER_COLOR, num.toString(), "button" + num);
        buttonList.push(numberButtons[num]);
      }
      addRow(numberButtonContainer, document.createElement("div"), buttonList);
    }
    customizeButton(numberButtons[0], 2, NUMBER_COLOR, "0", "button0");
    customizeButton(buttonDecimal, 1, NUMBER_COLOR, ".", "buttonDecimal");
    addRow(numberButtonContainer, document.createElement("div"), [numberButtons[0], buttonDecimal]);
    
    let operand1 = 0;
    let operator = "";
    let operand2 = "";
    
    for (let i = 0; i <= 9; i++) {
      numberButtons[i].addEventListener();
    }
    
}

const BORDER_RADIUS = 2;

main();