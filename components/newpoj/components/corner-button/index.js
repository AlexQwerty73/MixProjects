// ── Corner Button ───────────────────────────────────────
// Usage: <script type="module" src="corner-button/index.js"></script>
//        <ui-corner-button></ui-corner-button>

class UICornerButton extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' }).innerHTML = `
<style>
:host { display: block; }
a {
    display: inline-block; text-decoration: none;
    font-size: 18px; letter-spacing: .04em; font-family: inherit;
    color: #1fe8b6; padding: 16px 42px;
    border: 2px solid #1fe8b6; position: relative;
}
a::before, a::after {
    content: ''; position: absolute;
    width: 34px; height: 34px;
    border: inherit; transition: all .45s;
}
a::before { top: -11px;    left: -11px;  border-width: 2px 0 0 2px; }
a::after  { bottom: -11px; right: -11px; border-width: 0 2px 2px 0; }
a:hover::before, a:hover::after {
    width:  calc(100% + 20px);
    height: calc(100% + 20px);
}
</style>
<a href="#">Learn more</a>`;
    }
}
customElements.define('ui-corner-button', UICornerButton);
