const questions = [
  {
    question: "Inside which HTML element do we put the JavaScript?",
    choices: ["<javascript>", "<script>", "<scripting>", "<js>"],
    answer: "<script>"
  },
  {
    question: "How to write and IF statement in JavaScript?",
    choices: ["if i==5 then", "if i=5", "if i==5 then", "if (i==5)"],
    answer: "if (i==5)"
  },
  {
    question: "Which event occurs when the user clicks on an HTML element?",
    choices: ["onchange", "onmouseclick", "onmouseover", "onclick"],
    answer: "onclick"
  },
  {
    question: "Which operator is used to assign a value to a variable?",
    choices: ["=", "*", "x", "-"],
    answer: "="
  },
  {
    question: "Is JavaScript case-sensitive?",
    choices: ["Yes", "No"],
    answer: "Yes"
  },
  {
    question: "Which built-in method removes the last element from an array and returns that element?",
    choices: ["last()", "get()", "pop()", "None of the Above"],
    answer: "pop()"
  },
  {
    question: "Which built-in method returns the calling string value converted to lower case?",
    choices: ["toLowerCase()", "toLower()", "changeCase(case)", "None of the Above"],
    answer: "toLowerCase()"
  }
];

var score = 0;
var questionIndex = 0;
var remainingTime = 60;
var timerId;

function startQuiz() {
  // Hide start button and show submit button
  startButtonEl.classList.add('hide');
  submitButtonEl.classList.remove('hide');

  // Shuffle the questions and set current question index
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;

  // Display first question
  showQuestion();

  // Start the timer
  timerId = setInterval(timer, 1000);
}

function showQuestion() {
  resetAnswerButtons();

  const currentQuestion = questions[questionIndex];
  questionElement.innerText = currentQuestion.question;

  currentQuestion.choices.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const isCorrect = selectedButton.dataset.correct == "true";

  if (isCorrect) {
    score++;
  }

  if (questionIndex === questions.length - 1) {
    clearInterval(timerId);
    displayScore();
  } else {
    questionIndex++;
    showQuestion();
  }
}

function displayScore() {
  const scoreElement = document.createElement("div");
  scoreElement.innerText = `Your score: ${score}%`;
  quizContainer.appendChild(scoreElement);
}

document.addEventListener("DOMContentLoaded", startQuiz);