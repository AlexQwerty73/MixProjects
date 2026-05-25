// ── assets.js — image loading ───────────────────────────

function loadImg(src) {
    const i = new Image();
    i.src = src;
    return i;
}

const IMG = {
    p1: loadImg('img/player_1_img.png'),
    p2: loadImg('img/player_2_img.png'),
};

// ── Colour palette (shared by render.js) ───────────────
const C = {
    bg:        '#1a2a1a',
    bgLine:    '#1e301e',
    wall:      '#4a3728',
    p1:        '#3b82f6',
    p1Light:   '#93c5fd',
    p2:        '#ef4444',
    p2Light:   '#fca5a5',
    bul1:      '#fbbf24',
    bul2:      '#a78bfa',
    ui:        '#f1f5f9',
    uiDim:     'rgba(241,245,249,0.45)',
    panel:     'rgba(0,0,0,0.72)',
    panelBrd:  'rgba(255,255,255,0.1)',
};
