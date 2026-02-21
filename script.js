let questions = [];
let currentQuestionIndex = 0;
let score = 0;

// This fetches your 1000 questions
async function loadQuestions() {
    const response = await fetch('questions.json');
    questions = await response.json();
    showQuestion();
}

function showQuestion() {
    const q = questions[currentQuestionIndex];
    document.getElementById("question-text").innerText = q.question;
    const optionsGrid = document.getElementById("options-grid");
    optionsGrid.innerHTML = "";

    q.options.forEach(opt => {
        const btn = document.createElement("button");
        btn.classList.add("option-btn");
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(btn, opt, q.answer);
        optionsGrid.appendChild(btn);
    });
}

function checkAnswer(btn, selected, correct) {
    if (selected === correct) {
        btn.classList.add("correct");
        score++;
    } else {
        btn.classList.add("wrong");
    }
    document.getElementById("score").innerText = score;
    document.getElementById("total-seen").innerText = currentQuestionIndex + 1;
    document.getElementById("next-btn").classList.remove("hidden");
    
    // Update progress
    document.getElementById("progress-bar").style.width = `${((currentQuestionIndex+1)/questions.length)*100}%`;
}

document.getElementById("next-btn").onclick = () => {
    currentQuestionIndex++;
    document.getElementById("next-btn").classList.add("hidden");
    showQuestion();
};

loadQuestions();
