// ── Star Balls ──────────────────────────────────────────
// Usage: <script type="module" src="star-balls/index.js"></script>
//        <ui-star-balls></ui-star-balls>

class UIStarBalls extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' }).innerHTML = `
<style>
:host { display: block; position: relative; width: 100%; height: 100%; }
.ball {
    width: 10px; height: 10px; background: #fff;
    box-shadow: 0 0 5px 2px #fff, 0 0 10px 4px #fff;
    border-radius: 50%; position: absolute;
    top: calc(50% - 5px); left: calc(50% - 5px);
}
.b1 { animation: b1 2s infinite linear; }
.b2 { animation: b2 2s infinite linear; }
.b3 { animation: b3 2s infinite linear; }
.b4 { animation: b4 2s infinite linear; }
.b5 { animation: b5 2s infinite linear; }
.b6 { animation: b6 2s infinite linear; }
@keyframes b1 {
    0%,100% { transform: translate(-80px,   0); }
    25%,75% { transform: translate(  0px,   0); }
    50%     { transform: translate( 80px,   0); }
}
@keyframes b2 {
    0%,100% { transform: translate(-60px,-36px); }
    25%     { transform: translate(-36px,-20px); }
    50%     { transform: translate( 60px, 36px); }
    75%     { transform: translate( 36px, 20px); }
}
@keyframes b3 {
    0%,100% { transform: translate(-20px,-36px); }
    25%     { transform: translate(-36px,-60px); }
    50%     { transform: translate( 20px, 36px); }
    75%     { transform: translate( 36px, 60px); }
}
@keyframes b4 {
    0%,50%  { transform: translate(0,    0); }
    25%     { transform: translate(0, -80px); }
    75%     { transform: translate(0,  80px); }
    100%    { transform: translate(0,    0); }
}
@keyframes b5 {
    0%,100% { transform: translate(-20px, 36px); }
    25%     { transform: translate( 36px,-60px); }
    50%     { transform: translate( 20px,-36px); }
    75%     { transform: translate(-36px, 60px); }
}
@keyframes b6 {
    0%,100% { transform: translate(-60px, 36px); }
    25%     { transform: translate( 36px,-20px); }
    50%     { transform: translate( 60px,-36px); }
    75%     { transform: translate(-36px, 20px); }
}
</style>
<div class="ball b1"></div>
<div class="ball b2"></div>
<div class="ball b3"></div>
<div class="ball b4"></div>
<div class="ball b5"></div>
<div class="ball b6"></div>`;
    }
}
customElements.define('ui-star-balls', UIStarBalls);
