// ── Theme switcher ────────────────────────
const themeTrigger  = document.getElementById('theme-trigger');
const themeDropdown = document.getElementById('theme-dropdown');
const themeOptions  = document.querySelectorAll('.theme-option');

themeTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    themeDropdown.classList.toggle('open');
});

document.addEventListener('click', () => themeDropdown.classList.remove('open'));

themeOptions.forEach(opt => {
    opt.addEventListener('click', () => {
        const theme = opt.dataset.theme;

        // Активна опція
        themeOptions.forEach(o => o.classList.remove('active'));
        opt.classList.add('active');

        // Застосовуємо тему через data-атрибут
        document.body.dataset.theme = theme;

        themeDropdown.classList.remove('open');
    });
});

// ── Константи ──────────────────────────────
const CHOICES = ['rock', 'paper', 'scissors'];

// Що кого б'є
const BEATS = {
    rock:     'scissors',
    paper:    'rock',
    scissors: 'paper',
};

// Шляхи до зображень
const IMG = {
    rock:     'img/rock.png',
    paper:    'img/paper.png',
    scissors: 'img/Scissors.png',
    idle:     'img/kulak.png',
};

// ── DOM ────────────────────────────────────
const arena       = document.getElementById('arena');
const playerImg   = document.getElementById('player-img');
const aiImg       = document.getElementById('ai-img');
const resultText  = document.getElementById('result-text');
const scorePlayer = document.getElementById('score-player');
const scoreAI     = document.getElementById('score-ai');
const resetBtn    = document.getElementById('reset-btn');

let scores = { player: 0, ai: 0 };

// ── Логіка ─────────────────────────────────
function play(playerChoice) {
    const aiChoice = CHOICES[Math.floor(Math.random() * 3)];

    // Оновлюємо зображення
    playerImg.src = IMG[playerChoice];
    aiImg.src     = IMG[aiChoice];

    // Анімація "shake"
    triggerShake(playerImg);
    triggerShake(aiImg);

    // Визначаємо результат
    let outcome, label;

    if (playerChoice === aiChoice) {
        outcome = 'draw';
        label   = 'Draw';
    } else if (BEATS[playerChoice] === aiChoice) {
        outcome = 'win';
        label   = 'You win!';
        scores.player++;
        updateScore(scorePlayer);
    } else {
        outcome = 'lose';
        label   = 'AI wins';
        scores.ai++;
        updateScore(scoreAI);
    }

    // Відображаємо результат
    resultText.textContent = label;
    resultText.className   = outcome;
    arena.dataset.result   = outcome;
}

// ── Анімація рахунку ───────────────────────
function updateScore(el) {
    el.textContent = el === scorePlayer ? scores.player : scores.ai;
    el.classList.remove('bump');
    // reflow trick щоб перезапустити анімацію
    void el.offsetWidth;
    el.classList.add('bump');
}

// ── Анімація руху ──────────────────────────
function triggerShake(img) {
    img.classList.remove('shake');
    void img.offsetWidth;
    img.classList.add('shake');
    img.addEventListener('animationend', () => img.classList.remove('shake'), { once: true });
}

// ── Скидання ──────────────────────────────
function reset() {
    scores = { player: 0, ai: 0 };
    scorePlayer.textContent = 0;
    scoreAI.textContent     = 0;
    playerImg.src           = IMG.idle;
    aiImg.src               = IMG.idle;
    resultText.textContent  = '?';
    resultText.className    = '';
    delete arena.dataset.result;
}

// ── Events ────────────────────────────────
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', () => play(btn.dataset.choice));
});

resetBtn.addEventListener('click', reset);
