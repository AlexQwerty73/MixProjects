// ── Progress Bar ────────────────────────────────────────
// Usage: <script type="module" src="progress-bar/index.js"></script>
//        <ui-progress-bar></ui-progress-bar>

class UIProgressBar extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' }).innerHTML = `
<style>
:host { display: block; }
.wrap { width: 168px; }
.meta {
    display: flex; justify-content: space-between;
    font-size: 10px; font-family: inherit;
    color: rgba(255,255,255,.35);
    letter-spacing: .07em; text-transform: uppercase;
    margin-bottom: 8px;
}
.track {
    width: 100%; height: 8px;
    background: rgba(255,255,255,.07);
    border-radius: 4px; overflow: hidden;
}
.fill {
    height: 100%; width: 0; border-radius: 4px;
    background: linear-gradient(90deg, #5b6aff, #a78bfa);
    box-shadow: 0 0 12px rgba(91,106,255,.5);
    animation: fill 1.6s .4s cubic-bezier(.4,0,.2,1) forwards;
}
@keyframes fill { to { width: 75%; } }
</style>
<div class="wrap">
    <div class="meta"><span>Progress</span><span>75%</span></div>
    <div class="track"><div class="fill"></div></div>
</div>`;
    }
}
customElements.define('ui-progress-bar', UIProgressBar);
