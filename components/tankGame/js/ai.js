// ── ai.js — simple P2 bot ───────────────────────────────
//
//  Logic (three steps each frame):
//    1. Stuck detection — if AI hasn't moved for 30 frames,
//       pick a random direction and follow it for ~25-50 frames.
//    2. Move toward enemy — pick the axis with larger distance
//       and call tryMove in that direction.
//    3. Shoot — fire when the enemy is roughly in front of the AI
//       (within one tank-width of the aim line).

let aiEnabled = false;

function toggleAI() {
    aiEnabled = !aiEnabled;
}

// Internal state — reset every round so the bot starts fresh
const aiState = {
    stuckTimer:  0,
    lastX:       0,
    lastY:       0,
    forcedDir:   null,   // random escape direction while unstucking
    forcedTimer: 0,      // frames left on forced direction
};

function resetAIState() {
    aiState.stuckTimer  = 0;
    aiState.lastX       = 0;
    aiState.lastY       = 0;
    aiState.forcedDir   = null;
    aiState.forcedTimer = 0;
}

// ── Main AI tick (called from update() instead of movePlayer) ──
function aiUpdate(ai, enemy) {

    // 1. Stuck detection ─────────────────────────────────
    const moved = Math.abs(ai.x - aiState.lastX) + Math.abs(ai.y - aiState.lastY);
    aiState.stuckTimer = moved < 0.5 ? aiState.stuckTimer + 1 : 0;
    aiState.lastX = ai.x;
    aiState.lastY = ai.y;

    if (aiState.stuckTimer > 30 && aiState.forcedTimer <= 0) {
        const dirs = ['up', 'down', 'left', 'right'];
        aiState.forcedDir   = dirs[Math.floor(Math.random() * 4)];
        aiState.forcedTimer = 25 + Math.floor(Math.random() * 30);
        aiState.stuckTimer  = 0;
    }

    // Follow forced direction while escaping a corner
    if (aiState.forcedTimer > 0) {
        aiState.forcedTimer--;
        _moveDir(ai, aiState.forcedDir);
        return;
    }

    // 2. Move toward enemy ────────────────────────────────
    const dx  = (enemy.x + enemy.size / 2) - (ai.x + ai.size / 2);
    const dy  = (enemy.y + enemy.size / 2) - (ai.y + ai.size / 2);
    const dir = Math.abs(dx) >= Math.abs(dy)
        ? (dx > 0 ? 'right' : 'left')
        : (dy > 0 ? 'down'  : 'up');

    _moveDir(ai, dir);

    // 3. Shoot when lined up ──────────────────────────────
    const tol = ai.size * 1.4;   // lateral tolerance (pixels)
    const aligned =
        (dir === 'right' && dx > 0 && Math.abs(dy) < tol) ||
        (dir === 'left'  && dx < 0 && Math.abs(dy) < tol) ||
        (dir === 'down'  && dy > 0 && Math.abs(dx) < tol) ||
        (dir === 'up'    && dy < 0 && Math.abs(dx) < tol);

    if (aligned && ai.cooldown === 0) fireBullet(ai);
}

// Set direction and call tryMove
function _moveDir(ai, dir) {
    ai.dir = dir;
    const v = { up:[0,-1], down:[0,1], left:[-1,0], right:[1,0] }[dir];
    tryMove(ai, v[0] * ai.spd, v[1] * ai.spd);
}
