// ── Orbit Balls ─────────────────────────────────────────
// Usage: <script type="module" src="orbit-balls/index.js"></script>
//        <ui-orbit-balls></ui-orbit-balls>

class UIOrbitBalls extends HTMLElement {
    connectedCallback() {
        const balls = Array.from({ length: 11 }, (_, i) =>
            `<div class="ball" style="animation-delay:${(i * 0.2).toFixed(2)}s"></div>`
        ).join('');

        this.attachShadow({ mode: 'open' }).innerHTML = `
<style>
:host { display: block; position: relative; width: 100%; height: 100%; }
.ball {
    width: 7px; height: 7px;
    background: #fff; box-shadow: 0 0 7px 3px #fff;
    border-radius: 50%; position: absolute;
    top: calc(50% - 3.5px); left: calc(50% - 3.5px);
    visibility: hidden;
    animation: orbit 2.2s infinite linear;
}
@keyframes orbit {
    0%  { visibility:visible; transform:translate(  0px,  0px) scale(.90);  }
    5%  {                     transform:translate(-20px, 30px) scale(1);    }
    10% {                     transform:translate(-40px, 40px) scale(1.1);  }
    15% {                     transform:translate(-60px, 40px) scale(1.15); }
    20% {                     transform:translate(-80px, 30px) scale(1.2);  }
    25% {                     transform:translate(-90px,  0px) scale(1.25); }
    30% {                     transform:translate(-80px,-30px) scale(1.3);  }
    35% {                     transform:translate(-60px,-40px) scale(1.35); }
    40% {                     transform:translate(-40px,-40px) scale(1.4);  }
    45% {                     transform:translate(-20px,-30px) scale(1.3);  }
    50% {                     transform:translate(  0px,  0px) scale(1.2);  }
    55% {                     transform:translate( 20px, 30px) scale(1.15); }
    60% {                     transform:translate( 40px, 40px) scale(1.1);  }
    65% {                     transform:translate( 60px, 40px) scale(1);    }
    70% {                     transform:translate( 80px, 30px) scale(.95);  }
    75% {                     transform:translate( 90px,  0px) scale(.9);   }
    80% {                     transform:translate( 80px,-30px) scale(.85);  }
    85% {                     transform:translate( 60px,-40px) scale(.75);  }
    90% {                     transform:translate( 40px,-40px) scale(.7);   }
    95% {                     transform:translate( 20px,-30px) scale(.75);  }
}
</style>
${balls}`;
    }
}
customElements.define('ui-orbit-balls', UIOrbitBalls);
