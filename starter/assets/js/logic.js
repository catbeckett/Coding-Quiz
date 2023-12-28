// global variables

let startButton = document.querySelector("#start");
startButton.addEventListener("click", init);

let startScreen = document.querySelector("#start-screen");
let questionScreen = document.querySelector("#questions");
let endScreen = document.querySelector("#end-screen");

let timer = document.querySelector("#time");
let countdown = 10;
let intervalID;
let choiceBox = document.querySelector('#choices');
let userScore = 0;
let questionID = 0;


// function list


// start button to initiate timer + first question appear

function init() {

    // start screen to hide
    startScreen.classList.toggle("start")
    startScreen.classList.toggle("hide")

    // question title to appear  
    questionScreen.classList.toggle("hide")
    questionScreen.classList.toggle("start")

    // start time
    startTimer();
    timeRemaining();
    showQuestion();

}

function startTimer() {
    intervalID = setInterval(timeRemaining, 1000);
}


function timeRemaining() {
    if (countdown > 0) {
        countdown--;
        timer.textContent = countdown;
    } else {
        clearInterval(intervalID);
    }
}

function showQuestion() {

    // Display questions

    let question = questionList[questionID];
    document.querySelector("#question-title").textContent = question.title;

    // Clear choice box

    choiceBox.textContent = " ";

    // Display choices for each question

    for (i = 0; i < question.choices.length; i++) {
        let choiceButton = document.createElement("button");
        choiceButton.textContent = question.choices[i];
        choiceBox.appendChild(choiceButton);

        choiceButton.setAttribute("choiceID", [i]);
        choiceButton.setAttribute("correctID", question.correctAnswer);

        choiceButton.addEventListener("click", checkAnswer);
    }
}

function nextQuestion() {
    if (questionID < questionList.length - 1) {
        questionID++;
        showQuestion();
    } else {
        document.querySelector("#question-title").textContent = "You have completed the quiz";
        choiceBox.textContent = " ";
        console.log("You have completetd the quiz");
    }
};

function checkAnswer(event) {
    let button = event.target;
    let choiceID = button.getAttribute("choiceID");
    let correctID = button.getAttribute("correctID");

    console.log(choiceID);
    console.log(correctID);

    if (choiceID === correctID) {
        console.log("That is correct!")
        // add point to score
        userScore += 1;
        // show next question

    } else {
        console.log("That is incorrect.")
        // deduct time from time remaining
        countdown -= 4;
        // show next question
    };

    nextQuestion();
};


// choice button clicks to verify choice and show next question


    // listen for when choice is clicked

    // if correct choice clicked will add to score

    // if incorrect will reduce timer by X

    // will show user next question





    // if incorrect answer subtract time




// quiz end at question.length end or timer === 0




// quiz end displays score and allows user to enter intials



// saved initials and scores saved in local storage -> score.js file for score page logic