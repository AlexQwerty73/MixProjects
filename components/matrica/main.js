let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// let nums_lenght = 15;
// let nums_arr = [];
// let nums = [];
// let nums_W = [];
// let nums_H = [];
// let nums_font = [];

let numbers = {
    lengthh: 15,
    all: [],
    nums: [],
    W: [],
    H: [],
    font: []
};
function Random(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function Numbers() {
    numbers.font.push(Random(5, 30));
    numbers.H.push(0);
    numbers.W.push(Random(0, canvas.width));
{
    // let w = 0;
    // let trigg = false;
    // do {
    //     w = Random(0, canvas.width);
    //     check(w);
    // } while (trigg == 1);
    // numbers.W.push(w);

    // function check(L) {
    //     let arr = [];
    //     for (let i = 0; i < numbers.W.length; i++) {
    //         if (numbers.W[i] - numbers.font[i] <= L && L <= numbers.W[i] + numbers.font[i] || canvas.H > 0) {
    //             //
    //             arr.push(0);
    //             console.log('1');
    //         } else {
    //             arr.push(1);
    //             console.log('0');
    //         }
    //     }
    //     if (arr.includes(0)) {
    //         trigg = 1;
    //     } else {
    //         trigg = 0;
    //     }
    // }
}
    numbers.nums.push([]);
    for (let j = 0; j < numbers.nums.length; j++) {
        for (let i = 0; i < numbers.lengthh; i++) {
            numbers.nums[j].push(Random(0, 2));
        }
        ctx.fillStyle = "rgb(0, 255, 0)";
        ctx.font = `${numbers.font[j]}px Poppins, sans-serif`;

        for (let i = numbers.lengthh - 1; i > 0; i--) {
            ctx.fillText(`${numbers.nums[j][i]}`, numbers.W[j], numbers.H[j] - i * numbers.font[j]);
            numbers.nums[j][i] = numbers.nums[j][i - 1];
            numbers.nums[j][0] = Random(0, 2); // 0, 1

            if (numbers.H[j] - (numbers.lengthh * numbers.font[j]) > canvas.height) {
                numbers.H.splice(j, 1);
                numbers.W.splice(j, 1);
                numbers.nums.splice(j, 1);
                numbers.font.splice(j, 1);
                numbers.all.splice(j, 1);
            }
        }
        numbers.H[j] += numbers.font[j];
    }

}

function draw() {
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

setInterval(() => {
    draw();
    numbers.all.push(Numbers());
}, 70);