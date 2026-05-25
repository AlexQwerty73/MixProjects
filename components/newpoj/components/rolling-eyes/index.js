// ── Rolling Eyes ────────────────────────────────────────
// Usage: <script type="module" src="rolling-eyes/index.js"></script>
//        <ui-rolling-eyes></ui-rolling-eyes>

class UIRollingEyes extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' }).innerHTML = `
<style>
:host { display: block; }
.face {
    width: 88px; height: 88px; border-radius: 50%;
    background: #d8c557;
    box-shadow: inset -3px 0 0 4px rgba(255,102,0,.15);
    position: relative;
}
.eye {
    width: 25px; height: 25px;
    background: #fff; border-radius: 50%;
    position: absolute; top: 26px; left: 10px;
}
.eye:last-child { left: auto; right: 10px; }
.eye::after {
    content: ''; width: 11px; height: 11px;
    background: #000; border-radius: 50%;
    position: absolute; top: 50%; left: 50%;
    transform: translate(-50%,-50%);
    animation: eyes 2s ease-in-out infinite;
}
.mouth {
    width: 18px; height: 4px; background: #884d0e;
    border-radius: 5px; position: absolute;
    bottom: 17px; left: 50%; transform: translateX(-50%);
}
@keyframes eyes {
    10%      { transform: translate(-13px,-50%); }
    20%      { transform: translate(-13px,-10px); }
    30%, 90% { transform: translate(-50%,-14px); }
}
</style>
<div class="face">
    <div class="eyes">
        <div class="eye"></div>
        <div class="eye"></div>
    </div>
    <div class="mouth"></div>
</div>`;
    }
}
customElements.define('ui-rolling-eyes', UIRollingEyes);
