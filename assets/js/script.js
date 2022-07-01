var score = 0;
var questionIndex = 0;

var timeLeft = 90;
var timeInterval = "";
var timerEl = document.getElementById("countdown");
var mainGameEl = document.getElementById("mainGame");
var startBtn = document.getElementById("start");
var timeOver = "You have run out of time";
var penalty = "10";
var createOption = document.createElement("ul");

function startQuiz(questionIndex) {
    // clear screen
        createOption.innerHTML = "";
        mainGameEl.innerHTML = "";
    
    // loop to go through all the questions
    for (var i = 0; i < questions.length; i++) {
        // display the selected question title
        var questionTitle = questions[questionIndex].title;
        var questionChoices = questions[questionIndex].choices;

        mainGameEl.textContent= questionTitle;
    }
    questionChoices.forEach(function (newButton) {
        var optionList = document.createElement("button");
        optionList.textContent = newButton;
        optionList.setAttribute("id", "choices");
        mainGameEl.appendChild(createOption);
        createOption.appendChild(optionList);
        optionList.addEventListener("click", (correctAnswer));
    })
    };


    var questions = [
        {
            title: "String values must be enclosed within ____ when being assigned to variables.",
            choices: ["commas", "curly brackets", "quotes", "parentheses"],
            answer: "quotes"
        },
        {
            title: "Commonly used data types DO NOT include:",
            choices: ["strings", "booleans", "alerts", "numbers"],
            answer: "alerts"
        },
        {
            title: "A very useful tool used during development and debugging for printing content to the debugger is:",
            choices: ["Javascript", "terminal / bash", "for loops", "console log"],
            answer: "console log"
        },
        {
            title: "The condition in an if / else statement is enclosed within ____.",
            choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
            answer: "parentheses"
        },
        {
            title: "What is the HTML tag under which one can write the JavaScript code?",
            choices: ["<javascript>", "<scripted>", "<script>", "<js>"],
            answer: "<script>"
        },
        {
            title: "Whose the best Peter?",
            choices: ["Peter Collela", "Peter Parker", "Saint Peter", "Peter Jackson"],
            answer: "Peter Collela"
        },
    ]; 

    //question/ start countdown
    startBtn.addEventListener("click", function() {
        countdown();
        startQuiz(questionIndex);
    });

        function correctAnswer(event) {
            var element = event.target;
            console.log(element);

            if (element.matches("button")) {

                var createDiv = document.createElement("div");
                createDiv.setAttribute("id", "createDiv");
                // correct
                    if (element.textContent == questions[questionIndex].answer) {
                        score ++;
                        alert("That's right. The answer is: " + questions[questionIndex].answer);
                    }
                    else {
                        // incorrect remove 10 seconds 
                        timeLeft = timeLeft - penalty;
                        alert("That's wrong. The correct answer is: " + questions[questionIndex].answer);
                    }
            }
           
            questionIndex ++;

            // check if quiz is done 
            if (questionIndex >= questions.length) {
                quizDone();
                createDiv.textContent = "Quiz over. You got " + score + " answers correct.";    
                }
                else {
                    startQuiz(questionIndex);                    
                }
                mainGameEl.appendChild(createDiv);
        }

        // quiz complete function
        function quizDone() {
            mainGameEl.innerHTML = "";
            stopCountdown();

            // tell user that quix is over with an h1 title
            var h1El = document.createElement("h1");
            h1El.setAttribute("id", "h1El");
            h1El.textContent = "All done"

            mainGameEl.appendChild(h1El);
            var pEl = document.createElement("p");
            pEl.setAttribute("id", "pEl");

            mainGameEl.appendChild(pEl);

            // adds time remaining with score 
            if (timeLeft >= 0) {
                var timeRemaining = timeLeft;
                var pEl2 = document.createElement("p");
                pEl2.textContent = "Your final score is: " + timeRemaining;
                mainGameEl.appendChild(pEl2);
            }

            //labels score with initials
            var createLabel = document.createElement("label");
            createLabel.setAttribute("id", "createLabel");
            createLabel.textContent = "Enter your initials: ";

            mainGameEl.appendChild(createLabel);

            // sets users initials
            var createInput = document.createElement("input");
            createInput.setAttribute("type", "text");
            createInput.setAttribute("id", "initials");
            createInput.textContent = "";

            mainGameEl.appendChild(createInput);

            // button to capture highscore
            var createSubmit = document.createElement("button");
            createSubmit.setAttribute("type", "submit");
            createSubmit.setAttribute("id", "Submit");
            createSubmit.textContent = "Submit";

            mainGameEl.appendChild(createSubmit);


            // local stoage highscore
            createSubmit.addEventListener("click", function () {
                var initials = createInput.value;
        
                if (!initials) {
                    alert("You must enter your initials")        
                    console.log("No value entered");
        
                } else {
                    var finalScore = {
                        initials: initials,
                        score: timeRemaining
                    }
                    console.log(finalScore);
                    var highScores = localStorage.getItem("highScores");
                    if (highScores === null) {
                        highScores = [];
                    } else {
                        highScores = JSON.parse(highScores);
                    }
                    highScores.push(finalScore);
                    var newScore = JSON.stringify(highScores);
                    localStorage.setItem("highScores", newScore);

                    // bring user to high score page
                    window.location.replace("./highscore.html");
                }
            });
        
        };

        // timer function
        function countdown() {        
            // use the setInterval() method to call a function to be executed every 1000 milliseconds (every 1 second)
            timeInterval = setInterval(function() {
            if(timeLeft >= 1) {
                timerEl.textContent = "time remaining:  " + timeLeft;
                timeLeft -= 1;
            }
            else if(timeLeft === 0){
                timerEl.textContent = "";
                clearInterval(timeInterval);
                console.log("I'm here");
                displayMessage();
                quizDone();
            }
        
            function displayMessage() {
                alert(timeOver);
            };
            }, 1000)
        }

            // stop timer function
            function stopCountdown() {
            clearInterval(timeInterval);
            timerEl.textContent = "Time is up!"
            console.log("countdown stopped");
            console.log(timeInterval);
            }
