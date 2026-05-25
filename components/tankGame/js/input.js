// ── input.js — keyboard handling ────────────────────────

const keys = new Set();  // currently held keys (for smooth movement)

// Control bindings per player
const K1 = { up: 'w', down: 's', left: 'a', right: 'd', shoot: 'e' };
const K2 = { up: 'i', down: 'k', left: 'j', right: 'l', shoot: 'u' };

window.addEventListener('keydown', e => {
    if (!keys.has(e.key)) {   // fire edge-triggered actions only once per press
        keys.add(e.key);
        onKeyDown(e.key);
    }
    if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' ','Tab'].includes(e.key)) {
        e.preventDefault();   // prevent page scroll / focus change
    }
});

window.addEventListener('keyup', e => keys.delete(e.key));

// ── Edge-triggered key handler ─────────────────────────
function onKeyDown(key) {

    // Global: toggle fullscreen with F
    if (key === 'f' || key === 'F') { toggleExpand(); return; }

    // Global: toggle AI with Tab (works from any screen)
    if (key === 'Tab') { toggleAI(); return; }

    // ── MENU ──────────────────────────────────────────
    if (scene === 'MENU') {
        if (key === 'Enter' || key === ' ') {
            scene = 'SELECT';
            sel.confirmed[0] = sel.confirmed[1] = false;
        }
        return;
    }

    // ── SELECT ────────────────────────────────────────
    if (scene === 'SELECT') {
        if (key === 'Escape') { scene = 'MENU'; return; }

        const nav = (idx, dir) => {
            sel.cursor[idx] = (sel.cursor[idx] + dir + TANKS.length) % TANKS.length;
            sel.confirmed[idx] = false;
        };

        if (key === K1.left)  nav(0, -1);
        if (key === K1.right) nav(0,  1);
        if (key === K1.shoot || key === 'Enter') {
            sel.confirmed[0] = true;
            if (aiEnabled) sel.confirmed[1] = true;   // AI auto-confirms its own slot
            if (sel.confirmed[1]) { scene = 'MAPSEL'; }
        }
        if (key === K2.left)  nav(1, -1);
        if (key === K2.right) nav(1,  1);
        if (key === K2.shoot) {
            sel.confirmed[1] = true;
            if (sel.confirmed[0]) { scene = 'MAPSEL'; }
        }
        return;
    }

    // ── MAPSEL ────────────────────────────────────────
    if (scene === 'MAPSEL') {
        if (key === 'Escape') { scene = 'SELECT'; sel.confirmed[0] = sel.confirmed[1] = false; return; }

        // Either player navigates the map list
        if (key === K1.left  || key === K2.left)  activeMapIdx = (activeMapIdx - 1 + MAPS.length) % MAPS.length;
        if (key === K1.right || key === K2.right) activeMapIdx = (activeMapIdx + 1) % MAPS.length;

        // Either player confirms
        if (key === K1.shoot || key === K2.shoot || key === 'Enter') {
            startGame();
        }
        return;
    }

    // ── PLAY ──────────────────────────────────────────
    if (scene === 'PLAY') {
        if (key === 'Escape') { scene = 'MENU'; return; }
        if (key === K1.shoot && p1.cooldown === 0) fireBullet(p1);
        if (key === K2.shoot && p2.cooldown === 0) fireBullet(p2);
    }
}
