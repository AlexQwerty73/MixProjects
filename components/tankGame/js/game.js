// ── game.js — state machine, players, round logic ───────
//
//  Scene flow:  MENU → SELECT → MAPSEL → PLAY
//

// ── Scene & score ──────────────────────────────────────
let scene = 'MENU';
let score = [0, 0];

// ── Selection state ────────────────────────────────────
const sel = {
    cursor:    [2, 2],          // selected tank index per player
    confirmed: [false, false],
};

// ── Active players (set by resetRound) ─────────────────
let p1, p2;

// ── Flash message (brief score announce) ───────────────
let flash = { text: '', timer: 0 };

// ── Player factory ─────────────────────────────────────
function makePlayer(tidx, playerKeys, startX, startDir) {
    const t = TANKS[tidx];
    return {
        x:        startX,
        y:        H / 2 - t.size / 2,
        dir:      startDir,   // 'up' | 'down' | 'left' | 'right'
        hp:       t.hp,
        maxHp:    t.hp,
        size:     t.size,
        spd:      t.speed,
        bspd:     t.bspd,
        cd:       t.cd,
        cooldown: 0,
        bullets:  [],
        keys:     playerKeys,
    };
}

// ── Round management ───────────────────────────────────
function startGame() {
    scene    = 'PLAY';
    score[0] = score[1] = 0;
    buildWalls();
    resetRound();
}

/**
 * Recreate both players at spawn positions with full HP.
 * Bullets are cleared; scores are kept.
 */
function resetRound() {
    const i1 = sel.cursor[0], i2 = sel.cursor[1];
    p1 = makePlayer(i1, K1, 60,                       'right');
    p2 = makePlayer(i2, K2, W - 60 - TANKS[i2].size, 'left');
    resetAIState();   // clear stuck-timer and forced direction
}

// ── Per-frame update ────────────────────────────────────
function update() {
    if (scene !== 'PLAY') return;

    if (flash.timer > 0) flash.timer--;

    movePlayer(p1);
    if (aiEnabled) aiUpdate(p2, p1); else movePlayer(p2);

    if (p1.cooldown > 0) p1.cooldown--;
    if (p2.cooldown > 0) p2.cooldown--;

    stepBullets(p1, p2);
    stepBullets(p2, p1);
}

/**
 * Apply movement from held keys.
 * tryMove tests axes separately → wall sliding works.
 */
function movePlayer(p) {
    const k = p.keys;
    if (keys.has(k.up))    { tryMove(p, 0, -p.spd); p.dir = 'up'; }
    if (keys.has(k.down))  { tryMove(p, 0,  p.spd); p.dir = 'down'; }
    if (keys.has(k.left))  { tryMove(p, -p.spd, 0); p.dir = 'left'; }
    if (keys.has(k.right)) { tryMove(p,  p.spd, 0); p.dir = 'right'; }
}
