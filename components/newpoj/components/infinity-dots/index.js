// ── Infinity Dots ───────────────────────────────────────
// Usage: <script type="module" src="infinity-dots/index.js"></script>
//        <ui-infinity-dots></ui-infinity-dots>

const DOTS = 21;

class UIInfinityDots extends HTMLElement {
    connectedCallback() {
        const makeCircle = () =>
            Array.from({ length: DOTS }, (_, i) =>
                `<span style="--i:${i}"></span>`
            ).join('');

        this.attachShadow({ mode: 'open' }).innerHTML = `
<style>
:host { display: block; }

.wrap {
    position: relative;
    display: flex;
    animation: hue 12s linear infinite;
}
@keyframes hue {
    to { filter: hue-rotate(360deg); }
}

/* Bloom glow in the centre of the ∞ */
.wrap::before {
    content: '';
    position: absolute; top: 50%; left: 50%;
    translate: -50% -50%;
    width: 110px; height: 60px;
    border-radius: 50%;
    background: radial-gradient(ellipse at center, rgba(0,255,10,.14) 0%, transparent 70%);
    pointer-events: none;
}

.circle {
    position: relative;
    width: 100px; height: 100px;
    margin: 0 -5px;
}
.circle:nth-child(2) { transform: rotate(-180deg); }
.circle:nth-child(2) span::before { animation-delay: calc(-0.05s * var(--i)); }

.circle span {
    position: absolute; inset: 0;
    transform: rotate(calc(18deg * var(--i)));
}
.circle span::before {
    content: '';
    position: absolute; right: 0; top: calc(50% - 4.5px);
    width: 9px; height: 9px;
    background: #00ff0a; border-radius: 50%;
    box-shadow:
        0 0  3px #00ff0a,
        0 0  6px #00ff0a,
        0 0 12px #00ff0a,
        0 0 20px #00ff0a,
        0 0 35px #00ff0a,
        0 0 50px rgba(0,255,10,.5);
    transform: scale(.1);
    animation: pulse 2s linear infinite;
    animation-delay: calc(0.05s * var(--i));
}
@keyframes pulse {
    0%       { transform: scale(1);  }
    50%,100% { transform: scale(.1); }
}
</style>
<div class="wrap">
    <div class="circle">${makeCircle()}</div>
    <div class="circle">${makeCircle()}</div>
</div>`;
    }
}
customElements.define('ui-infinity-dots', UIInfinityDots);
