const questionIDElement = document.getElementById("reference-question");
const questionElement = document.getElementById("question");
const imageContainerElement = document.getElementById("image");
const option1Element = document.getElementById("option1");
const option2Element = document.getElementById("option2");
const option3Element = document.getElementById("option3");
const option4Element = document.getElementById("option4");
const answerTextElement = document.getElementById("answer-text"); 
const asideElement = document.getElementById("aside-container");
const optionListElement = document.getElementById("list-of-options");
const nextButton = document.getElementById("next");
const answerButton = document.getElementById("answer-button");
const chronoElement = document.getElementById("chrono");
const chronoSoundPlayer = document.getElementById("chrono-sound");
const answerContainerElement = document.getElementById("answer-container");
const timeOverTextElement = document.getElementById("timeover-message");
const optionContainerElement = document.getElementById("option-container");
const scoreContainerElement = document.getElementById("score-container");
const scoreElement = document.getElementById("score");

const correctAnswerSoundPlayer = document.getElementById("correct-answer-sound");
const wrongAnswerSoundPlayer = document.getElementById("wrong-answer-sound");

let index = 0;

let score = 0;

var imageElement = document.createElement("img");

const changeElementVisibility = (element, visibilityState) => {
    element.style.visibility = visibilityState;
};

const displayQuestion = (i) => {
    i = index;
    fetch('https://gk-quiz-api.herokuapp.com/grade10')
        .then(response => response.json())
        .then(data => {
            if (i <= data.length - 1) {
                scoreElement.textContent = `${score} / ${data.length}`; 
                if (data[i].id != 12 && data[i].id != 13 && data[i].id != 14 && data[i].id != 15 && data[i].id != 16 && data[i].id != 17 && data[i].id != 18 && data[i].id != 19 && data[i].id != 20 && data[i].id != 21 && data[i].id != 22) {
                    imageElement.remove();
                    questionIDElement.textContent = `Question N°${data[i].id}`;
                    questionElement.innerHTML = `${data[i].question}`;
                    option1Element.innerHTML = `<span style='width: 50px; height: 30px; border-radius: 8px; font-size: 24px; float: left; background-color: white; color: black'>A</span>${data[i].options[0]}`;
                    option2Element.innerHTML = `<span style='width: 50px; height: 30px; border-radius: 8px; font-size: 24px; float: left; background-color: white; color: black'>B</span>${data[i].options[1]}`;
                    option3Element.innerHTML = `<span style='width: 50px; height: 30px; border-radius: 8px; font-size: 24px; float: left; background-color: white; color: black'>C</span>${data[i].options[2]}`;
                    option4Element.innerHTML = `<span style='width: 50px; height: 30px; border-radius: 8px; font-size: 24px; float: left; background-color: white; color: black'>D</span>${data[i].options[3]}`;
                    answerTextElement.textContent = `The answer is: ${data[i].answer}`;
                } else {
                    imageElement.src = data[i].question;
                    imageElement.alt = data[i].question;
                    imageElement.classList = "question-image";
                    questionIDElement.textContent = `Question N°${data[i].id}`;
                    questionElement.innerHTML = "";
                    imageContainerElement.appendChild(imageElement);
                    option1Element.innerHTML = `<span style='width: 50px; height: 30px; border-radius: 8px; font-size: 24px; float: left; background-color: white; color: black'>A</span>${data[i].options[0]}`;
                    option2Element.innerHTML = `<span style='width: 50px; height: 30px; border-radius: 8px; font-size: 24px; float: left; background-color: white; color: black'>B</span>${data[i].options[1]}`;
                    option3Element.innerHTML = `<span style='width: 50px; height: 30px; border-radius: 8px; font-size: 24px; float: left; background-color: white; color: black'>C</span>${data[i].options[2]}`;
                    option4Element.innerHTML = `<span style='width: 50px; height: 30px; border-radius: 8px; font-size: 24px; float: left; background-color: white; color: black'>D</span>${data[i].options[3]}`;
                    answerTextElement.textContent = `The answer is: ${data[i].answer}`;
                }
            } else {
                chronoSoundPlayer.src = "";
                pause();
                imageElement.remove();
                changeElementVisibility(asideElement, "hidden");
                questionIDElement.textContent = "Game Over !";
                questionElement.textContent = `You have completed the questions for this Game. Return to the menu.`;
                changeElementVisibility(optionListElement, "hidden");
                nextButton.textContent = "Retour";
                nextButton.setAttribute("onclick", "displayMenu()");
                changeElementVisibility(answerButton, "hidden");
            }
        })
        .catch(error => console.log(error));
};

const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;
const COLOR_CODES = {
    info: {
        color: "green"
    },
    warning: {
        color: "orange",
        threshold: WARNING_THRESHOLD
    },
    alert: {
        color: "red",
        threshold: ALERT_THRESHOLD
    }
};
const TIME_LIMIT = 20;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.alert.color;

var timerId;
var counter;

