// ── AirPods Case ────────────────────────────────────────
// Usage: <script type="module" src="airpods-case/index.js"></script>
//        <ui-airpods-case></ui-airpods-case>
// Note:  Host card should have overflow:visible and transform-style:preserve-3d

class UIAirpodsCase extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' }).innerHTML = `
<style>
:host { display: block; }
.case { display: flex; flex-direction: column; align-items: center; }
.lid {
    width: 130px; height: 48px; background: #f5f5f5;
    border-radius: 38px 38px 0 0;
    box-shadow: inset 0 12px 10px 10px rgba(34,60,80,.2);
    position: relative;
    transform-origin: bottom center;
    transition: transform 2s ease-in-out, border-radius 2s ease-in-out;
}
.lid-inner {
    transform-origin: center;
    transform: translateZ(-35px) translateY(10px) rotateX(90deg);
    background: #f0f0f0; width: 130px; height: 65px;
    border-radius: 40px; position: absolute;
    box-shadow: inset 0 0 20px 10px rgba(78,78,78,.4);
    transition: transform 2s ease-in-out;
}
.lid-shadow {
    width: 50%; height: 5px; background: rgba(0,0,0,.1);
    position: relative; left: 25%;
    border-radius: 38px 38px 0 0;
    top: calc(100% - 5px);
    transition: transform 2s ease-in-out;
}
.body {
    width: 130px; height: 118px;
    border-top: 1px solid #d0d0d0;
    box-shadow: inset 0 -12px 10px 10px rgba(34,60,80,.2);
    background: #f5f5f5; border-radius: 0 0 22% 22%;
}
.body-shadow {
    width: 50%; height: 5px; background: rgba(0,0,0,.1);
    position: relative; left: 25%; top: -1px;
    border-radius: 0 0 38px 38px;
}
/* Hover open animation */
.case:hover .lid-inner  { transform: translateZ(10px) translateY(-5px) rotateX(150deg); }
.case:hover .lid-shadow { transform: translateY(-3em) translateZ(10px) rotateX(10deg); }
.case:hover .lid        { transform: translateY(-14px) rotateX(30deg); border-radius: 38px 38px 12px 12px; }
</style>
<div class="case">
    <div class="lid">
        <div class="lid-shadow"></div>
        <div class="lid-inner"></div>
    </div>
    <div class="body">
        <div class="body-shadow"></div>
    </div>
</div>`;
    }
}
customElements.define('ui-airpods-case', UIAirpodsCase);
