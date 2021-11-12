const operator = ['*','/','+','-','%','^','(',')']


const makeArr = (string) => {
    return string.split(' ').filter(word => word !== '');
}

const numToString = (num) => {
    return num.toString();
}

const arrStrElementsToNum = (arr) => {
    
    function makeNumIfNotNaN (str) {
        return (isNaN(Number(str)) ? str : Number(str));
    }
    
    return arr.map((makeNumIfNotNaN));
}

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
    const exponentialize = (input1, input2) => {
        return Math.pow(input1,input2);
    }
    
    switch(operatorStr) {
        case '%': 
            return percentage(num1);
        case '*':
            return multiply(num1,num2);
            break;
        case '/':
            return divide(num1,num2);
            break;
        case '+':
            return add(num1,num2);
            break;
        case '-':
            return subtract(num1,num2);
            break;
        case '^':
            return exponentialize(num1,num2);
            break;
        default:
            console.log(`Error input to operatorMain was ${[num1,operatorStr,num2]}.  operators accepted by operatorMain are %,*,/,+,-,^`);
    }
}

const addImpliedX = (arr) => {
    let workingArr = arr;
    const strLength = workingArr.length;
    console.log(`before addImpliedX ${workingArr}`)
        
    for (let i = 1; i < strLength; i++) {
        if (workingArr[i] === '(' && typeof workingArr[i-1] === "number") {
            workingArr.splice(i,0,'*');
            
        }
        if (workingArr[i-1] === ')' && typeof workingArr[i] === "number") {
            workingArr.splice(i,0,'*'); 
        }
        if (workingArr[i-1] === ')' && workingArr[i] === '('){
            workingArr.splice(i,0,'*');
            
        }
    }

    for (let j = 0; j < strLength; j++) { // adds 0 infront of - signs to use subtraction to make negative number
        if (workingArr[j] === '-') {
            if (j === 0) {
                workingArr.splice(j,1,'0','-');
                j++; 
            } else if (typeof workingArr[j-1] !== "number" && workingArr[j-1] !== ')') {
                workingArr.splice(j,2,'(','0','-',workingArr[j+1],')'); 
            }
        } 
    }
    console.log(`after addImpliedX ${workingArr}`)
    return workingArr;
}

 

const evalulator = (arr) => {
    let workingArr2 = arr;
    let x = 0
    
    const parenthesis = (pE) => {
        let tempArrP = pE;
        for(let i = 0; i < tempArrP.length; i++) {
            console.log(tempArrP);
            if (tempArrP[i-1] === '(' && tempArrP[i+1] === ')') {
                tempArrP.splice(i-1,3, tempArrP[i]);
                i = i-2;
            }
        
            if(i === tempArrP.length-1) {
                workingArr2 = tempArrP;
                x = 1;
                return;
            }
        }
        
    }   
    
    const multiplyAndDivide = (mD) => {
        let tempArrMD = mD;
        for(let j = 1; j < tempArrMD.length; j++) {
            if((tempArrMD[j-1] !== ')' && tempArrMD[j+1] !== '(') && (tempArrMD[j] === '*' || tempArrMD[j] === '/')) {
                let injecteeJ = operatorMain(tempArrMD[j-1],tempArrMD[j], tempArrMD[j+1]);
                tempArrMD.splice(j-1, 3, injecteeJ);
                j = 1; 
                if (j === tempArrMD.length-1 && tempArrMD === workingArr2) {
                    x = 2;
                    return;
                } 
                if (j === tempArrMD.length-1 && tempArrMD !== workingArr2) {
                    workingArr2 = tempArrMD;
                    x = 0;
                    return;
                }
            }
        } 
    }

    const addAndSubtract = (aS) => {
        let tempArrAS = aS;
        for(let k = 1; k < tempArrAS.length; k++) {
            if( tempArrAS[k] === '+' || tempArrAS[k] === '-') {
                if ( tempArrAS[k-1] !== ')' && tempArrAS[k+1] !== '(' && tempArrAS[k-2] !== '/' && tempArrAS[k-2] !== '*' && tempArrAS[k+2] !== '/' && tempArrAS[k+2] !== '*') {
                    let injecteeK = operatorMain(tempArrAS[k-1],tempArrAS[k], tempArrAS[k+1]);
                    tempArrAS.splice(k-1, 3, injecteeK);
                    k = 1;
                }
                if (k === tempArrAS.length-1) {
                    workingArr2 = tempArrAS 
                    x = 0;
                    return;
                }
            }     
        }
    }

    do {
        if (x === 0) {
            parenthesis(workingArr2);
            console.log(x);
            console.log(workingArr2);
        }
        if (x === 1) {
            multiplyAndDivide(workingArr2);
            console.log(x);
            console.log(workingArr2);
        }
        if (x === 2) {
            addAndSubtract(workingArr2);
            console.log(x);
            console.log(workingArr2);
        }
    } while (workingArr2.length > 1);    

    if (workingArr2.length === 1) {
        return workingArr2[0];
    }
}

const parser = (str) => {
    const startArray = makeArr(str);
    const secondArray = arrStrElementsToNum(startArray);
    const thirdArray = addImpliedX(secondArray);
    const resultNum = evalulator(thirdArray);
    const result = numToString(resultNum);
    return result;    
}

export {operatorMain, addImpliedX, evalulator, parser, operator};
