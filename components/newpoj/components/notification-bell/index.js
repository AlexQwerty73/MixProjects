// ── Notification Bell ───────────────────────────────────
// Usage: <script type="module" src="notification-bell/index.js"></script>
//        <ui-notification-bell></ui-notification-bell>

class UINotificationBell extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' }).innerHTML = `
<style>
:host { display: block; }
.wrap {
    position: relative; display: inline-flex;
    align-items: center; justify-content: center;
    cursor: pointer; padding: 8px;
}
.bell {
    font-size: 44px; display: block;
    transform-origin: top center;
    filter: drop-shadow(0 2px 8px rgba(0,0,0,.4));
}
.wrap:hover .bell { animation: shake .45s ease-in-out; }
.badge {
    position: absolute; top: 4px; right: 2px;
    background: #ef4444; color: #fff;
    font-size: 10px; font-family: inherit; font-weight: 700;
    min-width: 18px; height: 18px; border-radius: 9px;
    display: flex; align-items: center; justify-content: center;
    padding: 0 4px;
    box-shadow: 0 0 0 2px var(--card, #131315);
    animation: pop-in .3s cubic-bezier(.36,.07,.19,.97) both;
}
@keyframes shake {
    0%,100% { transform: rotate(0); }
    20%     { transform: rotate(20deg); }
    40%     { transform: rotate(-18deg); }
    60%     { transform: rotate(14deg); }
    80%     { transform: rotate(-8deg); }
}
@keyframes pop-in {
    from { transform: scale(0); }
    to   { transform: scale(1); }
}
</style>
<div class="wrap">
    <span class="bell">🔔</span>
    <span class="badge">3</span>
</div>`;
    }
}
customElements.define('ui-notification-bell', UINotificationBell);
