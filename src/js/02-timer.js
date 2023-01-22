import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const buttonEL = document.querySelector('button[data-start]');
const daysSpanEl = document.querySelector('span[data-days]');
const hoursSpanEl = document.querySelector('span[data-hours]');
const minutesSpanEl = document.querySelector('span[data-minutes]');
const secondsSpanEl = document.querySelector('span[data-seconds]');
const boxTimetEl = document.querySelector('.timer');
boxTimetEl.style.display = 'flex';
boxTimetEl.style.width = '250px';
boxTimetEl.style.padding = '10px';
boxTimetEl.style.backgroundColor = '#f5c836';
boxTimetEl.style.margin = '5px';
boxTimetEl.style.marginLeft = '0';
boxTimetEl.style.borderRadius = '5px';

buttonEL.disabled = true;
let selectDate = null;
let timerId = null;
let diff = null;

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose([selectedDates]) {
    if (selectedDates < Date.now()) {
      Notify.warning('Please choose a date in the future');
    } else {
      buttonEL.disabled = false;
    }
    selectDate = selectedDates;

    console.log(selectedDates);
  },
});

buttonEL.addEventListener('click', onclickStartTimer);

function onclickStartTimer() {
  let timerId = setInterval(() => {
    runTimer();
    if (Math.floor(diff / 1000) < 0) {
      clearInterval(timerId);
      Notify.failure('GAME IS OVER');
    }
  }, 1000);

  buttonEL.disabled = true;
  document
    .getElementById('datetime-picker')
    .setAttribute('disabled', 'disabled');
}

function runTimer() {
  let convertedTime = convertMs(diff);
  daysSpanEl.textContent = addLeadingZero(convertedTime.days);
  hoursSpanEl.textContent = addLeadingZero(convertedTime.hours);
  minutesSpanEl.textContent = addLeadingZero(convertedTime.minutes);
  secondsSpanEl.textContent = addLeadingZero(convertedTime.seconds);
  diff = selectDate - Date.now();
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
