let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;

const timeDisplay = document.getElementById('time');
const startStopBtn = document.getElementById('startStop');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');
const toggleThemeBtn = document.getElementById('toggleTheme');

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

function updateTime() {
  elapsedTime = Date.now() - startTime;
  timeDisplay.textContent = formatTime(elapsedTime);
}

startStopBtn.onclick = () => {
  if (!running) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTime, 1000);
    startStopBtn.textContent = 'Stop';
    running = true;
  } else {
    clearInterval(timerInterval);
    startStopBtn.textContent = 'Start';
    running = false;
  }
};

resetBtn.onclick = () => {
  clearInterval(timerInterval);
  timeDisplay.textContent = '00:00:00';
  elapsedTime = 0;
  running = false;
  startStopBtn.textContent = 'Start';
  lapsContainer.innerHTML = '';
};

lapBtn.onclick = () => {
  if (running) {
    const lapTime = formatTime(elapsedTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = lapTime;
    lapsContainer.appendChild(lapItem);
  }
};

// Theme toggle
toggleThemeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
});
