const inputField = document.getElementById('input');
const acceptedKeysExact = ['1','2','3','4','5','6','7','8','9','0','*','(',')','-','+','/','Enter','C'];
const acceptedKeysAproximate = ['x','X','=','c'];
let buttonArray = [];


//assigns button variable
function assignButtonArray(lOL) {
    buttonArray.push(document.getElementById(lOL));
}
function assignButtonListeners() {
    for (let i = 0; i < acceptedKeysExact.length; i++) {
        buttonArray[i].addEventListener('click', (event) => {
            input.innerHTML += acceptedKeysExact[i]; 
        })
    }
}

acceptedKeysExact.forEach(element => assignButtonArray(element));
assignButtonListeners();

//input listeners
document.addEventListener('keypress', (event) => {
    const keyName = event.key;
    if (acceptedKeysExact.includes(keyName) || acceptedKeysAproximate.includes(keyName)) {
        console.log(keyName);
    } else {
        console.log('Not valid key');
    }
});