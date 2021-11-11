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
        return input1^input2;
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
        case '^':
            return exponentialize(Number(num1),Number(num2)).toString();
            break;
        default:
            console.log(`Error input to operatorMain was ${[num1,operatorStr,num2]}.  operators accepted by operatorMain are %,*,/,+,-,^`);
    }
}


const addImpliedX = (string) => {
    let workingArr = string.split(' ').filter(word => word !== '');
    console.log(`before addImpliedX ${workingArr}`)
    let strLength = workingArr.length-1
    
    for (let i = 1; i < strLength; i++) {
        if (workingArr[i] === '(' && !operator.includes(workingArr[i-1])) {
            workingArr.splice(i,0,'*');
            
        }
        if (workingArr[i-1] === ')' && !operator.includes(workingArr[i])) {
            workingArr.splice(i,0,'*'); 
        }
        if (workingArr[i-1] === ')' && workingArr[i] === '('){
            workingArr.splice(i,0,'*');
            
        }
    }

    for (let j = 0; j < strLength-1; j++) { // adds 0 infront of - signs to use subtraction to make negative number
        if (workingArr[j] === '-' && (operator.filter(word => word !== ')').includes(workingArr[j-1] || j === 0))) {
            workingArr.splice(j,0,'0');            
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
        for(let i = 1; i < tempArrP.length-1; i++) {
            console.log(tempArrP);
            if (tempArrP[i-1] === '(' && tempArrP[i+1] === ')') {
                tempArrP.splice(i-1,3, tempArrP[i]);
                i = 1;
            }
        }
        if(tempArrP === workingArr2) {
            x = 1;
            return;
        } else {
            workingArr2 = tempArrP;
            return;
        }
        
    }   
    
    const multiplyAndDivide = (mD) => {
        let tempArrMD = mD;
        for(let j = 1; j < tempArrMD.length-1; j++) {
            if((tempArrMD[j-1] !== ')' && tempArrMD[j+1] !== '(') && (tempArrMD[j] === '*' || tempArrMD[j] === '/')) {
                let injecteeJ = operatorMain(tempArrMD[j-1],tempArrMD[j], tempArrMD[j+1]);
                tempArrMD.splice(j-1, 3, injecteeJ);
                j = 1;
            }
        }
        if (tempArrMD === workingArr2) {
            x = 2;
            return;
        } else {
            workingArr2 = tempArrMD;
            x = 0;
            return;
        }               
    }

    const addAndSubtract = (aS) => {
        let tempArrAS = aS;
        for(let k = 1; k < tempArrAS.length-1; k++) {
            if((tempArrAS[k-1] !== ')' && tempArrAS[k+1] !== '(') && (tempArrAS[k] === '+' || tempArrAS[k] === '-')) {
                let injecteeK = operatorMain(tempArrAS[k-1],tempArrAS[k], tempArrAS[k+1]);
                tempArrAS.splice(k-1, 3, injecteeK);
                k = 1;
                
            }
        }
        if (tempArrAS === workingArr2) {
            x = 0;
            return;
        } else {
            workingArr2 = tempArrAS;
            x = 0;
            return;
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
    let startArray = addImpliedX(str);
    let result = evalulator(startArray);
    return result;    
}

export {operatorMain, addImpliedX, evalulator, parser};