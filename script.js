function add(a, b) {return a + b;}
function subtract(a, b) {return a - b;}
function multiply(a, b) {return a * b;}
function divide(a, b) {
    if(b === 0) return null;
    return a / b;
}

function operate(operator, a, b){
    switch(operator){
        case '+': return add(a, b);
        case '-': return subtract(a, b); 
        case '*': return multiply(a, b);
        case '/': return divide(a, b);
        default: alert(`${operator} is not an operator`); break;
    }
}

// const para = document.querySelector('p');
// para.textContent = `${operate('0', 2, 0)}`;

// console.log(x);
// console.log(divide(4, 2));