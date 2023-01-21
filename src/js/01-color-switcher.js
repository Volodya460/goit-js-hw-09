function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const buttonStartEL = document.querySelector('button[data-start]');
const buttonStopEL = document.querySelector('button[data-stop]');
const bodyEL = document.querySelector('body');
let timerId = null;

buttonStartEL.addEventListener('click', clickColorChange);
buttonStopEL.addEventListener('click', clickStopColorChange);

function clickColorChange() {
  timerId = setInterval(
    () => (bodyEL.style.backgroundColor = getRandomHexColor()),
    1000
  );

  buttonStartEL.disabled = true;
}

function clickStopColorChange() {
  clearInterval(timerId);
  buttonStartEL.disabled = false;
}
