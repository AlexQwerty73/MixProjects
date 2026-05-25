/* ══════════════════════════════════════════════
   assets.js — image and audio loading.
   Defines IMG (all sprites) and SFX (all sounds),
   plus the beep() helper for fire-and-forget audio.
   Depends on: nothing (no other module required).
══════════════════════════════════════════════ */

// ── Sprite images ────────────────────────────
// Images start loading immediately; naturalWidth / naturalHeight
// become available once each file finishes loading.
const IMG = {
    bg:    _img('img/back.png'),       // scrolling sky background
    bird:  _img('img/bird.png'),       // player bird sprite
    pipeU: _img('img/pipeUp.png'),     // top pipe (drawn above the gap)
    pipeD: _img('img/pipeBottom.png'), // bottom pipe (drawn below the gap)
    road:  _img('img/road.png'),       // ground strip
};

// ── Sound effects ────────────────────────────
const SFX = {
    fly:   new Audio('audio/fly.mp3'),   // plays on every flap
    point: new Audio('audio/score.mp3'), // plays when a pipe is cleared
};

// ── Helpers ──────────────────────────────────

/** Create and return a new Image with the given src. */
function _img(src) {
    const i = new Image();
    i.src = src;
    return i;
}

/**
 * Play a sound effect without interrupting any instance already playing.
 * Cloning the node creates an independent audio stream each call.
 * Wrapped in try/catch because autoplay may be blocked by the browser.
 *
 * @param {HTMLAudioElement} sfx  One of the SFX entries above.
 */
function beep(sfx) {
    try { sfx.cloneNode().play(); } catch (_) { /* autoplay blocked — silence */ }
}
