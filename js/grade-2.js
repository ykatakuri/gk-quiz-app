const questionIDElement = document.getElementById("reference-question");
const questionElement = document.getElementById("question");
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

let index = 0;

var imageElement = document.createElement("img");

const changeElementVisibility = (element, visibilityState) => {
    element.style.visibility = visibilityState;
};

const displayQuestion = (i) => {
    i = index;
    fetch('https://gk-quiz-api.herokuapp.com/grade2')
        .then(response => response.json())
        .then(data => {
            if (i <= data.length - 1) {
                if (data[i].id != 18 && data[i].id != 19 && data[i].id != 20 && data[i].id != 21 && data[i].id != 22 && data[i].id != 23 && data[i].id != 24 && data[i].id != 25 && data[i].id != 26 && data[i].id != 27 && data[i].id != 28 && data[i].id != 29) {
                    imageElement.remove();
                    optionContainerElement.appendChild(optionListElement);
                    questionIDElement.textContent = `Question N°${data[i].id}`;
                    questionElement.innerHTML = `${data[i].question}`;
                    option1Element.innerHTML = `<span style='width: 50px; height: 30px; border-radius: 8px; font-size: 24px; float: left; background-color: white; color: black'>A</span> ${data[i].options[0]}`;
                    option2Element.innerHTML = `<span style='width: 50px; height: 30px; border-radius: 8px; font-size: 24px; float: left; background-color: white; color: black'>B</span> ${data[i].options[1]}`;
                    option3Element.innerHTML = `<span style='width: 50px; height: 30px; border-radius: 8px; font-size: 24px; float: left; background-color: white; color: black'>C</span> ${data[i].options[2]}`;
                    option4Element.innerHTML = `<span style='width: 50px; height: 30px; border-radius: 8px; font-size: 24px; float: left; background-color: white; color: black'>D</span> ${data[i].options[3]}`;
                    answerTextElement.textContent = `The answer is: ${data[i].answer}`;
                } else {
                    imageElement.src = data[i].imagePath;
                    imageElement.alt = data[i].imagePath;
                    imageElement.classList = "question-image";
                    questionIDElement.textContent = `Question N°${data[i].id}`;
                    questionElement.innerHTML = `${data[i].question}`;
                    optionContainerElement.replaceChild(imageElement, optionListElement);
                    answerTextElement.textContent = `The answer is: ${data[i].answer}`;
                }
            } else {
                imageElement.remove();
                changeElementVisibility(asideElement, "hidden");
                questionIDElement.textContent = "Game Over !";
                questionElement.textContent = `You have completed the questions for Grade 1. Return to the menu to go to the next grade`;
                changeElementVisibility(optionListElement, "hidden");
                nextButton.textContent = "Retour";
                nextButton.setAttribute("onclick", "displayMenu()");
                changeElementVisibility(answerButton, "hidden");
            }
        })
        .catch(error => console.log(error));
};

const displayChrono = () => {
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

    let timeLimit = 20;
    let timePassed = 0;
    let timeLeft = timeLimit;
    let timerInterval = null;
    let remainingPathColor = COLOR_CODES.info.color;

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        let seconds = time % 60;

        if (seconds < 10) {
            seconds = `0${seconds}`;
        }

        return `${minutes}:${seconds}`;
    };

    chronoElement.innerHTML = `<div class="base-timer">
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
                        </div>`;

    const calculateTimeFraction = () => {
        const rawTimeFraction = timeLeft / timeLimit;
        return rawTimeFraction - (1 / timeLimit) * (1 - rawTimeFraction);
    };

    const setCircleDasharray = () => {
        const circleDasharray = `${(
            calculateTimeFraction() * FULL_DASH_ARRAY
        ).toFixed(0)} 283`;
        document.getElementById("base-timer-path-remaining").setAttribute("stroke-dasharray", circleDasharray);
    };

    const onTimesUp = () => {
        clearInterval(timerInterval);
    };

    const setRemainingPathColor = (timeLeft) => {
        const { alert, warning, info } = COLOR_CODES;
        if (timeLeft <= alert.threshold) {
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
    };

    timerInterval = setInterval(() => {
        timePassed = timePassed += 1;
        timeLeft = timeLimit - timePassed;
        document.getElementById("base-timer-label").innerHTML = formatTime(timeLeft);
        setCircleDasharray();
        setRemainingPathColor(timeLeft);

        if (timeLeft === 0) {
            chronoSoundPlayer.src = "";
            onTimesUp();
            changeElementVisibility(timeOverTextElement, "visible");
            changeElementVisibility(answerButton, "visible");
        }
    }, 1000);

    chronoSoundPlayer.src = "../assets/audio/chrono.mp3";
};

const loadPage = () => {
    displayQuestion(index);
    setTimeout(() => {
        displayChrono();
    }, 4000);
    changeElementVisibility(answerContainerElement, "hidden");
    changeElementVisibility(answerTextElement, "hidden");
};

window.addEventListener("load", () => {
    loadPage();
});

const next = () => {
    index++;
    loadPage();
    changeElementVisibility(answerButton, "hidden");
    changeElementVisibility(timeOverTextElement, "hidden");
    chronoElement.innerHTML = "";
};

const displayMenu = () => {
    window.location.replace("index.html");
};

const displayAnswer = () => {
    changeElementVisibility(answerContainerElement, "visible");
    changeElementVisibility(answerTextElement, "visible");
};
