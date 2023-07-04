/* Math functions */

// More complex Add Functions that add more than two numbers
/* function add(array) {
    return array.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    } */

/*     function add(array) {
        let sum = 0;
        for(let i = 0; i < array.length; i++) {
            sum += array[i]
        }
        return sum
    } */

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
		case "power":
			return power(num1, num2);
			break;
	}
}

/* Populating Bottom Display */

// Grab bottom display
const bottomDisplay = document.querySelector("#bottomDisplay");
