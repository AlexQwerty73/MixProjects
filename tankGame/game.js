let player_1_img = new Image();
player_1_img.src = "img/player_1_img.png";
let player_2_img = new Image();
player_2_img.src = "img/player_2_img.png";
let shut_player1_img = new Image();
shut_player1_img.src = "img/shut_player1_img.png";
let shut_player2_img = new Image();
shut_player2_img.src = "img/shut_player2_img.png";

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
canvas.width = 512 * 2;
canvas.height = 256 * 2;

function rand(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

let player_size = 20;

let player_1 = {
    img: player_1_img,
    width: player_size,
    height: player_size,
    x: 20,
    y: canvas.height / 2 - player_size * 0.5,
    button_up: 'w',
    button_down: 's',
    button_right: 'd',
    button_left: 'a',
    button_stop: 'q',
    button_shut: 'e',
    speed: 1,
    speed_update: 20,
    armor: 1,
    intervalMoveUp: 0,
    intervalMoveDown: 0,
    intervalMoveRight: 0,
    intervalMoveLeft: 0,
    shut: { //чтобы убрать баги (пуль) возможно надо up / down / ... сделать масивами 
        x: [],
        y: [],
        size: 4,
        up: false,
        down: false,
        left: false,
        right: false,
        reloading: false,
        speed: 5,
        speed_update: 1
            //capacity вместимость обоймы
    },
    score: 0
};

let player_2 = {
    img: player_2_img,
    width: player_size,
    height: player_size,
    x: canvas.width - 20 - player_size,
    y: canvas.height * 0.5 - player_size * 0.5,
    button_up: 'i',
    button_down: 'k',
    button_right: 'l',
    button_left: 'j',
    button_stop: 'o',
    button_shut: 'u',
    speed: 1,
    speed_update: 20,
    armor: 1,
    intervalMoveUp: 0,
    intervalMoveDown: 0,
    intervalMoveRight: 0,
    intervalMoveLeft: 0,
    shut: {
        x: canvas.width,
        y: 0,
        size: 4,
        up: false,
        down: false,
        left: false,
        right: false,
        reloading: false,
        speed: 5,
        speed_update: 1
    },
    score: 0
};

let wall_arr = {
    x: [],
    y: [],
    width: [],
    height: []
};

let game = {
    enter: false,
    tanks_select: false,
};

//координаты кнопки для выбора танков (к = коофициент размера кнопки)
let k = 2;
let button_tank_select = {
    left_down: {
        x: 20 / k,
        y: canvas.height - 20 / k
    },
    right_down: {
        x: 100 / k,
        y: canvas.height - 20 / k
    },
    left_up: {
        x: 20 / k,
        y: canvas.height - 100 / k
    },
    right_up: {
        x: 100 / k,
        y: canvas.height - 100 / k
    }
};

//версии танков (характеристики) 
var tanks_version = [
    ['name 1', 10, 1, 3, 10], //сделать нормальные характеристики
    ['name 2', 20, 1, 3, 20], //сделать нормальные характеристики
    ['name 3', 30, 1, 3, 50], //сделать нормальные характеристики
    ['name 4', 40, 1, 3, 20], //сделать нормальные характеристики
    ['name 5', 50, 1, 3, 20], //сделать нормальные характеристики
    ['name 6', rand(5, 90), rand(1, 20), rand(1, 10), rand(5, 50)],
];

//рисовка игры
function draw() {
    if (game.enter) {
        draw_game();
    } else if (game.tanks_select) {
        draw_tanks_selector();
    } else {
        draw_menu();
    }
}

game_addition();
controlPlayer(player_1);
controlPlayer(player_2);
shut(player_1);
shut(player_2);
walls();

function game_addition() {
    //--клик на треугольник чтобы ирать--//
    canvas.addEventListener('mousedown', function(e) {
        click_to_play(canvas, e);
        tanks_select_menu(canvas, e);
        tank_select(canvas, e);
    });

    function click_to_play(canvas, event) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        if (canvas.width * 0.5 - canvas.width * 0.05 <= x && x <= canvas.width * 0.5 + canvas.width * 0.05 &&
            canvas.height * 0.4 <= y && y <= canvas.height * 0.6 &&
            !game.tanks_select) {
            game.enter = true;
        }
    }
    //Enter
    window.addEventListener("keydown", (e) => {
        if (e.key == 'Enter' && !game.enter && !game.tanks_select) {
            game.enter = true;
        }
    });
    //------------------//

    //---выход из игры(escape)---//
    window.addEventListener("keydown", (e) => {
        if (e.key == 'Escape' && game.enter) {
            game.enter = false;
            //удолтть score и поставить на изначальную позицию
            //.........
            //.........
            //.........
            //.........
            //.........
            //.........
        }
    });
    //-----------------//

    //----open/close-tanks_select_menu---//
    function tanks_select_menu(canvas, event) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        if (button_tank_select.left_up.x <= x && x <= button_tank_select.right_up.x &&
            button_tank_select.left_up.y <= y && y <= button_tank_select.left_down.y &&
            !game.tanks_select &&
            !game.enter) {
            game.tanks_select = true;
        } else if (button_tank_select.left_up.x <= x && x <= button_tank_select.right_up.x &&
            button_tank_select.left_up.y <= y && y <= button_tank_select.left_down.y &&
            game.tanks_select) {
            game.tanks_select = false;
        }
    }
    window.addEventListener("keydown", (e) => {
        if (e.key == 's' && !game.tanks_select && !game.enter) {
            game.tanks_select = true;
        } else if (e.key == 's' || e.key == 'Escape' && game.tanks_select) {
            game.tanks_select = false;
        }
    });
    //-----------------------//
}

