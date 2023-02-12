const calculatorScreen = document.querySelector('.calculator-screen');
const buttons = document.querySelectorAll('button');
const deleteButton = document.querySelector('.delete');
const deleteAllButton = document.querySelector('.delete-all');
const operationButtons = document.querySelectorAll('.operation');
const equalButton = document.querySelector('.equals');
const history = document.querySelector('.history');
const result = document.querySelector('.result');
let first='', second='', operation='', input='';

//'input' keeps track of all the buttons that are pressed so that each operation
//will be performed as soon as the user presses another operator (aka a single pair
//of numbers is evaluated at a time).
function pressButton(){
    buttons.forEach(button => button.addEventListener('click', (e) => {
        if(e.target.classList.contains('key')) { //handle number buttons
            result.textContent += e.target.textContent;
            input += result.textContent.replace(/\s+/g, '');

            if(history.textContent.match(/[+\-x\/]/)){
                second = result.textContent;
            }
        }

        if(e.target.classList.contains('operation')){ //handle operator buttons
            operationHandler(e.target.textContent);
        }

        if(e.target.classList.contains('equals')){ //handle equal button
            input = '';
            history.textContent += ` ${second} = `;
            result.textContent = operate(operation, first, second);
        }

        if(e.target.classList.contains('plus-minus')) { //handle sign change button
            if(result.textContent){
                result.textContent = (parseFloat(-(result.textContent)));
            }
        }

        if(e.target.classList.contains('plus-minus') && first){
            second = `${result.textContent}`.replace(/\s/g, '');
        }
}))
}

function operationHandler(target){
    first = result.textContent;
    operation = target;
    input += operation;   
    if(history.textContent.includes('=')){
        first = result.textContent;
        history.textContent ='';
        history.textContent += `${first} ${operation}`;
        result.textContent = '';
    } else {
        history.textContent += `${first} ${operation}`;
        result.textContent = ` `;
        if(input.match(/\d+[+\-\/x]{1}\d+/)) { //check if 'input' already has an operator
            evaluateFirstPair();
            let newOperator = history.textContent.slice(history.textContent.length - 1, );
            history.textContent = `${operate(operation, first, second)} ${newOperator}`;
            first = history.textContent;
            operation = newOperator;
        }
    }
}

function evaluateFirstPair(){
    first ='';
    second ='';
    //check that there are spaces before and after the operator to avoid catching the - from a negative number
    const operatorIndex = history.textContent.search(/\s[+\/x\-]{1}\s/);
    const operator = history.textContent[operatorIndex + 1];
    //get the parts before and after the operator to use as first and second
    const parts = history.textContent.split(operator, 2);
    first = parts[0].trim();
    second = parts[1].trim();
    operation = operator;
}

function resetHistory(){
if(!first || !second) {
    history.textContent = "";
} else { history.textContent = `${first} ${operation} ${second} = `; }
}

function deleteSingleCharacter(){
    deleteButton.addEventListener('click', deleteSingleHandler);
}

function deleteSingleHandler(){
    if(result.textContent.length > 1) {
        result.textContent = result.textContent.slice(0, -1);
        input = input.slice(0, -1);
    } else if(result.textContent.length === 1) {
        result.textContent = '';
        input = input.slice(0,-1);
    }
    
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

//handle keyboard input
function pressKey(){
    document.addEventListener('keydown', (e) => {
        switch(e.key){
            case '0': result.textContent += '0'; break;
            case '1': result.textContent += '1'; break;
            case '2': result.textContent += '2'; break;
            case '3': result.textContent += '3'; break;
            case '4': result.textContent += '4'; break;
            case '5': result.textContent += '5'; break;
            case '6': result.textContent += '6'; break;
            case '7': result.textContent += '7'; break;
            case '8': result.textContent += '8'; break;
            case '9': result.textContent += '9'; break;
            case '+': operationHandler('+'); break;
            case '-': operationHandler('-'); break;
            case '/': operationHandler('/'); break;
            case 'x': operationHandler('x'); break;
            case '.': result.textContent += '.'; break;
            case 'Enter': {
                input = '';
                history.textContent += ` ${second} = `;
                result.textContent = operate(operation, first, second);
                break;
            }
            case 'Backspace': deleteSingleHandler(); break;
        }
        input += result.textContent.replace(/\s+/g, '');
        if(history.textContent.match(/[+\-x\/]/)){
            second = result.textContent;
        }
    })
}

function add(a, b) {
    let additionResult = parseFloat(a) + parseFloat(b);
    return truncateDecimals(additionResult * 1000) / 1000;
}
function subtract(a, b) {
    let subtractionResult = parseFloat(a) - parseFloat(b);
    return truncateDecimals(subtractionResult * 1000) / 1000;
}
function multiply(a, b) {
    let multiplicationResult = parseFloat(a) * parseFloat(b);
    return truncateDecimals(multiplicationResult * 1000) / 1000;;
}
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

//function calls
pressButton();
pressKey();
deleteSingleCharacter();
deleteAllCharacters();

