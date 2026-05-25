// ── Ripple Button ───────────────────────────────────────
// Usage: <script type="module" src="ripple-button/index.js"></script>
//        <ui-ripple-button></ui-ripple-button>

class UIRippleButton extends HTMLElement {
    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.innerHTML = `
<style>
:host { display: block; }
button {
    position: relative; overflow: hidden;
    background: #5b6aff; border: none; outline: none;
    color: #fff; font-size: 14px; font-family: inherit;
    letter-spacing: .06em; padding: 14px 40px;
    border-radius: 8px; cursor: pointer;
    transition: background .2s;
}
button:hover { background: #4a58e0; }
.ripple {
    position: absolute; border-radius: 50%;
    background: rgba(255,255,255,.35);
    transform: scale(0);
    animation: ripple .55s linear;
    pointer-events: none;
}
@keyframes ripple { to { transform: scale(4); opacity: 0; } }
</style>
<button>Click me</button>`;

        shadow.querySelector('button').addEventListener('click', function (e) {
            const r    = this.getBoundingClientRect();
            const size = Math.max(r.width, r.height);
            const s    = document.createElement('span');
            s.className = 'ripple';
            s.style.cssText = `width:${size}px;height:${size}px;` +
                `left:${e.clientX - r.left - size/2}px;` +
                `top:${e.clientY  - r.top  - size/2}px`;
            this.appendChild(s);
            setTimeout(() => s.remove(), 600);
        });
    }
}
customElements.define('ui-ripple-button', UIRippleButton);
