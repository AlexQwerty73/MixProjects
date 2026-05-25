// ── Fill Sweep Button ───────────────────────────────────
// Usage: <script type="module" src="fill-sweep/index.js"></script>
//        <ui-fill-sweep></ui-fill-sweep>

class UIFillSweep extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' }).innerHTML = `
<style>
:host { display: block; }
a {
    display: inline-block; text-decoration: none;
    text-transform: uppercase; letter-spacing: 3px;
    font-size: 11.5px; font-family: inherit;
    color: rgba(255,255,255,.8);
    outline: 2px solid rgba(255,255,255,.45);
    padding: 20px 48px;
    position: relative; overflow: hidden;
    transition: color .8s; z-index: 1;
}
a:hover { color: #1a1a1a; }
a::before {
    content: ''; position: absolute;
    top: 0; left: -50px; width: 0; height: 100%;
    background: rgba(255,255,255,.92);
    transform: skewX(35deg); z-index: -1;
    transition: width .8s;
}
a:hover::before { width: 155%; }
</style>
<a href="#">LEARN MORE</a>`;
    }
}
customElements.define('ui-fill-sweep', UIFillSweep);
