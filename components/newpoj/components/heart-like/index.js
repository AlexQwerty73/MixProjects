// ── Heart Like ──────────────────────────────────────────
// Usage: <script type="module" src="heart-like/index.js"></script>
//        <ui-heart-like></ui-heart-like>

class UIHeartLike extends HTMLElement {
    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.innerHTML = `
<style>
:host { display: block; }
.btn {
    background: none; border: none; outline: none;
    cursor: pointer; padding: 4px; line-height: 1;
    display: flex; flex-direction: column;
    align-items: center; gap: 6px;
}
.heart {
    font-size: 52px; display: block;
    filter: grayscale(1) brightness(.6);
    transition: filter .2s, transform .15s;
}
.count {
    font-size: 12px; font-family: inherit;
    color: rgba(255,255,255,.3);
    transition: color .2s;
}
.btn.liked .heart {
    filter: none;
    animation: pop .35s cubic-bezier(.36,.07,.19,.97);
}
.btn.liked .count { color: #f87171; }
.btn:active .heart { transform: scale(.82); }
@keyframes pop {
    0%   { transform: scale(1); }
    40%  { transform: scale(1.4); }
    70%  { transform: scale(.9); }
    100% { transform: scale(1); }
}
</style>
<button class="btn">
    <span class="heart">❤️</span>
    <span class="count">24</span>
</button>`;

        let count = 24;
        const btn   = shadow.querySelector('.btn');
        const label = shadow.querySelector('.count');

        btn.addEventListener('click', () => {
            const liked = btn.classList.toggle('liked');
            count += liked ? 1 : -1;
            label.textContent = count;
        });
    }
}
customElements.define('ui-heart-like', UIHeartLike);
