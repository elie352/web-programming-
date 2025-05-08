const quizQuestions = [
  { question: "Which of the following is NOT a JavaScript framework or library?", options: ["React", "Angular", "Vue", "Django"], correctAnswer: 3, explanation: "Django is a Python web framework..." },
  { question: "What does the 'C' stand for in CSS?", options: ["Cascading", "Colorful", "Creative", "Computer"], correctAnswer: 0, explanation: "CSS stands for Cascading Style Sheets..." },
  { question: "Which HTML5 element is used to play video files?", options: ["&lt;media&gt;", "&lt;video&gt;", "&lt;player&gt;", "&lt;film&gt;"], correctAnswer: 1, explanation: "The &lt;video&gt; element is used..." },
  { question: "Which of these is a valid way to declare a JavaScript variable in modern syntax?", options: ["let x = 5;", "constable x = 5;", "var x = 5;", "Both A and C"], correctAnswer: 3, explanation: "Both 'let x = 5;' and 'var x = 5;' are valid..." },
  { question: "What does API stand for?", options: ["Application Programming Interface", "Automated Protocol Integration", "Application Process Integration", "Advanced Programming Interface"], correctAnswer: 0, explanation: "API stands for Application Programming Interface..." },
  { question: "Which of the following is a NoSQL database?", options: ["MySQL", "PostgreSQL", "MongoDB", "SQLite"], correctAnswer: 2, explanation: "MongoDB is a NoSQL database..." },
  { question: "Which CSS property is used to change the text color of an element?", options: ["text-color", "font-color", "color", "text-style"], correctAnswer: 2, explanation: "The 'color' property is used..." },
  { question: "What does the 'D' stand for in DOM?", options: ["Document", "Data", "Dynamic", "Design"], correctAnswer: 0, explanation: "DOM stands for Document Object Model..." },
  { question: "Which of the following is not a JavaScript data type?", options: ["String", "Boolean", "Integer", "Object"], correctAnswer: 2, explanation: "Integer is not a JavaScript data type..." },
  { question: "Which HTTP method is typically used to submit form data to a server?", options: ["GET", "POST", "PUT", "DELETE"], correctAnswer: 1, explanation: "POST is typically used..." }
];

let currentQuestionIndex = 0;
let userAnswers = Array(quizQuestions.length).fill(null);
let startTime;
let timerInterval;
let remainingTime = 300;

document.addEventListener('DOMContentLoaded', () => {
  initializeQuiz();
  console.log('Quiz initialized with', quizQuestions.length, 'questions');
});

function initializeQuiz() {
  const startQuizBtn = document.getElementById('startQuizBtn');
  if (startQuizBtn) {
    startQuizBtn.addEventListener('click', startQuiz);
  }

  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const submitBtn = document.getElementById('submitBtn');

  if (prevBtn) prevBtn.addEventListener('click', goToPreviousQuestion);
  if (nextBtn) nextBtn.addEventListener('click', goToNextQuestion);
  if (submitBtn) submitBtn.addEventListener('click', submitQuiz);

  const reviewBtn = document.getElementById('reviewBtn');
  const retryBtn = document.getElementById('retryBtn');
  const backToResultsBtn = document.getElementById('backToResultsBtn');

  if (reviewBtn) reviewBtn.addEventListener('click', showReviewScreen);
  if (retryBtn) retryBtn.addEventListener('click', resetQuiz);
  if (backToResultsBtn) backToResultsBtn.addEventListener('click', showResultsScreen);

  const exitQuizBtn = document.getElementById('exitQuizBtn');
  const exitModal = document.getElementById('exitModal');
  const cancelExitBtn = document.getElementById('cancelExitBtn');

  if (exitQuizBtn) {
    exitQuizBtn.addEventListener('click', () => {
      if (exitModal) exitModal.classList.add('active');
    });
  }

  if (cancelExitBtn) {
    cancelExitBtn.addEventListener('click', () => {
      if (exitModal) exitModal.classList.remove('active');
    });
  }
}

function startQuiz() {
  const welcomeScreen = document.getElementById('welcomeScreen');
  const quizScreen = document.getElementById('quizScreen');

  if (welcomeScreen) welcomeScreen.style.display = 'none';
  if (quizScreen) quizScreen.style.display = 'block';

  currentQuestionIndex = 0;
  userAnswers = Array(quizQuestions.length).fill(null);

  console.log('Quiz started. Questions:', quizQuestions.length);
  console.log('User answers initialized:', userAnswers);

  displayQuestion(currentQuestionIndex);
  updateProgressBar();

  startTime = new Date();
  startTimer();
}