function diminuerCompteur() {
    if (compteur > 1) {
        compteur = compteur - 1;
    } else {
        clearInterval(intervalId);
    }
}

chronoElement.innerHTML = `
        <div class="base-timer">
            <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <g class="base-timer__circle">
                <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
                <path
                    id="base-timer-path-remaining"
                    stroke-dasharray="283"
                    class="base-timer__path-remaining ${remainingPathColor}"
                    d="
                    M 50, 50
                    m -45, 0
                    a 45,45 0 1,0 90,0
                    a 45,45 0 1,0 -90,0
                    "
                ></path>
                </g>
            </svg>
        <span id="base-timer-label" class="base-timer__label">${formatTime(timeLeft)}</span>
        </div>
`;

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    if (seconds < 10) {
        seconds = `0${seconds}`;
    }

    return `${minutes}:${seconds}`;
}

function setRemainingPathColor(timeLeft) {
    const { alert, warning, info } = COLOR_CODES;
    if (timeLeft <= 20) {
            document.getElementById("base-timer-path-remaining").classList.add(info.color);
    }
    else if (timeLeft <= alert.threshold) {
        document
            .getElementById("base-timer-path-remaining")
            .classList.remove(warning.color);
        document
            .getElementById("base-timer-path-remaining")
            .classList.add(alert.color);
    } else if (timeLeft <= warning.threshold) {
        document
            .getElementById("base-timer-path-remaining")
            .classList.remove(info.color);
        document
            .getElementById("base-timer-path-remaining")
            .classList.add(warning.color);
    } 
}

function calculateTimeFraction() {
    const rawTimeFraction = timeLeft / TIME_LIMIT;
    return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
    const circleDasharray = `${(
        calculateTimeFraction() * FULL_DASH_ARRAY
    ).toFixed(0)} 283`;
    document
        .getElementById("base-timer-path-remaining")
        .setAttribute("stroke-dasharray", circleDasharray);
}

function start() {
    if (!counter) {
        reset();
    } else {
        startTimer();
    }
}

function startTimer() {
    timerInterval = setInterval(() => {
        timePassed = timePassed += 1;
        timeLeft = TIME_LIMIT - timePassed;
        document.getElementById("base-timer-label").innerHTML = formatTime(timeLeft);
        setCircleDasharray();
        setRemainingPathColor(timeLeft);
        chronoSoundPlayer.src = "../assets/audio/chrono.mp3";

        if (timeLeft === 0) {
            pause();
            chronoSoundPlayer.src = "";
            changeElementVisibility(timeOverTextElement, "visible");
            changeElementVisibility(answerButton, "visible");
            notClickAble();
        }
    }, 1000);
}

function pause() {
    clearInterval(timerInterval);
    chronoSoundPlayer.src = "";
}

function reset() {
    pause();
    timePassed = 0;
    startTimer();
}

const loadPage = () => {
    clickAble();
    displayQuestion(index);
    setTimeout(() => {
        start();
    }, 1000);
    changeElementVisibility(answerContainerElement, "hidden");
    changeElementVisibility(answerTextElement, "hidden");
};

window.addEventListener("load", () => {
    loadPage();
});

function choose(element) {
    pause();
    checkAnswer(element);
    notClickAble();
}

function checkAnswer(element) {
    let textElement = element.textContent;

    fetch('https://gk-quiz-api.herokuapp.com/grade10')
    .then(response => response.json())
    .then(data => {
        if (index <= data.length - 1) {
            if (textElement.substring(1) === data[index].answer) {
                chronoSoundPlayer.src = "";
                correctAnswerSoundPlayer.src = "../assets/audio/correct.mp3";
                correctAnswerSoundPlayer.play();
                score += 1;
                scoreElement.textContent = `${score} / ${data.length}`; 
                element.className = "correct";
                element.innerHTML = "GOOD ANSWER !";
            }
            else {
                chronoSoundPlayer.src = "";
                wrongAnswerSoundPlayer.src = "../assets/audio/wrong.mp3";
                wrongAnswerSoundPlayer.play();
                element.className = "wrong";
                element.innerHTML = "WRONG ANSWER !";
                changeElementVisibility(answerButton, "visible");
            }
        }
    })
    .catch(error => console.log(error));
}

function notClickAble() {
    for (let i = 0; i < optionListElement.children.length; i++) {
        optionListElement.children[i].style.pointerEvents = "none";
    }
}

function clickAble() {
    for (let i = 0; i < optionListElement.children.length; i++) {
        optionListElement.children[i].style.pointerEvents = "auto";
        optionListElement.children[i].className = '';
    }
}

const next = () => {
    reset();
    index++;
    loadPage();
    changeElementVisibility(answerButton, "hidden");
    changeElementVisibility(timeOverTextElement, "hidden");
};

const displayMenu = () => {
    window.location.replace("index.html");
};

const displayAnswer = () => {
    changeElementVisibility(answerContainerElement, "visible");
    changeElementVisibility(answerTextElement, "visible");
};