function draw_game() {
    ctx.clearRect(0, 0, canvas.width + 10, canvas.height + 10);
    draw_wall();
    draw_elements();
    draw_score();

    function draw_wall() {
        for (let i = 0; i <= wall_arr.x.length; i++) {
            ctx.fillStyle = "black";
            ctx.fillRect(wall_arr.x[i], wall_arr.y[i], wall_arr.width[i], wall_arr.height[i]);
        }
    }

    function draw_elements() {
        for (let j = 0; j < player_1.shut.x.length; j++) {
            ctx.drawImage(shut_player1_img, player_1.shut.x[j], player_1.shut.y[j], player_1.shut.size, player_1.shut.size);
        }
        for (let j = 0; j < player_2.shut.x.length; j++) {
            ctx.drawImage(shut_player2_img, player_2.shut.x[j], player_2.shut.y[j], player_2.shut.size, player_2.shut.size);
        }
        ctx.drawImage(player_1_img, player_1.x, player_1.y, player_1.width, player_1.height);
        ctx.drawImage(player_2_img, player_2.x, player_2.y, player_2.width, player_2.height);
    }

    function draw_score() {
        ctx.fillStyle = 'rgb(0,0,0)';
        ctx.font = '24px sans-serif';
        ctx.fillText(`${player_1.score}`, canvas.width * 0.08, 20);
        ctx.fillText(`${player_2.score}`, canvas.width * 0.9, 20);
    }

}

