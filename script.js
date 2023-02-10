const calculatorScreen = document.querySelector('.calculator-screen');
const buttons = document.querySelectorAll('button');
const deleteButton = document.querySelector('.delete');
const deleteAllButton = document.querySelector('.delete-all');
let displayValue;


function pressButton(){
        buttons.forEach(button => button.addEventListener('click', (e) => {
            if(e.target.textContent !== 'AC' && e.target.textContent !== 'C') {
                calculatorScreen.textContent += e.target.textContent;
                displayValue = calculatorScreen.textContent;
            }
    }))
}

function deleteSingleCharacter(){
    deleteButton.addEventListener('click', () => {
        calculatorScreen.textContent = calculatorScreen.textContent.slice(0, -1);
        displayValue = calculatorScreen.textContent;
    })
}

function deleteAllCharacters(){
    deleteAllButton.addEventListener('click', () => {
        calculatorScreen.textContent = "";
        displayValue = "";
    })
}

pressButton();
deleteSingleCharacter();
deleteAllCharacters();

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