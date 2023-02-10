const calculatorScreen = document.querySelector('.calculator-screen');
const buttons = document.querySelectorAll('button');
const deleteButton = document.querySelector('.delete');
const deleteAllButton = document.querySelector('.delete-all');
const operationButtons = document.querySelectorAll('.operation');
const equalButton = document.querySelector('.equals');
const history = document.querySelector('.history');
const result = document.querySelector('.result');
// let displayValue = document.querySelector('.result').textContent;
let first, second, operation, input='';

function pressButton(){
    // let displayValue = result.textContent;
    buttons.forEach(button => button.addEventListener('click', (e) => {
        
        if(e.target.classList.contains('key')) { //handle number keys
           
            result.textContent += e.target.textContent;
            input += result.textContent.replace(/\s+/g, '');
        }

        if(e.target.classList.contains('operation')){ //handle operator keys
            first = result.textContent;
            if(!second) {

            }
            
            operation = e.target.textContent;
            input += operation;   
                
            history.textContent += `${first} ${operation}`;
            result.textContent = ` `;
            //woooooo!!!! must change the hard coded bs though
            if(checkExpression()) {
                slicer();
                // // first = history.textContent.slice(0, 1);
                // second = history.textContent.slice(4, 5);
                // operation = history.textContent.slice(2, 3);
                let newOp = history.textContent.slice(history.textContent.length - 1, );
                history.textContent = `${operate(operation, first, second)} ${newOp}`;
                first = history.textContent;
                operation = newOp;
                input = '';
            }
        }

        if(e.target.classList.contains('equals')){ //handle equal
            input = '';
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

function checkExpression(){
    return input.match(/\d+[+-/x]{1}\d+[+-/x]{1}/);
}

function slicer(){
    const parts = history.textContent.split('+', 2);
    first = parts[0];
    second = parts[1];
    operation = history.textContent.slice(history.textContent.indexOf('+'), history.textContent.indexOf('+') + 1);
    // console.log(parts[0]);
    // console.log(parts[1]);
    // first = history.textContent.substring('+');
    // const restOfString = his
    // console.log(first);
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
            input = input.slice(0, -1);
        } else if(result.textContent.length === 1) {
            deleteAllHandler();
            input = input.slice(0,-1);
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
    input = "";
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