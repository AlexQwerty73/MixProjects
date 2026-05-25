// ── Pulse Button ────────────────────────────────────────
// Usage: <script type="module" src="pulse-button/index.js"></script>
//        <ui-pulse-button></ui-pulse-button>

class UIPulseButton extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' }).innerHTML = `
<style>
:host { display: block; }
a {
    display: inline-block; color: #fff; text-decoration: none;
    font-size: 13px; letter-spacing: .06em;
    padding: 15px 40px;
    border: 2px solid #3c67e3; border-radius: 8px;
    transition: box-shadow .2s;
    font-family: inherit;
}
a:hover { animation: pulse 1s ease-in-out; }
@keyframes pulse {
    0%   { box-shadow: 0 0 22px #5ddcff, 0 0 46px #4e00c2; }
    100% { box-shadow: none; }
}
</style>
<a href="#">Learn more</a>`;
    }
}
customElements.define('ui-pulse-button', UIPulseButton);
