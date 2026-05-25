// ── Scroll Mouse ────────────────────────────────────────
// Usage: <script type="module" src="scroll-mouse/index.js"></script>
//        <ui-scroll-mouse></ui-scroll-mouse>

class UIScrollMouse extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' }).innerHTML = `
<style>
:host { display: block; }
.mouse {
    width: 24px; height: 44px;
    border: 2px solid rgba(255,255,255,.6);
    border-radius: 20px; display: flex;
}
.wheel {
    display: block; width: 8px; height: 8px;
    background: rgba(255,255,255,.75);
    border-radius: 50%; margin: auto;
    animation: scroll 1s linear infinite;
}
@keyframes scroll {
    0%   { opacity: 0; transform: translateY(-8px); }
    100% { opacity: 1; transform: translateY( 8px); }
}
</style>
<span class="mouse"><span class="wheel"></span></span>`;
    }
}
customElements.define('ui-scroll-mouse', UIScrollMouse);
