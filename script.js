const startBtn = document.getElementById("startBtn");
const timer = document.getElementById("timer");
const message = document.getElementById("message");
const circle = document.getElementById("circle");

let gameId = 0;
let canClick = false;
let startTime = 0;

function reset(text = "Press start") {
    canClick = false;
    startTime = 0;

    timer.innerText = "0 ms";
    message.innerText = text;

    circle.style.background = `
    radial-gradient(
        circle,
        rgba(255,255,255,0.95) 40%,
        rgba(255,255,255,0.5) 70%,
        rgba(255,255,255,0.05) 100%
    )`;
}

startBtn.addEventListener("click", () => {

    gameId++; // invalidate previous games

    const currentGame = gameId;

    reset("Wait for green...");

    const delay = Math.random() * 4000 + 1000;

    circle.style.background = `
    radial-gradient(
        circle,
        rgba(255,180,180,0.95) 40%,
        rgba(255,180,180,0.5) 70%,
        rgba(255,180,180,0.05) 100%
    )`;

    setTimeout(() => {

        // ❌ if a new game started, ignore this
        if(currentGame !== gameId) return;

        canClick = true;
        startTime = performance.now();

        message.innerText = "CLICK NOW";
        timer.innerText = "GO";

        circle.style.background = `
        radial-gradient(
            circle,
            rgba(140,255,180,0.95) 40%,
            rgba(140,255,180,0.5) 70%,
            rgba(140,255,180,0.05) 100%
        )`;

    }, delay);

});

circle.addEventListener("click", (e) => {

    // ONLY accept real circle clicks
    if(e.target !== circle) return;

    // ❌ not ready yet
    if(!canClick){
        reset("Too early! Press start again.");
        return;
    }

    const reaction = Math.round(performance.now() - startTime);

    timer.innerText = reaction + " ms";

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

    canClick = false;

});
