let questions = [
  { question: "xは10以上", answer: "x >= 10" },
  { question: "xは10以下", answer: "x <= 10" },
  { question: "xは10を超える", answer: "x > 10" },
  { question: "xは10未満", answer: "x < 10" },
  // 他の問題も追加できます
];

let currentQuestion = 0;

function displayQuestion() {
  document.getElementById("question").innerText = "問題: " + questions[currentQuestion].question;
  document.getElementById("answer").value = "";
  document.getElementById("result").innerText = "";
  document.getElementById("hint").style.display = "none";
}

function checkAnswer() {
  let userAnswer = document.getElementById("answer").value.replace(/\s+/g, '');
  let correctAnswer = questions[currentQuestion].answer.replace(/\s+/g, '');

  if (userAnswer === correctAnswer) {
      document.getElementById("result").innerText = "正解！";
  } else {
      document.getElementById("result").innerText = "不正解です。";
  }
}

function nextQuestion() {
  currentQuestion = (currentQuestion + 1) % questions.length;
  displayQuestion();
}

function showHint() {
  document.getElementById("hint").style.display = "block";
}

window.onload = displayQuestion;
