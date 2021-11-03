const inputField = document.getElementById('input');

//input listeners
document.addEventListener('keypress', (event) => {
    const keyName = event.key;
    console.log(`${keyName} TypeOf: ${typeof(keyName)}`)
});