function draw_tanks_selector() {
    ctx.clearRect(0, 0, canvas.width + 10, canvas.height + 10);
    //----button----//
    ctx.beginPath();
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.moveTo(button_tank_select.left_down.x, button_tank_select.left_down.y);
    ctx.lineTo(button_tank_select.right_down.x, button_tank_select.right_down.y);
    ctx.lineTo(button_tank_select.right_up.x, button_tank_select.right_up.y);
    ctx.lineTo(button_tank_select.left_up.x, button_tank_select.left_up.y);
    ctx.lineTo(button_tank_select.left_down.x, button_tank_select.left_down.y);
    ctx.font = '45px serif';
    ctx.fillText('S', 20 / k + (20 / k) / 2, canvas.height - 20 / k - (20 / k) / 2);
    ctx.stroke();
    //--------------//

    ctx.beginPath();
    ctx.moveTo(canvas.width * 0.1, 0);
    ctx.lineTo(canvas.width * 0.1, canvas.height);

    ctx.moveTo(canvas.width * 0.5, 0);
    ctx.lineTo(canvas.width * 0.5, canvas.height);

    ctx.moveTo(canvas.width * 0.9, 0);
    ctx.lineTo(canvas.width * 0.9, canvas.height);

    for (let j = 0; j <= 1; j++) {
        for (let l = 0; l < 2; l++) {
            for (let i = 0; i < 3; i++) {
                ctx.moveTo(canvas.width * 0.12 + l * 205 + j * 410, 20 + i * 150);
                ctx.lineTo(canvas.width * 0.12 + l * 205 + j * 410, 140 + i * 150);
                ctx.lineTo(canvas.width * 0.28 + l * 205 + j * 410, 140 + i * 150);
                ctx.lineTo(canvas.width * 0.28 + l * 205 + j * 410, 20 + i * 150);
                ctx.lineTo(canvas.width * 0.12 + l * 205 + j * 410, 20 + i * 150);
                ctx.font = '20px serif';
                ctx.fillText(`${tanks_version[i+l* 3][0]}`, canvas.width * 0.13 + l * 205 + j * 410, 45 + i * 150);
                ctx.fillText('speed: ' + tanks_version[i + l * 3][1], canvas.width * 0.13 + l * 205 + j * 410, 65 + i * 150);
                ctx.fillText('bullet speed: ' + tanks_version[i + l * 3][2], canvas.width * 0.13 + l * 205 + j * 410, 85 + i * 150);
                ctx.fillText('armor: ' + tanks_version[i + l * 3][3], canvas.width * 0.13 + l * 205 + j * 410, 105 + i * 150);
                ctx.fillText('size: ' + tanks_version[i + l * 3][4], canvas.width * 0.13 + l * 205 + j * 410, 125 + i * 150);
                ctx.stroke();
            }
        }
    }
}

//это к tank_select()
let click_on_tank = [
    [], //1 player
    [] // 2 player
];

function tank_select(canvas, event) {
    if (!game.enter && game.tanks_select) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        for (let j = 0; j <= click_on_tank.length; j++) {
            for (let l = 0; l < 2; l++) {
                for (let i = 0; i <= 3; i++) {
                    if (canvas.width * 0.12 + l * 205 + j * 410 <= x && x <= canvas.width * 0.28 + l * 205 + j * 410 &&
                        20 + i * 150 <= y && y <= 140 + i * 150) { //x, y = draw_tanks_selector()
                        click_on_tank[j] = i + l * 3;
                        if (j == 0) {
                            player_1.speed_update = 50 - tanks_version[i + l * 3][1];
                            player_1.shut.speed_update = tanks_version[i + l * 3][2];
                            player_1.armor = tanks_version[i + l * 3][3];
                            player_1.width = tanks_version[i + l * 3][4];
                            player_1.height = tanks_version[i + l * 3][4];
                        } else if (j == 1) {
                            player_2.speed_update = 50 - tanks_version[i + l * 3][1];
                            player_2.shut.speed_update = tanks_version[i + l * 3][2];
                            player_2.armor = tanks_version[i + l * 3][3];
                            player_2.width = tanks_version[i + l * 3][4];
                            player_2.height = tanks_version[i + l * 3][4];
                        }
                    }
                }
            }
        }
    }
}

