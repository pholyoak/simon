const btnColors = ['green', 'red', 'yellow', 'blue'];
let pattern = [];
let userPattern = [];
let level = 0;
let message = document.getElementById('message');
let levelDisplay = document.getElementById('level');

function flash(btn) {
    document.querySelector(`.${btn}`).classList.add('flash');
    setTimeout(() => {
        document.querySelector(`.${btn}`).classList.remove('flash');
    }, 500);
}

function generatePattern() {
    let randomIndex = Math.floor(Math.random() * 4);
    pattern.push(btnColors[randomIndex]);
}

function playPattern() {
    for (let i = 0; i < pattern.length; i++) {
        setTimeout(() => {
            flash(pattern[i]);
        }, 1000 * i);
    }
    setTimeout(() => {
        message.innerText = "Your turn!";
    }, 1000 * pattern.length);
}

function checkPattern() {
    for (let i = 0; i < userPattern.length; i++) {
        if (userPattern[i] !== pattern[i]) {
            saveScore();
            alert("Game over! Try again.");
            resetGame();
            return;
        }
    }
    if (userPattern.length === pattern.length) {
        message.innerText = "Correct!";
        userPattern = [];
        level++;
        levelDisplay.innerText = `${level}`;
        generatePattern();
        setTimeout(() => {
            playPattern();
        }, 1000);
    }
}

function startGame() {
    generatePattern();
    playPattern();
}

function resetGame() {
    level = 0;
    pattern = [];
    userPattern = [];
    levelDisplay.innerText = `Score: ${level}`;
    message.innerText = "Click 'Start' to begin";
}

document.getElementById('start').addEventListener('click', () => {
    startGame();
});

document.getElementById('reset').addEventListener('click', () => {
    resetGame();
});

document.querySelectorAll('.gameButton').forEach((btn) => {
    btn.addEventListener('click', () => {
        let color = btn.classList[1];
        userPattern.push(color);
        flash(color);
        checkPattern();
    });
});

let playerName = document.getElementById('playerName');
playerName.innerText = localStorage.getItem('userName') ?? 'Mystery player';

function saveScore(score) {
    const userName = localStorage.getItem('userName');
    let scores = [];
    const scoresText = localStorage.getItem('scores');
    if (scoresText) {
        scores = JSON.parse(scoresText);
    }
    scores = this.updateScores(userName, score, scores);

    localStorage.setItem('scores', JSON.stringify(scores));
}

function updateScores(userName, score, scores) {
    const date = new Date().toLocaleDateString();
    const newScore = { name: userName, score: score, date: date };

    let found = false;
    for (const [i, prevScore] of scores.entries()) {
        if (score > prevScore.score) {
            scores.splice(i, 0, newScore);
            found = true;
            break;
        }
    }

    if (!found) {
        scores.push(newScore);
    }

    if (scores.length > 10) {
        scores.length = 10;
    }

    return scores;
}
