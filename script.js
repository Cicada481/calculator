let unitLength = 0;
const GAP = 2;
const NUM_BUTTONS_PER_ROW = 4;
const NUMBER_COLOR = "lightgray";
const OPERATION_COLOR = "sandybrown";
const EQUALS_COLOR = "lightseagreen";
const DIVISION_BY_ZERO_MESSAGE = "stop";
const BUTTON_BORDER_RADIUS = 2;
const DISPLAY_LIMIT = 23;
const DECIMAL_PRECISION = 5;
const BUTTON_HOVER_OPACITY = 0.9;

function operate(operand1, operand, operand2) {
    let result = "";
    switch (operand) {
        case "buttonAdd":
            result = +operand1 + +operand2;
            break;
        case "buttonSubtract":
            result = operand1 - operand2;
            break;
        case "buttonMultiply":
            result = operand1 * operand2;
            break;
        case "buttonDivide":
            if (+operand2 === 0) {
                return DIVISION_BY_ZERO_MESSAGE;
            }
            result = operand1 / operand2;
            break;
    }
    if (!Number.isInteger(result)) {
        result = parseFloat(result.toFixed(DECIMAL_PRECISION));
    }
    return result.toString();
} // operate()

function customizeButton(button, width, backgroundColor, textContent, id) {
    button.style.width = width * unitLength + GAP * (width - 1) + "px";
    button.style.height = unitLength / 2 + "px";
    button.style.backgroundColor = backgroundColor;
    button.textContent = textContent;
    button.id = id;
    button.style.borderRadius = BUTTON_BORDER_RADIUS + "px";
    
    button.addEventListener("mouseenter", e => {
        e.currentTarget.style.opacity = BUTTON_HOVER_OPACITY.toString();
    });
    
    button.addEventListener("mouseleave", e => {
        e.currentTarget.style.opacity = "1";
    });
} // customizeButton()

function addRow(numberButtonContainer, newRow, buttonList) {
    newRow.style.display = "flex";
    newRow.style.gap = GAP + "px";
    buttonList.forEach(button => newRow.appendChild(button));
    numberButtonContainer.appendChild(newRow);
} // addRow()

function displayResult(divDisplay, valueString) {
    if (valueString === "") {
        divDisplay.textContent = "0";
    } else {
        divDisplay.textContent = valueString.substring(0, DISPLAY_LIMIT);
    }
} // displayResult()

function negateValueString(valueString) {
  return (-(+valueString)).toString();
} // negateValueString()

function main() {
    const calculator = document.querySelector(".calculator");
    calculator.style.gap = GAP + "px";
    const leftPadding = getComputedStyle(calculator)
    .getPropertyValue("padding-left");
    const usableWidth = calculator.clientWidth -
    2 * parseInt(leftPadding);
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
    addRow(numberButtonContainer, document.createElement("div"), [buttonAC,
        buttonNegate]);
    
    for (let i = 7; i >= 1; i -= 3) {
      const buttonList = [];
      for (let j = 0; j < 3; j++) {
        let num = i + j;
        customizeButton(numberButtons[num], 1, NUMBER_COLOR, num.toString(),
        "button" + num);
        buttonList.push(numberButtons[num]);
      }
      addRow(numberButtonContainer, document.createElement("div"), buttonList);
    }
    customizeButton(numberButtons[0], 2, NUMBER_COLOR, "0", "button0");
    customizeButton(buttonDecimal, 1, NUMBER_COLOR, ".", "buttonDecimal");
    addRow(numberButtonContainer, document.createElement("div"),
    [numberButtons[0], buttonDecimal]);
    
    let storedValue = "0";
    let operator = "";
    let currentValue = "";
    let hasDecimal = false;
    let hasOperator = false;

    let divDisplay = document.querySelector(".display");
    
    buttonEquals.addEventListener("click", () => {
        if (!hasOperator) {
            if (currentValue !== "") {
                storedValue = currentValue;
            }
        } else if (currentValue !== "") {
            storedValue = operate(storedValue, operator, currentValue);
            
            displayResult(divDisplay, storedValue);

            if (storedValue === DIVISION_BY_ZERO_MESSAGE) {
                storedValue = "0";
            }
        }
        operator = "";
        currentValue = "";
        hasDecimal = false;
        hasOperator = false;
    });

    for (let button of operationButtons) {
        if (button !== buttonEquals) {
            button.addEventListener("click", e => {
                buttonEquals.dispatchEvent(new Event("click"));
                operator = e.currentTarget.id;
                hasOperator = true;
            });
        }
    }
    
    for (let i = 0; i <= 9; i++) {
        numberButtons[i].addEventListener("click", e => {
            if (!(i === 0 && currentValue === "0")) {
                if (currentValue === "0") {
                    currentValue = i.toString();
                } else {
                    currentValue += i;
                }
                displayResult(divDisplay, currentValue);
            }
        });
    }
    
    buttonDecimal.addEventListener("click", e => {
      if (!hasDecimal) {
        if (currentValue === "") {
          currentValue = "0";
        }
        currentValue += ".";
        hasDecimal = true;
        displayResult(divDisplay, currentValue);
      }
    });
    
    buttonNegate.addEventListener("click", e => {
      if (currentValue === "") {
        storedValue = negateValueString(storedValue);
        displayResult(divDisplay, storedValue);
      } else {
        currentValue = negateValueString(currentValue);
        displayResult(divDisplay, currentValue);
      }
    })
    
    buttonAC.addEventListener("click", e => {
      storedValue = "0";
      operator = "";
      currentValue = "";
      hasDecimal = false;
      hasOperator = false;
      displayResult(divDisplay, storedValue);
    })
    
    document.addEventListener("keydown", e => {
      if (!isNaN(+e.key)) {
        let num = +e.key;
        numberButtons[num].dispatchEvent(new Event("click"));
      } else if (e.key === "+") {
        buttonAdd.dispatchEvent(new Event("click"));
      } else if (e.key === "-") {
        buttonSubtract.dispatchEvent(new Event("click"));
      } else if (e.key === "*") {
        buttonMultiply.dispatchEvent(new Event("click"));
      } else if (e.key === "/") {
        buttonDivide.dispatchEvent(new Event("click"));
      } else if (e.key === "=") {
        buttonEquals.dispatchEvent(new Event("click"));
      } else if (e.key === ".") {
        buttonDecimal.dispatchEvent(new Event("click"));
      } else if (e.key === "Backspace"){
        if (currentValue === "") {
          buttonAC.dispatchEvent(new Event("click"));
        } else {
          let lastChar = currentValue.at(-1);
          currentValue = currentValue.substring(0, currentValue.length - 1);
          if (lastChar === ".") {
            hasDecimal = false;
          }
          displayResult(divDisplay, currentValue);
        }
      }
    })
    
    displayResult(divDisplay, storedValue);
} // main()

main();