function draw_menu() {
    ctx.clearRect(0, 0, canvas.width + 10, canvas.height + 10);
    ctx.beginPath();
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.moveTo(canvas.width * 0.5 + canvas.width * 0.05, canvas.height * 0.5);
    ctx.lineTo(canvas.width * 0.5 - canvas.width * 0.05, canvas.height * 0.6);
    ctx.lineTo(canvas.width * 0.5 - canvas.width * 0.05, canvas.height * 0.4);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.moveTo(button_tank_select.left_down.x, button_tank_select.left_down.y);
    ctx.lineTo(button_tank_select.right_down.x, button_tank_select.right_down.y);
    ctx.lineTo(button_tank_select.right_up.x, button_tank_select.right_up.y);
    ctx.lineTo(button_tank_select.left_up.x, button_tank_select.left_up.y);
    ctx.lineTo(button_tank_select.left_down.x, button_tank_select.left_down.y);
    ctx.font = '45px serif';
    ctx.fillText('S', 20 / k + (20 / k) / 2, canvas.height - 20 / k - (20 / k) / 2);
    ctx.stroke();
}

function controlPlayer(player) {

    let move_up = false;
    let move_down = false;
    let move_right = false;
    let move_left = false;

    let touch_wall = [];

    window.addEventListener("keydown", (e) => {
        if (game.enter) {
            //up
            if (e.key == `${player.button_up}` && 1 <= player.y && !move_up) {
                settings();
                player.intervalMoveUp = setInterval(() => {
                    for (let i = 0; i < wall_arr.x.length; i++) {
                        touch_wall.push((wall_arr.x[i] <= player.x + player.width && player.x <= wall_arr.x[i] + wall_arr.width[i] && wall_arr.y[i] <= player.y + player.height && player.y - player.speed <= wall_arr.y[i] + wall_arr.height[i]));
                    }
                    for (let i = 0; i < touch_wall.length; i++) {
                        if ((touch_wall.includes(true)) || player.y <= 1) {
                            clearInterval(player.intervalMoveUp);
                            move_up = false;
                            break;
                        }
                    }
                    if (move_up) {
                        player.y = player.y - player.speed;
                    }
                    touch_wall = [];
                }, player.speed_update);
            }

            //down
            if (e.key == `${player.button_down}` && player.y + player.height + 3 <= canvas.height && !move_down) {
                settings();
                player.intervalMoveDown = setInterval(() => {
                    for (let i = 0; i < wall_arr.x.length; i++) {
                        touch_wall.push((wall_arr.x[i] <= player.x + player.width && player.x <= wall_arr.x[i] + wall_arr.width[i] && wall_arr.y[i] <= player.y + player.height + player.speed && player.y <= wall_arr.y[i] + wall_arr.height[i]));
                    }
                    for (let i = 0; i < touch_wall.length; i++) {
                        if ((touch_wall.includes(true)) || player.y + player.height + 3 >= canvas.height) {
                            clearInterval(player.intervalMoveDown);
                            move_down = false;
                            break;
                        }
                    }
                    if (move_down) {
                        player.y = player.y + player.speed;
                    }
                    touch_wall = [];
                }, player.speed_update);
            }

            //right
            if (e.key == `${player.button_right}` && player.x <= canvas.width - player.width && !move_right) {
                settings();
                player.intervalMoveDown = setInterval(() => {
                    for (let i = 0; i < wall_arr.x.length; i++) {
                        touch_wall.push((wall_arr.x[i] <= player.x + player.width + player.speed && player.x <= wall_arr.x[i] + wall_arr.width[i] && wall_arr.y[i] <= player.y + player.height && player.y <= wall_arr.y[i] + wall_arr.height[i]));
                    }
                    for (let i = 0; i < touch_wall.length; i++) {
                        if ((touch_wall.includes(true)) || player.x >= canvas.width - player.width) {
                            clearInterval(player.intervalMoveRight);
                            move_right = false;
                            break;
                        }
                    }
                    if (move_right) {
                        player.x = player.x + player.speed;
                    }
                    touch_wall = [];
                }, player.speed_update);
            }

            //left
            if (e.key == `${player.button_left}` && 1 <= player.x && !move_left) {
                settings();
                player.intervalMoveDown = setInterval(() => {
                    for (let i = 0; i < wall_arr.x.length; i++) {
                        touch_wall.push((wall_arr.x[i] <= player.x + player.width && player.x - player.speed <= wall_arr.x[i] + wall_arr.width[i] && wall_arr.y[i] <= player.y + player.height && player.y <= wall_arr.y[i] + wall_arr.height[i]));
                    }
                    for (let i = 0; i < touch_wall.length; i++) {
                        if ((touch_wall.includes(true)) || 1 >= player.x) {
                            clearInterval(player.intervalMoveLeft);
                            move_left = false;
                            break;
                        }
                    }
                    if (move_left) {
                        player.x = player.x - player.speed;
                    }
                    touch_wall = [];
                }, player.speed_update);
            }

            //stop
            window.addEventListener("keydown", (e) => {
                if (e.key == `${player.button_stop}`) {
                    move_up = false;
                    move_down = false;
                    move_right = false;
                    move_left = false;
                    clear_intervals();
                    touch_wall = [];
                }
            });

            function settings() {
                clear_intervals();
                if (`${player.button_up}` == e.key) {
                    move_up = true;
                    player.shut.up = true;
                } else {
                    move_up = false;
                    player.shut.up = false;
                }
                if (`${player.button_down}` == e.key) {
                    move_down = true;
                    player.shut.down = true;
                } else {
                    move_down = false;
                    player.shut.down = false;
                }
                if (`${player.button_right}` == e.key) {
                    move_right = true;
                    player.shut.left = true;
                } else {
                    move_right = false;
                    player.shut.left = false;
                }
                if (`${player.button_left}` == e.key) {
                    move_left = true;
                    player.shut.right = true;
                } else {
                    move_left = false;
                    player.shut.right = false;
                }
            }

            function clear_intervals() {
                clearInterval(player.intervalMoveDown);
                clearInterval(player.intervalMoveLeft);
                clearInterval(player.intervalMoveRight);
                clearInterval(player.intervalMoveUp);
            }
        }
    });

}

