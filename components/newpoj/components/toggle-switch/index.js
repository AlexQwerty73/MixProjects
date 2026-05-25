// ── Toggle Switch ───────────────────────────────────────
// Usage: <script type="module" src="toggle-switch/index.js"></script>
//        <ui-toggle-switch></ui-toggle-switch>

class UIToggleSwitch extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' }).innerHTML = `
<style>
:host { display: block; }
label { cursor: pointer; display: flex; align-items: center; gap: 12px; }
input { display: none; }
.track {
    width: 52px; height: 28px; background: #2a2a2e;
    border: 1.5px solid rgba(255,255,255,.1);
    border-radius: 14px; position: relative;
    transition: background .25s, border-color .25s;
}
.thumb {
    width: 20px; height: 20px; background: rgba(255,255,255,.5);
    border-radius: 50%; position: absolute;
    top: 3px; left: 3px;
    transition: transform .25s, background .25s, box-shadow .25s;
}
input:checked ~ .track {
    background: #5b6aff;
    border-color: #5b6aff;
}
input:checked ~ .track .thumb {
    transform: translateX(24px);
    background: #fff;
    box-shadow: 0 2px 8px rgba(91,106,255,.6);
}
span {
    font-family: inherit; font-size: 13px;
    color: rgba(255,255,255,.5);
    transition: color .25s;
}
input:checked ~ span { color: rgba(255,255,255,.85); }
</style>
<label>
    <input type="checkbox">
    <div class="track"><div class="thumb"></div></div>
    <span>Toggle</span>
</label>`;
    }
}
customElements.define('ui-toggle-switch', UIToggleSwitch);
