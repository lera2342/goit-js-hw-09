

const form = document.querySelector('.form');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const { delay, step, amount } = event.currentTarget.elements;
  let createNewDelay = Number(delay.value);
  let createNewStep = Number(step.value);
  let createNewAmount = Number(amount.value);
  for (let i = 1; i <= createNewAmount; i += 1) {
    createPromise(i, createNewDelay)
    .then(({ position, delay }) => {
      console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    createNewDelay += createNewStep;
  }
  event.currentTarget.reset()
});


function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}