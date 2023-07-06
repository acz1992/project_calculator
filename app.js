/* Math functions */

function add(a, b) {
	return a + b;
}

function subtract(a, b) {
	return a - b;
}

function multiply(a, b) {
	return a * b;
}

function divide(a, b) {
	return a / b;
}

function power(a, b) {
	return a ** b;
}

/* Calculator Initialisation */

let num1; // first button that is clicked
let operator = "add" || "subtract" || "multiply" || "divide" || "power"; // Will hook up to buttons with operator symbols
let num2; // second button that is clicked

function operate(num1, num2, operator) {
	switch (operator) {
		case "add":
			return add(num1, num2);
			break;
		case "subtract":
			return subtract(num1, num2);
			break;
		case "multiply":
			return multiply(num1, num2);
			break;
		case "divide":
			return divide(num1, num2);
			break;
	}
}

/* Populating Bottom Display */

let bottomDisplayValue = ""; // initialise bottom display value

// Grab bottom display & have it read bottomDisplayValue
const bottomDisplay = document.querySelector("#bottomDisplay");
bottomDisplay.innerHTML = bottomDisplayValue;

// Grab numBtns & update bottom display with each click
const numBtns = document.querySelectorAll(".numBtns");
numBtns.forEach((numBtn) => {
	numBtn.addEventListener("click", () => {
		updateDisplay(numBtn.id);
	});
});

function updateDisplay(value) {
	if (bottomDisplayValue.length < 14) {
		bottomDisplayValue += value;
	}
	bottomDisplay.innerHTML = bottomDisplayValue;
}

/* Top Display */

// Initialize topDisplayValue
const topDisplay = document.querySelector("#topDisplay");
let topDisplayValue = "";
topDisplay.innerHTML = topDisplayValue;

/* Operation Buttons */

// Declare variables globally
let firstInput;
let secondInput;

// Add event listeners to operation buttons
const operationBtns = document.querySelectorAll(".operationBtns");
operationBtns.forEach((operationBtn) => {
	operationBtn.addEventListener("click", () => {
		// Save first input and operation
		firstInput = bottomDisplayValue;
		operation = operationBtn.id;
		// clear bottom display and add initial value to Top Display
		topDisplay.innerHTML = firstInput + operationBtn.innerHTML;
		bottomDisplayValue = "";
		bottomDisplay.innerHTML = bottomDisplayValue;
	});
});

// Call Operate function when "equals" clicked
const equals = document.querySelector("#equals");
equals.addEventListener("click", () => {
	let solution = operate(firstInput, secondInput, operator);
	updateDisplay(solution);
});
