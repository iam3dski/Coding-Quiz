const questions = [
  {
    question: "Inside which HTML element do we put the JavaScript?",
    answers: [
      { text: "javascript", correct: false},
      { text: "script", correct: true},
      { text: "scripting", correct: false},
      { text: "js", correct: false},
     ]
  },
  {
    question: "How to write and IF statement in JavaScript?",
    answers: [
      { text: "if i==5 then", correct: false },
      { text: "if i=5", correct: false },
      { text: "if i==5 then", correct: false },
      { text: "if (i==5)", correct: true },
    ],
  },
  {
    question: "Which event occurs when the user clicks on an HTML element?",
    answers: [
      { text: "onchange", correct: false },
      { text: "onmouseclick", correct: true },
      { text: "onmouseover", correct: false },
      { text: "onclick", correct: false },
    ],
  },
  {
    question: "Which operator is used to assign a value to a variable?",
    answers: [
      { text: "=", correct: true },
      { text: "*", correct: false },
      { text: "x", correct: false },
      { text: "-", correct: false },
    ],
  },
  {
    question: "Is JavaScript case-sensitive?",
    answers: [
      { text: "Yes", correct: true },
      { text: "No", correct: false },
    ],
  },
  {
    question: "Which built-in method removes the last element from an array and returns that element?",
    answers: [
      { text: "last()", correct: false },
      { text: "get()", correct: false },
      { text: "pop()", correct: true },
      { text: "None of the Above", correct: false },
    ],
  },
  {
    question: "Which built-in method returns the calling string value converted to lower case?",
    answers: [
      { text: "toLowerCase()", correct: true },
      { text: "toLower()", correct: false },
      { text: "changeCase(case)", correct: false },
      { text: "None of the Above", correct: false },
    ],
  },
];

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

window.onload = () => {
  let scores = JSON.parse(localStorage.getItem('scores'));
  if (scores === null) {
    scores = [];
  }

  let initials = prompt('Enter your initials:');
  // Limit initials to three characters
  initials = initials.slice(0, 3); 
  let timer;
  let timerInterval;
  let currentQuestionIndex;
  let score;
  
  function startQuiz() {
    timer = 60;
    timerInterval = setInterval(() => {
      timer--;
      document.getElementById("timer-value").innerHTML = timer;
      if (timer === 0) {
        clearInterval(timerInterval);
        showScore();
      }
    }, 1000);
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = 'Next';
    showQuestion();
  };

  function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + '. ' + currentQuestion.question;
    answerButtons.innerHTML = '';
    currentQuestion.answers.forEach(answer => {
      const button = document.createElement('button');
      button.innerHTML = answer.text;
      button.classList.add('btn');
      answerButtons.appendChild(button);
      if (answer.correct) {
        button.dataset.correct = answer.correct;
      }
      button.addEventListener('click', selectAnswer);
    });
   }


  function resetState() {
    nextButton.style.display = 'none';
    while(answerButtons.firstChild){
      answerButtons.removeChild(answerButtons.firstChild)
    }  
  }

  function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === 'true';
    if(isCorrect){
      selectedBtn.classList.add('correct');
      score++;
    }else{
      selectedBtn.classList.add('incorrect');
      timer -= 10;
      document.getElementById("timer-value").innerHTML = timer;
    }
    Array.from(answerButtons.children).forEach(button => {
      if(button.dataset.correct === 'true'){
        button.classList.add('correct');
      }
      button.disabled = true;
    });
    nextButton.style.display = 'block';
  }

  function showScore() {
    let scoreData = {
      initials: initials,
      value: timer
    };
    scores.push(scoreData);
    localStorage.setItem('scores', JSON.stringify(scores));
  
    let leaderboard = document.getElementById('leaderboard');
    if (leaderboard !== null) {
      leaderboard.innerHTML = `
        <h1>Leaderboard</h1>
        <ul>
          ${scores.map(score => `<li>Initials: ${score.initials} Score: ${score.value}</li>`).join('')}
        </ul>
      `;
    } else {
      leaderboard = document.createElement('div');
      leaderboard.id = 'leaderboard';
      document.body.appendChild(leaderboard);
    }
  }

  function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      // Capture the final score before resetting the timer
      const finalScore = timer;
  
      // Clear the timer and reset the score
      clearInterval(timerInterval);
      timer = 60;
  
      // Hide the next button
      nextButton.style.display = 'none';
  
      // Remove the event listener from the next button
      nextButton.removeEventListener('click', handleNextButton);
  
      // Show the finish button and attach the event listener
      finishButton = document.createElement('button');
      finishButton.innerHTML = 'Finish';
      finishButton.classList.add('finish-btn');
      finishButton.addEventListener('click', () => showScore(finalScore));
      answerButtons.appendChild(finishButton);
    }
  }
  
  function showScore(finalScore) {
    let scoreData = {
      initials: initials,
      value: finalScore
    };
    scores.push(scoreData);
    localStorage.setItem('scores', JSON.stringify(scores));
  
    scores.sort((a, b) => b.value - a.value); // Sort the scores in descending order
  
    let leaderboard = document.getElementById('leaderboard');
    if (leaderboard !== null) {
      leaderboard.innerHTML = `
        <h1>Leaderboard</h1>
        <ul>
          ${scores.map(score => `<li>Initials: ${score.initials} Score: ${score.value}</li>`).join('')}
        </ul>
      `;
    } else {
      leaderboard = document.createElement('div');
      leaderboard.id = 'leaderboard';
      leaderboard.innerHTML = `
        <h1>Leaderboard</h1>
        <ul>
          ${scores.map(score => `<li>Initials: ${score.initials} Score: ${score.value}</li>`).join('')}
        </ul>
      `;
      document.body.appendChild(leaderboard);
    }
  
    leaderboard.style.textAlign = 'center'; // Center the leaderboard
    leaderboard.style.color = 'white'; // Apply white text color
  
    // Disable the finish button
    finishButton.disabled = true;
  }
  
  let nextButton = document.getElementById('next-btn');
  let finishButton; // Declare finishButton variable
  
  nextButton.addEventListener('click', handleNextButton);
  
  startQuiz();
};
