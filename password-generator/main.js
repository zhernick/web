
let gainedText = document.getElementById("gainedText");
let copyBtn = document.querySelector('.copyBtn');
let retrievedArray = JSON.parse(localStorage.getItem('history'));
var historyList = document.querySelector(".tree");
let history = [];


function getRandomCharOrDigit() {
    // Генерируем случайно 0 (цифра) или 1 (буква)
    let randomType = Math.floor(Math.random() * 2);

    if (randomType === 0) {
        // Генерируем цифру от 0 до 9
        return Math.floor(Math.random() * 10).toString();
    } else {
        // Генерируем случайную букву в верхнем или нижнем регистре
        const charCode = Math.random() < 0.5 ? 65 + Math.floor(Math.random() * 26) : 97 + Math.floor(Math.random() * 26);
        return String.fromCharCode(charCode);
    }
}

function getRandomLength(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function generatePassword() {
    copyBtn.style.display = 'block';
    var randomLength = getRandomLength(4, 15);
    let generatedPassword = "";
    for (let index = 0; index < randomLength; index++) {
        generatedPassword += getRandomCharOrDigit();
    }

    gainedText.textContent = generatedPassword;
}

// copy function
function copyFunc() {
    let copiedText = gainedText.innerHTML;
    if(retrievedArray!=null){
        history = retrievedArray;
    }

    history.push(copiedText);
    navigator.clipboard.writeText(gainedText.innerHTML);
    console.log("");
    localStorage.setItem('history', JSON.stringify(history));

    var newItem = document.createElement("li");
    var textNode = document.createTextNode(copiedText);
    newItem.appendChild(textNode);
    historyList.appendChild(newItem);

    alert("Пароль " + copiedText + " скопирован и добавен в историю");
}

function showHistoryArray() {

    resetHistory();
    retrievedArray.forEach(element => {
        var newItem = document.createElement("li");
        var textNode = document.createTextNode(element);
        newItem.appendChild(textNode);
        historyList.appendChild(newItem);
        console.log(element);
    });


    historyList.classList.toggle("active");
}

function resetHistory(){
    historyList.innerHTML = "";
}




