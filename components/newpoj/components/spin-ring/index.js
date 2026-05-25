// ── Spin Ring ───────────────────────────────────────────
// Usage: <script type="module" src="spin-ring/index.js"></script>
//        <ui-spin-ring></ui-spin-ring>

class UISpinRing extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' }).innerHTML = `
<style>
:host { display: block; }
.ring {
    position: relative; width: 68px; height: 68px;
    border-radius: 50%;
}
.ring::before, .ring::after {
    content: ''; position: absolute; border-radius: inherit;
}
.ring::before {
    inset: 0;
    background: linear-gradient(0deg, #ff00cc 0%, #333399 100%);
    animation: spin .5s linear infinite;
}
.ring::after {
    width: 85%; height: 85%;
    background: var(--card, #131315);
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
}
@keyframes spin { to { transform: rotate(360deg); } }
</style>
<div class="ring"></div>`;
    }
}
customElements.define('ui-spin-ring', UISpinRing);
