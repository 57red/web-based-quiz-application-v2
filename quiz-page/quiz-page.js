const nextBtn = document.getElementById("next-btn");
const backBtn = document.getElementById("back-btn");

let currentQuestion = 1;
let score = 0;

// arr of questions and selected answer
let answerArr = [];
let questionArr = [];

// show next question
function showNextQuestion() {
  const selectedAnswer = document.querySelector(
    `input[name="q${currentQuestion}"]:checked`
  );

  // name of the answer and question
  let answer = selectedAnswer.id;
  let question = document
    .getElementById(`question${currentQuestion}`)
    .getElementsByTagName("p")[0].innerText;

  // checks the answer if it's correct
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

  answerArr.push(answer);

  if (selectedAnswer) {
    // console.log("Selected Answer ID:", selectedAnswer.id);
    console.log("Question: ", question);
    console.log("Selected Answer Text:", answer);
    console.log("Arr of answers: ", answerArr);
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

  // remove the answer from answerArr when back button is pressed
  answerArr.pop();
  console.log("Arr of answers: ", answerArr);
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
  document.getElementById("result-container").style.display = "block";
  document.getElementById("result").innerText = score;
}
