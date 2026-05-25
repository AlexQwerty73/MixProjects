/* ══════════════════════════════════════════════
   render.js — every canvas drawing call lives here.
   Exports: render() — the single entry point called
   from the main loop each animation frame.
   Depends on: config.js, assets.js, game.js
══════════════════════════════════════════════ */

// ── Drawing primitives ───────────────────────

/**
 * Trace a rounded-rectangle path.
 * Does NOT fill or stroke — call those separately if needed.
 */
function _pill(x, y, w, h, r = 16) {
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, r);
}

/**
 * Draw a dark semi-transparent overlay panel with a subtle border.
 * Used by all in-game overlay screens.
 */
function _panel(x, y, w, h) {
    _pill(x, y, w, h);
    ctx.fillStyle   = 'rgba(10, 6, 28, .65)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,.13)';
    ctx.lineWidth   = 1.2;
    ctx.stroke();
}

/**
 * Draw a score number with a dark outline so it reads
 * clearly over any background colour.
 *
 * @param {number} n     The value to display.
 * @param {number} x     Horizontal centre (textAlign = 'center').
 * @param {number} y     Baseline Y.
 * @param {number} size  Font size in px (default 40).
 */
function _scoreText(n, x, y, size = 40) {
    ctx.save();
    ctx.textAlign   = 'center';
    ctx.font        = `bold ${size}px "Segoe UI", sans-serif`;
    ctx.lineWidth   = 5;
    ctx.strokeStyle = 'rgba(0,0,0,.45)';
    ctx.strokeText(n, x, y);
    ctx.fillStyle   = '#fff';
    ctx.fillText(n, x, y);
    ctx.restore();
}

// ── Overlay screens ──────────────────────────

/** "Tap to start" screen shown while state === S.IDLE. */
function _drawIdle() {
    const cx   = W / 2;
    const panY = Math.round(H * 0.06);   // close to the top
    const hasB = best > 0;
    const panH = hasB ? 106 : 86;

    _panel(cx - 100, panY, 200, panH);
    ctx.textAlign = 'center';

    ctx.fillStyle = '#fde68a';
    ctx.font      = 'bold 22px "Segoe UI", sans-serif';
    ctx.fillText('Flappy Bird', cx, panY + 30);

    ctx.fillStyle = 'rgba(255,255,255,.72)';
    ctx.font      = '14px "Segoe UI", sans-serif';
    ctx.fillText('Tap  ·  Space  to flap', cx, panY + 58);

    if (hasB) {
        ctx.fillStyle = '#fbbf24';
        ctx.font      = '13px "Segoe UI", sans-serif';
        ctx.fillText('🏆  Best: ' + best, cx, panY + 82);
    }

    ctx.fillStyle = 'rgba(255,255,255,.28)';
    ctx.font      = '11px "Segoe UI", sans-serif';
    ctx.fillText('P = pause', cx, panY + (hasB ? 100 : 80));
}

/** Game-over screen shown while state === S.DEAD. */
function _drawDead() {
    const cx      = W / 2;
    const panY    = Math.round(H * 0.30);
    const newBest = score > 0 && score >= best;

    // Score badge at the very top (stays visible as bird falls)
    _scoreText(score, cx, Math.round(H * 0.10));

    _panel(cx - 100, panY, 200, 156);
    ctx.textAlign = 'center';

    ctx.fillStyle = '#fca5a5';
    ctx.font      = 'bold 19px "Segoe UI", sans-serif';
    ctx.fillText('Game Over', cx, panY + 29);

    // Large score number — gold if a new record
    ctx.font        = 'bold 58px "Segoe UI", sans-serif';
    ctx.lineWidth   = 6;
    ctx.strokeStyle = 'rgba(0,0,0,.35)';
    ctx.strokeText(score, cx, panY + 92);
    ctx.fillStyle   = newBest ? '#fde68a' : '#fff';
    ctx.fillText(score, cx, panY + 92);

    // Best score line
    ctx.font      = '13px "Segoe UI", sans-serif';
    ctx.fillStyle = newBest ? '#fbbf24' : 'rgba(255,255,255,.42)';
    ctx.fillText('Best: ' + best + (newBest && score > 0 ? '  🏆' : ''), cx, panY + 116);

    // Retry prompt
    ctx.fillStyle = 'rgba(255,255,255,.52)';
    ctx.font      = '13px "Segoe UI", sans-serif';
    ctx.fillText('Tap  ·  Space  to retry', cx, panY + 144);
}

/** Pause overlay shown while state === S.PAUSE. */
function _drawPaused() {
    const cx   = W / 2;
    const panY = Math.round(H * 0.38);

    _panel(cx - 74, panY, 148, 90);
    ctx.textAlign = 'center';

    ctx.fillStyle = '#fff';
    ctx.font      = 'bold 22px "Segoe UI", sans-serif';
    ctx.fillText('Paused', cx, panY + 35);

    ctx.fillStyle = 'rgba(255,255,255,.5)';
    ctx.font      = '13px "Segoe UI", sans-serif';
    ctx.fillText('P  ·  tap to resume', cx, panY + 72);
}

// ── Main render function ─────────────────────

/**
 * Draw the full game frame.
 * Call order: background → pipes → ground → bird → HUD → overlays.
 */
function render() {
    const pw = IMG.pipeU.naturalWidth  || 52;
    const ph = IMG.pipeU.naturalHeight || 320;
    const bw = IMG.bird.naturalWidth   || 34;
    const bh = IMG.bird.naturalHeight  || 24;

    // ── Background ───────────────────────────
    ctx.drawImage(IMG.bg, 0, 0, W, H);

    // ── Pipe pairs ───────────────────────────
    // Top pipe: positioned so its bottom edge aligns with gapTop.
    // Bottom pipe: positioned so its top edge aligns with gapBottom.
    for (const p of pipes) {
        ctx.drawImage(IMG.pipeU, p.x, p.gapTop - ph);
        ctx.drawImage(IMG.pipeD, p.x, p.gapBottom);
    }

    // ── Ground ───────────────────────────────
    ctx.drawImage(IMG.road, 0, GROUND_Y, W, H - GROUND_Y);

    // ── Bird ─────────────────────────────────
    // Rotate around the sprite centre so the tilt looks natural.
    ctx.save();
    ctx.translate(bird.x + bw / 2, bird.y + bh / 2);
    ctx.rotate(bird.rot * Math.PI / 180);
    ctx.drawImage(IMG.bird, -bw / 2, -bh / 2);
    ctx.restore();

    // ── Score HUD ────────────────────────────
    // Show during active play and while paused.
    if (state === S.PLAY || state === S.PAUSE) {
        _scoreText(score, W / 2, Math.round(H * 0.10));
    }

    // ── State overlays ────────────────────────
    if (state === S.IDLE)  _drawIdle();
    if (state === S.DEAD)  _drawDead();
    if (state === S.PAUSE) _drawPaused();
}
