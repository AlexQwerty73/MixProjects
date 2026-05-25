// ── render.js — all drawing functions ───────────────────

const DIR_ANGLE = { right: 0, down: Math.PI/2, left: Math.PI, up: -Math.PI/2 };

// ── Primitive helpers ──────────────────────────────────

function roundRect(x, y, w, h, r, fill, stroke) {
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, r);
    if (fill)   { ctx.fillStyle = fill;             ctx.fill(); }
    if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = 1.5; ctx.stroke(); }
}

function txt(str, x, y, font, fill, align = 'center', outline = '') {
    ctx.font      = font;
    ctx.textAlign = align;
    if (outline) { ctx.strokeStyle = outline; ctx.lineWidth = 4; ctx.strokeText(str, x, y); }
    ctx.fillStyle = fill;
    ctx.fillText(str, x, y);
}

/** Horizontal stat bar. value/max fills fraction of total width w. */
function statBar(x, y, value, max, w, color) {
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(x, y, w, 6);
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w * Math.min(1, value / max), 6);
}

// ── Background / environment ───────────────────────────

function drawBackground() {
    ctx.fillStyle = C.bg;
    ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = C.bgLine;
    ctx.lineWidth   = 0.5;
    for (let x = 0; x <= W; x += 32) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke(); }
    for (let y = 0; y <= H; y += 32) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }
}

function drawWalls() {
    for (const w of WALLS) {
        ctx.fillStyle = C.wall;
        ctx.fillRect(w.x, w.y, w.w, w.h);
        ctx.fillStyle = 'rgba(255,255,255,0.1)';
        ctx.fillRect(w.x, w.y, w.w, 2);
        ctx.fillRect(w.x, w.y, 2, w.h);
        ctx.fillStyle = 'rgba(0,0,0,0.35)';
        ctx.fillRect(w.x, w.y + w.h - 2, w.w, 2);
        ctx.fillRect(w.x + w.w - 2, w.y, 2, w.h);
    }
}

// ── Tanks & bullets ────────────────────────────────────

function drawTank(player) {
    const img = player === p1 ? IMG.p1 : IMG.p2;
    const cx  = player.x + player.size / 2;
    const cy  = player.y + player.size / 2;
    const col = player === p1 ? C.p1 : C.p2;

    // Glow outline
    ctx.save();
    ctx.shadowBlur = 14; ctx.shadowColor = col;
    ctx.strokeStyle = col; ctx.lineWidth = 2;
    ctx.strokeRect(player.x - 2, player.y - 2, player.size + 4, player.size + 4);
    ctx.restore();

    // Rotated sprite
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(DIR_ANGLE[player.dir]);
    ctx.drawImage(img, -player.size/2, -player.size/2, player.size, player.size);
    ctx.restore();

    // HP bar
    const barW  = player.size + 4;
    const barX  = player.x - 2;
    const barY  = player.y - 10;
    const ratio = player.hp / player.maxHp;
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(barX, barY, barW, 5);
    ctx.fillStyle = ratio > 0.5 ? '#4ade80' : ratio > 0.25 ? '#fbbf24' : '#f87171';
    ctx.fillRect(barX, barY, barW * ratio, 5);
}

