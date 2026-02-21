let questions = [];
let currentQuestionIndex = 0;
let score = 0;

async function loadQuestions() {
    try {
        const response = await fetch('questions.json');
        if (!response.ok) throw new Error("File not found");
        questions = await response.json();
        if (questions.length === 0) throw new Error("JSON is empty");
        showQuestion();
    } catch (error) {
        document.getElementById("question-text").innerText = "❌ Error: Make sure questions.json exists and is valid!";
        console.error(error);
    }
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
    const allBtns = document.querySelectorAll('.option-btn');
    allBtns.forEach(b => b.disabled = true); // Prevent double clicking

    if (selected === correct) {
        btn.classList.add("correct");
        score++;
    } else {
        btn.classList.add("wrong");
        // Show the correct one in green
        allBtns.forEach(b => {
            if (b.innerText === correct) b.classList.add("correct");
        });
    }
    
    document.getElementById("score").innerText = score;
    document.getElementById("total-seen").innerText = currentQuestionIndex + 1;
    document.getElementById("next-btn").classList.remove("hidden");
    
    let progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    document.getElementById("progress-bar").style.width = `${progress}%`;
}

document.getElementById("next-btn").onclick = () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        document.getElementById("next-btn").classList.add("hidden");
        showQuestion();
    } else {
        document.getElementById("quiz-box").innerHTML = `<h2>🎉 انتهى التحدي! النتيجة: ${score}/${questions.length}</h2>`;
    }
};

loadQuestions();
