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
        buttons.forEach(button => button.addEventListener('mouseup', (e) => {
            
            if(e.target.textContent !== 'AC' && e.target.textContent !== 'C' && e.target.textContent !== '+/-') { //self explanatory
                result.textContent += e.target.textContent;
                displayValue = result.textContent;

            }
            if(e.target.classList.contains('operation')) { //check if the button is an opeartor
                
                // result.textContent = changeOperator(e.target.textContent);
                operation = e.target.textContent;
                first = displayValue.slice(0, -1); //remove the operator
                displayValue = first;
            }
            if(e.target.textContent === equalButton.textContent) { //check if the button is =
                second = displayValue.slice(first.length + 1).slice(0, -1); //remove the operator and the =
                history.textContent += `${first} ${operation} ${second} = `;
                result.textContent = operate(operation, first, second);
                resetHistory(); //only show the last operation on screen
            }
    }))
}

function resetHistory(){
if(!first || !second) {
    history.textContent = "";
} else { history.textContent = `${first} ${operation} ${second} = `; }
}

function deleteSingleCharacter(){
    deleteButton.addEventListener('click', () => {
        if(result.textContent.length > 1) {
            result.textContent = result.textContent.slice(0, -1);
            displayValue = result.textContent;
        } else if(result.textContent.length === 1) {
            result.textContent = "";
            history.textContent = "";
            displayValue = result.textContent;
        }
        
    })
}

function deleteAllCharacters(){
    deleteAllButton.addEventListener('click', () => {
        first = "";
        second = "";
        operation = "";
        result.textContent = "";
        displayValue = "";
        history.textContent = "";
    })
}

pressButton();
deleteSingleCharacter();
deleteAllCharacters();

function add(a, b) {return parseFloat(a) + parseFloat(b);}
function subtract(a, b) {return parseFloat(a) - parseFloat(b);}
function multiply(a, b) {return parseFloat(a) * parseFloat(b);}
function divide(a,b) {
    if(parseFloat(b) === 0) {
        return 'NOT TODAY';
    }
    let divisionResult = parseFloat(a) / parseFloat(b);
    return truncateDecimals(divisionResult * 1000) / 1000; //truncate division result to max 3 decimals
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

function truncateDecimals(number){
    return Math[number < 0 ? 'ceil' : 'floor'](number);
};

//sa rezolv impartirea la un nr negativ (aka replace cand ai deja un operator)
//poate radical in loc de %