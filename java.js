const startBtn = document.querySelector("#startBtn");
const home = document.querySelector("#home");
const quiz = document.querySelector("#quiz");
const questionEl = document.querySelector("#questions");
const questiontimer = document.querySelector("#questiontimer");
let currentIndex = 0;
let timeLeft = 90;
const options = document.querySelector("#options");
const timeEl = document.querySelector("#time-left");
const submit = document.querySelector("#submit");
const questions = [
  {
    title: "A boolean value can be what?",
    choices: ["true or false", "yes or no", "anything"],
    answer: "true or false",
  },
  {
    title: "to envoke a function you would use what?",
    choices: ["{}", "[]", "()"],
    answer: "()",
  },
  {
    title: "what is the best weapon in warzone",
    choices: ["AMAX", "AK-47", "Dragnov"],
    answer: "AMAX",
  },
  {
    title: "",
    choices: ["answer1", "answer2", "answer3"],
    answer: "answer 2",
  },
  {
    title: "question 5",
    choices: ["answer1", "answer2", "answer3"],
    answer: "answer 3",
  },
];

function startQuiz() {
    startBtn.classList.add("hidden")
  myquestions();
  startTimer();
}
// function for checking wether the answer is correct or not
// function for the timer
function startTimer() {
  const timer = setInterval(() => {
    timeEl.textContent = `${timeLeft} seconds left`;
    timeLeft--;
    if (timeLeft === 0) {
      endQuiz();
    }
  }, 1000);
}

// function for when the quiz ends
function endQuiz() {
    let timer ;
  clearInterval(timer);
  questionEl.setAttribute("class", "hide");
  const endscreeen = document.getElementById("endscreen");
  endscreeen.removeAttribute("class");
  const finalScore = document.getElementById("finalScore");
  finalScore.textContent = timer;
  //hide any questions
  //show end of quiz messege -game over, nice job and score
  //input for the users initials
}

// function to handle the locale storage (must have setItem and getItem)
function savescore() {
  const initials = document.getElementById("initials");
  initials.value.trim();
  if (initials !== "") {
    const highscore =
      JSON.parse(window.localStorage.getItem("highscores")) || [];
    const myScore = {
      initials: initials,
      score: timer,
    };
    highscore.push(myScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscore));
  }
}
// establish an array of objects in the js (the questions)

//function for getting the questions
function myquestions() {
  const currentQ = questions[currentIndex];
  questionEl.textContent = currentQ.title;
  document.querySelector("#options").innerHTML = ""
  currentQ.choices.forEach(function (choice) {
    var choiceBtn = document.createElement("button");
    choiceBtn.textContent = choice;
    choiceBtn.onclick = verifyanswer;
    options.append(choiceBtn);
  });
}
function verifyanswer(foo) {
    var choice = foo.target.textContent
   
  if (choice !== questions[currentIndex].answer) 
    timeLeft -= 10;
    
  currentIndex++;
  if (currentIndex === questions.length) {
    endQuiz();
  } else {
    myquestions();
  }
}
// function for starting the quiz
startBtn.addEventListener("click", startQuiz);
submit.onclick = savescore;
