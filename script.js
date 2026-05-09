const startBtn = document.getElementById("startBtn");
const timer = document.getElementById("timer");
const message = document.getElementById("message");
const circle = document.getElementById("circle");

let startTime;
let gameStarted = false;
let canClick = false;
let timeoutId;

function resetGame(text){
    gameStarted = false;
    canClick = false;
    clearTimeout(timeoutId);

    circle.style.background = `
    radial-gradient(
        circle,
        rgba(255,255,255,0.95) 40%,
        rgba(255,255,255,0.5) 70%,
        rgba(255,255,255,0.05) 100%
    )`;

    timer.innerText = "0 ms";
    message.innerText = text || "Press start";
}

startBtn.addEventListener("click", () => {

    if(gameStarted) return;

    gameStarted = true;
    canClick = false;

    message.innerText = "Wait for green...";

    timer.innerText = "WAIT";

    circle.style.background = `
    radial-gradient(
        circle,
        rgba(255,180,180,0.95) 40%,
        rgba(255,180,180,0.5) 70%,
        rgba(255,180,180,0.05) 100%
    )`;

    // RANDOM 1–5 seconds
    const delay = Math.random() * 4000 + 1000;

    timeoutId = setTimeout(() => {

        if(!gameStarted) return;

        canClick = true;
        startTime = Date.now();

        circle.style.background = `
        radial-gradient(
            circle,
            rgba(140,255,180,0.95) 40%,
            rgba(140,255,180,0.5) 70%,
            rgba(140,255,180,0.05) 100%
        )`;

        message.innerText = "CLICK NOW";
        timer.innerText = "GO";

    }, delay);

});

circle.addEventListener("click", () => {

    if(!gameStarted) return;

    //  TOO EARLY
    if(!canClick){
        resetGame("Too early! Restart.");
        return;
    }

    //  VALID CLICK
    const reaction = Date.now() - startTime;

    timer.innerText = reaction + " ms";

    gameStarted = false;
    canClick = false;

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
