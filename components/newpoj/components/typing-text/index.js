// ── Typing Text ─────────────────────────────────────────
// Usage: <script type="module" src="typing-text/index.js"></script>
//        <ui-typing-text></ui-typing-text>

class UITypingText extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' }).innerHTML = `
<style>
:host { display: block; }
.text {
    font-size: 17px; font-family: 'Courier New', monospace;
    color: #4ade80; letter-spacing: .04em;
    white-space: nowrap; overflow: hidden;
    border-right: 2px solid #4ade80;
    width: 0;
    animation:
        type   2.8s steps(14, end) .4s forwards,
        blink  .7s step-end infinite;
}
@keyframes type  { to   { width: 14ch; } }
@keyframes blink { 50%  { border-color: transparent; } }
</style>
<p class="text">Hello, World!</p>`;
    }
}
customElements.define('ui-typing-text', UITypingText);
