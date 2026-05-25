// ── physics.js — collision, movement, bullets ───────────

const BRAD = 4;  // bullet collision radius in px

/** AABB overlap test for two rectangles. */
function overlap(ax, ay, aw, ah, bx, by, bw, bh) {
    return ax < bx + bw && ax + aw > bx &&
           ay < by + bh && ay + ah > by;
}

/**
 * Try to move `player` by (dx, dy).
 * Tests X and Y axes separately so the tank slides along walls
 * instead of getting completely stuck.
 */
function tryMove(player, dx, dy) {
    const sz    = player.size;
    const other = player === p1 ? p2 : p1;

    // X axis
    const nx = player.x + dx;
    if (nx >= 0 && nx + sz <= W) {
        let blocked = WALLS.some(w => overlap(nx, player.y, sz, sz, w.x, w.y, w.w, w.h));
        if (!blocked && !overlap(nx, player.y, sz, sz, other.x, other.y, other.size, other.size)) {
            player.x = nx;
        }
    }

    // Y axis
    const ny = player.y + dy;
    if (ny >= 0 && ny + sz <= H) {
        let blocked = WALLS.some(w => overlap(player.x, ny, sz, sz, w.x, w.y, w.w, w.h));
        if (!blocked && !overlap(player.x, ny, sz, sz, other.x, other.y, other.size, other.size)) {
            player.y = ny;
        }
    }
}

/** Spawn a bullet in the direction the player is facing. */
function fireBullet(player) {
    const cx  = player.x + player.size / 2;
    const cy  = player.y + player.size / 2;
    const spd = player.bspd;
    const vel = { up: [0,-spd], down: [0,spd], left: [-spd,0], right: [spd,0] };
    const [dx, dy] = vel[player.dir];

    player.bullets.push({ x: cx, y: cy, dx, dy });
    player.cooldown = player.cd;   // per-tank fire rate
}

/**
 * Advance all bullets for `shooter` and test against `target`.
 * Removes bullets on wall/out-of-bounds hit.
 * Awards a point and calls resetRound() when target HP reaches 0.
 */
function stepBullets(shooter, target) {
    for (let i = shooter.bullets.length - 1; i >= 0; i--) {
        const b = shooter.bullets[i];
        b.x += b.dx;
        b.y += b.dy;

        // Out of bounds
        if (b.x < 0 || b.x > W || b.y < 0 || b.y > H) {
            shooter.bullets.splice(i, 1); continue;
        }

        // Wall hit
        if (WALLS.some(w => overlap(b.x - BRAD, b.y - BRAD, BRAD*2, BRAD*2, w.x, w.y, w.w, w.h))) {
            shooter.bullets.splice(i, 1); continue;
        }

        // Target hit
        if (overlap(b.x - BRAD, b.y - BRAD, BRAD*2, BRAD*2,
                    target.x, target.y, target.size, target.size)) {
            target.hp--;
            shooter.bullets.splice(i, 1);
            if (target.hp <= 0) {
                const winnerId = shooter === p1 ? 0 : 1;
                score[winnerId]++;
                flash.text  = `Player ${winnerId + 1} scores!`;
                flash.timer = 90;
                resetRound();
            }
            continue;
        }
    }
}