function displayQuestion(index) {
  const quizContent = document.getElementById('quizContent');
  if (!quizContent) return;

  const question = quizQuestions[index];

  console.log('Displaying question:', index, question);

  if (!question || !question.options || !Array.isArray(question.options)) {
    console.error(`Question at index ${index} is invalid:`, question);
    return;
  }

  let questionHTML = `
    <div class="question-container">
      <div class="question-text">${question.question}</div>
      <div class="options-container">
  `;

  question.options.forEach((option, i) => {
    if (option === undefined || option === null) {
      console.error(`Option ${i} for question ${index} is invalid`);
      return;
    }

    const isSelected = userAnswers[index] === i;
    questionHTML += `
      <div class="option ${isSelected ? 'selected' : ''}" data-index="${i}">
        <div class="option-marker">${String.fromCharCode(65 + i)}</div>
        <div class="option-text">${option}</div>
      </div>
    `;
  });

  questionHTML += `
      </div>
    </div>
  `;

  quizContent.innerHTML = questionHTML;

  setTimeout(() => {
    const options = quizContent.querySelectorAll('.option');
    console.log(`Found ${options.length} options for question ${index}`);

    options.forEach(option => {
      option.addEventListener('click', () => {
        const optionIndex = parseInt(option.dataset.index);
        selectOption(optionIndex);
      });
    });
  }, 50);

  const currentQuestionEl = document.getElementById('currentQuestion');
  if (currentQuestionEl) {
    currentQuestionEl.textContent = index + 1;
  }

  updateNavigationButtons();
}

function selectOption(optionIndex) {
  userAnswers[currentQuestionIndex] = optionIndex;

  const options = document.querySelectorAll('.option');
  options.forEach(option => {
    option.classList.remove('selected');
    if (parseInt(option.dataset.index) === optionIndex) {
      option.classList.add('selected');
    }
  });

  console.log(`Question ${currentQuestionIndex + 1}: Selected option ${optionIndex}`);
  console.log('Current user answers:', userAnswers);

  updateNavigationButtons();
}

function goToPreviousQuestion() {
  if (currentQuestionIndex > 0) {
    const selectedOption = document.querySelector('.option.selected');
    if (selectedOption) {
      const optionIndex = parseInt(selectedOption.dataset.index);
      userAnswers[currentQuestionIndex] = optionIndex;
    }

    currentQuestionIndex--;
    displayQuestion(currentQuestionIndex);
    updateProgressBar();
  }
}

function goToNextQuestion() {
  if (currentQuestionIndex < quizQuestions.length - 1) {
    const selectedOption = document.querySelector('.option.selected');
    if (selectedOption) {
      const optionIndex = parseInt(selectedOption.dataset.index);
      userAnswers[currentQuestionIndex] = optionIndex;
    }

    currentQuestionIndex++;
    displayQuestion(currentQuestionIndex);
    updateProgressBar();
  }
}

function updateProgressBar() {
  const progressFill = document.getElementById('progressFill');
  if (progressFill) {
    const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
    progressFill.style.width = `${progress}%`;
  }
}

function updateNavigationButtons() {
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const submitBtn = document.getElementById('submitBtn');

  if (!prevBtn || !nextBtn || !submitBtn) return;

  prevBtn.disabled = currentQuestionIndex === 0;

  if (currentQuestionIndex === quizQuestions.length - 1) {
    nextBtn.style.display = 'none';
    submitBtn.style.display = 'block';
    submitBtn.disabled = userAnswers[currentQuestionIndex] === null;
  } else {
    nextBtn.style.display = 'block';
    submitBtn.style.display = 'none';
    nextBtn.disabled = userAnswers[currentQuestionIndex] === null;
  }
}

function startTimer() {
  const timerDisplay = document.getElementById('timerDisplay');
  if (!timerDisplay) return;

  remainingTime = 300;

  timerInterval = setInterval(() => {
    remainingTime--;

    if (remainingTime <= 0) {
      clearInterval(timerInterval);
      submitQuiz();
    }

    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;

    if (remainingTime <= 60) {
      timerDisplay.classList.add('timer-warning');
    } else {
       timerDisplay.classList.remove('timer-warning');
    }
  }, 1000);
}

