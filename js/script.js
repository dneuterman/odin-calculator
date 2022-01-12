const calculatorScreen = document.querySelector('.calculator-screen');
const numericalButtons = document.querySelectorAll('.number-button');
const operatorButtons = document.querySelectorAll('.operator-button');
const equalButton = document.querySelector('.equal-button');

// value and operator initialization
let firstValue = '',
  secondValue = '',
  previousOperator = '',
  currentOperator = '',
  screenAnswer = '';

let secondValueInput = false,
  secondOperatorInput = false;

// mathematical functions
const add = (a, b) => parseInt(a) + parseInt(b);
const subtract = (a, b) => parseInt(a) - parseInt(b);
const multiply = (a, b) => parseInt(a) * parseInt(b);
const divide = (a, b) => parseInt(a) / parseInt(b);

// updates screen when a number is pressed
const incrementValue = (value) => {
  console.log(value)
  if (secondValueInput === false) {
    firstValue += value;
    calculatorScreen.textContent = firstValue;
  } else {
    secondValue += value;
    calculatorScreen.textContent = secondValue;
  }
}

// checks whether an operation is used for the first or second time
const operationCheck = (answer) => {
  if (secondOperatorInput === false) {
    secondOperatorInput = true;
    secondValueInput = true;
  } else {
    firstValue = answer;
    screenAnswer = answer;
    calculatorScreen.textContent = firstValue;
    secondValue = '';
    secondOperatorInput = true;
    secondValueInput = true;
  }
}

// performs the specified operation
const calculatorOperation = (operator, equalSignButton = false) => {
  currentOperator = operator;
  let answer;
  if (firstValue === '') {
    return;
  }
  switch (operator) {
    case '+':
      answer = add(firstValue, secondValue)
      if (!equalSignButton) {
        if (secondValue === '') {
          operationCheck(add(firstValue, screenAnswer))
        } else {
          operationCheck(answer);
        }
      } else {
        screenAnswer = answer;
      }
      break;

    case '-':
      answer = subtract(firstValue, secondValue);
      if (!equalSignButton) {
        if (secondValue === '') {
          operationCheck(subtract(firstValue, screenAnswer))
        } else {
          operationCheck(answer);
        }
      } else {
        screenAnswer = answer;
      }
      break;

    case '*':
      answer = multiply(firstValue, secondValue)
      if (!equalSignButton) {
        if (secondValue === '') {
          operationCheck(multiply(firstValue, screenAnswer));
        } else {
          operationCheck(answer);
        }
      } else {
        screenAnswer = answer;
      }
      break;

    case '/':
      answer = divide(firstValue, secondValue)
      if (!equalSignButton) {
        if (secondValue === '') {
          operationCheck(divide(firstValue, screenAnswer));
        } else {
          operationCheck(answer);
        }
      } else {
        screenAnswer = answer;
      }
      break;
  }
}

const calculateAnswer = () => {
  if (firstValue === '') {
    return;
  }
  calculatorOperation(currentOperator, true);
  calculatorScreen.textContent = screenAnswer;
}

numericalButtons.forEach(button => {
  button.addEventListener('click', e => {
    incrementValue(e.target.textContent);
  })
})

operatorButtons.forEach(button => {
  button.addEventListener('click', e => {
    calculatorOperation(e.target.textContent);
  })
})

equalButton.addEventListener('click', calculateAnswer);