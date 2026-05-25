// ── Hamburger Menu ──────────────────────────────────────
// Usage: <script type="module" src="hamburger/index.js"></script>
//        <ui-hamburger></ui-hamburger>

class UIHamburger extends HTMLElement {
    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.innerHTML = `
<style>
:host { display: block; }
button {
    background: transparent; border: none;
    outline: none; cursor: pointer; padding: 8px;
}
.line {
    display: flex; width: 34px; height: 2.5px;
    background: rgba(255,255,255,.8);
    margin-block: 8px; border-radius: 4px;
    transition: transform .4s, opacity .2s;
}
button.active .line:nth-child(1) { transform: translateY(10.5px) rotate(45deg); }
button.active .line:nth-child(2) { opacity: 0; }
button.active .line:nth-child(3) { transform: translateY(-10.5px) rotate(-45deg); }
</style>
<button>
    <span class="line"></span>
    <span class="line"></span>
    <span class="line"></span>
</button>`;

        shadow.querySelector('button').addEventListener('click', function () {
            this.classList.toggle('active');
        });
    }
}
customElements.define('ui-hamburger', UIHamburger);
