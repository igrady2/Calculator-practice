const inputField = document.getElementById('input');
const acceptedKeysExact = ['1','2','3','4','5','6','7','8','9','0','*','(',')','-','+','/','.','%','Enter','C','Backspace'];
const acceptedKeysAlternate = ['x','X','c'];
let buttonArray = [];

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

console.log(operatorMain('1.5',"*",'150')); //testing

const addImpliedX = (string) => {
    let workingStr = string
    let strLength = string.length-1
    for (let i = 1; i < strLength; i++) {
        if (string[i] === '(' && !operand.contains(string[i-1])) {
            workingStr.splice(i,0,'*');
            strLength ++;
        }
        if (string[i-1] === ')' && !operand.contains(string[i])){
            workingStr.splice(i,0,'*');
            strLength ++;
        }
    }
    return workingStr;
}
console.log(addImpliedX('1.5(7+2)/20')); //testing

    // end helpers
const testStr = '1.5*(1+2-3)/(43%)'
const parser = (str) => {
    const operand = ['*','-','+','/','%']
    let str2 = addImpliedX(str);
    addImpliedX = str.splice
    let parenthesisSplit = str.split('(').join(')').split(')');
    parenthesisSplit.forEach(element => {
        let x = element;
        for (let i=1; i < x.length-1; i++){
            if (operand.contains(x[i]) && !isNaN(Number(x[i-1]))) {
                let firstNum;
                let secondNum;
                for (let j = i-1; x[j]; i++) {

                }
            }         
        }
    });
    
    //for (let i = 0; i < operand.length; i++) {
      //  parsedString = parsedString.split(operand[i]).join(` ${operand[i] }`);
        //console.log(parsedString);
    //}
    //let parsedArray = parsedString.split(' ').filter(char => char!=='');
    return parenthesisSplit;
}

console.log(parser(testStr));


console.log(2*(2))


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
                    buttonArray[acceptedKeysExact.indexOf('C')].click();
                default:
                    console.log('Key not set yet')
            }
        }
    } else {
        console.log('Not valid key');
    }
});