function shut(player) {
    window.addEventListener("keydown", (e) => {
        if (e.key == `${player.button_shut}`) {
            //left
            if (player.shut.left) {

                player.shut.x.push(player.x + player.width * 0.5 - player.shut.size * 0.5);
                player.shut.y.push(player.y + player.height * 0.5 - player.shut.size * 0.5);

                let timer = setInterval(function() {
                        for (let j = 0; j < player.shut.x.length; j++) {
                            player.shut.x[j] = player.shut.x[j] + player.shut.speed / player.shut.x.length;

                            for (let i = 0; i <= wall_arr.x.length; i++) {
                                if (canvas.width <= player.shut.x[j] || wall_arr.x[i] <= player.shut.x[j] + player.shut.size && player.shut.x[j] <= wall_arr.x[i] + wall_arr.width[i] && wall_arr.y[i] <= player.shut.y[j] + player.shut.size && player.shut.y[j] <= wall_arr.y[i] + wall_arr.height[i]) {
                                    clearInterval(timer);
                                    player.shut.x.splice(j, 1);
                                    player.shut.y.splice(j, 1);
                                } else {
                                    hit();
                                }
                            }
                        }
                    },
                    player.shut.speed_update);
            }

            //right
            if (player.shut.right) {

                player.shut.x.push(player.x + player.width * 0.5 - player.shut.size * 0.5);
                player.shut.y.push(player.y + player.height * 0.5 - player.shut.size * 0.5);

                let timer = setInterval(function() {
                        for (let j = 0; j < player.shut.x.length; j++) {
                            player.shut.x[j] = player.shut.x[j] - player.shut.speed / player.shut.x.length;

                            for (let i = 0; i <= wall_arr.x.length; i++) {
                                if (player.shut.x[j] <= 0 || wall_arr.x[i] <= player.shut.x[j] + player.shut.size && player.shut.x[j] <= wall_arr.x[i] + wall_arr.width[i] && wall_arr.y[i] <= player.shut.y[j] + player.shut.size && player.shut.y[j] <= wall_arr.y[i] + wall_arr.height[i]) {
                                    clearInterval(timer);
                                    player.shut.x.splice(j, 1);
                                    player.shut.y.splice(j, 1);
                                } else {
                                    hit();
                                }
                            }
                        }
                    },
                    player.shut.speed_update);
            }

            //up
            if (player.shut.up) {

                player.shut.x.push(player.x + player.width * 0.5 - player.shut.size * 0.5);
                player.shut.y.push(player.y + player.height * 0.5 - player.shut.size * 0.5);

                let timer = setInterval(function() {
                        for (let j = 0; j < player.shut.y.length; j++) {
                            player.shut.y[j] = player.shut.y[j] - player.shut.speed / player.shut.y.length;
                            console.log(player.shut.y.length);
                            for (let i = 0; i <= wall_arr.y.length; i++) {
                                if (player.shut.y <= 0 || wall_arr.x[i] <= player.shut.x + player.shut.size && player.shut.x <= wall_arr.x[i] + wall_arr.width[i] && wall_arr.y[i] <= player.shut.y + player.shut.size && player.shut.y <= wall_arr.y[i] + wall_arr.height[i]) {
                                    clearInterval(timer);
                                    player.shut.x.splice(j, 1);
                                    player.shut.y.splice(j, 1);
                                } else {
                                    hit();
                                }
                            }
                        }
                    },
                    player.shut.speed_update);
            }

            //down
            if (player.shut.down) {

                player.shut.x.push(player.x + player.width * 0.5 - player.shut.size * 0.5);
                player.shut.y.push(player.y + player.height * 0.5 - player.shut.size * 0.5);

                let timer = setInterval(function() {
                        for (let j = 0; j < player.shut.y.length; j++) {
                            player.shut.y[j] = player.shut.y[j] + player.shut.speed / player.shut.y.length;

                            for (let i = 0; i <= wall_arr.x.length; i++) {
                                if (player.shut.y >= canvas.height || wall_arr.x[i] <= player.shut.x + player.shut.size && player.shut.x <= wall_arr.x[i] + wall_arr.width[i] && wall_arr.y[i] <= player.shut.y + player.shut.size && player.shut.y <= wall_arr.y[i] + wall_arr.height[i]) {
                                    clearInterval(timer);
                                    player.shut.x.splice(j, 1);
                                    player.shut.y.splice(j, 1);
                                } else {
                                    hit();
                                }
                            }
                        }
                    },
                    player.shut.speed_update);
            }

            function hit() {
                if (player_1.x <= player_2.shut.x + player_2.shut.size && player_2.shut.x <= player_1.x + player_1.width && player_1.y <= player_2.shut.y + player_2.shut.size && player_2.shut.y <= player_1.y + player_1.height) {
                    player_1.armor--;
                    player.shut.x.splice(j, 1);
                    player.shut.y.splice(j, 1);
                    if (player_1.armor == 0) {
                        player_2.score++;
                    }
                    hit_set();
                }
                for (let j = 0; j < player.shut.x.length; j++) {
                    if (player_2.x <= player_1.shut.x[j] + player_1.shut.size && player_1.shut.x[j] <= player_2.x + player_2.width && player_2.y <= player_1.shut.y[j] + player_1.shut.size && player_1.shut.y[j] <= player_2.y + player_2.height) {
                        player_2.armor--;
                        player.shut.x.splice(j, 1);
                        player.shut.y.splice(j, 1);
                        if (player_2.armor == 0) {
                            player_1.score++;
                        }
                        hit_set();
                    }
                }
            }
        }

        function hit_set() {
            player_1.shut.up = false;
            player_1.shut.down = false;
            player_1.shut.left = false;
            player_1.shut.right = false;
            player_2.shut.up = false;
            player_2.shut.down = false;
            player_2.shut.left = false;
            player_2.shut.right = false;

            if (player_1.armor == 0 || player_2.armor == 0) {
                player_1.x = canvas.width * 0.1;
                player_1.y = canvas.height * 0.5 - player_1.height * 0.5;
                player_2.x = canvas.width * 0.9;
                player_2.y = canvas.height * 0.5 - player_2.height * 0.5;

                player_1.shut.up = false;
                player_1.shut.down = false;
                player_1.shut.left = false;
                player_1.shut.right = false;
                player_2.shut.up = false;
                player_2.shut.down = false;
                player_2.shut.left = false;
                player_2.shut.right = false;

                player_1.armor = tanks_version[click_on_tank[0][3]];
                player_2.armor = tanks_version[click_on_tank[1][3]];

                clearInterval(player_1.intervalMoveDown);
                clearInterval(player_1.intervalMoveLeft);
                clearInterval(player_1.intervalMoveRight);
                clearInterval(player_1.intervalMoveUp);
                clearInterval(player_2.intervalMoveDown);
                clearInterval(player_2.intervalMoveLeft);
                clearInterval(player_2.intervalMoveRight);
                clearInterval(player_2.intervalMoveUp);
            }

        }
    });

}

