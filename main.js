const inputField = document.getElementById('input');
const acceptedKeysExact = ['1','2','3','4','5','6','7','8','9','0','*','(',')','-','+','/','.','%','Enter','C','Backspace'];
const acceptedKeysAlternate = ['x','X','c'];
let buttonArray = [];

const operand = ['*','/','+','-','%']

//start Parser
    //parser helpers
const operatorMain = (num1,operandStr,num2) => {
     
    const add = (input1, input2) => {
        return input1+input2;
    }
    const subtract = (input1, input2) => {
        return input1-input2;
    }
    const multiply = (input1, input2) => {
        return input1*input2;
    }
    const divide = (input1, input2) => {
        return input1/input2;
    }
    const percentage = (input) => {
        return input/100;
    }
    
    switch(operandStr) {
        case '%': 
            return percentage(Number(num1)).toString();
        case '*':
            return multiply(Number(num1),Number(num2)).toString();
            break;
        case '/':
            return divide(Number(num1),Number(num2)).toString();
            break;
        case '+':
            return add(Number(num1),Number(num2)).toString();
            break;
        case '-':
            return subtract(Number(num1),Number(num2)).toString();
            break;
        default:
            console.log('Error in parsing, no operand detected.  Operands accepted by operatorMain are %,*,/,+,-');
    }
}

const addImpliedX = (string) => {
    let workingStr = string.split('');
    let strLength = string.length
    for (let i = 1; i < strLength; i++) {
        if (workingStr[i] === '(' && !operand.includes(workingStr[i-1]) && workingStr[i] !== workingStr[i-1]){
            workingStr.splice(i,0,' * ');
            
        }
        if (workingStr[i-1] === ')' && !operand.includes(workingStr[i]) && workingStr[i] !== workingStr[i-1]){
            workingStr.splice(i,0,' * '); 
        }
        if (workingStr[i-1] === ')' && workingStr[i] === '('){
            workingStr.splice(i,0,' * ');
            
        }
    }
    return workingStr;
}

// end helpers
const testStr = '1.5 * (1 + 2 - 3) / (43%)'
const testArr = ['(', '(', '2', ')', '*', '3', '3', '3', ')', '*', '(', '2', '*', '(', '2', '4', ')', '*', '(', '2', '*', '(', '2', '3', ')', ')']
const parser = (str) => {
    let returnArray = [];
    let startArray = addImpliedX(str);
    let workingArray = [];
    for (let i = 0; i < startArray.length; i++) {
        if (operand.includes(startArray[i])) {
            for (let j = startArray.length; j > i; j--) {
                let tempOp = startArray[i]
                let tempUp = startArray.slice(i+1,j).join('');
                if (!isNaN(Number(tempUp))) {// first would be 2 from testStr
                    for (let k = 0; k < i; k++) {
                        let tempDown = startArray.slice(k,i-1).join('');
                        if (!isNaN(Number(tempUp))) {
                           let injectee = operatorMain(tempDown,tempOp,tempUp);
                           startArray.splice(k,j-k,injectee)
                           i = 0;
                        }
                    }
                }
            }
        }
    }
    
    
    
    return 
}




//end Parser


//assigns button variables to buttonArray
function assignButtonArray(lOL) {
    buttonArray.push(document.getElementById(lOL));
}
//assigns button variable listeners
function assignButtonListeners() {
    for (let i = 0; i < acceptedKeysExact.length-3; i++) {
        buttonArray[i].addEventListener('click', (event) => {
            if (acceptedKeysExact[i] === '%') {
                input.innerHTML += `${acceptedKeysExact[i] }`
            
            } else if(operand.includes(acceptedKeysExact[i])) {
                input.innerHTML += ` ${acceptedKeysExact[i]} `;

            } else {
            input.innerHTML += acceptedKeysExact[i]; 
            }
        });
    }
    buttonArray[acceptedKeysExact.indexOf('Enter')].addEventListener('click', (event) => {
        console.log('input function to compute answer here')
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
                    buttonArray[acceptedKeysExact.indexOf('C')].click();
                default:
                    console.log('Key not set yet')
            }
        }
    } else {
        console.log('Not valid key');
    }
});