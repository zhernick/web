
let gainedText = document.getElementById("gainedText");
let copyBtn = document.querySelector('.copyBtn');
let retrievedArray = JSON.parse(localStorage.getItem('history'));
var historyList = document.querySelector(".tree");
let history = [];
let copiedText = "";
let notificationBtn = document.querySelector('.notifBtn');
const notificationElement = document.querySelector('.notification');

const randMusicBtn = document.getElementById('randMusicBtn');
const gimnBtn = document.getElementById('gimnBtn');
const randMusic = document.querySelectorAll('randMusic');
const gimnMusic = document.getElementById('gimnMusic');


function getRandomCharOrDigit() {
    // Генерируем случайно 0 (цифра) или 1 (буква) или 2 (символ)
    let randomType = Math.floor(Math.random() * 3);
    console.log(randomType);

    if (randomType === 0) {
        // Генерируем цифру от 0 до 9
        return Math.floor(Math.random() * 10).toString();
    } else if (randomType === 1) {
        // Генерируем случайную букву в верхнем или нижнем регистре
        const charCode = Math.random() < 0.5 ? 65 + Math.floor(Math.random() * 26) : 97 + Math.floor(Math.random() * 26);
        return String.fromCharCode(charCode);
    } else {
        const specialCharacters = '!@#$%^&*()-_=+[{]}|;:,<.>/?';
        const randomIndex = Math.floor(Math.random() * specialCharacters.length);
        return specialCharacters.charAt(randomIndex);
    }
}

function getRandomLength(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function generatePassword() {
    copyBtn.style.opacity = '1';
    var randomLength = getRandomLength(6, 15);
    let generatedPassword = "";
    for (let index = 0; index < randomLength; index++) {
        generatedPassword += getRandomCharOrDigit();
    }

    gainedText.textContent = generatedPassword;
}

// copy function
function copyFunc() {

    //historyList.classList.remove("active");

    copiedText = gainedText.innerHTML;
    if (retrievedArray != null) {
        history = retrievedArray;
    }
    console.log("Gained text: " + copiedText);

    addElementToHistoryArray(copiedText);
    navigator.clipboard.writeText(copiedText);
    notification(copiedText);
    console.log("");
    localStorage.setItem('history', JSON.stringify(history));
}

function showHistoryArray() {

    if (retrievedArray != null) {

        resetHistory();

        retrievedArray.forEach(element => {
            var newItem = document.createElement("li");
            var textNode = document.createTextNode(element);
            var button = document.createElement("button");
            button.innerText = "copy";
            button.addEventListener("click", copyFromLi);
            newItem.appendChild(textNode);
            newItem.appendChild(button);

            historyList.appendChild(newItem);
            console.log(element);
        });
    }
    historyList.classList.toggle("active");
}

function addElementToHistoryArray(element) {
    if (!checkHistoryDuplicates(element) & element.length > 1) {
        var newItem = document.createElement("li");
        var textNode = document.createTextNode(element);
        var button = document.createElement("button");
        button.innerText = "copy";
        button.addEventListener("click", copyFromLi);
        newItem.appendChild(textNode);
        newItem.appendChild(button);

        historyList.appendChild(newItem);
        history.push(element);
        console.log(`Пароль ${copiedText} скопирован и добавен в историю`);
    }
}

function resetHistory() {
    historyList.innerHTML = "";
}

function copyFromLi() {
    var textToCopy = this.parentElement.textContent.trim();
    var trimmedText = textToCopy.slice(0, -4);
    navigator.clipboard.writeText(trimmedText);
    notification(trimmedText);
    gainedText.innerHTML = "";
    copyBtn.style.opacity = "0";
    console.log("скопировал нахуй " + trimmedText);
}


function checkHistoryDuplicates(element) {
    if (history.includes(element)) {
        //console.log("Элемент в массиве уже есть");
        return true;
    }
    //console.log("Нету");

    return false;
}

function notification(text) {
    if (text.length > 1) {
        let notificationText = `${text} </br> скопирован!`;
        notificationElement.innerHTML = notificationText;
        runAnimation();
    }
}

function runAnimation() {
    console.log("Run anim")
    //notificationElement.style.top = '80px';
    notificationElement.style.opacity = '1';

    // setTimeout(() => {
    //     notificationElement.style.top = '80px';
    //     notificationElement.style.opacity = '0.4';
    // }, 200);

    // setTimeout(() => {
    //     notificationElement.style.top = '80px';
    //     notificationElement.style.opacity = '0';
    // }, 500);
}

function gimn(){
    let isPlaying = false;


    if (isPlaying) {
        gimnMusic.pause();
        //toggleMusicBtn.textContent = 'Включить музыку';
    } else {
        gimnMusic.play();
        //toggleMusicBtn.textContent = 'Выключить музыку';
    }
    isPlaying = !isPlaying;
}

let isPlaying = false;
function randomMusic(){
    const audioFiles = ['HochuPizzi.mp3', 'videoplayback.mp3', 'lion.mp3', 'polnomVse.mp3'];
    const randomIndex = Math.floor(Math.random() * audioFiles.length);
    const randomAudio = audioFiles[randomIndex];
    
    const musicPlayer = document.querySelector('.music');
    musicPlayer.src = randomAudio;
    musicPlayer.play();
}


