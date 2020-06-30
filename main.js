//what to do after equation: if more numbers, clear. (set a toggle after compute?)
//if operands, continue.
// -currently trying with "hasLooped"
//-grey out . if not available?

const operations = {
    add: function(n1, n2) {
        return n1 + n2;
    },
    subtract: function(n1, n2) {
        return n1 - n2;
    },
    multiply: function(n1, n2) {
        return n1 * n2;
    },
    divide: function(n1, n2) {
        return n1 / n2;
    },
}

// **called for in TOP instructions but didn't end up using
// function operate(operation, n1, n2) {
//     return operations[operation](n1, n2);
// }

function compute() { //Loop through the equation array, once for */ and once for +-
    //loop for * and /
    for (let i = 0; i < equation.length; i++) {
        if (equation[i] == "*") {
            let newNum = operations.multiply(equation[i-1], equation[i+1]);
            equation.splice(i-1, 3, newNum);
            i = i-2; //set loop counter back since array has shrunk
        }
        if (equation[i] == "/") {
            let newNum = operations.divide(equation[i-1], equation[i+1]);
            equation.splice(i-1, 3, newNum);
            i = i-2; 
        }
    }
    //loop for + and -
    for (let i = 0; i < equation.length; i++) {
        if (equation[i] == "+") {
            let newNum = operations.add(equation[i-1], equation[i+1]);
            equation.splice(i-1, 3, newNum);
            i = i-2;
        }
        if (equation[i] == "-") {
            let newNum = operations.subtract(equation[i-1], equation[i+1]);
            equation.splice(i-1, 3, newNum);
            i = i-2;
        }
    }
}

function clear() {
    digitsString = "";
    equation.splice(0, equation.length);
    display.textContent = "";
    hasLooped = false;
}

function turnOffEnterGlow() {
    let enter = document.getElementById("enter");
    enter.classList.remove("glowing");
}

function turnOnEnterGlow() {
    let enter = document.getElementById("enter");
    enter.classList.add("glowing");
}

const equation = [];
let digitsString = "";
let display = document.getElementById("display-numbers")
let buttons = document.querySelector("#main-grid");
let hasLooped = false;

function handleClicks(e) {
    let selection = ""; //the selected number or operand, added to the display at end of function

  console.log(digitsString);
    if (e.target.id == "dot" && digitsString.indexOf(".") !== -1) {
       return;
    }

    if (e.target.className == "numbers buttons" || 
            e.target.className == "operators buttons") {
        selection = e.target.textContent;
    }

    if (e.target.className == "numbers buttons") { 
          digitsString += e.target.textContent.toString();
    }

    if (e.target.className == "operators buttons") {
        if (digitsString !== "") { 
            equation.push(+digitsString); 
        }
        equation.push(e.target.textContent);
        digitsString = "";
    }
    if (e.target.id == "enter") {
        equation.push(+digitsString);
        compute();
        turnOffEnterGlow();
        display.textContent = equation[0]; //update display to final answer
        selection = "";
        digitsString = "";
        hasLooped = true;
    }
    if (e.target.id == "clear") {
        clear();
        selection = "";
    }

    //glowing enter button if ready; length means at least a digit and an operand
    //and the next digit is waiting in digitsString 
    if (equation.length > 1 && digitsString) {
        turnOnEnterGlow();
    }
    
    display.textContent += selection;
    
}

clear();
buttons.addEventListener("click", handleClicks);


