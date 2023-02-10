const calculatorScreen = document.querySelector('.calculator-screen');
const buttons = document.querySelectorAll('button');
const deleteButton = document.querySelector('.delete');
const deleteAllButton = document.querySelector('.delete-all');
const operationButtons = document.querySelectorAll('.operation');
const equalButton = document.querySelector('.equals');
const history = document.querySelector('.history');
const result = document.querySelector('.result');
let displayValue;
let first, second, operation;


function pressButton(){
        buttons.forEach(button => button.addEventListener('click', (e) => {
            if(e.target.textContent !== 'AC' && e.target.textContent !== 'C') {
                result.textContent += e.target.textContent;
                displayValue = result.textContent;
            }
            if(e.target.classList.contains('operation')) {
                operation = e.target.textContent;
                first = result.textContent.slice(0, -1);
                displayValue = first;
            }
            if(e.target.textContent === '=') {
                second = displayValue.slice(first.length + 1).slice(0, -1);
                // console.log(first);
                // console.log(second);
                history.textContent += `${first} ${operation} ${second} = `;
                result.textContent = operate(operation, first, second);
                history.textContent += result.textContent;
            }
    }))
}

function calculate(){

}

function deleteSingleCharacter(){
    deleteButton.addEventListener('click', () => {
        result.textContent = result.textContent.slice(0, -1);
        displayValue = result.textContent;
    })
}

function deleteAllCharacters(){
    deleteAllButton.addEventListener('click', () => {
        result.textContent = "";
        displayValue = "";
        history.textContent = "";
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