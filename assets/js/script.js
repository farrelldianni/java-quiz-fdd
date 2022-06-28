var score = 0;
var questionIndex = 0;

var timeLeft = 90;
var timeInterval = "";
var timerEl = document.getElementById("countdown");
var mainEl = document.getElementById("mainGame");
var startBtn = document.getElementById("start");
var timeIsUpMessage = "You have run out of time!";
var penalty = "10";
var createOption = document.createElement("ul");

    // questions index
    var questions = [
        {
            title: "Commonly used data types DO NOT include:",
            choices: ["strings", "booleans", "alerts", "numbers"],
            answer: "alerts"
        },
        {
            title: "The condition in an if / else statement is enclosed within ____.",
            choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
            answer: "parentheses"
        },
        {
            title: "Arrays in Javascript can be used to store ____.",
            choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
            answer: "all of the above"
        },
        {
            title: "String values must be enclosed within ____ when being assigned to variables.",
            choices: ["commas", "curly brackets", "quotes", "parentheses"],
            answer: "quotes"
        },
        {
            title: "A very useful tool used during development and debugging for printing content to the debugger is:",
            choices: ["Javascript", "terminal / bash", "for loops", "console log"],
            answer: "console log"
        },
    ]; 

    // Display question/ start countdown
    startBtn.addEventListener("click", function() {
        countdown();
        startQuiz(questionIndex);
    });

    function startQuiz(questionIndex) {
        // Clear the screen
            createOption.innerHTML = "";
            mainEl.innerHTML = "";
        
        // Loop to go through all the questions
        for (var i = 0; i < questions.length; i++) {
            // display the selected question title
            var questionTitle = questions[questionIndex].title;
            var questionChoices = questions[questionIndex].choices;
            // add the Question title to the page
            mainEl.textContent= questionTitle;
        }
        questionChoices.forEach(function (newButton) {
            var optionList = document.createElement("button");
            optionList.textContent = newButton;
            optionList.setAttribute("id", "choices");
            mainEl.appendChild(createOption);
            createOption.appendChild(optionList);
            optionList.addEventListener("click", (compareAnswer));
        })
        };

        function compareAnswer(event) {
            var element = event.target;
            console.log(element);

            if (element.matches("button")) {

                var createDiv = document.createElement("div");
                createDiv.setAttribute("id", "createDiv");
                // If answer is correct
                if (element.textContent == questions[questionIndex].answer) {
                    score ++;
                    alert("That is correct! The answer is: " + questions[questionIndex].answer);
                }
                else {
                    // If answer is incorrect, remove 10 seconds from the timer
                    timeLeft = timeLeft - penalty;
                    alert("That is incorrect! The correct answer is: " + questions[questionIndex].answer);
                }
            }
            // move on to the next question
            questionIndex ++;

            // check if quiz is done (either if it was the last question or time is up)
            if (questionIndex >= questions.length) {
                quizComplete();
                createDiv.textContent = "Quiz complete! You got " + score + " answers correct.";    
                }
                else {
                    startQuiz(questionIndex);                    
                }
                mainEl.appendChild(createDiv);
        }

        // Quiz complete function
        function quizComplete() {
            mainEl.innerHTML = "";
            stopCountdown();

            // Add a heading element to let user know the quiz is done
            var h1El = document.createElement("h1");
            h1El.setAttribute("id", "h1El");
            h1El.textContent = "All done!"

            mainEl.appendChild(h1El);

            // Add a Paragraph element
            var pEl = document.createElement("p");
            pEl.setAttribute("id", "pEl");

            mainEl.appendChild(pEl);

            // Calculates time remaining and replaces it with score
            if (timeLeft >= 0) {
                var timeRemaining = timeLeft;
                var pEl2 = document.createElement("p");
                pEl2.textContent = "Your final score is: " + timeRemaining;
                mainEl.appendChild(pEl2);
            }

            // add a Label element for the high score initials
            var createLabel = document.createElement("label");
            createLabel.setAttribute("id", "createLabel");
            createLabel.textContent = "Enter your initials: ";

            mainEl.appendChild(createLabel);

            // add an input so user can input their initials
            var createInput = document.createElement("input");
            createInput.setAttribute("type", "text");
            createInput.setAttribute("id", "initials");
            createInput.textContent = "";

            mainEl.appendChild(createInput);

            // add a submit button for high score capture
            var createSubmit = document.createElement("button");
            createSubmit.setAttribute("type", "submit");
            createSubmit.setAttribute("id", "Submit");
            createSubmit.textContent = "Submit";

            mainEl.appendChild(createSubmit);


            // adding the high score to the local storage
            createSubmit.addEventListener("click", function () {
                var initials = createInput.value;
        
                if (!initials) {
                    alert("You must enter your initials!")        
                    console.log("No value entered!");
        
                } else {
                    var finalScore = {
                        initials: initials,
                        score: timeRemaining
                    }
                    console.log(finalScore);
                    var allScores = localStorage.getItem("allScores");
                    if (allScores === null) {
                        allScores = [];
                    } else {
                        allScores = JSON.parse(allScores);
                    }
                    allScores.push(finalScore);
                    var newScore = JSON.stringify(allScores);
                    localStorage.setItem("allScores", newScore);

                    // bring user to high score page
                    window.location.replace("./highscore.html");
                }
            });
        
        };

        // timer function
        function countdown() {        
            // Use the setInterval() method to call a function to be executed every 1000 milliseconds (every 1 second)
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
                quizComplete();
            }
        
            function displayMessage() {
                alert(timeIsUpMessage);
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
