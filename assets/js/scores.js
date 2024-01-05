// TARGETED VARIABLES

let clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", clearScores);



// FUNCTION LIST

// Get score from local storage

function loadScores() {

    // let highscores = JSON.parse(localStorage.getItem(userN));

    for (let i = 0; i < localStorage.length; i++) {

        let savedUserName = localStorage.key(i);
        let savedUserScore = localStorage.getItem(savedUserName);

        let newScore = document.createElement("li");
        newScore.textContent = (`${savedUserName} ${savedUserScore}`);

        document.querySelector("#highscores").appendChild(newScore)

  
    }

;
}

loadScores();


// Clear all highscores

// function that removes all items from local storage

function clearScores() {
    let scoreList = document.getElementById('highscores');
    scoreList.innerHTML = " ";
    localStorage.clear();
};