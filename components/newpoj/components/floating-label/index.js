// ── Floating Label Input ────────────────────────────────
// Usage: <script type="module" src="floating-label/index.js"></script>
//        <ui-floating-label></ui-floating-label>

class UIFloatingLabel extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' }).innerHTML = `
<style>
:host { display: block; }
.field { position: relative; width: 170px; }
input {
    width: 100%; background: transparent;
    border: none; border-bottom: 1.5px solid rgba(255,255,255,.2);
    padding: 20px 0 6px; font-size: 14px; font-family: inherit;
    color: #fff; outline: none;
    transition: border-color .2s;
    caret-color: #5b6aff;
}
input:focus { border-color: #5b6aff; }
label {
    position: absolute; top: 20px; left: 0;
    font-size: 13px; font-family: inherit;
    color: rgba(255,255,255,.3);
    pointer-events: none;
    transition: top .18s, font-size .18s, color .18s, letter-spacing .18s;
}
input:focus + label,
input:not(:placeholder-shown) + label {
    top: 2px; font-size: 9px;
    color: #5b6aff; letter-spacing: .1em;
    text-transform: uppercase;
}
.bar {
    position: absolute; bottom: 0; left: 50%;
    width: 0; height: 1.5px;
    background: #5b6aff;
    transition: width .25s, left .25s;
}
input:focus ~ .bar { width: 100%; left: 0; }
</style>
<div class="field">
    <input type="text" placeholder=" ">
    <label>Your name</label>
    <div class="bar"></div>
</div>`;
    }
}
customElements.define('ui-floating-label', UIFloatingLabel);
