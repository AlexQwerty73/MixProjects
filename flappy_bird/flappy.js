let bird = new Image();
bird.src = "img/bird.png";
let back = new Image();
back.src = "img/back.png";
let pipebottom = new Image();
pipebottom.src = "img/pipeBottom.png";
let pipeup = new Image();
pipeup.src = "img/pipeUp.png";
let road = new Image();
road.src = "img/road.png";

let fly = new Audio();
fly.src = "audio/fly.mp3";
let score = new Audio();
score.src = "audio/score.mp3";

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
canvas.width = 256;
canvas.height = 512;

let gravity = 0.2;
let xPos = 0;
let yPos = 200;
let velY = 0;
let velX = 0;
let pph = 100;
let pause = false;
let st = 1;
let ran = 0;

let lw = 0;
let lw2 = 0;
let maxscore = 0;

let pipe = [];
pipe[0] = {
    x: canvas.width,
    y: 0
}

function Random(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function draw() {
    if (!pause && st > 1) {
        velY = velY + gravity;
        yPos = yPos + velY;

        ctx.drawImage(back, 0, 0);

        for (let i = 0; i < pipe.length; i++) {
            pipe[i].x -= 2;
            ctx.drawImage(pipeup, pipe[i].x, pipe[i].y);
            ctx.drawImage(pipebottom, pipe[i].x, pipe[i].y + pipeup.height + pph);


            if (pipe[i].x < xPos + bird.width && pipe[i].x + pipeup.width > xPos) {
                lw++;
                if (pipe[i].y + pipeup.height + (pph - 30) >= yPos && yPos >= pipe[i].y + pipeup.height) {
                    score.play();

                } else {
                    reload();
                }
            }
            if (pipe[i].x == 80) {
                ran = Random(-200, 0);
                pipe.push({
                    x: canvas.width,
                    y: ran
                })
            }
        }

        ctx.drawImage(road, 0, 395);
        ctx.drawImage(bird, xPos, yPos);

        ctx.fillStyle = '#FFF';
        ctx.font = '24px sans-serif';
        ctx.fillText("Score: " + Math.floor(lw / 45), 5, 25);

        ctx.fillStyle = '#FFF';
        ctx.font = '24px sans-serif';
        ctx.fillText("Click: " + lw2, 5, 50);

        if (maxscore < Math.floor(lw / 45)) {
            maxscore = Math.floor(lw / 45);
        }
        ctx.fillStyle = '#FFF';
        ctx.font = '24px sans-serif';
        ctx.fillText("Max-Score: " + maxscore, 5, 500);
        console.log(maxscore);

        if (yPos > 370) {
            reload();
        }
        if (yPos < -5) {
            reload();
        }

        if (pipe[i].x < 0 - pipeup.width) {
            pipe.shift(pipe[i]);
        }
    } else if (st > 1) {
        ctx.fillStyle = 'rgba(150,150,150,0.01)';
        ctx.fillRect(0, 0, 512, 512);

        ctx.fillStyle = 'rgb(0,0,0)';
        ctx.font = '24px sans-serif';
        ctx.fillText("Press 'p' to continue", 15, 250);
    }
}

canvas.addEventListener("click", function(event) {
    velY = -4;
    fly.play();
    xPos = 5;
    lw2++;
});

function reload() {
    pause = true;
    xPos = 0;
    yPos = 200;
    velY = 0;
    velX = 0;
    pipe = [];
    pipe[0] = {
        x: canvas.width,
        y: 0
    }
    lw = 0;
    lw2 = 0;
}

window.addEventListener("keydown", (e) => {
    if (e.key == 'p' && st > 1) {
        pause = !pause;
    }
})
window.addEventListener("keydown", (e) => {
    if (e.key == 's') {
        st++;
    }
})

do {
    ctx.fillStyle = 'rgba(50,50,50,0.1)';
    ctx.fillRect(0, 0, 512, 512);

    ctx.fillStyle = 'rgb(0,0,0)';
    ctx.font = '24px sans-serif';
    ctx.fillText("Press 's' to start", 40, 250);
} while (st > 1);

setInterval(draw, 20);