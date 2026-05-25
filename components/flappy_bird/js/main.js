/* ══════════════════════════════════════════════
   main.js — entry point.
   Responsibilities:
     • Wire up all input events (keyboard, mouse, touch).
     • Build the size-picker bar and handle preset changes.
     • Bootstrap the game (initGame) and run the loop.
   Depends on: config.js, assets.js, game.js, render.js
   (loaded last so all globals are already defined)
══════════════════════════════════════════════ */

// ── Input bindings ───────────────────────────

// Mouse click on the canvas — flap or dismiss overlays
canvas.addEventListener('click', flap);

// Touch support for mobile — preventDefault stops the
// browser from also firing a click event afterwards
canvas.addEventListener('touchstart', e => {
    e.preventDefault();
    flap();
}, { passive: false });

// Keyboard: Space / ArrowUp to flap; P to pause
window.addEventListener('keydown', e => {
    if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();   // prevent page scroll
        flap();
    }
    if (e.key.toLowerCase() === 'p') togglePause();
});

// ── Size picker ──────────────────────────────

let activeSize = SIZES[0]; // currently selected preset

/**
 * Inject a pill button for every size preset into #size-bar.
 * Clicking a button calls applySize() if it isn't already active.
 */
function buildSizePicker() {
    const bar = document.getElementById('size-bar');
    bar.innerHTML = '';

    SIZES.forEach(sz => {
        const btn = document.createElement('button');
        btn.className   = 'size-btn' + (sz === activeSize ? ' active' : '');
        btn.textContent = sz.label;
        btn.title       = `${sz.w} × ${sz.h} px`;

        btn.addEventListener('click', () => {
            if (sz === activeSize) return; // already selected — nothing to do

            activeSize = sz;

            // Sync active class on all buttons without rebuilding the DOM
            bar.querySelectorAll('.size-btn').forEach((b, i) => {
                b.classList.toggle('active', SIZES[i] === activeSize);
            });

            applySize(sz);
        });

        bar.appendChild(btn);
    });
}

/**
 * Resize the canvas to a preset and reset the game.
 *
 * @param {{ w: number, h: number }} sz  A SIZES entry.
 */
function applySize(sz) {
    setDimensions(sz.w, sz.h);   // config.js: update canvas + derived constants
    best = +localStorage.getItem('flappy_best') || 0;
    newGame();                    // game.js: fresh game state
}

// ── Bootstrap ────────────────────────────────

/** One-time init: read best score, build UI, apply default size. */
function initGame() {
    best = +localStorage.getItem('flappy_best') || 0;
    buildSizePicker();
    applySize(activeSize);
}

// ── Game loop ────────────────────────────────

/**
 * Core animation loop — runs at the display refresh rate.
 * update() advances physics; render() draws the frame.
 * requestAnimationFrame schedules the next tick automatically.
 */
function loop() {
    update();   // game.js
    render();   // render.js
    requestAnimationFrame(loop);
}

// ── Start ────────────────────────────────────
initGame();
loop();
