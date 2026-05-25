// ── Skeleton Loader ─────────────────────────────────────
// Usage: <script type="module" src="skeleton-loader/index.js"></script>
//        <ui-skeleton-loader></ui-skeleton-loader>

class UISkeletonLoader extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' }).innerHTML = `
<style>
:host { display: block; }
.wrap { width: 160px; }
.skel {
    background: linear-gradient(90deg, #222 25%, #2e2e2e 50%, #222 75%);
    background-size: 200% 100%;
    border-radius: 6px;
    animation: shimmer 1.4s infinite linear;
}
.img  { width: 100%; height: 80px; margin-bottom: 10px; border-radius: 8px; }
.line { height: 10px; margin-bottom: 8px; }
.w100 { width: 100%; }
.w70  { width: 70%; }
.w45  { width: 45%; }
@keyframes shimmer {
    0%   { background-position:  200% 0; }
    100% { background-position: -200% 0; }
}
</style>
<div class="wrap">
    <div class="skel img"></div>
    <div class="skel line w100"></div>
    <div class="skel line w70"></div>
    <div class="skel line w45"></div>
</div>`;
    }
}
customElements.define('ui-skeleton-loader', UISkeletonLoader);
