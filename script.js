const startBtn = document.getElementById("startBtn");
const timer = document.getElementById("timer");
const message = document.getElementById("message");
const circle = document.getElementById("circle");

let startTime;
let gameStarted = false;
let canClick = false;

startBtn.addEventListener("click", () => {

    if(gameStarted) return;

    gameStarted = true;
    canClick = false;

    timer.innerText = "WAIT";

    message.innerText = "Get ready...";

    circle.style.background = `
    radial-gradient(
        circle,
        rgba(255,180,180,0.95) 40%,
        rgba(255,180,180,0.5) 70%,
        rgba(255,180,180,0.05) 100%
    )`;

    // EXACTLY 2 seconds
    setTimeout(() => {

        canClick = true;

        startTime = Date.now();

        timer.innerText = "CLICK";

        message.innerText = "NOW";

        circle.style.background = `
        radial-gradient(
            circle,
            rgba(140,255,180,0.95) 40%,
            rgba(140,255,180,0.5) 70%,
            rgba(140,255,180,0.05) 100%
        )`;

    }, 2000);

});

circle.addEventListener("click", () => {

    if(!gameStarted || !canClick) return;

    const reaction = Date.now() - startTime;

    timer.innerText = reaction + " ms";

    canClick = false;
    gameStarted = false;

    circle.style.background = `
    radial-gradient(
        circle,
        rgba(255,255,255,0.95) 40%,
        rgba(255,255,255,0.5) 70%,
        rgba(255,255,255,0.05) 100%
    )`;

    if(reaction < 180){
        message.innerText = "INSANE";
    }
    else if(reaction < 250){
        message.innerText = "FAST";
    }
    else if(reaction < 350){
        message.innerText = "AVERAGE";
    }
    else{
        message.innerText = "SLOW";
    }

});