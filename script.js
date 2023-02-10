const calculatorScreen = document.querySelector('.calculator-screen');
const buttons = document.querySelectorAll('button');
const deleteButton = document.querySelector('.delete');
const deleteAllButton = document.querySelector('.delete-all');
const operationButtons = document.querySelectorAll('.operation');
const equalButton = document.querySelector('.equals');
const para = document.querySelector('p');
let displayValue;
let first, second, operation;


function pressButton(){
        buttons.forEach(button => button.addEventListener('click', (e) => {
            if(e.target.textContent !== 'AC' && e.target.textContent !== 'C') {
                calculatorScreen.textContent += e.target.textContent;
                displayValue = calculatorScreen.textContent;
            }
            if(e.target.classList.contains('operation')) {
                operation = e.target.textContent;
                first = calculatorScreen.textContent.slice(0, -1);
                displayValue = first;
            }
            if(e.target.textContent === '=') {
                second = displayValue.slice(first.length + 1).slice(0, -1);
                // console.log(first);
                // console.log(second);
                para.textContent += `${first} ${operation} ${second} = `;
                calculatorScreen.textContent = operate(operation, first, second);
                para.textContent += calculatorScreen.textContent;
            }
    }))
}

function calculate(){

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
        para.textContent = "";
    })
}

pressButton();
deleteSingleCharacter();
deleteAllCharacters();

function add(a, b) {return parseInt(a) + parseInt(b);}
function subtract(a, b) {return parseInt(a) - parseInt(b);}
function multiply(a, b) {return parseInt(a) * parseInt(b);}
function divide(a,b) {
    if(parseInt(b) === 0) return null;
    return parseInt(a) / parseInt(b);
}

function operate(operator, a, b){
    switch(operator){
        case '+': return add(a, b);
        case '-': return subtract(a, b); 
        case 'x': return multiply(a, b);
        case '/': return divide(a, b);
        default: alert(`${operator} is not an operator`); break;
    }
}