// GLOBAL VARIABLES ------------------------------------------------------------------------------------------------------*

let countdown = 10;
let intervalID;
let userScore = 0;
let questionID = 0;


// TARGETED VARIABLES ----------------------------------------------------------------------------------------------------*

let startButton = document.querySelector("#start");
startButton.addEventListener("click", init);

let startScreen = document.querySelector("#start-screen");
let questionScreen = document.querySelector("#questions");
let endScreen = document.querySelector("#end-screen");
let feedback = document.querySelector("#feedback");
let timer = document.querySelector("#time");
let choiceBox = document.querySelector("#choices");
let finalScore = document.querySelector("#final-score");
let scoresList = document.querySelector("#highscores");

let submitButton = document.querySelector('#submit');
submitButton.addEventListener("click", submitScore);


// FUNCTION LIST --------------------------------------------------------------------------------------------------------*

// Start button to initiate timer + first question appear

function init() {
    // start screen to hide
    startScreen.classList.toggle("start");
    startScreen.classList.toggle("hide");

    // question title to appear  
    questionScreen.classList.toggle("hide");
    questionScreen.classList.toggle("start");

    // start time
    startTimer();
    timeRemaining();
    showQuestion();
};


// Timer to countdown whilst user is playing and will end when user completes quiz or time reaches 0

function startTimer() {
    intervalID = setInterval(timeRemaining, 1000);
};

function timeRemaining() {
    if (countdown > 0) {
        countdown--;
        timer.textContent = countdown;
    } else {
        clearInterval(intervalID);
        showEndScreen(); // Show end screen when time reaches 0
    }

    if (questionID === questionList.length - 1) {
        clearInterval(intervalID);
        stopCountdown(); // Stop countdown when all questions are answered
    }
}


function stopCountdown() {
    // localStorage.setItem("userScore", countdown);
    userScore = countdown;
    console.log(userScore);
    if (questionID === questionList.length - 1) {
        clearInterval(intervalID);
    }
};


// Displaying each question with a range of multiple choice answers

function showQuestion() {

    // display questions

    let question = questionList[questionID];
    document.querySelector("#question-title").textContent = question.title;

    // clear choice box

    choiceBox.textContent = " ";

    // display choices for each question

    for (i = 0; i < question.choices.length; i++) {
        let choiceButton = document.createElement("button");
        choiceButton.textContent = question.choices[i];
        choiceBox.appendChild(choiceButton);

        choiceButton.setAttribute("choiceID", [i]);
        choiceButton.setAttribute("correctID", question.correctAnswer);

        choiceButton.addEventListener("click", checkAnswer);
    }
};

function checkAnswer(event) {
    let button = event.target;
    let choiceID = button.getAttribute("choiceID");
    let correctID = button.getAttribute("correctID");

    console.log(choiceID);
    console.log(correctID);

    if (choiceID === correctID) {
        console.log("That is correct!");
        showCorrect();
        nextQuestion();
    } else {
        console.log("That is incorrect.");
        countdown -= 4;
        showWrong();
    }
}   

function showCorrect() {
    feedback.classList.remove("hide");
    feedback.textContent = "Correct!";
    setTimeout(function() {
        feedback.classList.add("hide");
    }, 1000);
}

function showWrong() {
    feedback.classList.remove("hide");
    feedback.textContent = "Wrong!";
    setTimeout(function() {
        feedback.classList.add("hide");
    }, 1000);
}

function nextQuestion() {
    if (questionID < questionList.length - 1) {
        questionID++;
        showQuestion();
    } else {
        stopCountdown();
        showEndScreen();
    }
}
// Show user score and enable user to enter initials to save score

function showEndScreen() {

    // question title to hide  
    questionScreen.classList.toggle("hide");
    questionScreen.classList.toggle("start");

    // start screen to show
    endScreen.classList.toggle("start");
    endScreen.classList.toggle("hide");

    // let userScore = parseInt(localStorage.getItem("userScore"));
    finalScore.innerHTML = `${userScore}`;

};

// initials and scores saved in local storage -> score.js file for score page logic

function submitScore() {
    console.log("Submit button clicked"); // Check if the function is triggered
    let userName = document.querySelector("#initials").value;
    localStorage.setItem(userName, userScore); // Store initials and score
    // Redirect to highscores page
    window.location.href = "highscores.html";

    // Display the new score immediately
    let newScore = document.createElement("li");
    newScore.textContent = `${userName} ${userScore}`;
    scoresList.appendChild(newScore); // Append the new score to the highscores list

    // Redirect to highscores page after a delay (e.g., 1 second)
    setTimeout(() => {
        window.location.href = "highscores.html"; // Redirect to highscores page
    }, 1000); // Delay in milliseconds
}
