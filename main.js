import { operatorMain, addImpliedX, evalulator, parser } from './modules/parser.js';


const inputField = document.getElementById('input');
const acceptedKeysExact = ['1','2','3','4','5','6','7','8','9','0','*','(',')','-','+','/','.','%','Enter','C','Backspace'];
const acceptedKeysAlternate = ['x','X','c'];
let buttonArray = []; // houses the objects created by assignButtonArray

const operator = ['*','/','+','-','%','^','(',')']


//assigns button variables to buttonArray
function assignButtonArray(lOL) {
    buttonArray.push(document.getElementById(lOL));
}

//assigns button variable listeners
function assignButtonListeners() {
    for (let i = 0; i < acceptedKeysExact.length-3; i++) {
        buttonArray[i].addEventListener('click', (event) => {
            
            if(operator.includes(acceptedKeysExact[i])) {
                input.innerHTML += ` ${acceptedKeysExact[i]} `;

            } else {
            input.innerHTML += acceptedKeysExact[i]; 
            }
        });
    }
    buttonArray[acceptedKeysExact.indexOf('Enter')].addEventListener('click', (event) => {
        output.innerHTML = input.innerHTML
        input.innerHTML = `${parser(input.innerHTML)}`;
    });
    buttonArray[acceptedKeysExact.indexOf('C')].addEventListener('click', (event) => {
        input.innerHTML = '';
    });
    buttonArray[acceptedKeysExact.indexOf('Backspace')].addEventListener('click', (event) => {
        if (input.innerHTML.slice(-2) === '% ') {
            input.innerHTML = input.innerHTML.slice(0,-2);
        } else if (input.innerHTML.slice(-1) === ' ') {
            input.innerHTML = input.innerHTML.slice(0,-2);
        } else {
            input.innerHTML = input.innerHTML.slice(0,-1);
        } 
        
    });
}

//calls above functions
acceptedKeysExact.forEach(element => assignButtonArray(element));
assignButtonListeners();

function disableButton(id) {
    buttonArray[acceptedKeysExact.indexOf(`${id}`)].disabled = true;
} 

function enableButton(id) {
    buttonArray[acceptedKeysExact.indexOf(`${id}`)].disabled = false;
}


//input listeners for key presses
document.addEventListener('keypress', (event) => {
    const keyName = event.key;
    if (acceptedKeysExact.includes(keyName) || acceptedKeysAlternate.includes(keyName)) {
        
        if (acceptedKeysExact.includes(keyName)) {
            buttonArray[acceptedKeysExact.indexOf(keyName)].click();
        
        } else {
        
            switch(keyName) {
        
                case 'x':
                case 'X':
                    buttonArray[acceptedKeysExact.indexOf('*')].click();
                    break;
                case 'c':
                    buttonArray[acceptedKeysExact.indexOf('C')].click();
                default:
                    console.log('Key not set yet')
            }
        }
    } else {
        console.log('Not valid key');
    }
});


//button control

function disableButton(id) {
    buttonArray[acceptedKeysExact.indexOf(`${id}`)].disabled = true;
} 

function enableButton(id) {
    buttonArray[acceptedKeysExact.indexOf(`${id}`)].disabled = false;
}

input.addEventListener('input', (event) => {
    if (operator.includes(input.innerHTML.slice(-2,-1))) {
        operator.slice(0,6).concat(operator.slice(-1)).forEach(element => disableButton(element));
    }
    if (!operator.includes(input.innerHTML.slice(-2,-1))) {
        operator.slice(0,6).concat(operator.slice(-1)).forEach(element => enableButton(element));
    }


});