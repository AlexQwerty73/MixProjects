// ── Neon Text ───────────────────────────────────────────
// Usage: <script type="module" src="neon-text/index.js"></script>
//        <ui-neon-text></ui-neon-text>

class UINeonText extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' }).innerHTML = `
<style>
:host { display: block; }
.neon {
    font-size: 46px; font-weight: 900;
    font-family: 'Segoe UI', sans-serif;
    letter-spacing: .12em;
    color: #fff;
    text-shadow:
        0 0  6px #fff,
        0 0 14px #fff,
        0 0 30px #f0f,
        0 0 60px #f0f;
    animation: flicker 4s infinite;
    user-select: none;
}
@keyframes flicker {
    0%,18%,20%,22%,52%,54%,64%,100% {
        text-shadow:
            0 0  6px #fff,
            0 0 14px #fff,
            0 0 30px #f0f,
            0 0 60px #f0f;
        color: #fff;
    }
    19%,21%,53%,63% {
        text-shadow: none;
        color: rgba(255,255,255,.6);
    }
}
</style>
<p class="neon">NEON</p>`;
    }
}
customElements.define('ui-neon-text', UINeonText);
