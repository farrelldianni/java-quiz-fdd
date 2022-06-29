
var highScore = document.getElementById("high-score");
var clearScores = document.getElementById("clear-scores");
var goBack = document.getElementById("go-back");

//clear all high scores 
clearScores.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});

// displayhigh scores
var highScores = localStorage.getItem("highScores");
highScores = JSON.parse(highScores);

if (highScores !== null) {

    for (var i = 0; i < highScores.length; i++) {

        var createDiv = document.createElement("div");
        createDiv.textContent = highScores[i].initials + " " + highScores[i].score;
        createDiv.setAttribute("id", "high-score")
        highScore.appendChild(createDiv);

    }
}
// back to index
goBack.addEventListener("click", function () {
    window.location.replace("./index.html");
});