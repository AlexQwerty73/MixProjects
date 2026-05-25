// ── Bounce Ball ─────────────────────────────────────────
// Usage: <script type="module" src="bounce-ball/index.js"></script>
//        <ui-bounce-ball></ui-bounce-ball>

class UIBounceBall extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' }).innerHTML = `
<style>
:host { display: block; }
.wrap { height: 160px; position: relative; }
.ball {
    width: 80px; height: 80px;
    background: #c35a14;
    border-radius: 50%; border: 2px solid #000;
    background-image:
        radial-gradient(circle at -8px 16px,  transparent 37px, #000 40px, #000 25px, transparent 0),
        radial-gradient(circle at 88px 56px,  transparent 37px, #000 40px, transparent 0),
        linear-gradient(110deg, transparent 46px, #000 49px, transparent 0),
        linear-gradient( 18deg, transparent 42px, #000 46px, transparent 0);
    animation: bounce .5s cubic-bezier(.8,-.5,.2,1.4) infinite alternate;
}
.shadow {
    width: 80px; height: 80px;
    border-radius: 50%; position: absolute;
    bottom: -50px; left: 0;
    animation: shadow .5s cubic-bezier(.8,-.5,.2,1.4) infinite alternate;
}
@keyframes bounce {
    100% { transform: translate3d(0,80px,0) scale3d(1.05,.95,1); }
}
@keyframes shadow {
    0%   { transform: rotateX(80deg) scale3d(.5,.5,1); background: rgba(0,0,0,.1); }
    100% { transform: rotateX(80deg) scale3d(.8,.8,.1); background: rgba(0,0,0,.5); }
}
</style>
<div class="wrap">
    <div class="ball"></div>
    <div class="shadow"></div>
</div>`;
    }
}
customElements.define('ui-bounce-ball', UIBounceBall);
