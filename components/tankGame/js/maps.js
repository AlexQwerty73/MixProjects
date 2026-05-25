// ── maps.js — map definitions + wall builder ────────────
//
//  Each map has:
//    name  — display name
//    desc  — short flavour text
//    build — function(W, H, add) that calls add(x,y,w,h)
//            for every wall rectangle in that map.

const MAPS = [
    // ────────────────────────────────────────────────────
    {
        name: 'Arena',
        desc: 'Classic symmetric corridors',
        build(W, H, add) {
            // Vertical pillars
            add(W*.20, H*.43,  8, H*.15);   add(W*.80, H*.43,  8, H*.15);
            add(W*.20, H*.15,  8, H*.10);   add(W*.80, H*.15,  8, H*.10);
            add(W*.20, H*.75,  8, H*.10);   add(W*.80, H*.75,  8, H*.10);
            add(W*.35, H*.75,  8, H*.15);   add(W*.65, H*.75,  8, H*.15);
            add(W*.35, H*.10,  8, H*.15);   add(W*.65, H*.10,  8, H*.15);
            add(W*.50, H*.15,  8, H*.25);   add(W*.50, H*.60,  8, H*.25);
            // Horizontal bars
            add(W*.40, H*.40, W*.20, 8);    add(W*.40, H*.60, W*.20, 8);
            add(W*.35, H*.75, W*.08, 8);    add(W*.575,H*.75, W*.08, 8);
            add(W*.35, H*.25, W*.08, 8);    add(W*.575,H*.25, W*.08, 8);
        },
    },

    // ────────────────────────────────────────────────────
    {
        name: 'Open',
        desc: 'Corner bunkers — mostly open field',
        build(W, H, add) {
            const bw = W * 0.10;  // bunker width
            const bh = H * 0.18;  // bunker height
            const t  = 8;         // wall thickness

            // Four corner L-shaped bunkers
            // Top-left
            add(W*.08,       H*.10,       bw, t);
            add(W*.08,       H*.10,       t,  bh);
            // Top-right
            add(W*.92 - bw,  H*.10,       bw, t);
            add(W*.92 - t,   H*.10,       t,  bh);
            // Bottom-left
            add(W*.08,       H*.90 - t,   bw, t);
            add(W*.08,       H*.72,        t,  bh);
            // Bottom-right
            add(W*.92 - bw,  H*.90 - t,   bw, t);
            add(W*.92 - t,   H*.72,        t,  bh);

            // Centre diamond (4 diagonal-ish pillars)
            add(W*.47, H*.30, t, H*.40);              // centre vertical
            add(W*.40, H*.47, W*.20, t);              // centre horizontal
        },
    },

    // ────────────────────────────────────────────────────
    {
        name: 'Fortress',
        desc: 'Central castle with four gates',
        build(W, H, add) {
            const t = 10;  // wall thickness

            // Outer castle ring — top/bottom/left/right sides with gap in the middle
            const gateW = W * 0.10;  // gate (opening) width
            const midX  = W / 2;
            const midY  = H / 2;
            const rx    = W * 0.25;  // castle half-width
            const ry    = H * 0.28;  // castle half-height

            // Top wall: left segment + right segment (gap in centre)
            add(midX - rx,        midY - ry, rx - gateW/2, t);
            add(midX + gateW/2,   midY - ry, rx - gateW/2, t);
            // Bottom wall
            add(midX - rx,        midY + ry, rx - gateW/2, t);
            add(midX + gateW/2,   midY + ry, rx - gateW/2, t);
            // Left wall: top segment + bottom segment (gap in centre)
            const gateH = H * 0.14;
            add(midX - rx, midY - ry,        t, ry - gateH/2);
            add(midX - rx, midY + gateH/2,   t, ry - gateH/2);
            // Right wall
            add(midX + rx, midY - ry,        t, ry - gateH/2);
            add(midX + rx, midY + gateH/2,   t, ry - gateH/2);

            // Inner cross — blocks the very centre, forces flanking
            add(midX - W*.04, midY - H*.10, t, H*.20);   // vertical bar
            add(midX - W*.10, midY - H*.02, W*.20, t);   // horizontal bar

            // Corner pillars outside the castle
            const pw = W * 0.04, ph = H * 0.08;
            add(W*.08, H*.12, pw, ph);  add(W*.88, H*.12, pw, ph);
            add(W*.08, H*.80, pw, ph);  add(W*.88, H*.80, pw, ph);
        },
    },

    // ────────────────────────────────────────────────────
    {
        name: 'Maze',
        desc: 'Dense grid — tight corridors',
        build(W, H, add) {
            const t = 8;

            // Horizontal rows (leave gaps for passage)
            const rows = [0.22, 0.44, 0.66];
            const hSegs = [
                [0.05, 0.28], [0.36, 0.28], [0.68, 0.28],   // row 0
                [0.05, 0.24], [0.40, 0.20], [0.72, 0.24],   // row 1
                [0.05, 0.28], [0.36, 0.28], [0.68, 0.28],   // row 2
            ];
            rows.forEach((ry, ri) => {
                for (let si = 0; si < 3; si++) {
                    const [sx, sw] = hSegs[ri * 3 + si];
                    add(W * sx, H * ry, W * sw, t);
                }
            });

            // Vertical columns (leave gaps for passage)
            const cols = [0.25, 0.50, 0.75];
            const vSegs = [
                [0.05, 0.18], [0.28, 0.18],   // col 0
                [0.05, 0.18], [0.28, 0.18],   // col 1
                [0.05, 0.18], [0.28, 0.18],   // col 2
            ];
            cols.forEach((cx, ci) => {
                for (let si = 0; si < 2; si++) {
                    const [sy, sh] = vSegs[ci * 2 + si];
                    add(W * cx, H * sy, t, H * sh);
                }
            });

            // Side notches — extra cover near spawn zones
            add(W*.10, H*.40, W*.08, t);  add(W*.82, H*.40, W*.08, t);
            add(W*.10, H*.60, W*.08, t);  add(W*.82, H*.60, W*.08, t);
        },
    },
];

// ── Active map state ────────────────────────────────────
let activeMapIdx = 0;   // index into MAPS[]
const WALLS = [];       // populated by buildWalls()

/** Clear and rebuild WALLS for the current map. */
function buildWalls() {
    WALLS.length = 0;
    const add = (x, y, w, h) => WALLS.push({
        x: Math.round(x), y: Math.round(y),
        w: Math.max(1, Math.round(w)),
        h: Math.max(1, Math.round(h)),
    });
    MAPS[activeMapIdx].build(W, H, add);
}