function drawBullets(player) {
    const col = player === p1 ? C.bul1 : C.bul2;
    ctx.save();
    ctx.shadowBlur = 10; ctx.shadowColor = col; ctx.fillStyle = col;
    for (const b of player.bullets) {
        ctx.beginPath();
        ctx.arc(b.x, b.y, BRAD, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.restore();
}

// ── HUD ────────────────────────────────────────────────

function drawHUD() {
    roundRect(W/2 - 100, 6, 200, 30, 8, C.panel, C.panelBrd);

    ctx.fillStyle = C.p1Light; ctx.font = 'bold 14px "Segoe UI",sans-serif'; ctx.textAlign = 'left';
    ctx.fillText('P1', 16, 28);
    ctx.fillStyle = '#fff'; ctx.font = 'bold 22px "Segoe UI",sans-serif';
    ctx.fillText(score[0], 48, 28);

    ctx.fillStyle = C.p2Light; ctx.font = 'bold 14px "Segoe UI",sans-serif'; ctx.textAlign = 'right';
    ctx.fillText(aiEnabled ? 'BOT' : 'P2', W - 16, 28);
    ctx.fillStyle = '#fff'; ctx.font = 'bold 22px "Segoe UI",sans-serif';
    ctx.fillText(score[1], W - 48, 28);

    // AI badge — glowing pill next to P2 score
    if (aiEnabled) {
        ctx.save();
        ctx.shadowBlur = 8; ctx.shadowColor = C.p2;
        roundRect(W - 72, 10, 22, 14, 4, C.p2 + '55', C.p2);
        ctx.restore();
        txt('AI', W - 61, 21, 'bold 8px "Segoe UI",sans-serif', '#fff');
    }

    txt('TANK BATTLE', W/2, 28, 'bold 13px "Segoe UI",sans-serif', C.uiDim);
    txt('ESC = menu   ·   Tab = AI ' + (aiEnabled ? 'ON ✓' : 'OFF') + '   ·   F = ' + (isExpanded ? 'windowed' : 'fullscreen'),
        W/2, H - 8, '10px "Segoe UI",sans-serif', 'rgba(255,255,255,0.2)');

    if (flash.timer > 0) {
        const a = Math.min(1, flash.timer / 20);
        txt(flash.text, W/2, H/2 - 60,
            'bold 32px "Segoe UI",sans-serif',
            `rgba(255,220,60,${a})`, 'center', `rgba(0,0,0,${a*.8})`);
    }
}

// ── MENU screen ────────────────────────────────────────

function drawMenu() {
    ctx.fillStyle = '#0e1a0e';
    ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = '#152015'; ctx.lineWidth = 0.5;
    for (let x = 0; x <= W; x += 40) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke(); }
    for (let y = 0; y <= H; y += 40) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }

    txt('TANK',   W/2, H*.38, 'bold 80px "Segoe UI",sans-serif', '#fff',                  'center', 'rgba(0,0,0,.5)');
    txt('BATTLE', W/2, H*.55, 'bold 80px "Segoe UI",sans-serif', 'rgba(239,68,68,0.9)',   'center', 'rgba(0,0,0,.5)');

    const pulse = 0.7 + 0.3 * Math.sin(Date.now() / 500);
    txt('Press ENTER to play', W/2, H*.72, 'bold 18px "Segoe UI",sans-serif', `rgba(241,245,249,${pulse})`);

    roundRect(W/2 - 240, H*.80, 480, 52, 10, C.panel, C.panelBrd);
    ctx.font = '12px "Segoe UI",sans-serif'; ctx.textAlign = 'center';
    ctx.fillStyle = C.p1Light; ctx.fillText('Player 1:  WASD move  ·  E shoot',                    W/2 - 120, H*.80 + 20);
    ctx.fillStyle = C.p2Light; ctx.fillText(aiEnabled ? 'Player 2:  BOT (AI)' : 'Player 2:  IJKL move  ·  U shoot', W/2 + 120, H*.80 + 20);
    ctx.fillStyle = C.uiDim;   ctx.fillText('Tab = AI ' + (aiEnabled ? 'ON ✓' : 'OFF') + '   ·   F = fullscreen   ·   ESC = menu', W/2, H*.80 + 40);
}

// ── SELECT screen ──────────────────────────────────────

function drawSelect() {
    ctx.fillStyle = '#0e1a0e';
    ctx.fillRect(0, 0, W, H);

    ctx.strokeStyle = 'rgba(255,255,255,0.1)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(W/2, 0); ctx.lineTo(W/2, H); ctx.stroke();

    _drawPlayerSelect(0, 0,   sel.cursor[0], sel.confirmed[0], C.p1, C.p1Light, 'A / D  navigate  ·  E confirm');
    _drawPlayerSelect(1, W/2, sel.cursor[1], sel.confirmed[1], C.p2, C.p2Light,
        aiEnabled ? '← AI controls this tank →' : 'J / L  navigate  ·  U confirm',
        aiEnabled);

    roundRect(W/2 - 130, 4, 260, 26, 8, C.panel, C.panelBrd);
    txt('Select your tank — ESC to cancel', W/2, 20, '11px "Segoe UI",sans-serif', C.uiDim);
}

