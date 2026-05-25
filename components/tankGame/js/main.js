// ── main.js — bootstrap & game loop ────────────────────
//
//  Script load order (defined in index.html):
//    config → assets → tanks → maps → input → physics → game → render → main

// Initialise canvas to default size (builds walls + creates players)
resizeCanvas(1024, 512);
resetRound();

// Start the rAF loop
function loop() {
    update();
    render();
    requestAnimationFrame(loop);
}

loop();
