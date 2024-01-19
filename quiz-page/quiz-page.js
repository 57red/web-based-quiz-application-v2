const nextBtn = document.getElementById("next-btn");
const backBtn = document.getElementById("back-btn");

let currentQuestion = 1;
let score = 0;

// arr of questions and selected answer
let answerArr = [];
let questionArr = [];

function showNextQuestion() {
  const selectedAnswer = document.querySelector(
    `input[name="q${currentQuestion}"]:checked`
  );

  checkAnswer();

  document
    .getElementById(`question${currentQuestion}`)
    .classList.remove("active");
  currentQuestion++;

  if (currentQuestion > 3) {
    showResults();
  } else {
    document
      .getElementById(`question${currentQuestion}`)
      .classList.add("active");
  }

  let answer = selectedAnswer.id;

  if (selectedAnswer) {
    // console.log("Selected Answer ID:", selectedAnswer.id);
    console.log("Selected Answer Text:", answer);
  } else {
    console.log("No answer selected for the current question.");
  }
}

function showPreviousQuestion() {
  --score;

  document
    .getElementById(`question${currentQuestion}`)
    .classList.remove("active");
  currentQuestion--;

  if (currentQuestion < 1) {
    currentQuestion = 1;
  }

  document.getElementById(`question${currentQuestion}`).classList.add("active");
}

function checkAnswer() {
  const selectedAnswer = document.querySelector(
    `input[name="q${currentQuestion}"]:checked`
  );

  if (score < 0) {
    score = 0;
  }

  if (selectedAnswer && selectedAnswer.value === "Correct") {
    score++;
  }
}

function showResults() {
  checkAnswer();
  document.getElementById("result-container").style.display = "block";
  document.getElementById("result").innerText = score;
}
