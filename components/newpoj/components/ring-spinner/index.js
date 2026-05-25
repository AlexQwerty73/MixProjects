// ── Ring Spinner ────────────────────────────────────────
// Usage: <script type="module" src="ring-spinner/index.js"></script>
//        <ui-ring-spinner></ui-ring-spinner>

class UIRingSpinner extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' }).innerHTML = `
<style>
:host { display: block; }
.wrap { width: 58px; height: 58px; }
.ring {
    box-sizing: border-box; width: 100%; height: 100%;
    border: 9px solid rgba(16,28,40,.9);
    border-top-color: #4bc8eb; border-bottom-color: #f13a8f;
    border-radius: 50%; animation: spin 5s linear infinite;
}
.inner {
    border-top-color: #36f372; border-bottom-color: #fff;
    animation-duration: 2.5s;
}
@keyframes spin {
    0%   { transform: scale(1)    rotate( 360deg); }
    50%  { transform: scale(.82)  rotate(-360deg); }
    100% { transform: scale(1)    rotate( 360deg); }
}
</style>
<div class="wrap">
    <div class="ring">
        <div class="ring inner"></div>
    </div>
</div>`;
    }
}
customElements.define('ui-ring-spinner', UIRingSpinner);