function _drawPlayerSelect(pidx, ox, cursor, confirmed, col, light, hint, isBot = false) {
    const HALF   = W / 2;
    const PAD    = 18;
    const CARD_W = Math.floor((HALF - PAD * 2 - 10) / 3);
    const CARD_H = 138;
    const COLS   = 3;

    txt(`Player ${pidx + 1}`, ox + HALF/2, 44, 'bold 18px "Segoe UI",sans-serif', light);
    // AI badge overlaid on the player label
    if (isBot) {
        ctx.save();
        ctx.shadowBlur = 10; ctx.shadowColor = col;
        roundRect(ox + HALF/2 + 38, 30, 28, 15, 4, col + '44', col);
        ctx.restore();
        txt('BOT', ox + HALF/2 + 52, 42, 'bold 9px "Segoe UI",sans-serif', '#fff');
    }
    txt(hint, ox + HALF/2, H - 14, '11px "Segoe UI",sans-serif',
        isBot ? C.p2Light : 'rgba(255,255,255,0.25)');

    TANKS.forEach((t, i) => {
        const cx = ox + PAD + (i % COLS) * (CARD_W + 5);
        const cy = 58 + Math.floor(i / COLS) * (CARD_H + 8);

        const isActive    = i === cursor;
        const isConfirmed = confirmed && isActive;
        const bgFill   = isConfirmed ? `${col}33` : isActive ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.35)';
        const bdStroke = isConfirmed ? col : isActive ? light : 'rgba(255,255,255,0.1)';
        roundRect(cx, cy, CARD_W, CARD_H, 8, bgFill, bdStroke);

        if (isActive) {
            ctx.save();
            ctx.shadowBlur = 16; ctx.shadowColor = col;
            roundRect(cx, cy, CARD_W, CARD_H, 8, null, col);
            ctx.restore();
        }

        txt(t.name, cx + CARD_W/2, cy + 19, 'bold 13px "Segoe UI",sans-serif',
            isActive ? '#fff' : 'rgba(255,255,255,0.55)');
        txt(t.desc, cx + CARD_W/2, cy + 31, '9px "Segoe UI",sans-serif',
            isActive ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.25)');

        const barX = cx + 8, barW = CARD_W - 16;
        const lc   = isActive ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.2)';
        ctx.font = '9px "Segoe UI",sans-serif'; ctx.textAlign = 'left';

        ctx.fillStyle = lc; ctx.fillText('SPD', barX, cy + 50);
        statBar(barX + 22, cy + 42, t.speed,    5,  barW - 22, '#4ade80');
        ctx.fillStyle = lc; ctx.fillText('HP',  barX, cy + 65);
        statBar(barX + 22, cy + 57, t.hp,       9,  barW - 22, '#f87171');
        ctx.fillStyle = lc; ctx.fillText('BUL', barX, cy + 80);
        statBar(barX + 22, cy + 72, t.bspd,     11, barW - 22, '#fbbf24');
        ctx.fillStyle = lc; ctx.fillText('RoF', barX, cy + 95);
        statBar(barX + 22, cy + 87, 46 - t.cd,  32, barW - 22, '#c084fc');

        // Size preview square
        const sqSz = Math.round(t.size * 0.5);
        const sqX  = cx + CARD_W/2 - sqSz/2;
        const sqY  = cy + CARD_H - sqSz - 6;
        ctx.fillStyle   = isActive ? `${col}80` : 'rgba(255,255,255,0.08)';
        ctx.fillRect(sqX, sqY, sqSz, sqSz);
        ctx.strokeStyle = isActive ? col : 'rgba(255,255,255,0.15)';
        ctx.lineWidth = 1;
        ctx.strokeRect(sqX, sqY, sqSz, sqSz);

        if (isConfirmed) txt('✓', cx + CARD_W - 14, cy + 18, 'bold 14px "Segoe UI",sans-serif', col);
    });
}

// ── MAPSEL screen ──────────────────────────────────────

