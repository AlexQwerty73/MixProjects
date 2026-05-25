/* ══════════════════════════════════════════════
   game.js — game state, physics update, collision
             detection, pipe management, and the
             player actions (flap / pause).
   Depends on: config.js, assets.js
══════════════════════════════════════════════ */

// ── State machine ────────────────────────────
const S = {
    IDLE:  0,  // waiting for first tap — bird bobs in place
    PLAY:  1,  // active gameplay
    DEAD:  2,  // bird died — falling animation + game-over overlay
    PAUSE: 3,  // game frozen, pause panel visible
};
let state = S.IDLE;

// ── Mutable game objects ─────────────────────
let bird;       // { x, y, vy, rot } — player bird
let pipes;      // array of pipe pairs: { x, gapTop, gapBottom, scored }
let score;      // pipes cleared this run
let best;       // all-time high score (persisted in localStorage)
let spawnTimer; // frame counter since last pipe was spawned

// ── Reset to a fresh game, entering IDLE ─────
function newGame() {
    bird       = { x: 60, y: Math.round(H * 0.47), vy: 0, rot: 0 };
    pipes      = [];
    score      = 0;
    spawnTimer = 0;
    state      = S.IDLE;
}

// ── Player actions ───────────────────────────

/**
 * Flap: context-sensitive tap / click / key handler.
 *   IDLE  → start game + immediately flap
 *   PLAY  → flap upward
 *   DEAD  → restart (go back to IDLE)
 */
function flap() {
    if      (state === S.IDLE) { state = S.PLAY; bird.vy = JUMP; beep(SFX.fly); }
    else if (state === S.PLAY) { bird.vy = JUMP; beep(SFX.fly); }
    else if (state === S.DEAD) { newGame(); }
}

/** Toggle pause on / off during active gameplay. */
function togglePause() {
    if      (state === S.PLAY)  state = S.PAUSE;
    else if (state === S.PAUSE) state = S.PLAY;
}

// ── Pipe management ──────────────────────────

/** Spawn a new pipe pair at the right edge with a random gap position. */
function spawnPipe() {
    const gapTop = PIPE_MIN + Math.random() * (PIPE_MAX - PIPE_MIN);
    pipes.push({
        x: W,
        gapTop,
        gapBottom: gapTop + PIPE_GAP,
        scored: false,
    });
}

// ── Collision detection ──────────────────────

/**
 * Returns true if the bird overlaps a pipe, the ground, or the ceiling.
 * The hitbox is inset by 4 px on each side for a forgiving feel.
 */
function hits() {
    const bw = (IMG.bird.naturalWidth  || 34) - 8;
    const bh = (IMG.bird.naturalHeight || 24) - 8;
    const bx = bird.x + 4;
    const by = bird.y + 4;
    const pw = IMG.pipeU.naturalWidth || 52;

    // Ground and ceiling
    if (by + bh >= GROUND_Y || by <= 0) return true;

    // Each pipe pair
    for (const p of pipes) {
        if (bx + bw > p.x && bx < p.x + pw) {
            if (by < p.gapTop || by + bh > p.gapBottom) return true;
        }
    }
    return false;
}

// ── Per-frame update ─────────────────────────

/**
 * Advance the simulation by one frame.
 * Called unconditionally from the main loop so the bird
 * can animate even in IDLE / DEAD states.
 */
function update() {

    // IDLE: gentle up-down bob, no physics
    if (state === S.IDLE) {
        bird.y   = Math.round(H * 0.47) + Math.sin(Date.now() / 400) * 8;
        bird.rot = 0;
        return;
    }

    // DEAD: bird falls and rotates nose-down until it hits the ground
    if (state === S.DEAD) {
        bird.vy += GRAVITY * 1.2;
        bird.y   = Math.min(
            bird.y + bird.vy,
            GROUND_Y - (IMG.bird.naturalHeight || 24)
        );
        bird.rot = Math.min(bird.rot + 7, 90);
        return;
    }

    // PAUSE: everything frozen — nothing to update
    if (state !== S.PLAY) return;

    // ── Active gameplay ──────────────────────

    // Apply gravity and integrate velocity
    bird.vy += GRAVITY;
    bird.y  += bird.vy;

    // Smooth tilt: negative vy → nose up; positive → nose down
    const targetRot = Math.min(Math.max(bird.vy * 5, -25), 80);
    bird.rot += (targetRot - bird.rot) * 0.15;

    // Spawn pipes on interval
    spawnTimer++;
    if (spawnTimer >= PIPE_INT) { spawnPipe(); spawnTimer = 0; }

    // Move pipes, score, and cull off-screen ones
    const pw = IMG.pipeU.naturalWidth || 52;
    for (let i = pipes.length - 1; i >= 0; i--) {
        pipes[i].x -= PIPE_SPD;

        // Award point once the bird fully clears a pipe pair
        if (!pipes[i].scored && pipes[i].x + pw < bird.x) {
            pipes[i].scored = true;
            score++;
            if (score > best) {
                best = score;
                localStorage.setItem('flappy_best', best);
            }
            beep(SFX.point);
        }

        if (pipes[i].x < -pw) pipes.splice(i, 1);
    }

    // Collision check — gives the bird a tiny upward bounce on death
    if (hits()) { state = S.DEAD; bird.vy = -5; }
}
