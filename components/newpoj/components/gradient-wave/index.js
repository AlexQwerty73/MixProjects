// ── Gradient Wave ───────────────────────────────────────
// Usage: <script type="module" src="gradient-wave/index.js"></script>
//        <ui-gradient-wave></ui-gradient-wave>
// Note:  Host card must have position:relative and overflow:hidden.
//        This component fills the card completely.

class UIGradientWave extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' }).innerHTML = `
<style>
:host {
    display: block;
    position: absolute; inset: 0;
}
.bg {
    width: 100%; height: 100%;
    background: linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045);
    background-size: 400% 400%;
    animation: wave 8s ease-in-out infinite;
}
@keyframes wave {
    0%   { background-position: 0   50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0   50%; }
}
</style>
<div class="bg"></div>`;
    }
}
customElements.define('ui-gradient-wave', UIGradientWave);
