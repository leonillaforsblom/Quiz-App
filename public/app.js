const url = 'https://opentdb.com/api.php?amount=10&category=11&type=boolean';

const QnA = [];
const startBtn = document.getElementById('start');
const trueBtn = document.getElementById('btntrue');
const falseBtn = document.getElementById('btnfalse');
const nextBtn = document.getElementById('next');
nextBtn.style.display = 'none';
const questionDiv = document.getElementById('questiondiv');
const resultDiv = document.getElementById('resultdiv');
const scorediv = document.getElementById('score');

let score = 0;
let currentQuestion = 0;

async function init() {
  scorediv.innerHTML = 'Current score: ' + score;
  startBtn.style.display = 'none';
  trueBtn.classList.toggle('respVisible');
  falseBtn.classList.toggle('respVisible');

  let res = await fetch(url);
  let data = await res.json();
  let questions = data.results;

  questions.forEach(e => {
    let arr = [];
    arr.push(e.question);
    arr.push(e.correct_answer);
    QnA.push(arr);
  });
  showQuestion();
}


function showQuestion() {
  nextBtn.style.display = 'initial';
  scorediv.innerHTML = 'Current score: ' + score;
  let question = QnA[currentQuestion][0];
  let correctanswer = QnA[currentQuestion][1];
  let answer;
  questionDiv.innerHTML = question;
  nextBtn.disabled = true;

  trueBtn.onclick = () => {
    answer = 'True';
    if (answer === correctanswer) {
      resultDiv.innerText = 'Correct';
      score += 1;
    } else {
      resultDiv.innerText = 'Wrong';
    }
    falseBtn.disabled = true;
    trueBtn.disabled = true;
    nextBtn.disabled = false;
  };

  falseBtn.onclick = () => {
    answer = 'False';
    if (answer === correctanswer) {
      resultDiv.innerText = 'Correct';
      score += 1;
    } else {
      resultDiv.innerText = 'Wrong';
    }
    falseBtn.disabled = true;
    trueBtn.disabled = true;
    nextBtn.disabled = false;
  };
}

function showNext() {
  resultDiv.innerText = '';
  nextBtn.disabled = true;
  falseBtn.disabled = false;
  trueBtn.disabled = false;
  currentQuestion += 1;

  if (currentQuestion === 10) {
    falseBtn.disabled = true;
    trueBtn.disabled = true;
    questionDiv.innerHTML = 'You scored ' + score + '!';
    scorediv.innerHTML = '';
    
  } else {
    showQuestion();
  }
}
