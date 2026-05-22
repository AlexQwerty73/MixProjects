document.addEventListener('mousemove', parallax);

function parallax(e) {
    this.querySelectorAll('.elem').forEach(elem => {
        const speed = elem.getAttribute('data-speed');
        const x = (window.innerWidth - e.pageX * speed);
        const y = (window.innerHeight - e.pageY * speed);
        elem.style.transform = `translateX(${x/100}px) translateY(${y/100}px) `;
    });

}