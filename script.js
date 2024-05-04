document.getElementById('next').addEventListener('click', nextQuestion);
let currentQuestionIndex = 0;
let questions = [];

// JSON dosyasını yükle
fetch('vocabulary.json')
    .then(response => response.json())
    .then(data => {
        questions = data.map(item => ({
            question: `What does '${item.word}' mean?`,
            options: [item.meaning, ...item.synonyms],
            answer: item.meaning
        }));
        loadQuestion(); // İlk soruyu yükle
    })
    .catch(error => console.error('Error loading the vocabulary:', error));

function loadQuestion() {
    if (currentQuestionIndex < questions.length) {
        let currentQuestion = questions[currentQuestionIndex];
        document.getElementById('question').textContent = currentQuestion.question;
        let optionsHtml = currentQuestion.options
            .sort(() => Math.random() - 0.5) // Seçenekleri karıştır
            .map(option => `<li onclick="selectOption('${option}')">${option}</li>`)
            .join('');
        document.getElementById('options').innerHTML = optionsHtml;
    } else {
        document.getElementById('quiz-container').innerHTML = "<p>Quiz completed!</p>";
    }
}

function selectOption(selected) {
    let correct = questions[currentQuestionIndex].answer === selected;
    alert(correct ? "Correct!" : "Wrong!");
    nextQuestion();
}

function nextQuestion() {
    currentQuestionIndex++;
    loadQuestion();
}
