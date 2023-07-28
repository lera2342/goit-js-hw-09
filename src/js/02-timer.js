import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";


const day = document.querySelector('[data-days]');
const hour = document.querySelector('[data-hours]');
const minute = document.querySelector('[data-minutes]');
const second = document.querySelector('[data-seconds]');
const inputText = document.querySelector('#datetime-picker');
const buttonStart = document.querySelector('button[data-start]');

let timer = null;
buttonStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      alert('Please choose a date in the future');
      return;
    }
    buttonStart.disabled = false;
  },
};

flatpickr(inputText, options);

buttonStart.addEventListener('click', startCount);

function startCount() {
  inputText.disabled = true;
  buttonStart.disabled = true;
  timer = setInterval(() => {
    const selectedData = new Date(inputText.value);
    const remainder = selectedData - Date.now();
    const { days, hours, minutes, seconds } = convertMs(remainder);
    day.textContent = addLeadingZero(days);
    hour.textContent = addLeadingZero(hours);
    minute.textContent = addLeadingZero(minutes);
    second.textContent = addLeadingZero(seconds);
    if (remainder < 1000) {
      clearInterval(timer);
      Notify.success('Time is over');
      inputText.disabled = false;
    };
  }, 1000);
  
}


function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
  
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}