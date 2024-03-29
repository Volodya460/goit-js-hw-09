import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEL = document.querySelector('.form');
const Data = {};
// const inputDelayEl = document.querySelector('input[name="delay"]');
// const inputStepEl = document.querySelector('input[name="step"]');
// const inputAmountEl = document.querySelector('input[name="amount"]');

formEL.addEventListener('submit', startToCreatePromise);
formEL.addEventListener('change', onChengGetValue);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      }
      reject({ position, delay });
    }, delay);
  });
}

function startToCreatePromise(event) {
  event.preventDefault();
  let firstDelay = Number(Data.delay);
  let plusToDelay = Number(Data.step);
  const amounts = Data.amount;
  let state = 0;
  for (let i = 0; i < amounts; i += 1) {
    state += 1;

    createPromise(state, firstDelay)
      .then(({ position, delay }) => {
        Notify.warning(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.warning(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    firstDelay += plusToDelay;
  }
}

function onChengGetValue(eve) {

  const { delay, step, amount } = eve.currentTarget;

  Data.delay = delay.value;
  Data.step = step.value;
  Data.amount = amount.value;
}

// function startToCreatePromise(event) {
//   event.preventDefault();
//   let firstDelay = Number(inputDelayEl.value);
//   let plusToDelay = Number(inputStepEl.value);
//   const amounts = inputAmountEl.value;
//   let state = 0;
//   for (let i = 0; i < amounts; i += 1) {
//     state += 1;

//     createPromise(state, firstDelay)
//       .then(({ position, delay }) => {
//         Notify.warning(`✅ Fulfilled promise ${position} in ${delay}ms`);
//       })
//       .catch(({ position, delay }) => {
//         Notify.warning(`❌ Rejected promise ${position} in ${delay}ms`);
//       });

//     firstDelay += plusToDelay;
//   }
// }
