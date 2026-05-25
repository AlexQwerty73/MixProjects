// ── Blob Loader ─────────────────────────────────────────
// Usage: <script type="module" src="blob-loader/index.js"></script>
//        <ui-blob-loader></ui-blob-loader>

class UIBlobLoader extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' }).innerHTML = `
<style>
:host { display: block; }
.loader {
    width: 90px; height: 90px;
    position: relative; left: -45px; z-index: 1;
}
.loader::before, .loader::after {
    content: ''; position: absolute;
    width: inherit; height: inherit;
    border-radius: 50%; mix-blend-mode: multiply;
    animation: blob 1s infinite;
}
.loader::before { background: #fc3f9e; }
.loader::after  { background: #50e8f3; animation-delay: .5s; }
@keyframes blob {
    0%, 100% { left: 85px; }
    25%      { transform: scale(.3); }
    50%      { left: 0; }
    75%      { transform: scale(1); }
}
</style>
<span class="loader"></span>`;
    }
}
customElements.define('ui-blob-loader', UIBlobLoader);
