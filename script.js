const PROJECTS = [
    { name: 'Parallax',  src: './components/ParallaxEffect/index.html' },
    { name: 'Loader',    src: './components/rainbowBlocks/index.html' },
    { name: 'Orbit',     src: './components/cycle/index.html' },
    { name: 'Some Jar',  src: './components/specialJar/index.html' },
    { name: 'Cube',      src: './components/cubeRotate/index.html' },
    { name: 'Infinity',  src: './components/Infinity/index.html' },
    { name: 'Projects',  src: './components/newpoj/index.html' },
    { name: 'RPS',       src: './components/RockPaperScissors/index.html' },
    { name: 'FlappyB',   src: './components/flappy_bird/index.html' },
    { name: 'M',         src: './components/matrix/index.html' },
    // { name: 'S',         src: './components/SnakeGame/index.html' },
    { name: 'T',      src: './components/tankGame/index.html' },
];

/* ─────────────────────────────────────────────────────*/

const tabsEl  = document.getElementById('tabs');
const stageEl = document.getElementById('stage');
const emptyEl = document.getElementById('empty');
let current   = null;

PROJECTS.forEach((proj, i) => {
    const btn = document.createElement('button');
    btn.className = 'tab';
    btn.textContent = proj.name;
    btn.onclick = () => show(i);
    tabsEl.appendChild(btn);

    const frame = document.createElement('iframe');
    frame.dataset.src = proj.src;
    frame.id = `f${i}`;
    stageEl.appendChild(frame);
});

function show(index) {
    if (current === index) return;
    current = index;

    document.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('iframe').forEach(f => f.classList.remove('active'));
    emptyEl.style.display = 'none';

    const btn   = tabsEl.children[index];
    const frame = document.getElementById(`f${index}`);

    btn.classList.add('active');
    btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });

    if (!frame.src || frame.src === window.location.href) {
        frame.src = frame.dataset.src;
    }
    frame.classList.add('active');
}

show(0);
