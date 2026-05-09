const startBtn = document.getElementById("startBtn");
const timer = document.getElementById("timer");
const message = document.getElementById("message");
const circle = document.getElementById("circle");

let canClick = false;
let gameArmed = false;
let startTime = 0;
let timeoutId = null;

function reset(text = "Press start") {
    clearTimeout(timeoutId);

    canClick = false;
    gameArmed = false;
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

    reset("Wait for green...");

    // IMPORTANT: arm game AFTER start click
    gameArmed = true;

    const delay = Math.random() * 4000 + 1000;

    circle.style.background = `
    radial-gradient(
        circle,
        rgba(255,180,180,0.95) 40%,
        rgba(255,180,180,0.5) 70%,
        rgba(255,180,180,0.05) 100%
    )`;

    timeoutId = setTimeout(() => {

        if(!gameArmed) return;

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

circle.addEventListener("click", () => {

    // ❌ ignore EVERYTHING until game is armed
    if(!gameArmed) return;

    // ❌ early click = fail
    if(!canClick){
        reset("Too early! Try again.");
        return;
    }

    // ✅ valid reaction
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

    // reset after successful click
    gameArmed = false;
    canClick = false;

});
