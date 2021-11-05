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

const evalulator = (arr) => {
    let workingArr2 = arr.join('').split(' ');
    console.log(workingArr2)
    let x = 0
    const parenthesis = (pE) => {
        let tempArrP = pE;
        for(let i = 1; i < tempArrP.length; i++) {
            if (tempArrP[i-1] === '(' && tempArrP[i+1] === ')') {
                tempArrP.splice(i-1,3, tempArrP[i]);
                i = 1;
            }
        }
        if(tempArrP === workingArr2) {
            x = 1;
        } else {
            workingArr2 = tempArrP;
        }
        
    }   
    
    const multiplyAndDivide = (mD) => {
        let tempArrMD = mD;
        for(let j = 0; j < tempArrMD.length; j++) {
            let injecteeJ = operatorMain(tempArrMD[j-1],tempArrMD[j], tempArrMD[j+1]);
            if(tempArrMD[j] === '*' || '/' && tempArrMD[j-1] !== ')' && tempArrMD[j+1] !== '(' ) {
                tempArrMD.splice(j-1, 3, injecteeJ);
                j = 1;
            }
        }
        if (tempArrMD === workingArr2) {
            x = 2;
        } else {
            workingArr2 = tempArrMD;
            x = 0;
        }               
    }

    const addAndSubtract = (aS) => {
        let tempArrAS = aS;
        for(let k = 0; k < tempArrAS.length; k++) {
            let injecteeK = operatorMain(tempArrAS[k-1],tempArrAS[k], tempArrAS[k+1]);
            if(tempArrAS[k] === '+' || '-' && tempArrAS[k-1] !== ')' && tempArrAS[k+1] !== '(' ) {
                tempArrAS.splice(k-1, 3, injecteeK);
                k = 1;
            }
        }
        if (tempArrAS === workingArr2) {
            return workingArr2
        } else {
            workingArr2 = tempArrMD;
            x = 0;
        }
    }

    do {
        if (x === 0) {
            parenthesis(workingArr2);
        }
        if (x === 1) {
            multiplyAndDivide(workingArr2);
        }
        if (x === 2) {
            addAndSubtract(workingArr2);
        }
    } while (workingArr2.length > 1);    
}

const parser = (str) => {
    let startArray = addImpliedX(str);
    let result = evalulator(str);
    return result;    
}

console.log(parser(['1','+','1'])); // expect 2
console.log(parser(['(','2',')'])); // expect 2
console.log(parser(['1','+','6','/','2']) // expect 2

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