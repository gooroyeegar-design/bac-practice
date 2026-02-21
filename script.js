let questions = [];
let current = 0;

fetch("questions.json")
.then(res => res.json())
.then(data => {
    questions = data;
    nextQuestion();
});

function nextQuestion() {
    current = Math.floor(Math.random() * questions.length);

    document.getElementById("subject").textContent =
        "المادة: " + questions[current].subject;

    document.getElementById("question").textContent =
        questions[current].question;

    document.getElementById("answer").textContent = "";
}

function showAnswer() {
    document.getElementById("answer").textContent =
        "الإجابة: " + questions[current].answer;
}
