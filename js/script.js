const calculatorScreen = document.querySelector('.calculator-screen');
const numericalButtons = document.querySelectorAll('.number-button');
const operatorButtons = document.querySelectorAll('.operator-button');
const equalButton = document.querySelector('.equal-button');
const clearButton = document.querySelector('.clear-button');
const deleteButton = document.querySelector('.delete-button');

// value and operator initialization
let previousValue = '',
  currentValue = '',
  currentOperator = undefined;

// mathematical functions
const add = (a, b) => parseFloat(a) + parseFloat(b);
const subtract = (a, b) => parseFloat(a) - parseFloat(b);
const multiply = (a, b) => parseFloat(a) * parseFloat(b);
const divide = (a, b) => parseFloat(a) / parseFloat(b);

// increments current value
const incrementValue = (value) => {
  if (value === '.' && currentValue.includes('.')) {
    return;
  }
  currentValue += value;
}

// deletes recent input
const deleteRecentInput = () => {
  currentValue = currentValue.toString().slice(0, -1);
}

// update screen
const updateScreen = () => {
  calculatorScreen.textContent = currentValue;
}

// select the operator
const selectOperator = (operator) => {
  if (currentValue === '') {
    return;
  }
  if (previousValue !== '') {
    calculatorOperation();
  }
  updateScreen();
  currentOperator = operator;
  previousValue = currentValue;
  currentValue = '';
}

// performs the specified operation
const calculatorOperation = () => {
  let answer;
  if (isNaN(parseInt(previousValue)) || isNaN(parseInt(currentValue))) {
    return;
  }
  switch (currentOperator) {
    case '+':
      answer = add(previousValue, currentValue);
      break;
    case '-':
      answer = subtract(previousValue, currentValue);
      break;
    case '*':
      answer = multiply(previousValue, currentValue);
      break;
    case '/':
      answer = divide(previousValue, currentValue);
      break;
    default:
      return;
  }
  currentValue = answer.toString();
  currentOperator = undefined;
  previousValue = '';
}

numericalButtons.forEach(button => {
  button.addEventListener('click', () => {
    incrementValue(button.textContent);
    updateScreen();
  })
})

operatorButtons.forEach(button => {
  button.addEventListener('click', () => {
    selectOperator(button.textContent);
  })
})

equalButton.addEventListener('click', () => {
  calculatorOperation();
  updateScreen();
});

clearButton.addEventListener('click', () => {
  previousValue = '';
  currentValue = '';
  currentOperator = undefined;
  updateScreen();
})

deleteButton.addEventListener('click', () => {
  deleteRecentInput();
  updateScreen();
});