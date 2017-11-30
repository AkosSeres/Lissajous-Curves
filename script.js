var canvas = document.getElementById("myCanvas");
var left = document.getElementById("leftDiv");
var btn = document.getElementById("goButton");
var fxInput = document.getElementById("fx");
var fyInput = document.getElementById("fy");
var axInput = document.getElementById("anglex");
var ayInput = document.getElementById("angley");
var resInput = document.getElementById("air");
var steps = 5;
var Ax = 1;
var Ay = 1;
var res = 0;

var fx = 1;
var fy = 1;
var time = 0;
var dt = 0.001;
var anglex = 0;
var angley = 0;
resizeCanvas();
restart();

setInterval(() => {
    let c = res;
    let width = canvas.width;
    let height = canvas.height;
    let ctx = canvas.getContext("2d");
    ctx.save();
    ctx.translate(width / 2, height / 2);
    ctx.scale(1, -1);
    let A = height < width ? height * 0.4 : width * 0.4;

    for (let i = 0; i < steps; i++) {

        let point = {
            x: Ax * Math.sin(time * fx * 2 * Math.PI + anglex),
            y: Ay * Math.sin(time * fy * 2 * Math.PI + angley)
        };
        time += dt;
        let nextPoint = {
            x: Ax * Math.sin(time * fx * 2 * Math.PI + anglex),
            y: Ay * Math.sin(time * fy * 2 * Math.PI + angley)
        };

        let Ex = Ax * fx * fx * (1 - (Math.abs(nextPoint.x - point.x)) * c);
        Ax = Ex / (fx * fx);
        let Ey = Ay * fy * fy * (1 - (Math.abs(nextPoint.y - point.y)) * c);
        Ay = Ey / (fy * fy);
        nextPoint = {
            x: Ax * Math.sin(time * fx * 2 * Math.PI + anglex),
            y: Ay * Math.sin(time * fy * 2 * Math.PI + angley)
        };

        ctx.beginPath();
        ctx.moveTo(point.x * A, point.y * A);
        ctx.lineTo(A * nextPoint.x, A * nextPoint.y);
        ctx.stroke();
    }

    ctx.restore();
}, 1000 / 60);

window.addEventListener('resize', resizeCanvas, false);
left.addEventListener("resize", resizeCanvas, false);

function resizeCanvas() {
    console.log(left.offsetWidth);
    canvas.width = window.innerWidth - left.offsetWidth;
    canvas.height = window.innerHeight;

    let ctx = canvas.getContext("2d");
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    time = 0;
}

btn.addEventListener('click', restart);

function restart() {
    fx = fxInput.value ? fxInput.value : 1;
    fy = fyInput.value ? fyInput.value : 1;

    anglex = axInput.value ? axInput.value * Math.PI : 0;
    angley = ayInput.value ? ayInput.value * Math.PI : 0;

    res = resInput.value ? resInput.value : 0;

    Ax = 1;
    Ay = 1;

    let ctx = canvas.getContext("2d");
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    time = 0;
}

window.onwheel = (e) => {
    steps += e.wheelDelta * 0.1;
    if (steps < 1) steps = 1;
    if (steps > 300) steps = 300;
}