const inputField = document.getElementById('input');
const acceptedKeys = ['1','2','3','4','5','6','7','8','9','0','x','X','*','(',')','-','+','=','/','Enter'];

//input listeners
document.addEventListener('keypress', (event) => {
    const keyName = event.key;
    console.log(`${keyName} TypeOf: ${typeof(keyName)}`)
    if (acceptedKeys.includes(keyName)) {
        console.log(keyName);
    } else {
        console.log('Not valid key');
    }
});