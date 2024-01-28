// Summary Pane
const summaryPane = document.getElementById("summary-pane");

// Buttons
const nextBtn = document.getElementById("next-btn");
const backBtn = document.getElementById("back-btn");
const flagBtn = document.getElementById("flag-btn");

// Quiz Container
const quizContainer = document.getElementById("quiz-container");

// Quiz Button Section
const quizBtnSection = document.getElementById("button-section");

let currentQuestion = 1;
let score = 0;

// arr of questions and selected answer
let answerArr = [];
let questionArr = [];

backBtn.hidden = true;

// show next question
function showNextQuestion() {
  const selectedAnswer = document.querySelector(
    `input[name="q${currentQuestion}"]:checked`
  );

  // disable back button at question 1
  if (currentQuestion === 1) {
    backBtn.hidden = false;
  }

  if (selectedAnswer) {
    let answer = selectedAnswer.id;
    answerArr.push(answer);
  } else if (!selectedAnswer) {
    answerArr.push("NO ANSWER");
  }

  // to questionArr will display the question @ summary pane
  let question = document
    .getElementById(`question${currentQuestion}`)
    .getElementsByTagName("p")[0].innerText;

  questionArr.push(question);

  // checks the answer if it's correct
  checkAnswer();

  document
    .getElementById(`question${currentQuestion}`)
    .classList.remove("active");

  currentQuestion++;

  if (currentQuestion > 10) {
    showSummaryPane();
  } else {
    document
      .getElementById(`question${currentQuestion}`)
      .classList.add("active");
  }

  console.log(score);
}

// show previous question
function showPreviousQuestion() {
  const selectedAnswer = document.querySelector(
    `input[name="q${currentQuestion}"]:checked`
  );

  if (selectedAnswer) {
    score--;
  } else if (!selectedAnswer) {
    score;
  }

  document
    .getElementById(`question${currentQuestion}`)
    .classList.remove("active");

  currentQuestion--;

  // disable back button at question 1
  if (currentQuestion === 1) {
    backBtn.hidden = true;
  }

  // to avoid negatives
  if (currentQuestion < 1) {
    currentQuestion = 1;
  }

  document.getElementById(`question${currentQuestion}`).classList.add("active");

  // remove the answer from answerArr when back button is pressed
  answerArr.pop();
  questionArr.pop();
  console.log(score);
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
  quizContainer.style.display = "none";

  document.getElementById("summary-pane").style.display = "block";
  backBtn.hidden = true;
  // flagBtn.hidden = true;
  nextBtn.hidden = true;

  summaryPane.innerHTML = `<h1 id="summary-header">Summary</h1>`;

  // summary submit button
  const submitButton = document.createElement("button");
  submitButton.innerHTML = "Submit";
  submitButton.classList.add("summary-submit-btn");
  submitButton.onclick = function () {
    document.getElementById("summary-pane").style.display = "none";
    showResults();
  };

  // summary back to question button
  const backToQuestionsBtn = document.createElement("button");
  backToQuestionsBtn.innerHTML = "Back To Questions";

  // back to questions onclick event
  backToQuestionsBtn.onclick = function () {
    summaryPane.style.display = "none";
    currentQuestion--;
    // score--;s
    answerArr.pop();
    questionArr.pop();

    quizContainer.style.display = "block";
    document
      .getElementById(`question${currentQuestion}`)
      .classList.add("active");

    nextBtn.style.display = "block";
    backBtn.style.display = "block";
  };

  // summary button container
  const divButton = document.createElement("div");

  divButton.classList.add("submit-div");
  divButton.appendChild(submitButton);
  divButton.appendChild(backToQuestionsBtn);

  questionArr.forEach((question, index) => {
    const questionElement = document.createElement("div");
    questionElement.textContent = question;
    questionElement.classList.add("summary-question");
    summaryPane.appendChild(questionElement);

    // checks if there's answer
    if (answerArr && answerArr[index]) {
      const answerElement = document.createElement("div");
      answerElement.textContent = `Your Answer: ${answerArr[index]}`;
      answerElement.classList.add("summary-answer");
      summaryPane.appendChild(answerElement);
    }
  });

  // creates submit button
  summaryPane.appendChild(divButton);
}

// show results
function showResults() {
  // gets total grade of quiz
  let grade = (score * 100) / 10;

  document.getElementById("result-container").style.display = "block";
  document.getElementById("result").innerText = score;
  document.getElementById("grade").innerText = grade;
}
