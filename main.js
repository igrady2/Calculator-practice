const inputField = document.getElementById('input');
const acceptedKeysExact = ['1','2','3','4','5','6','7','8','9','0','*','(',')','-','+','/','Enter','C'];
const acceptedKeysAproximate = ['x','X','=','c'];
console.log(inputField)

//input listeners
document.addEventListener('keypress', (event) => {
    const keyName = event.key;
    if (acceptedKeysExact.includes(keyName) || acceptedKeysAproximate.includes(keyName)) {
        console.log(keyName);
    } else {
        console.log('Not valid key');
    }
});

function buttonListeners(array) {
    const assign = (input) => {
        let button = document.getElementById(`${input}`);
        button.addEventListener('click', (event) => {
            inputField.value.concat(`${input}`);
        })
    }
    array.forEach(element => assign(element));
}

buttonListeners(acceptedKeysExact);