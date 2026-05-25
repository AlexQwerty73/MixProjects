// ── Cross Balls ─────────────────────────────────────────
// Usage: <script type="module" src="cross-balls/index.js"></script>
//        <ui-cross-balls></ui-cross-balls>

class UICrossBalls extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' }).innerHTML = `
<style>
:host { display: block; position: relative; width: 100%; height: 100%; }
.ball {
    width: 10px; height: 10px; border-radius: 50%;
    background: #fff;
    box-shadow: 0 0 5px 2px #fff, 0 0 10px 4px #fff;
    position: absolute;
    top: calc(50% - 5px); left: calc(50% - 5px);
}
.b1 { animation: b1 1s infinite linear; }
.b2 { animation: b2 1s infinite linear; }
.b3 { animation: b3 1s infinite linear; }
.b4 { animation: b4 1s infinite linear; }
@keyframes b1 {
    0%,100% { transform: translate(-60px, 0); }
    50%     { transform: translate( 60px, 0); }
}
@keyframes b2 {
    0%,100% { transform: translate(-60px,  60px); }
    25%,75% { transform: translate(  0px,   0px); }
    50%     { transform: translate( 60px, -60px); }
}
@keyframes b3 {
    0%,50%,100% { transform: translate(0,  60px); }
    25%,75%     { transform: translate(0, -60px); }
}
@keyframes b4 {
    0%,50%  { transform: translate(  0px,   0px); }
    25%     { transform: translate(-60px, -60px); }
    75%     { transform: translate( 60px,  60px); }
    100%    { transform: translate(  0px,   0px); }
}
</style>
<div class="ball b1"></div>
<div class="ball b2"></div>
<div class="ball b3"></div>
<div class="ball b4"></div>`;
    }
}
customElements.define('ui-cross-balls', UICrossBalls);
