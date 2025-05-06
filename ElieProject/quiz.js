/**
 * Quiz JavaScript file for portfolio website
 * Handles the functionality of the web development quiz
 */

// Quiz questions - can be expanded or modified
const quizQuestions = [
  {
    question: "Which of the following is NOT a JavaScript framework or library?",
    options: ["React", "Angular", "Vue", "Django"],
    correctAnswer: 3,
    explanation: "Django is a Python web framework, not a JavaScript framework or library. React, Angular, and Vue are all JavaScript frameworks/libraries used for building user interfaces."
  },
  {
    question: "What does the 'C' stand for in CSS?",
    options: ["Cascading", "Colorful", "Creative", "Computer"],
    correctAnswer: 0,
    explanation: "CSS stands for Cascading Style Sheets. It's a stylesheet language used for describing the presentation of a document written in HTML."
  },
  {
    question: "Which HTML5 element is used to play video files?",
    options: ["&lt;media&gt;", "&lt;video&gt;", "&lt;player&gt;", "&lt;film&gt;"],
    correctAnswer: 1,
    explanation: "The &lt;video&gt; element is used to embed video content in an HTML document. It was introduced in HTML5 along with other media elements like &lt;audio&gt;."
  },
  {
    question: "Which of these is a valid way to declare a JavaScript variable in modern syntax?",
    options: ["let x = 5;", "constable x = 5;", "var x = 5;", "Both A and C"],
    correctAnswer: 3,
    explanation: "Both 'let x = 5;' and 'var x = 5;' are valid ways to declare variables in JavaScript. 'const' is also valid for declaring constants, but 'constable' is not a JavaScript keyword."
  },
  {
    question: "What does API stand for?",
    options: ["Application Programming Interface", "Automated Protocol Integration", "Application Process Integration", "Advanced Programming Interface"],
    correctAnswer: 0,
    explanation: "API stands for Application Programming Interface. It's a set of rules that allows different software applications to communicate with each other."
  },
  {
    question: "Which of the following is a NoSQL database?",
    options: ["MySQL", "PostgreSQL", "MongoDB", "SQLite"],
    correctAnswer: 2,
    explanation: "MongoDB is a NoSQL database that uses a document-oriented data model. MySQL, PostgreSQL, and SQLite are all relational (SQL) databases."
  },
  {
    question: "Which CSS property is used to change the text color of an element?",
    options: ["text-color", "font-color", "color", "text-style"],
    correctAnswer: 2,
    explanation: "The 'color' property is used to set the color of text in CSS. 'text-color' and 'font-color' are not valid CSS properties."
  },
  {
    question: "What does the 'D' stand for in DOM?",
    options: ["Document", "Data", "Dynamic", "Design"],
    correctAnswer: 0,
    explanation: "DOM stands for Document Object Model. It's a programming interface for HTML and XML documents that represents the page so that programs can change the document structure, style, and content."
  },
  {
    question: "Which of the following is not a JavaScript data type?",
    options: ["String", "Boolean", "Integer", "Object"],
    correctAnswer: 2,
    explanation: "Integer is not a JavaScript data type. JavaScript has Number type which includes both integers and floating-point numbers. String, Boolean, and Object are all valid JavaScript data types."
  },
  {
    question: "Which HTTP method is typically used to submit form data to a server?",
    options: ["GET", "POST", "PUT", "DELETE"],
    correctAnswer: 1,
    explanation: "POST is typically used to submit form data to a server. The data is included in the request body, not appended to the URL like with GET requests."
  }
];

// Global variables
let currentQuestionIndex = 0;
let userAnswers = Array(quizQuestions.length).fill(null);
let startTime;
let timerInterval;
let remainingTime = 300; // 5 minutes in seconds

// DOM Elements - Get elements when needed to avoid errors if they don't exist
document.addEventListener('DOMContentLoaded', () => {
  // Set up quiz functionality
  initializeQuiz();
  console.log('Quiz initialized with', quizQuestions.length, 'questions');
});

