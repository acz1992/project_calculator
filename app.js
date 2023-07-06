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
/* let operator = "add" || "minus" || "multiply" || "divide" || "power"; */ // Will hook up to buttons with operator symbols
let num2; // second button that is clicked
let operator;

function operate(num1, num2, operator) {
	switch (operator) {
		case "add":
			return add(num1, num2);
			break;
		case "minus":
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

/* Top Display */

// Initialize topDisplayValue
const topDisplay = document.querySelector("#topDisplay");
let topDisplayValue = "";
topDisplay.innerHTML = topDisplayValue;

/* Operation Buttons */

// Declare variables globally
let firstInput;
let secondInput;
// Keep track whether current input is first or second
let isFirstInput = true;

// Add event listeners to operation buttons
const operationBtns = document.querySelectorAll(".operationBtns");
operationBtns.forEach((operationBtn) => {
	operationBtn.addEventListener("click", () => {
		// Save first input and operation
		firstInput = Number(bottomDisplayValue);
		operator = operationBtn.id;
		// clear bottom display and add initial value to Top Display
		topDisplay.innerHTML = firstInput + operationBtn.innerHTML;
		bottomDisplayValue = "";
		bottomDisplay.innerHTML = bottomDisplayValue;
		isFirstInput = false;
	});
});

// Maps operator variable IDs to symbols for use in top display
const operatorSymbols = {
	add: "&#43",
	minus: "&#45",
	multiply: "&#215;",
	divide: "&#247;",
};

// Call Operate function when "equals" clicked
const equals = document.querySelector("#equals");
equals.addEventListener("click", () => {
	if (firstInput !== undefined && bottomDisplayValue !== "") {
		secondInput = Number(bottomDisplayValue);
		//
		topDisplay.innerHTML = `${firstInput} ${operatorSymbols[operator]} ${secondInput}`;
		bottomDisplayValue = "";
		let solution = operate(firstInput, secondInput, operator);
		updateDisplay(solution);
	}
});

/* Prevent decimal point from being entered more than once */

// Initialise variables trakcing decimal usage
let firstInputHasDecimal = false;
let secondInputHasDecimal = false;

function updateDisplay(value) {
	// ignore input if decimal already present
	if (value === "." && isFirstInput && firstInputHasDecimal) {
		return;
	} else if (value === "." && !isFirstInput && secondInputHasDecimal) {
		return;
	}
	bottomDisplayValue += value.toString();
	bottomDisplay.innerHTML = bottomDisplayValue;

	// Update decimal usage
	if (value === "." && isFirstInput) {
		firstInputHasDecimal = true;
	} else if ((value === ".") & !isFirstInput) {
		secondInputHasDecimal = true;
	}
}
