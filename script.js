// script.js
let timer;
let startTime;
let elapsedTime = 0;
let laps = [];

function formatTime(time) {
    let hours = Math.floor(time / (60 * 60 * 1000));
    let minutes = Math.floor((time % (60 * 60 * 1000)) / (60 * 1000));
    let seconds = Math.floor((time % (60 * 1000)) / 1000);
    let milliseconds = time % 1000;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
}

function printTime() {
    document.getElementById("display").textContent = formatTime(elapsedTime);
}

function startStop() {
    if (!timer) {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(function () {
            elapsedTime = Date.now() - startTime;
            printTime();
        }, 10);
        document.getElementById("startStop").textContent = "Stop";
    } else {
        clearInterval(timer);
        timer = null;
        document.getElementById("startStop").textContent = "Start";
    }
}

function pauseResume() {
    if (timer) {
        clearInterval(timer);
        timer = null;
        document.getElementById("startStop").textContent = "Start";
    } else {
        startStop();
    }
}

function reset() {
    clearInterval(timer);
    timer = null;
    elapsedTime = 0;
    printTime();
    laps = [];
    document.getElementById("startStop").textContent = "Start";
    document.getElementById("laps").innerHTML = "";
}

function lap() {
    laps.push(elapsedTime);
    let lapTime = laps[laps.length - 1] - (laps.length > 1 ? laps[laps.length - 2] : 0);
    let lapItem = document.createElement("li");
    lapItem.textContent = `Lap ${laps.length}: ${formatTime(lapTime)}`;
    document.getElementById("laps").appendChild(lapItem);
}

document.getElementById("startStop").addEventListener("click", startStop);
document.getElementById("pauseResume").addEventListener("click", pauseResume);
document.getElementById("reset").addEventListener("click", reset);
document.getElementById("lap").addEventListener("click", lap);
