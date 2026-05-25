// ── config.js — canvas setup, resize, fullscreen ───────

const canvas = document.getElementById('canvas');
const ctx    = canvas.getContext('2d');

let W, H;
let isExpanded = false;

/**
 * Set canvas internal resolution and rebuild walls to match.
 * Also clamps existing players so they stay in bounds.
 */
function resizeCanvas(w, h) {
    W = canvas.width  = w;
    H = canvas.height = h;
    buildWalls();           // defined in maps.js
    if (typeof p1 !== 'undefined' && p1) clampPlayer(p1);
    if (typeof p2 !== 'undefined' && p2) clampPlayer(p2);
}

function clampPlayer(p) {
    p.x = Math.max(0, Math.min(p.x, W - p.size));
    p.y = Math.max(0, Math.min(p.y, H - p.size));
}

/**
 * Toggle expand-to-viewport mode.
 * position:fixed works inside iframes as well as normal pages.
 */
function toggleExpand() {
    isExpanded = !isExpanded;
    if (isExpanded) {
        canvas.style.cssText =
            'position:fixed;top:0;left:0;width:100%;height:100%;' +
            'border-radius:0;z-index:9999;';
        resizeCanvas(window.innerWidth, window.innerHeight);
    } else {
        canvas.style.cssText = '';
        resizeCanvas(1024, 512);
    }
}

window.addEventListener('resize', () => {
    if (isExpanded) resizeCanvas(window.innerWidth, window.innerHeight);
});
