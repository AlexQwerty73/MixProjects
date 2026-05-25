// ── Tilt Card ───────────────────────────────────────────
// Usage: <script type="module" src="tilt-card/index.js"></script>
//        <ui-tilt-card></ui-tilt-card>
// Assets: img/whatsapp-icon.png  (must live next to index.js)

const _tiltBase = new URL('.', import.meta.url).href;

class UITiltCard extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' }).innerHTML = `
<style>
:host { display: block; }
.card {
    width: 110px; height: 155px; background: #fff;
    border-radius: 6px;
    transform: rotate(18deg) skew(-8deg,-4deg);
    transition: box-shadow .25s;
    display: flex; justify-content: center; align-items: center;
}
.card:hover {
    box-shadow:
        rgba(255,255,255,.5)  5px  3px,
        rgba(255,255,255,.4) 10px  6px,
        rgba(255,255,255,.3) 15px  9px;
}
img { width: 55px; }
</style>
<div class="card">
    <img src="${_tiltBase}img/whatsapp-icon.png" alt="icon">
</div>`;
    }
}
customElements.define('ui-tilt-card', UITiltCard);
