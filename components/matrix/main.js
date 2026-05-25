/* ══════════════════════════════════════════════
   Matrix Digital Rain
   ─────────────────────────────────────────────
   Algorithm:
     • Canvas is divided into fixed-width columns.
     • Each column owns one "drop" — a falling stream
       of characters with a bright head.
     • Every frame the background is overlaid with a
       semi-transparent black rectangle; old characters
       fade away gradually, creating the trail.
     • The head character is drawn white with a coloured
       glow (shadowBlur), then the neck (1 cell behind)
       is refreshed in the theme's body colour so the
       transition from white → colour is crisp.
     • Drops have 3 speed tiers and random start offsets
       so streams are out of phase with each other.
══════════════════════════════════════════════ */

// ── Canvas setup ─────────────────────────────
const canvas = document.getElementById('canvas');
const ctx    = canvas.getContext('2d');

// ── Character pool ───────────────────────────
// Half-width Katakana (classic Matrix look) + Latin + digits + symbols
const CHARS = (
    'ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿ' +
    'ﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ' +
    '0123456789' +
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
    '@#$%&<>[]|'
).split('');

// ── Colour themes ─────────────────────────────
// fade: [r, g, b] for the semi-transparent overlay
const THEMES = [
    { id: 'matrix', name: 'Matrix', head: '#ffffff', body: '#00ff41', glow: '#00ff41', fade: [0,   0,   0  ] },
    { id: 'cyber',  name: 'Cyber',  head: '#ffffff', body: '#00cfff', glow: '#00cfff', fade: [0,   4,   18 ] },
    { id: 'red',    name: 'Red',    head: '#ffffff', body: '#ff3300', glow: '#ff5500', fade: [8,   0,   0  ] },
    { id: 'gold',   name: 'Gold',   head: '#ffffff', body: '#ffc400', glow: '#ffd700', fade: [10,  6,   0  ] },
];
let themeIdx = 0;

// ── Layout config ─────────────────────────────
const FONT     = 16;    // column width = row height in px
const FADE     = 0.05;  // overlay alpha per frame — lower = longer trail

// ── Drop state ────────────────────────────────
// Each column owns one drop object:
//   y      — current head row (can be negative = above screen)
//   speed  — advance once every N frames (1=fast, 2=normal, 3=slow)
//   phase  — frame offset so drops don't all move in unison
//   char   — the character currently shown at the head
let drops = [];
let cols  = 0;
let tick  = 0;   // global frame counter, incremented each rAF

// ── Helpers ───────────────────────────────────
function rand(a, b)   { return a + Math.random() * (b - a); }
function randInt(a, b){ return Math.floor(rand(a, b)); }
function randChar()   { return CHARS[randInt(0, CHARS.length)]; }

// Speed tier weights: 25% fast · 50% normal · 25% slow
function randSpeed()  { return [1, 2, 2, 3][randInt(0, 4)]; }

// ── Init / resize ─────────────────────────────
function init() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    cols  = Math.floor(canvas.width / FONT);

    // Re-create all drops, staggered well above the screen
    drops = Array.from({ length: cols }, () => ({
        y:     -randInt(1, 60),   // stagger start times
        speed: randSpeed(),
        phase: randInt(0, 3),     // frame-offset so speeds interleave cleanly
        char:  randChar(),
    }));
}

window.addEventListener('resize', init);

// ── Theme switcher UI ─────────────────────────
(function buildControls() {
    const bar = document.getElementById('controls');

    // "Colour" label
    const lbl = document.createElement('span');
    lbl.className   = 'label';
    lbl.textContent = 'Color';
    bar.appendChild(lbl);

    THEMES.forEach((t, i) => {
        const dot = document.createElement('button');
        dot.className = 'theme-dot' + (i === 0 ? ' active' : '');
        dot.style.setProperty('--c', t.body);
        dot.title     = t.name;
        dot.setAttribute('aria-label', t.name);

        dot.addEventListener('click', () => {
            themeIdx = i;
            bar.querySelectorAll('.theme-dot').forEach((d, j) =>
                d.classList.toggle('active', j === i)
            );
        });

        bar.appendChild(dot);
    });
})();

// ── Render loop ───────────────────────────────
function loop() {
    requestAnimationFrame(loop);
    tick++;

    const t        = THEMES[themeIdx];
    const [fr, fg, fb] = t.fade;

    // ── Fade overlay ─────────────────────────
    // Paints a semi-transparent rectangle over the canvas every frame.
    // Characters drawn in earlier frames slowly lose brightness,
    // producing the characteristic glowing trail effect.
    ctx.fillStyle = `rgba(${fr}, ${fg}, ${fb}, ${FADE})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = `bold ${FONT}px "Courier New", Courier, monospace`;

    // ── Update and draw each column's drop ───
    for (let i = 0; i < drops.length; i++) {
        const d = drops[i];

        // Speed gate: this drop only advances on frames where
        // (tick + phase) is divisible by its speed tier.
        if ((tick + d.phase) % d.speed !== 0) continue;

        const x = i * FONT;
        const y = d.y * FONT;

        if (y > -FONT && y <= canvas.height + FONT) {

            // HEAD — bright white with a coloured halo glow
            ctx.shadowBlur  = 12;
            ctx.shadowColor = t.glow;
            ctx.fillStyle   = t.head;
            ctx.fillText(d.char, x, y);

            // NECK — the cell just behind the head is refreshed in
            // body colour so it stays vivid; older cells fade on their own.
            ctx.shadowBlur = 0;
            ctx.fillStyle  = t.body;
            ctx.fillText(randChar(), x, y - FONT);
        }

        // Rotate to next random character and advance one row
        d.char = randChar();
        d.y++;

        // Once the head leaves the bottom, restart randomly above the screen
        if (d.y * FONT > canvas.height && Math.random() > 0.975) {
            d.y    = -randInt(5, 45);
            d.speed = randSpeed();
        }
    }
}

// ── Bootstrap ────────────────────────────────
init();
loop();
