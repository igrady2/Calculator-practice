const inputField = document.getElementById('input');
const acceptedKeysExact = ['1','2','3','4','5','6','7','8','9','0','*','(',')','-','+','/','.','%','Enter','C','Backspace'];
const acceptedKeysAlternate = ['x','X','c'];
let buttonArray = [];

const operator = ['*','/','+','-','%']

//start Parser
    //parser helpers
const operatorMain = (num1,operatorStr,num2) => {
     
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
    
    switch(operatorStr) {
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
            console.log('Error in parsing, no operator detected.  operators accepted by operatorMain are %,*,/,+,-');
    }
}

const addImpliedX = (string) => {
    let workingArr = string.split('');
    let strLength = string.length
    for (let i = 1; i < strLength; i++) {
        if (workingArr[i] === '(' && workingArr[i-1] !== ' '){
            workingArr.splice(i,0,' * ');
            
        }
        if (workingArr[i-1] === ')' && workingArr[i] !== ' '){
            workingArr.splice(i,0,' * '); 
        }
        if (workingArr[i-1] === ')' && workingArr[i] === '('){
            workingArr.splice(i,0,' * ');
            
        }
    }
    return workingArr;
}

const Evalulator = (arr) => {
    let workingArr2 = arr.join('').split(' ');
    const workingArrByChar = workingArr2.join(' ').split('');
    while (workingArr2.length > 1) { 
        for(let i = 1; i < workingArr2.length) {
            let injectee = operatorMain(workingArr2[i-1],workingArr2[i], workingArr2[i+1];
            if(workingArr2[i] === '*' || '/') {
                
            }
        }
    }
}

// end helpers
const testStr = '1.5 * (1 + 2 - 3) / (4 + 3)'
const testArr = ['(', '(', '2', ')', '*', '3', '3', '3', ')', '*', '(', '2', '*', '(', '2', '4', ')', '*', '(', '2', '*', '(', '2', '3', ')', ')']
const parser = (str) => {
    let startArray = addImpliedX(str);
    let result = Evalulator(startArray);
    return result;    
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
            if (acceptedKeysExact[i] === '(') {
                input.innerHTML += `${acceptedKeysExact[i] }`;
            }
            if (acceptedKeysExact[i] === ')') {
                input.innerHTML += ` ${acceptedKeysExact[i]}`
            
            } else if(operator.includes(acceptedKeysExact[i])) {
                input.innerHTML += ` ${acceptedKeysExact[i]} `;

            } else {
            input.innerHTML += acceptedKeysExact[i]; 
            }
        });
    }
    buttonArray[acceptedKeysExact.indexOf('Enter')].addEventListener('click', (event) => {
        output.innerHTML = `${parser(input.innerHTML)}`;
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