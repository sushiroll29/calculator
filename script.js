const calculatorScreen = document.querySelector('.calculator-screen');
const buttons = document.querySelectorAll('button');
const deleteButton = document.querySelector('.delete');
const deleteAllButton = document.querySelector('.delete-all');
const operationButtons = document.querySelectorAll('.operation');
const equalButton = document.querySelector('.equals');
const history = document.querySelector('.history');
const result = document.querySelector('.result');
// let displayValue = document.querySelector('.result').textContent;
let first, second, operation;
const operators = ["+", "-", "x", "/"];

function pressButton(){
    // let displayValue = result.textContent;
    buttons.forEach(button => button.addEventListener('click', (e) => {
        if(e.target.classList.contains('key')) { //handle number keys
           
            result.textContent += e.target.textContent;
                
        }

        if(e.target.classList.contains('operation')){ //handle operator keys
            first = result.textContent;
            
            
            operation = e.target.textContent;
                
                // console.log(operation);
                
                // console.log(first);
                
                history.textContent += `${first} ${operation}`;
                result.textContent = ` `;
                
        }

        if(e.target.classList.contains('equals')){ //handle equal
            second = result.textContent.slice(1);
            history.textContent += ` ${second} = `;
            result.textContent = operate(operation, first, second);
            resetHistory();
        }

        if(e.target.classList.contains('plus-minus')) { //handle sign change
            if(result.textContent){
                result.textContent = (parseFloat(-(result.textContent)));
            }

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
        } else if(result.textContent.length === 1) {
            deleteAllHandler();
        }
        
    })
}

function deleteAllCharacters(){
    deleteAllButton.addEventListener('click', deleteAllHandler);
}

function deleteAllHandler(){
    first = "";
    second = "";
    operation = "";
    result.textContent = "";
    history.textContent = "";
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