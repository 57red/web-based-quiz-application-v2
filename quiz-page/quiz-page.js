// Summary Pane
const summaryPane = document.getElementById("summary-pane");

// Buttons
const nextBtn = document.getElementById("next-btn");
const backBtn = document.getElementById("back-btn");
const flagBtn = document.getElementById("flag-btn");

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

  answerArr.push(answer);
  questionArr.push(question);

  // checks the answer if it's correct
  checkAnswer();

  document
    .getElementById(`question${currentQuestion}`)
    .classList.remove("active");

  currentQuestion++;

  if (currentQuestion > 3) {
    showSummaryPane();
    // showResults();
  } else {
    document
      .getElementById(`question${currentQuestion}`)
      .classList.add("active");
  }

  // if (selectedAnswer) {
  //   // console.log("Selected Answer ID:", selectedAnswer.id);
  //   console.log("Question: ", question);
  //   console.log("Arr of questions:", questionArr);
  //   console.log("Selected Answer Text:", answer);
  //   console.log("Arr of answers: ", answerArr);
  // } else {
  //   console.log("No answer selected for the current question.");
  // }
}

// show previous question
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
  questionArr.pop();
  console.log("Arr; of answers: ", answerArr);
}

// check answer
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

// show summary pane
function showSummaryPane() {
  document.getElementById("summary-pane").style.display = "block";
  backBtn.hidden = true;
  flagBtn.hidden = true;
  nextBtn.hidden = true;

  summaryPane.innerHTML = `<h2>Summary</h2>`;

  const submitButton = document.createElement("button");
  submitButton.innerHTML = "Submit";
  submitButton.onclick = function () {
    document.getElementById("summary-pane").style.display = "none";
    showResults();
  };

  questionArr.forEach((question, index) => {
    const questionElement = document.createElement("div");
    questionElement.textContent = question;
    summaryPane.appendChild(questionElement);

    // checks if there's answer
    if (answerArr && answerArr[index]) {
      const answerElement = document.createElement("div");
      answerElement.textContent = `Answer: ${answerArr[index]}`;
      summaryPane.appendChild(answerElement);
    }
  });

  // creates submit button
  summaryPane.appendChild(submitButton);
}

// show results
function showResults() {
  // gets total grade of quiz
  let grade = (score * 100) / 3;

  document.getElementById("result-container").style.display = "block";
  document.getElementById("result").innerText = score;
  document.getElementById("grade").innerText = grade;
}
