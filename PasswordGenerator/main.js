
let gainedText = document.getElementById("gainedText");
let copyBtn = document.querySelector('.copyBtn');
let history = [];

function getRandomCharOrDigit() {
    let randomType = Math.floor(Math.random() * 2); // Генерируем случайно 0 (цифра) или 1 (буква)
    
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
    history.push(copiedText);
    navigator.clipboard.writeText(gainedText.innerHTML);
    console.log("");
    history.forEach(element => {
        console.log(element);
    });

    alert("Пароль " + copiedText + " скопирован и добавен в историю");
}



