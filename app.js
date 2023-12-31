/* Math functions */

const mathFunctions = {
	add: function (a, b) {
		return a + b;
	},
	subtract: function (a, b) {
		return a - b;
	},
	multiply: function (a, b) {
		return a * b;
	},
	divide: function (a, b) {
		return a / b;
	},
};

/* Calculator Initialisation */

let num1; // first button that is clicked
let num2; // second button that is clicked
let operator = null; // determines whether operator already been selected
// Keep track whether current input is first or second
let isFirstInput = true;
let secondOperator = null;

function operate(num1, num2, operator) {
	switch (operator) {
		case "add":
			return mathFunctions.add(num1, num2);
			break;
		case "minus":
			return mathFunctions.subtract(num1, num2);
			break;
		case "multiply":
			return mathFunctions.multiply(num1, num2);
			break;
		case "divide":
			return mathFunctions.divide(num1, num2);
			break;
	}
}

/* Adding Keyboard Functionality */

// Add keydown Event Listener
document.addEventListener("keydown", handleKeyDown);

//Define "handleKeyDown" function to handle key press events
function handleKeyDown(event) {
	// Get the key pressed
	const keyCode = event.keyCpde || event.which;
	// Map the keycode to corresponding calculator button
	switch (keyCode) {
		case 48: // 0
			document.getElementById("0").click();
			break;
		case 49: // 1
			document.getElementById("1").click();
			break;
		case 50: // 2
			document.getElementById("2").click();
			break;
		case 51: // 3
			document.getElementById("3").click();
			break;
		case 52: // 4
			document.getElementById("4").click();
			break;
		case 53: // 5
			document.getElementById("5").click();
			break;
		case 54: // 6
			document.getElementById("6").click();
			break;
		case 55: // 7
			document.getElementById("7").click();
			break;
		case 56: // 8
			document.getElementById("8").click();
			break;
		case 57: // 9
			document.getElementById("9").click();
			break;
		case 187: // +
			document.getElementById("add").click();
			break;
		case 189: // -
			document.getElementById("minus").click();
			break;
		case 88: // *
			document.getElementById("multiply").click();
			break;
		case 191: // /
			document.getElementById("divide").click();
			break;
		case 190: // .
			document.getElementById(".").click();
			break;
		case 13: // Enter
			document.getElementById("equals").click();
			break;
		case 8: // Backspace
			document.getElementById("delete").click();
			break;
		case 46: // Delete
			document.getElementById("clear").click();
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
let solution;

// Add event listeners to operation buttons
const operationBtns = document.querySelectorAll(".operationBtns");
operationBtns.forEach((operationBtn) => {
	operationBtn.addEventListener("click", (e) => {
		if (operator === null) {
			// First time an operator is being selected
			firstInput = Number(bottomDisplayValue);
			operator = operationBtn.id;
			topDisplay.innerHTML = `${firstInput} ${operatorSymbols[operator]}`;
			bottomDisplayValue = "";
			bottomDisplay.innerHTML = bottomDisplayValue;
		} else {
			// Operator has already been selected
			secondInput = Number(bottomDisplayValue);
			solution = operate(firstInput, secondInput, operator);
			firstInput = solution;
			operator = operationBtn.id;
			topDisplay.innerHTML = `${firstInput} ${operatorSymbols[operator]}`;
			bottomDisplayValue = "";
			bottomDisplay.innerHTML = bottomDisplayValue;
		}
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
		solution = operate(firstInput, secondInput, operator);
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

/* Clear and Delete */

// Reset all variables to initial value
function clear() {
	// reset all variables to initial value
	num2 = null;
	operator = null;
	isFirstInput = true;
	bottomDisplayValue = "";
	bottomDisplay.innerHTML = bottomDisplayValue;
	topDisplayValue = "";
	topDisplay.innerHTML = topDisplayValue;
	firstInputHasDecimal = false;
	secondInputHasDecimal = false;
}

const clearBtn = document.querySelector("#clear");
clearBtn.addEventListener("click", (e) => {
	console.log(e);
	clear();
});

function deleteLastEntry() {
	if (isFirstInput) {
		// Remove the last digit from firstInput
		const firstInputString = bottomDisplayValue.toString();
		bottomDisplayValue = firstInputString.slice(0, -1);
		bottomDisplay.innerHTML = bottomDisplayValue;
	} else {
		// Remove the last operator from topDisplay
		const topDisplayString = topDisplay.innerHTML.toString();
		const operators = Object.values(operatorSymbols).join("");
		const regex = new RegExp(`[${operators}]`);
		const lastOperatorIndex = topDisplayString.search(regex);

		if (lastOperatorIndex !== -1) {
			topDisplayValue = topDisplayString.slice(0, lastOperatorIndex);
			topDisplay.innerHTML = topDisplayValue;
			operator = undefined;
		}

		bottomDisplayValue = firstInput.toString();
		bottomDisplay.innerHTML = bottomDisplayValue;
	}
}

const deleteBtn = document.querySelector("#delete");
deleteBtn.addEventListener("click", () => {
	deleteLastEntry();
});