function wall(wall_x, wall_y, wall_width, wall_height) {
    for (let i = 0; i != -1; i++) {
        if (wall_arr.x[i] != wall_x || wall_arr.y != wall_y) {
            wall_arr.x.push(wall_x);
            wall_arr.y.push(wall_y);
            wall_arr.width.push(wall_width);
            wall_arr.height.push(wall_height);
            break;
        }
    }
}

function walls() {

    /*        x                      y           width       height        */
    //                              вертикальные
    wall(canvas.width * 0.2, canvas.height * 0.43, 5, canvas.height * 0.15);
    wall(canvas.width * 0.8, canvas.height * 0.43, 5, canvas.height * 0.15);

    wall(canvas.width * 0.2, canvas.height * 0.15, 5, canvas.height * 0.1);
    wall(canvas.width * 0.8, canvas.height * 0.15, 5, canvas.height * 0.1);

    wall(canvas.width * 0.2, canvas.height * 0.75, 5, canvas.height * 0.1);
    wall(canvas.width * 0.8, canvas.height * 0.75, 5, canvas.height * 0.1);

    wall(canvas.width * 0.35, canvas.height * 0.75, 5, canvas.height * 0.15);
    wall(canvas.width * 0.65, canvas.height * 0.75, 5, canvas.height * 0.15);

    wall(canvas.width * 0.35, canvas.height * 0.1, 5, canvas.height * 0.15);
    wall(canvas.width * 0.65, canvas.height * 0.1, 5, canvas.height * 0.15);

    wall(canvas.width * 0.5, canvas.height * 0.15, 5, canvas.height * 0.25);
    wall(canvas.width * 0.5, canvas.height * 0.6, 5, canvas.height * 0.25);

    /*      x                       y                   width       height  */
    //                               горизонтальные
    wall(canvas.width * 0.4, canvas.height * 0.4, canvas.width * 0.21, 5);
    wall(canvas.width * 0.4, canvas.height * 0.6, canvas.width * 0.21, 5);

    wall(canvas.width * 0.35, canvas.height * 0.75, canvas.width * 0.08, 5);
    wall(canvas.width * 0.575, canvas.height * 0.75, canvas.width * 0.08, 5);

    wall(canvas.width * 0.35, canvas.height * 0.25, canvas.width * 0.08, 5);
    wall(canvas.width * 0.575, canvas.height * 0.25, canvas.width * 0.08, 5);
}

setInterval(draw, 20);