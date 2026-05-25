// ── CSS Clock ───────────────────────────────────────────
// Usage: <script type="module" src="css-clock/index.js"></script>
//        <ui-css-clock></ui-css-clock>

class UICssClock extends HTMLElement {
    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.innerHTML = `
<style>
:host { display: block; }
.clock {
    width: 100px; height: 100px; border-radius: 50%;
    border: 2px solid rgba(255,255,255,.12);
    background: rgba(255,255,255,.03);
    position: relative;
    box-shadow: 0 0 0 6px rgba(255,255,255,.03), inset 0 0 20px rgba(0,0,0,.3);
}
/* 12-o'clock tick */
.clock::before {
    content: ''; position: absolute;
    top: 6px; left: 50%; transform: translateX(-50%);
    width: 2px; height: 8px;
    background: rgba(255,255,255,.25); border-radius: 2px;
}
/* centre dot */
.clock::after {
    content: ''; position: absolute;
    width: 8px; height: 8px; background: #5b6aff;
    border-radius: 50%; top: 50%; left: 50%;
    transform: translate(-50%,-50%); z-index: 4;
    box-shadow: 0 0 6px #5b6aff;
}
.hand {
    position: absolute; bottom: 50%; left: 50%;
    transform-origin: bottom center;
    border-radius: 3px 3px 0 0;
}
.hour   { width: 4px;   height: 26px; background: #fff;                margin-left: -2px; }
.minute { width: 2.5px; height: 34px; background: rgba(255,255,255,.7); margin-left: -1.25px; }
.second { width: 1px;   height: 38px; background: #f87171;              margin-left: -.5px; }
</style>
<div class="clock">
    <div class="hand hour"></div>
    <div class="hand minute"></div>
    <div class="hand second"></div>
</div>`;

        const hour   = shadow.querySelector('.hour');
        const minute = shadow.querySelector('.minute');
        const second = shadow.querySelector('.second');

        const tick = () => {
            const now = new Date();
            const s = now.getSeconds();
            const m = now.getMinutes() + s / 60;
            const h = (now.getHours() % 12) + m / 60;
            hour  .style.transform = `rotate(${h * 30}deg)`;
            minute.style.transform = `rotate(${m * 6}deg)`;
            second.style.transform = `rotate(${s * 6}deg)`;
        };

        tick();
        this._interval = setInterval(tick, 1000);
    }

    disconnectedCallback() {
        clearInterval(this._interval);
    }
}
customElements.define('ui-css-clock', UICssClock);
