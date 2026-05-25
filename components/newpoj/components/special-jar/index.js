// ── Special Jar ─────────────────────────────────────────
// Usage: <script type="module" src="special-jar/index.js"></script>
//        <ui-special-jar></ui-special-jar>
// Recommended card size: x2 (2×2 grid span)

class UISpecialJar extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' }).innerHTML = `
<style>
:host { display: block; }

/* Centring wrapper — sized to the visual footprint of the scaled jar */
.outer {
    position: relative;
    width: 170px; height: 170px;
    overflow: visible;
}

/* Scale the original 300-px jar to ~170 px */
.inner {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%) scale(0.566);
    width: 300px; height: 300px;
    /* must be > 0 otherwise the absolute child collapses */
}

/* ── Original jar CSS (unchanged except scoped here) ── */
.bowl {
    position: absolute;
    top: 0; left: 0;
    width: 300px; height: 300px;
    background: rgba(255,255,255,.1);
    border-radius: 50%;
    border: 8px solid transparent;
    transform-origin: bottom center;
    animation: bowl-rock 4s linear infinite;
}
@keyframes bowl-rock {
    0%   { filter: hue-rotate(0deg);   transform: rotate(0deg);   }
    25%  {                              transform: rotate(-15deg);  }
    50%  {                              transform: rotate(0deg);   }
    75%  {                              transform: rotate(15deg);  }
    100% { filter: hue-rotate(360deg); transform: rotate(0deg);   }
}
.bowl::before {
    content: '';
    position: absolute; top: -15px; left: 50%;
    transform: translateX(-50%);
    width: 40%; height: 30px;
    border: 15px solid #444;
    border-radius: 50%;
    box-shadow: 0 10px #222;
}
.bowl::after {
    content: '';
    position: absolute; top: 40%; left: 50%;
    transform: translate(-50%,-50%);
    width: 150px; height: 80px;
    background: rgba(255,255,255,.05);
    border-radius: 50%;
}

.liquid {
    position: absolute;
    top: 50%; left: 5px; bottom: 5px; right: 5px;
    background: #41c1fb;
    border-bottom-left-radius: 150px;
    border-bottom-right-radius: 150px;
    filter: drop-shadow(0 0 80px #41c1fb);
    transform-origin: top center;
    animation: liq-rock 4s linear infinite;
}
@keyframes liq-rock {
    0%   { transform: rotate(0deg);   }
    25%  { transform: rotate(20deg);  }
    50%  { transform: rotate(0deg);   }
    75%  { transform: rotate(-20deg); }
    100% { transform: rotate(0deg);   }
}
.liquid::before {
    content: '';
    position: absolute; top: -10px;
    width: 100%; height: 20px;
    background: #1fa4e0;
    border-radius: 50%;
    filter: drop-shadow(0 0 80px #41c1fb);
}

.shadow {
    position: absolute;
    top: calc(50% + 150px); left: 50%;
    transform: translate(-50%,-50%);
    width: 300px; height: 30px;
    background: rgba(0,0,0,.5);
    border-radius: 50%;
}
</style>
<div class="outer">
    <div class="inner">
        <div class="shadow"></div>
        <div class="bowl">
            <div class="liquid"></div>
        </div>
    </div>
</div>`;
    }
}
customElements.define('ui-special-jar', UISpecialJar);
