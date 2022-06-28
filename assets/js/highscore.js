
var highScore = document.getElementById("high-score");
var clearScores = document.getElementById("clear-scores");
var goBack = document.getElementById("go-back");

//clear all high scores 
clearScores.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});

// displayhigh scores
var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

if (allScores !== null) {

    for (var i = 0; i < allScores.length; i++) {

        var createDiv = document.createElement("div");
        createDiv.textContent = allScores[i].initials + " " + allScores[i].score;
        createDiv.setAttribute("id", "high-score")
        highScore.appendChild(createDiv);

    }
}
// back to index
goBack.addEventListener("click", function () {
    window.location.replace("./index.html");
});