function drawMapSel() {
    ctx.fillStyle = '#0e1a0e';
    ctx.fillRect(0, 0, W, H);

    // Title
    txt('Choose a Map', W/2, H*.14, 'bold 28px "Segoe UI",sans-serif', '#fff', 'center', 'rgba(0,0,0,.4)');
    txt('← A  /  D →  navigate   ·   E or U  confirm   ·   ESC  back',
        W/2, H*.14 + 24, '11px "Segoe UI",sans-serif', 'rgba(255,255,255,0.3)');

    const count  = MAPS.length;
    const CARD_W = Math.min(200, Math.floor((W - 40) / count) - 16);
    const CARD_H = Math.min(240, Math.round(H * 0.55));
    const gap    = 16;
    const totalW = count * CARD_W + (count - 1) * gap;
    const startX = (W - totalW) / 2;
    const startY = H * 0.22;

    MAPS.forEach((map, i) => {
        const cx = startX + i * (CARD_W + gap);
        const cy = startY;
        const isActive = i === activeMapIdx;

        // Card
        const bg = isActive ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.4)';
        const bd = isActive ? '#fff' : 'rgba(255,255,255,0.1)';
        roundRect(cx, cy, CARD_W, CARD_H, 10, bg, bd);

        if (isActive) {
            ctx.save();
            ctx.shadowBlur = 20; ctx.shadowColor = 'rgba(255,255,255,0.4)';
            roundRect(cx, cy, CARD_W, CARD_H, 10, null, 'rgba(255,255,255,0.5)');
            ctx.restore();
        }

        // Map name
        txt(map.name, cx + CARD_W/2, cy + 26,
            `bold ${Math.round(CARD_W * 0.075)}px "Segoe UI",sans-serif`,
            isActive ? '#fff' : 'rgba(255,255,255,0.5)');

        // Description
        txt(map.desc, cx + CARD_W/2, cy + 42,
            '9px "Segoe UI",sans-serif',
            isActive ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.2)');

        // Mini map preview
        _drawMiniMap(map, cx + 10, cy + 54, CARD_W - 20, CARD_H - 70);
    });

    // Pulse prompt
    const pulse = 0.65 + 0.35 * Math.sin(Date.now() / 420);
    txt('Press E or U to start', W/2, H*.84,
        'bold 16px "Segoe UI",sans-serif', `rgba(241,245,249,${pulse})`);
}

/**
 * Draw a scaled-down preview of a map's walls into a box.
 */
function _drawMiniMap(map, bx, by, bw, bh) {
    // Draw preview box background
    ctx.fillStyle = '#1a2a1a';
    ctx.fillRect(bx, by, bw, bh);
    ctx.strokeStyle = 'rgba(255,255,255,0.08)'; ctx.lineWidth = 1;
    ctx.strokeRect(bx, by, bw, bh);

    // Temporarily build walls in a fake coordinate space
    const fakeFull = [];
    const fadd = (x, y, w, h) => fakeFull.push({ x, y, w, h });
    map.build(1000, 500, fadd);   // normalise to 1000×500

    const scaleX = bw / 1000;
    const scaleY = bh / 500;

    ctx.fillStyle = C.wall;
    for (const w of fakeFull) {
        ctx.fillRect(
            bx + w.x * scaleX,
            by + w.y * scaleY,
            Math.max(1, w.w * scaleX),
            Math.max(1, w.h * scaleY),
        );
    }

    // Spawn zones
    ctx.fillStyle = 'rgba(59,130,246,0.35)';
    ctx.fillRect(bx + 1, by + bh/2 - 8, 8, 16);
    ctx.fillStyle = 'rgba(239,68,68,0.35)';
    ctx.fillRect(bx + bw - 9, by + bh/2 - 8, 8, 16);
}

// ── Main render dispatcher ─────────────────────────────

function render() {
    if      (scene === 'MENU')   { drawMenu();   return; }
    if      (scene === 'SELECT') { drawSelect(); return; }
    else if (scene === 'MAPSEL') { drawMapSel(); return; }

    // PLAY
    drawBackground();
    drawWalls();
    drawBullets(p1);
    drawBullets(p2);
    drawTank(p1);
    drawTank(p2);
    drawHUD();
}
