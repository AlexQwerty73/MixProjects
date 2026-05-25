// ── Sound Bars ──────────────────────────────────────────
// Usage: <script type="module" src="sound-bars/index.js"></script>
//        <ui-sound-bars></ui-sound-bars>

class UISoundBars extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' }).innerHTML = `
<style>
:host { display: block; }
.wrap { display: flex; align-items: center; gap: 5px; }
.bar {
    display: inline-block; width: 4px; height: 20px;
    background: rgba(255,255,255,.3); border-radius: 10px;
    animation: bar 1s linear infinite;
}
.bar:nth-child(2) { height: 36px; animation-delay: .25s; }
.bar:nth-child(3) { animation-delay: .5s; }
@keyframes bar {
    20% { background: rgba(255,255,255,.9); transform: scaleY(1.6); }
    40% { transform: scaleY(1); }
}
</style>
<div class="wrap">
    <span class="bar"></span>
    <span class="bar"></span>
    <span class="bar"></span>
</div>`;
    }
}
customElements.define('ui-sound-bars', UISoundBars);