function submitQuiz() {
  clearInterval(timerInterval);

  const selectedOption = document.querySelector('.option.selected');
  if (selectedOption && userAnswers[currentQuestionIndex] === null) { // Ensure last answer is recorded if selected
      const optionIndex = parseInt(selectedOption.dataset.index);
      userAnswers[currentQuestionIndex] = optionIndex;
      console.log(`Final question answer recorded: ${optionIndex}`);
  }


  console.log('All answers before calculation:', userAnswers);

  const results = calculateResults();

  document.getElementById('scoreNumber').textContent = results.score;
  document.getElementById('correctAnswers').textContent = results.correctCount;
  document.getElementById('incorrectAnswers').textContent = results.incorrectCount;

  const minutes = Math.floor(results.timeTaken / 60);
  const seconds = results.timeTaken % 60;
  document.getElementById('timeTaken').textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;

  const resultsMessage = document.getElementById('resultsMessage');
  if (resultsMessage) {
    let message = '';
    const percentage = (results.score / results.total) * 100;

    if (percentage >= 90) {
      message = "Exceptional work! You're a Web Development expert!";
    } else if (percentage >= 70) {
      message = "Great job! You have solid knowledge of Web Development concepts.";
    } else if (percentage >= 50) {
      message = "Good effort! You understand the basics, but there's room for improvement.";
    } else {
      message = "Keep learning! Web Development has a steep learning curve, but practice makes perfect.";
    }

    resultsMessage.innerHTML = `<p>${message}</p>`;
  }

  document.getElementById('quizScreen').style.display = 'none';
  document.getElementById('resultsScreen').style.display = 'block';

  const currentUser = localStorage.getItem('currentUser') || 'Anonymous';

  const resultsData = {
      portfolioUser: currentUser,
      score: results.score,
      total: results.total,
      correctCount: results.correctCount,
      incorrectCount: results.incorrectCount,
      timeTaken: results.timeTaken
  };

  fetch('submit_quiz.php', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      },
      body: JSON.stringify(resultsData)
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          console.log('Quiz results saved successfully.');
      } else {
          console.error('Failed to save quiz results:', data.message);
      }
  })
  .catch(error => {
      console.error('Error submitting quiz results:', error);
  });
}


function calculateResults() {
  let correctCount = 0;
  let incorrectCount = 0; // Initialize incorrect count
  const endTime = new Date();
  const timeTaken = Math.max(0, Math.floor((endTime - startTime) / 1000)); // Ensure timeTaken is not negative

  console.log('User answers at calculation time:', userAnswers);

  for (let i = 0; i < quizQuestions.length; i++) {
    const userAnswer = userAnswers[i];
    const correctAnswer = quizQuestions[i].correctAnswer;

    console.log(`Question ${i+1}: User answered ${userAnswer}, correct is ${correctAnswer}`);

    if (userAnswer !== null && userAnswer !== undefined) {
      if (parseInt(userAnswer) === parseInt(correctAnswer)) {
        correctCount++;
        console.log(`✓ Question ${i+1}: Correct`);
      } else {
        incorrectCount++; // Increment incorrect count here
        console.log(`✗ Question ${i+1}: Incorrect`);
      }
    } else {
      console.log(`? Question ${i+1}: Not answered`);
    }
  }

  // Calculate unanswered count correctly
  const answeredCount = userAnswers.filter(ans => ans !== null && ans !== undefined).length;
  const unansweredCount = quizQuestions.length - answeredCount;
  // Recalculate incorrect count based on answered and correct
  incorrectCount = answeredCount - correctCount;


  console.log(`FINAL RESULTS - Correct: ${correctCount}, Incorrect: ${incorrectCount}, Unanswered: ${unansweredCount}`);

  return {
    score: correctCount,
    total: quizQuestions.length,
    correctCount,
    incorrectCount, // Use the recalculated value
    unansweredCount,
    timeTaken
  };
}