/**
 * Initialize the quiz functionality
 */
function initializeQuiz() {
  // Start quiz button
  const startQuizBtn = document.getElementById('startQuizBtn');
  if (startQuizBtn) {
    startQuizBtn.addEventListener('click', startQuiz);
  }
  
  // Navigation buttons
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const submitBtn = document.getElementById('submitBtn');
  
  if (prevBtn) prevBtn.addEventListener('click', goToPreviousQuestion);
  if (nextBtn) nextBtn.addEventListener('click', goToNextQuestion);
  if (submitBtn) submitBtn.addEventListener('click', submitQuiz);
  
  // Review buttons
  const reviewBtn = document.getElementById('reviewBtn');
  const retryBtn = document.getElementById('retryBtn');
  const backToResultsBtn = document.getElementById('backToResultsBtn');
  
  if (reviewBtn) reviewBtn.addEventListener('click', showReviewScreen);
  if (retryBtn) retryBtn.addEventListener('click', resetQuiz);
  if (backToResultsBtn) backToResultsBtn.addEventListener('click', showResultsScreen);
  
  // Exit buttons
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

/**
 * Start the quiz
 */
function startQuiz() {
  // Hide welcome screen, show quiz screen
  const welcomeScreen = document.getElementById('welcomeScreen');
  const quizScreen = document.getElementById('quizScreen');
  
  if (welcomeScreen) welcomeScreen.style.display = 'none';
  if (quizScreen) quizScreen.style.display = 'block';
  
  // Reset quiz state
  currentQuestionIndex = 0;
  // Initialize the userAnswers array with null values
  userAnswers = Array(quizQuestions.length).fill(null);
  
  console.log('Quiz started. Questions:', quizQuestions.length);
  console.log('User answers initialized:', userAnswers);
  
  // Display first question
  displayQuestion(currentQuestionIndex);
  updateProgressBar();
  
  // Start the timer
  startTime = new Date();
  startTimer();
}

/**
 * Display a question
 * @param {number} index - The index of the question to display
 */
function displayQuestion(index) {
  const quizContent = document.getElementById('quizContent');
  if (!quizContent) return;
  
  const question = quizQuestions[index];
  
  // Add a console log to debug question retrieval
  console.log('Displaying question:', index, question);
  
  // Make sure question exists and has options
  if (!question || !question.options || !Array.isArray(question.options)) {
    console.error(`Question at index ${index} is invalid:`, question);
    return;
  }
  
  // Create question HTML
  let questionHTML = `
    <div class="question-container">
      <div class="question-text">${question.question}</div>
      <div class="options-container">
  `;
  
  // Add options
  question.options.forEach((option, i) => {
    // Check if option exists
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
  
  // Insert question HTML
  quizContent.innerHTML = questionHTML;
  
  // Add event listeners to options with a slight delay to ensure DOM is updated
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
  
  // Update current question indicator
  const currentQuestionEl = document.getElementById('currentQuestion');
  if (currentQuestionEl) {
    currentQuestionEl.textContent = index + 1;
  }
  
  // Update navigation buttons
  updateNavigationButtons();
}

/**
 * Select an option
 * @param {number} optionIndex - The index of the selected option
 */
function selectOption(optionIndex) {
  // Save the selected answer to the userAnswers array
  userAnswers[currentQuestionIndex] = optionIndex;
  
  // Update UI
  const options = document.querySelectorAll('.option');
  options.forEach(option => {
    option.classList.remove('selected');
    if (parseInt(option.dataset.index) === optionIndex) {
      option.classList.add('selected');
    }
  });
  
  // Add a console log to verify the selection is saved
  console.log(`Question ${currentQuestionIndex + 1}: Selected option ${optionIndex}`);
  console.log('Current user answers:', userAnswers);
  
  // Update navigation buttons
  updateNavigationButtons();
}

/**
 * Go to the previous question
 */
function goToPreviousQuestion() {
  if (currentQuestionIndex > 0) {
    // Save current answer if selected
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

/**
 * Go to the next question
 */
function goToNextQuestion() {
  if (currentQuestionIndex < quizQuestions.length - 1) {
    // Save current answer if selected
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

/**
 * Update the progress bar
 */
function updateProgressBar() {
  const progressFill = document.getElementById('progressFill');
  if (progressFill) {
    const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
    progressFill.style.width = `${progress}%`;
  }
}

/**
 * Update navigation buttons state
 */
function updateNavigationButtons() {
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const submitBtn = document.getElementById('submitBtn');
  
  if (!prevBtn || !nextBtn || !submitBtn) return;
  
  // Disable previous button on first question
  prevBtn.disabled = currentQuestionIndex === 0;
  
  // Show submit button on last question, otherwise show next button
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

/**
 * Start the quiz timer
 */
function startTimer() {
  const timerDisplay = document.getElementById('timerDisplay');
  if (!timerDisplay) return;
  
  remainingTime = 300; // 5 minutes in seconds
  
  timerInterval = setInterval(() => {
    remainingTime--;
    
    if (remainingTime <= 0) {
      clearInterval(timerInterval);
      submitQuiz();
    }
    
    // Update timer display
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    // Add warning class when time is getting low
    if (remainingTime <= 60) {
      timerDisplay.classList.add('timer-warning');
    }
  }, 1000);
}

/**
 * Submit the quiz
 */
function submitQuiz() {
  // Stop the timer
  clearInterval(timerInterval);
  
  // Ensure we have the current answer selected before submitting
  const selectedOption = document.querySelector('.option.selected');
  if (selectedOption) {
    const optionIndex = parseInt(selectedOption.dataset.index);
    userAnswers[currentQuestionIndex] = optionIndex;
    console.log(`Final question answer set to: ${optionIndex}`);
  }
  
  console.log('All answers before calculation:', userAnswers);
  
  // Calculate results
  const results = calculateResults();
  
  // FORCE UPDATE THE UI ELEMENTS DIRECTLY
  // This ensures the UI shows the correct results regardless of other issues
  document.getElementById('scoreNumber').textContent = results.score;
  document.getElementById('correctAnswers').textContent = results.correctCount;
  document.getElementById('incorrectAnswers').textContent = results.incorrectCount;
  
  // Format time taken for display
  const minutes = Math.floor(results.timeTaken / 60);
  const seconds = results.timeTaken % 60;
  document.getElementById('timeTaken').textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  
  // Set results message based on score
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
  
  // Show results screen
  document.getElementById('quizScreen').style.display = 'none';
  document.getElementById('resultsScreen').style.display = 'block';
}

/**
 * Calculate quiz results
 * @returns {Object} Object containing quiz results
 */
function calculateResults() {
  let correctCount = 0;
  let incorrectCount = 0;
  const endTime = new Date();
  const timeTaken = Math.floor((endTime - startTime) / 1000); // in seconds
  
  console.log('User answers at calculation time:', userAnswers);
  
  // CRITICAL FIX: Make sure we handle all answers properly
  for (let i = 0; i < quizQuestions.length; i++) {
    // Get user's answer for this question (might be null/undefined)
    const userAnswer = userAnswers[i];
    
    // Get the correct answer for this question
    const correctAnswer = quizQuestions[i].correctAnswer;
    
    console.log(`Question ${i+1}: User answered ${userAnswer}, correct is ${correctAnswer}`);
    
    // Count correct/incorrect only if user answered
    if (userAnswer !== null && userAnswer !== undefined) {
      if (parseInt(userAnswer) === parseInt(correctAnswer)) {
        correctCount++;
        console.log(`✓ Question ${i+1}: Correct`);
      } else {
        incorrectCount++;
        console.log(`✗ Question ${i+1}: Incorrect`);
      }
    } else {
      console.log(`? Question ${i+1}: Not answered`);
    }
  }
  
  console.log(`FINAL RESULTS - Correct: ${correctCount}, Incorrect: ${incorrectCount}`);
  
  return {
    score: correctCount,
    total: quizQuestions.length,
    correctCount,
    incorrectCount,
    unansweredCount: quizQuestions.length - correctCount - incorrectCount,
    timeTaken
  };
}

/**
 * Show the results screen (with given results or call calculateResults again)
 * @param {Object} [results] - Optional results object, if not provided will calculate again
 */
function showResultsScreen(results) {
  // If no results provided, calculate them
  if (!results) {
    results = calculateResults();
  }
  
  // Hide review screen if showing
  const reviewScreen = document.getElementById('reviewScreen');
  if (reviewScreen) reviewScreen.style.display = 'none';
  
  // Show results screen
  const resultsScreen = document.getElementById('resultsScreen');
  if (resultsScreen) resultsScreen.style.display = 'block';
  
  // Force update results display
  document.getElementById('scoreNumber').textContent = results.score;
  document.getElementById('correctAnswers').textContent = results.correctCount;
  document.getElementById('incorrectAnswers').textContent = results.incorrectCount;
  
  // Format time taken
  const minutes = Math.floor(results.timeTaken / 60);
  const seconds = results.timeTaken % 60;
  document.getElementById('timeTaken').textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * Show the review screen
 */
function showReviewScreen() {
  // Hide results screen, show review screen
  const resultsScreen = document.getElementById('resultsScreen');
  const reviewScreen = document.getElementById('reviewScreen');
  
  if (resultsScreen) resultsScreen.style.display = 'none';
  if (reviewScreen) reviewScreen.style.display = 'block';
  
  // Generate review content
  generateReviewContent();
}

/**
 * Generate review content
 */
function generateReviewContent() {
  const reviewContent = document.getElementById('reviewContent');
  if (!reviewContent) return;
  
  let reviewHTML = '';
  
  // Generate review for each question
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
    
    // User's answer
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
    
    // Correct answer (only show if user was wrong)
    if (!isCorrect) {
      reviewHTML += `
        <div class="review-answer correct-answer">
          <div class="answer-label correct-label">Correct Answer:</div>
          <div class="answer-text">${question.options[correctAnswer]}</div>
        </div>
      `;
    }
    
    // Explanation
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

/**
 * Reset the quiz
 */
function resetQuiz() {
  // Reset quiz state
  currentQuestionIndex = 0;
  userAnswers = Array(quizQuestions.length).fill(null);
  
  // Hide results screen, show welcome screen
  const resultsScreen = document.getElementById('resultsScreen');
  const welcomeScreen = document.getElementById('welcomeScreen');
  
  if (resultsScreen) resultsScreen.style.display = 'none';
  if (welcomeScreen) welcomeScreen.style.display = 'block';
}

// Add a global click handler to debug option selection
document.addEventListener('DOMContentLoaded', () => {
  console.log('Quiz.js loaded successfully');
  
  // Add a global click handler to debug option selection
  document.body.addEventListener('click', (e) => {
    // If the clicked element is an option or inside an option
    const option = e.target.closest('.option');
    if (option && document.querySelector('.options-container')) {
      const optionIndex = parseInt(option.dataset.index);
      const questionIndex = currentQuestionIndex;
      console.log(`Option clicked: ${optionIndex} for question ${questionIndex+1}`);
      
      // Force update the userAnswers array
      userAnswers[questionIndex] = optionIndex;
      
      // Update UI to reflect selection
      document.querySelectorAll('.option').forEach(opt => {
        opt.classList.remove('selected');
      });
      option.classList.add('selected');
      
      console.log('Updated userAnswers:', userAnswers);
    }
  });
});