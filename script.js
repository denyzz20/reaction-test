const startBtn = document.getElementById("startBtn");
const timer = document.getElementById("timer");
const message = document.getElementById("message");
const circle = document.getElementById("circle");

let startTime = 0;
let state = "idle"; 
// idle | waiting | ready

let timeoutId = null;

function resetToIdle(text = "Press start") {
    clearTimeout(timeoutId);

    state = "idle";
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

    resetToIdle("Wait for green...");

    state = "waiting";

    const delay = Math.random() * 4000 + 1000;

    circle.style.background = `
    radial-gradient(
        circle,
        rgba(255,180,180,0.95) 40%,
        rgba(255,180,180,0.5) 70%,
        rgba(255,180,180,0.05) 100%
    )`;

    timeoutId = setTimeout(() => {

        state = "ready";
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

    if(state === "idle") return;

    // ❌ clicked too early
    if(state === "waiting"){
        resetToIdle("Too early! Press start again.");
        return;
    }

    // ✅ valid reaction
    if(state === "ready"){

        const reaction = Date.now() - startTime;

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

        state = "idle";
    }

});
