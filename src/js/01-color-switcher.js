const buttonStart = document.querySelector('button[data-start]');
const buttonStop = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

let id;

buttonStart.addEventListener('click', () => {
    id = setInterval(() => {
        body.style.background = getRandomHexColor();
    }, 1000);
    buttonStart.disabled = true;
    buttonStop.disabled = false;
});

buttonStop.addEventListener('click', () =>  {
    clearInterval(id);
    buttonStop.disabled = true;
    buttonStart.disabled = false;
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
