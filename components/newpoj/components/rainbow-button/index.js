// ── Rainbow Border Button ───────────────────────────────
// Usage: <script type="module" src="rainbow-button/index.js"></script>
//        <ui-rainbow-button></ui-rainbow-button>

class UIRainbowButton extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' }).innerHTML = `
<style>
:host { display: block; }
a {
    display: inline-block; text-decoration: none;
    color: #fff; padding: 3px; border-radius: 6px;
    position: relative; overflow: hidden;
    font-size: 13px; letter-spacing: .04em; font-family: inherit;
}
a::before {
    content: ''; position: absolute; inset: 0;
    width: 200%; height: 100%;
    background: linear-gradient(115deg, #4fcf70, #fad648, #a767e5, #12bcfe, #44ce7b);
    background-size: 50% 100%;
    border-radius: inherit;
}
a:hover::before { animation: rainbow .75s linear infinite; }
span {
    display: block;
    background: var(--card, #131315);
    padding: 12px 22px; border-radius: 4px;
    position: relative; z-index: 2;
}
@keyframes rainbow { to { transform: translateX(-50%); } }
</style>
<a href="#"><span>Start Coding</span></a>`;
    }
}
customElements.define('ui-rainbow-button', UIRainbowButton);