function showResultsScreen(results) {
  if (!results) {
    results = calculateResults();
  }

  const reviewScreen = document.getElementById('reviewScreen');
  if (reviewScreen) reviewScreen.style.display = 'none';

  const resultsScreen = document.getElementById('resultsScreen');
  if (resultsScreen) resultsScreen.style.display = 'block';

  document.getElementById('scoreNumber').textContent = results.score;
  document.getElementById('correctAnswers').textContent = results.correctCount;
  document.getElementById('incorrectAnswers').textContent = results.incorrectCount;

  const minutes = Math.floor(results.timeTaken / 60);
  const seconds = results.timeTaken % 60;
  document.getElementById('timeTaken').textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function showReviewScreen() {
  const resultsScreen = document.getElementById('resultsScreen');
  const reviewScreen = document.getElementById('reviewScreen');

  if (resultsScreen) resultsScreen.style.display = 'none';
  if (reviewScreen) reviewScreen.style.display = 'block';

  generateReviewContent();
}

function generateReviewContent() {
  const reviewContent = document.getElementById('reviewContent');
  if (!reviewContent) return;

  let reviewHTML = '';

  quizQuestions.forEach((question, index) => {
    const userAnswer = userAnswers[index];
    const correctAnswer = question.correctAnswer;
    const isCorrect = parseInt(userAnswer) === parseInt(correctAnswer);

    reviewHTML += `
      <div class="review-item">
        <div class="review-status ${isCorrect ? 'correct' : 'incorrect'}">
          ${isCorrect ? 'Correct' : 'Incorrect'}
        </div>
        <div class="review-question">
          <div class="question-number">${index + 1}</div>
          <div>${question.question}</div>
        </div>
        <div class="review-answers">
    `;

    if (userAnswer !== null && userAnswer !== undefined) {
      reviewHTML += `
        <div class="review-answer user-answer">
          <div class="answer-label user-label">Your Answer:</div>
          <div class="answer-text">${question.options[userAnswer]}</div>
        </div>
      `;
    } else {
      reviewHTML += `
        <div class="review-answer user-answer">
          <div class="answer-label user-label">Your Answer:</div>
          <div class="answer-text">Not answered</div>
        </div>
      `;
    }

    if (!isCorrect) {
      reviewHTML += `
        <div class="review-answer correct-answer">
          <div class="answer-label correct-label">Correct Answer:</div>
          <div class="answer-text">${question.options[correctAnswer]}</div>
        </div>
      `;
    }

    reviewHTML += `
        <div class="review-explanation">
          <h4><i class="fas fa-lightbulb"></i> Explanation</h4>
          <p>${question.explanation}</p>
        </div>
      </div>
    </div>
    `;
  });

  reviewContent.innerHTML = reviewHTML;
}

function resetQuiz() {
  currentQuestionIndex = 0;
  userAnswers = Array(quizQuestions.length).fill(null);
  remainingTime = 300;
  if(timerInterval) clearInterval(timerInterval);

  const resultsScreen = document.getElementById('resultsScreen');
  const reviewScreen = document.getElementById('reviewScreen');
  const welcomeScreen = document.getElementById('welcomeScreen');
  const quizScreen = document.getElementById('quizScreen'); // Also hide quiz screen if resetting from there

  if (resultsScreen) resultsScreen.style.display = 'none';
  if (reviewScreen) reviewScreen.style.display = 'none';
  if (quizScreen) quizScreen.style.display = 'none';
  if (welcomeScreen) welcomeScreen.style.display = 'block';

  const timerDisplay = document.getElementById('timerDisplay');
   if (timerDisplay) {
     timerDisplay.textContent = "5:00";
     timerDisplay.classList.remove('timer-warning');
   }
   const progressFill = document.getElementById('progressFill');
   if(progressFill) progressFill.style.width = '0%';
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('Quiz.js loaded successfully');

  document.body.addEventListener('click', (e) => {
    const option = e.target.closest('.option');
    if (option && document.querySelector('.options-container')) {
      const optionIndex = parseInt(option.dataset.index);
      // Check if we are actually in the quiz screen to avoid side effects
      const quizScreen = document.getElementById('quizScreen');
      if (quizScreen && quizScreen.style.display === 'block') {
          const questionIndex = currentQuestionIndex;
          console.log(`Option clicked: ${optionIndex} for question ${questionIndex+1}`);

          userAnswers[questionIndex] = optionIndex;

          document.querySelectorAll('.option').forEach(opt => {
            opt.classList.remove('selected');
          });
          option.classList.add('selected');

          console.log('Updated userAnswers:', userAnswers);
          updateNavigationButtons(); // Update buttons right after selection
      }
    }
  });
});