// ── Zoom Image ──────────────────────────────────────────
// Usage: <script type="module" src="zoom-image/index.js"></script>
//        <ui-zoom-image></ui-zoom-image>
// Assets: img/section_20_img1.png  (must live next to index.js)

const _zoomBase = new URL('.', import.meta.url).href;

class UIZoomImage extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' }).innerHTML = `
<style>
:host { display: block; }
.frame {
    width: 120px; height: 120px;
    overflow: hidden; border-radius: 10px;
}
img {
    width: 100%; height: 100%; object-fit: cover;
    transition: transform .25s ease-in-out;
    display: block;
}
.frame:hover img { transform: scale(1.3); }
</style>
<div class="frame">
    <img src="${_zoomBase}img/section_20_img1.png" alt="preview">
</div>`;
    }
}
customElements.define('ui-zoom-image', UIZoomImage);
