// ── Cube Rotate ─────────────────────────────────────────
// Usage: <script type="module" src="cube-rotate/index.js"></script>
//        <ui-cube-rotate></ui-cube-rotate>
// Recommended card: x2 + overflow-visible (2×2, no clip)

class UICubeRotate extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' }).innerHTML = `
<style>
:host { display: block; }

/* Centring wrapper */
.outer {
    position: relative;
    width: 170px; height: 170px;
    overflow: visible;
}

/* Scale the original 300-px cube to ~170 px */
.inner {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%) scale(0.566);
    width: 300px; height: 300px;
    transform-style: preserve-3d;
}

/* ── Original cube CSS (scoped) ── */
.cube {
    position: relative;
    width: 300px; height: 300px;
    transform-style: preserve-3d;
    transform: rotateX(-30deg);
    animation: spin 4s linear infinite;
}
@keyframes spin {
    from { transform: rotateX(-30deg) rotateY(0deg);   }
    to   { transform: rotateX(-30deg) rotateY(360deg); }
}
.cube > div {
    position: absolute; top: 0; left: 0;
    width: 100%; height: 100%;
    transform-style: preserve-3d;
}
.cube > div span {
    position: absolute; top: 0; left: 0;
    width: 100%; height: 100%;
    background: linear-gradient(#151515, #00ec00);
    transform: rotateY(calc(90deg * var(--i))) translateZ(150px);
}
.top {
    position: absolute; top: 0; left: 0;
    width: 100px; height: 300px;
    background: #222;
    transform: rotateX(90deg) translateZ(150px);
}
.top::before {
    content: '';
    position: absolute; top: 0; left: 0;
    width: 300px; height: 300px;
    background: #0f0;
    transform: translateZ(-400px);
    filter: blur(20px);
    box-shadow:
        0 0 120px rgba(0,255,0,.2),
        0 0 120px rgba(0,255,0,.4),
        0 0 120px rgba(0,255,0,.6),
        0 0 120px rgba(0,255,0,.8),
        0 0 120px rgba(0,255,0,1);
}
</style>
<div class="outer">
    <div class="inner">
        <div class="cube">
            <div class="top"></div>
            <div>
                <span style="--i:0"></span>
                <span style="--i:1"></span>
                <span style="--i:2"></span>
                <span style="--i:3"></span>
            </div>
        </div>
    </div>
</div>`;
    }
}
customElements.define('ui-cube-rotate', UICubeRotate);
