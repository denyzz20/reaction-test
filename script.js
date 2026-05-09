const startBtn = document.getElementById("startBtn");
const timer = document.getElementById("timer");
const message = document.getElementById("message");
const circle = document.getElementById("circle");

let waiting = false;
let ready = false;
let startTime = 0;
let timeoutId = null;

function reset() {
    clearTimeout(timeoutId);
    waiting = false;
    ready = false;
    startTime = 0;

    timer.innerText = "0 ms";
    message.innerText = "Press start";

    circle.style.background = `
    radial-gradient(
        circle,
        rgba(255,255,255,0.95) 40%,
        rgba(255,255,255,0.5) 70%,
        rgba(255,255,255,0.05) 100%
    )`;
}

startBtn.addEventListener("click", () => {

    reset();

    waiting = true;

    message.innerText = "Wait for green...";

    circle.style.background = `
    radial-gradient(
        circle,
        rgba(255,180,180,0.95) 40%,
        rgba(255,180,180,0.5) 70%,
        rgba(255,180,180,0.05) 100%
    )`;

    const delay = Math.random() * 4000 + 1000;

    timeoutId = setTimeout(() => {

        waiting = false;
        ready = true;

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

    // game not started
    if(!waiting && !ready) return;

    // clicked too early
    if(waiting && !ready){
        reset();
        message.innerText = "Too early! Press start again.";
        return;
    }

    // valid reaction
    if(ready){

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

        ready = false;
    }

});
