// Question Bank (10 per category)
const quizData = {
  programming: [
    { q: "Which language runs in the browser?", a: ["Java", "C", "Python", "JavaScript"], correct: 3 },
    { q: "What does CSS stand for?", a: ["Cascading Style Sheets", "Computer Style Syntax", "Creative Styling System", "Code Styling Standard"], correct: 0 },
    { q: "Who developed C language?", a: ["Dennis Ritchie", "James Gosling", "Bjarne Stroustrup", "Guido van Rossum"], correct: 0 },
    { q: "What does HTML stand for?", a: ["HyperText Markup Language", "HighText Machine Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"], correct: 0 },
    { q: "Which company developed Java?", a: ["Microsoft", "Sun Microsystems", "Google", "IBM"], correct: 1 },
    { q: "Which of these is a JavaScript framework?", a: ["React", "Laravel", "Django", "Flask"], correct: 0 },
    { q: "Which is a backend language?", a: ["HTML", "CSS", "Node.js", "Bootstrap"], correct: 2 },
    { q: "Which keyword declares a variable in JS?", a: ["var", "let", "const", "All of the above"], correct: 3 },
    { q: "Which symbol is used for comments in JS?", a: ["//", "/* */", "#", "Both // and /* */"], correct: 3 },
    { q: "Which database is NoSQL?", a: ["MySQL", "PostgreSQL", "MongoDB", "Oracle"], correct: 2 }
  ],
  geography: [
    { q: "Capital of France?", a: ["Rome", "Madrid", "Paris", "Berlin"], correct: 2 },
    { q: "Largest desert in the world?", a: ["Sahara", "Thar", "Gobi", "Kalahari"], correct: 0 },
    { q: "River Nile flows into?", a: ["Red Sea", "Mediterranean Sea", "Atlantic Ocean", "Indian Ocean"], correct: 1 },
    { q: "Which is the smallest continent?", a: ["Australia", "Europe", "Antarctica", "South America"], correct: 0 },
    { q: "Mount Everest is located in?", a: ["China", "India", "Nepal", "Bhutan"], correct: 2 },
    { q: "Which is the largest country by area?", a: ["USA", "China", "Russia", "Canada"], correct: 2 },
    { q: "Which ocean is the deepest?", a: ["Pacific", "Atlantic", "Indian", "Arctic"], correct: 0 },
    { q: "Which country is known as the Land of Rising Sun?", a: ["China", "Japan", "Korea", "Thailand"], correct: 1 },
    { q: "Which is the hottest continent?", a: ["Africa", "Asia", "Australia", "South America"], correct: 0 },
    { q: "Amazon rainforest is in?", a: ["Brazil", "Peru", "Colombia", "Ecuador"], correct: 0 }
  ],
  mathematics: [
    { q: "5 + 7 = ?", a: ["10", "11", "12", "13"], correct: 2 },
    { q: "Square root of 144?", a: ["10", "11", "12", "13"], correct: 2 },
    { q: "15 × 8 = ?", a: ["100", "110", "120", "130"], correct: 2 },
    { q: "100 ÷ 25 = ?", a: ["2", "3", "4", "5"], correct: 2 },
    { q: "12² = ?", a: ["124", "142", "144", "154"], correct: 2 },
    { q: "π value approx?", a: ["2.12", "3.14", "4.13", "2.22"], correct: 1 },
    { q: "LCM of 6 and 8?", a: ["12", "18", "24", "36"], correct: 2 },
    { q: "Factorial of 5?", a: ["60", "100", "120", "150"], correct: 2 },
    { q: "7³ = ?", a: ["243", "343", "413", "512"], correct: 1 },
    { q: "1 km = ? meters", a: ["10", "100", "1000", "10000"], correct: 2 }
  ],
  entertainment: [
    { q: "King of Pop?", a: ["Elvis Presley", "Michael Jackson", "Justin Bieber", "Eminem"], correct: 1 },
    { q: "First Avengers movie year?", a: ["2010", "2011", "2012", "2013"], correct: 2 },
    { q: "Oscar Best Picture 2020?", a: ["Joker", "1917", "Parasite", "Once Upon a Time in Hollywood"], correct: 2 },
    { q: "Actor who played Iron Man?", a: ["Chris Evans", "Chris Hemsworth", "Mark Ruffalo", "Robert Downey Jr."], correct: 3 },
    { q: "Famous wizard in books?", a: ["Frodo", "Harry Potter", "Gandalf", "Merlin"], correct: 1 },
    { q: "Movie ‘Titanic’ released in?", a: ["1995", "1996", "1997", "1998"], correct: 2 },
    { q: "Director of Avatar?", a: ["Steven Spielberg", "James Cameron", "Christopher Nolan", "Peter Jackson"], correct: 1 },
    { q: "Famous Disney character?", a: ["Mickey Mouse", "Bugs Bunny", "Popeye", "Donald Duck"], correct: 0 },
    { q: "Which series has character ‘Walter White’?", a: ["Friends", "Breaking Bad", "Game of Thrones", "The Office"], correct: 1 },
    { q: "Singer of ‘Shape of You’?", a: ["Justin Bieber", "Ed Sheeran", "Shawn Mendes", "Zayn Malik"], correct: 1 }
  ]
};

// DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const categorySelect = document.getElementById("category");
const startBtn = document.getElementById("start-btn");
const questionEl = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("next-btn");
const feedbackEl = document.getElementById("feedback");
const resultText = document.getElementById("result-text");
const retryBtn = document.getElementById("retry-btn");
const nextTestBtn = document.getElementById("next-test-btn");
const questionNumberEl = document.getElementById("question-number");
const timerEl = document.getElementById("timer");

let currentCategory = "programming";
let questions = [];
let currentIndex = 0;
let score = 0;
let timer;
let timeLeft = 30;

function startQuiz() {
  currentCategory = categorySelect.value;
  questions = quizData[currentCategory].slice(0, 10); // always 10

  currentIndex = 0;
  score = 0;
  startScreen.classList.add("hidden");
  resultScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  showQuestion();
  startTimer();
}

function showQuestion() {
  resetState();
  let currentQ = questions[currentIndex];
  questionNumberEl.textContent = `Q. ${currentIndex + 1} of ${questions.length}`;
  questionEl.textContent = currentQ.q;

  currentQ.a.forEach((answer, index) => {
    const button = document.createElement("button");
    button.innerHTML = answer;
    button.dataset.index = index;
    button.addEventListener("click", selectAnswer);
    const li = document.createElement("li");
    li.appendChild(button);
    answerButtons.appendChild(li);
  });
}

function resetState() {
  nextBtn.classList.add("hidden");
  feedbackEl.textContent = "";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selected = parseInt(e.target.dataset.index);
  const correct = questions[currentIndex].correct;

  if (selected === correct) {
    e.target.classList.add("correct");
    feedbackEl.textContent = "✅ Correct!";
    score++;
  } else {
    e.target.classList.add("wrong");
    feedbackEl.textContent = "❌ Wrong!";
  }

  Array.from(answerButtons.children).forEach((li, idx) => {
    const btn = li.firstChild;
    if (idx === correct) btn.classList.add("correct");
    btn.disabled = true;
  });

  nextBtn.classList.remove("hidden");
}

function handleNext() {
  currentIndex++;
  if (currentIndex < questions.length) {
    showQuestion();
    startTimer();
  } else {
    endQuiz();
  }
}

function startTimer() {
  timeLeft = 30;
  timerEl.textContent = `Time: ${timeLeft}s`;
  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `Time: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      handleNext();
    }
  }, 1000);
}

function endQuiz() {
  clearInterval(timer);
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");
  resultText.textContent = `Quiz Complete! You scored ${score} out of ${questions.length}`;
}

startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", handleNext);
retryBtn.addEventListener("click", startQuiz);
nextTestBtn.addEventListener("click", () => {
  resultScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");
});
