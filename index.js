const data = [
    {
        "question": "What country has the highest life expectancy?",
        "a": {"option": "Hong Kong", "correct": true, "choice": false},
        "b": {"option": "Japan", "correct": false, "choice": false},
        "c": {"option": "USA", "correct": false, "choice": false},
        "d": {"option": "India", "correct": false, "choice": false}
    },
    {
        "question": "What disease commonly spread on pirate ships?",
        "a": {"option": "Jaundice", "correct": false, "choice": false},
        "b": {"option": "Corona", "correct": false, "choice": false},
        "c": {"option": "Black Plague", "correct": false, "choice": false},
        "d": {"option": "Scurvy", "correct": true, "choice": false}
    },
    {
        "question": "What artist has the most streams on Spotify?",
        "a": {"option": "Michael Jackson", "correct": false, "choice": false},
        "b": {"option": "Drake", "correct": true, "choice": false},
        "c": {"option": "Justin Bieber", "correct": false, "choice": false},
        "d": {"option": "Shakira", "correct": false, "choice": false}
    },
    {
        "question": "What shoe brand makes the \"Mexico 66\"?",
        "a": {"option": "Asics", "correct": true, "choice": false},
        "b": {"option": "Nike", "correct": false, "choice": false},
        "c": {"option": "Adidas", "correct": false, "choice": false},
        "d": {"option": "Puma", "correct": false, "choice": false}
    }
];

let currentQuestionIndex = -1;

function displayQuestion(index) {
    const question = data[index];
    const questionHTML = `
        <span class='counter'>${index + 1}/${data.length}</span>
        <p id="ques">${question.question}</p>
        <ol>
            <li><input type="radio" name="answer" value="a">${question.a.option}</li>
            <li><input type="radio" name="answer" value="b">${question.b.option}</li>
            <li><input type="radio" name="answer" value="c">${question.c.option}</li>
            <li><input type="radio" name="answer" value="d">${question.d.option}</li>
        </ol>
    `;
    document.getElementById('questionField').innerHTML = questionHTML;
}

function showNextQuestion() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (!selectedOption && currentQuestionIndex >= 0) {
        alert('Please select an answer before moving to the next question.');
        return;
    }

    if (selectedOption) {
        const choice = selectedOption.value;
        data[currentQuestionIndex][choice].choice = true;
    }

    if (currentQuestionIndex + 1 < data.length) {
        currentQuestionIndex++;
        displayQuestion(currentQuestionIndex);
        if (currentQuestionIndex === data.length - 1) {
            document.getElementById('next').innerText = "Submit";
            document.getElementById('next').removeEventListener('click', showNextQuestion);
            document.getElementById('next').addEventListener('click', onSubmit);
        }
    }
}

function showPreviousQuestion() {
    if (currentQuestionIndex - 1 >= 0) {
        currentQuestionIndex--;
        displayQuestion(currentQuestionIndex);
        document.getElementById('next').innerText = "Next";
        document.getElementById('next').removeEventListener('click', onSubmit);
        document.getElementById('next').addEventListener('click', showNextQuestion);
    }
}

function onSubmit() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (!selectedOption) {
        alert('Please select an answer before submitting.');
        return;
    }

    const choice = selectedOption.value;
    data[currentQuestionIndex][choice].choice = true;

    let score = 0;
    data.forEach((question) => {
        for (const key in question) {
            if (question[key].correct && question[key].choice) {
                score++;
            }
        }
    });

    alert(`You scored ${score} out of ${data.length}!`);
}

document.getElementById('prev').addEventListener('click', showPreviousQuestion);
document.getElementById('next').addEventListener('click', showNextQuestion);

function initializeQuiz() {
    showNextQuestion();
}

initializeQuiz();
