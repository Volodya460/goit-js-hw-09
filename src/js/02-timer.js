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
let nowDate = new Date();
let selectedDate = '';
let timerId = null;

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    if (selectedDates[0] < nowDate) {
      Notify.warning('Please choose a date in the future');
    } else {
      buttonEL.disabled = false;
    }
    selectedDate = selectedDates[0];
    console.log(selectedDates[0]);
  },
});

buttonEL.addEventListener('click', onclickStartTimer);

function onclickStartTimer() {
  let timerId = setInterval(() => {
    nowDate = new Date();
    diff = selectedDate - nowDate;
    convertMs(diff);
    if (diff <= 1000) {
      clearInterval(timerId);
      Notify.failure('GAME IS OVER');
    }
  }, 1000);

  buttonEL.disabled = true;

  document
    .getElementById('datetime-picker')
    .setAttribute('disabled', 'disabled');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  daysSpanEl.textContent = `${days}`;
  hoursSpanEl.textContent = `${hours}`;
  minutesSpanEl.textContent = `${minutes}`;
  secondsSpanEl.textContent = `${seconds}`;

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
