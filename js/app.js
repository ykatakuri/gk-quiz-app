function goToIndex() {
    window.location.href = "index.html";
}

const introSongPlayer = document.getElementById("intro-song");

function going() {
    document.getElementById("question").style.visibility = "hidden";
    document.getElementById("button-container").style.visibility = "hidden";
    const introImageElement = document.createElement("img");
    introImageElement.src = "/assets/image/favicon.jpg";
    introImageElement.alt = "IIS Benin";
    document.getElementById("main-container").appendChild(introImageElement);
    introImageElement.classList = "intro-image";
    introSongPlayer.src = "/assets/audio/intro.mp3";
    introSongPlayer.play();

    setTimeout(() => {
        introSongPlayer.src = "";
        introImageElement.remove();
        document.getElementById("question").style.visibility = "visible";
        document.getElementById("intro-text").innerHTML = `<strong>Start the game.</strong><br /><br />
    We click on a level to start the game. 
    We have <em><strong>20 seconds</strong></em> to answer each question.`;

        let divMenusElt = document.createElement("div");
        divMenusElt.id = "list";
        divMenusElt.classList.add("option-container");
        document.getElementById("main-container").insertBefore(divMenusElt, document.getElementById("button-container"));

        let ulElt = document.createElement("ul");
        ulElt.id = "options";
        ulElt.innerHTML = ` <li id="grade-1" onclick="playGradeOne()">GRADE 1</li>
                        <li id="grade-2" onclick="playGradeTwo()">GRADE 2</li>
                        <li id="grade-3" onclick="playGradeThree()">GRADE 3</li>
                        <li id="grade-4" onclick="playGradeFour()">GRADE 4</li>
                        <li id="grade-5" onclick="playGradeFive()">GRADE 5</li>
                        <li id="grade-6" onclick="playGradeSix()">GRADE 6</li>
                        <li id="grade-7" onclick="playGradeSeven()">GRADE 7</li>
                        <li id="grade-8" onclick="playGradeHeight()">GRADE 8</li>
                        <li id="grade-9" onclick="playGradeNine()">GRADE 9</li>
                        <li id="grade-10" onclick="playGradeTen()">GRADE 10</li>
                        <li id="logos" onclick="playLogos()">LOGOS</li>
                    `;
        divMenusElt.appendChild(ulElt);

        document.getElementById("button-container").style.visibility = "hidden";
    }, 22000);
}

function playGradeOne() {
    window.location.href = "grade-1.html";
}

function playGradeTwo() {
    window.location.href = "grade-2.html";
}

function playGradeThree() {
    window.location.href = "grade-3.html";
}

function playGradeFour() {
    window.location.href = "grade-4.html";
}

function playGradeFive() {
    window.location.href = "grade-5.html";
}

function playGradeSix() {
    window.location.href = "grade-6.html";
}

function playGradeSeven() {
    window.location.href = "grade-7.html";
}

function playGradeHeight() {
    window.location.href = "grade-8.html";
}

function playGradeNine() {
    window.location.href = "grade-9.html";
}

function playGradeTen() {
    window.location.href = "grade-10.html";
}

function playLogos() {
    window.location.href = "logos.html";
}
