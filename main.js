const inputField = document.getElementById('input');
const acceptedKeysExact = ['1','2','3','4','5','6','7','8','9','0','*','(',')','-','+','/','.','%','Enter','C','Backspace'];
const acceptedKeysAlternate = ['x','X','c'];
let buttonArray = [];

//start Parser

const testStr = '1.5*(1+2-3)/(4%)'
const parser = (str) => {
    const operand = ['*','(',')','-','+','/','.','%']
    let parsedString = str;
    for (let i = 0; i < operand.length; i++) {
        parsedString = parsedString.split(operand[i]).join('&');
    }
    return parsedString.split('&');
}

console.log(parser(testStr));





//end Parser


//assigns button variables to buttonArray
function assignButtonArray(lOL) {
    buttonArray.push(document.getElementById(lOL));
}
//assigns button variable listeners
function assignButtonListeners() {
    for (let i = 0; i < acceptedKeysExact.length-3; i++) {
        buttonArray[i].addEventListener('click', (event) => {
            input.innerHTML += acceptedKeysExact[i]; 
        });
    }
    buttonArray[acceptedKeysExact.indexOf('Enter')].addEventListener('click', (event) => {
        console.log('input function to compute answer here')
    });
    buttonArray[acceptedKeysExact.indexOf('C')].addEventListener('click', (event) => {
        input.innerHTML = '';
    });
    buttonArray[acceptedKeysExact.indexOf('Backspace')].addEventListener('click', (event) => {
        input.innerHTML =input.innerHTML.slice(0,-1);
    });
}

//calls above functions
acceptedKeysExact.forEach(element => assignButtonArray(element));
assignButtonListeners();

//input listeners
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
                    buttonArray[acceptedKeysExact.indexOf('C')]
                default:
                    console.log('Key not set yet')
            }
        }
    } else {
        console.log('Not valid key');
    }
});