/* ══════════════════════════════════════════════
   config.js — canvas element, physics constants,
               size presets, and the resize helper.
   Loaded first so every other module can rely on
   the globals defined here.
══════════════════════════════════════════════ */

// ── Canvas ───────────────────────────────────
const canvas = document.getElementById('canvas');
const ctx    = canvas.getContext('2d');

// ── Physics constants ────────────────────────
const GRAVITY  = 0.38;   // px/frame² downward pull
const JUMP     = -6.5;   // upward velocity on each flap
const PIPE_SPD = 2.6;    // px/frame horizontal scroll
const PIPE_GAP = 120;    // vertical opening between top & bottom pipe
const PIPE_INT = 82;     // frames between consecutive pipe spawns

// ── Size presets ─────────────────────────────
// Each entry drives the canvas resolution AND scales all
// derived positional constants proportionally.
const SIZES = [
    { key: 'classic', label: 'Classic', w: 288, h: 512  },
    { key: 'medium',  label: 'Medium',  w: 360, h: 640  },
    { key: 'large',   label: 'Large',   w: 414, h: 736  },
    { key: 'xl',      label: 'XL',      w: 480, h: 854  },
];

// ── Derived dimensions (updated by setDimensions) ──
let W;          // canvas internal width
let H;          // canvas internal height
let GROUND_Y;   // Y pixel where the ground strip begins
let PIPE_MIN;   // minimum gapTop  (topmost allowed gap position)
let PIPE_MAX;   // maximum gapTop  (bottommost allowed gap position)

/**
 * Apply a size preset:
 *   1. Update canvas internal resolution.
 *   2. Recalculate all proportional constants.
 *   3. Scale the CSS display size to fit inside the viewport.
 *
 * @param {number} w  Desired canvas width in pixels.
 * @param {number} h  Desired canvas height in pixels.
 */
function setDimensions(w, h) {
    W = canvas.width  = w;
    H = canvas.height = h;

    // Position constants as fixed ratios of canvas height
    GROUND_Y = Math.round(h * 0.781);  // ≈ 400 for h = 512
    PIPE_MIN = Math.round(h * 0.156);  // ≈ 80  for h = 512
    PIPE_MAX = Math.round(h * 0.410);  // ≈ 210 for h = 512

    // Scale CSS display so the canvas always fits the viewport
    const sx = (window.innerWidth  - 32) / w;
    const sy = (window.innerHeight - 80) / h;
    const sc = Math.min(1, sx, sy);
    canvas.style.width  = Math.round(w * sc) + 'px';
    canvas.style.height = Math.round(h * sc) + 'px';
}
