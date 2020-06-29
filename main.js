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

function operate(operation, n1, n2) {
    return operations[operation](n1, n2);
}

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
}

const equation = [];
let digitsString = "";
let display = document.getElementById("display-numbers")
let buttons = document.querySelector("#main-grid");

function handleClicks(e) {
    let selection = "";
    if (e.target.className == "numbers buttons" || 
            e.target.className == "operators buttons") {
        selection = e.target.id;
    }
    if (e.target.className == "numbers buttons") { 
          digitsString += e.target.id.toString();
    }
    if (e.target.className == "operators buttons") {
        equation.push(+digitsString);
        equation.push(e.target.id);
        digitsString = "";
    }
    if (e.target.id == "enter") {
        equation.push(+digitsString);
        compute();
        display.textContent = equation[0]; //update display to final answer
        selection = "";
    }
    if (e.target.id == "clear") {
        clear();
        selection = "";
    }
    display.textContent += selection;
}

clear();
buttons.addEventListener("click", handleClicks);

