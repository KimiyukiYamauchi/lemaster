let questions = [
  { question: "xは10以上", answer: ["x >= 10"], hint: "「以上」は >= を使用します。" },
  { question: "xは10以下", answer: ["x <= 10"], hint: "「以下」は <= を使用します。" },
  { question: "xは10を超える", answer: ["x > 10"], hint: "「を超える」は > を使用します。" },
  { question: "xは10未満", answer: ["x < 10"], hint: "「未満」は < を使用します。" },
  { question: "xは10に等しい", answer: ["x == 10"], hint: "「等しい」は == を使用します。" },
  { question: "xは10に等しくない", answer: ["x != 10", "x <> 10"], hint: "「等しくない」は != または <> を使用します。" },
  { question: "xは10以上かつ20以下", answer: ["x >= 10 && x <= 20"], hint: "&&(かつ(and)の意味)を使用します" },
  { question: "xは10以下または20以上", answer: ["x <= 10 || x >= 20"], hint: "||(または(or)の意味)を使用します" },
  { question: "xは10より大きいかつ20より小さい", answer: ["x > 10 && x < 20"], hint: "&&(かつ(and)の意味)を使用します" },
  { question: "xは10未満または20を越える", answer: ["x < 10 || x > 20"], hint: "||(または(or)の意味)を使用します" },
  // 他の問題も追加できます
];


let currentQuestion = 0;
let remainingQuestions = [...questions]; // 出題されていない問題リスト
let correctCount = 0; // 正解数
let questionCount = 0; // 出題数

function displayQuestion() {
  document.getElementById("question").innerText = "問題: " + questions[currentQuestion].question;
  document.getElementById("answer").value = "";
  document.getElementById("result").innerText = "";
  document.getElementById("result").style.color = ""; // 色をリセット
  document.getElementById("hint").style.display = "none";
}

function checkAnswer() {
  let userAnswer = document.getElementById("answer").value.replace(/\s+/g, '');

  // 正解パターンのいずれかと一致するか確認
  let isCorrect = questions[currentQuestion].answer.some(correctAnswer => 
    userAnswer === correctAnswer.replace(/\s+/g, '')
  );

  let resultElement = document.getElementById("result");
  if (isCorrect) {
      document.getElementById("result").innerText = "正解！";
      resultElement.style.color = "blue";
      correctCount++;
  } else {
      document.getElementById("result").innerText = "不正解です。";
      resultElement.style.color = "red";
  }

  questionCount++;
  updateScore();
}

function nextQuestion() {
  // すべての問題が出題されたら、リセットして再度ランダムに出題できるようにする
  if (remainingQuestions.length === 0) {
    remainingQuestions = [...questions]; // 全問題を再セット
  }

  // ランダムに次の問題を選ぶ
  let randomIndex = Math.floor(Math.random() * remainingQuestions.length);
  let question = remainingQuestions[randomIndex];

  // 現在の問題に設定
  currentQuestion = questions.indexOf(question);

  // 選んだ問題を remainingQuestions から削除
  remainingQuestions.splice(randomIndex, 1);

  displayQuestion();

  // 入力フィールドにフォーカスを移動
  document.getElementById("answer").focus();
}

function showHint() {
  document.getElementById("hint").innerText = questions[currentQuestion].hint;
  document.getElementById("hint").style.display = "block";
}

function updateScore() {
  document.getElementById("score").innerText = `${correctCount}問正解/${questionCount}問中`;
}

// エンターキーでチェックを実行
document.getElementById("answer").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
      checkAnswer();
  }
});

// 最初にランダムな問題を出題
window.onload = nextQuestion;
