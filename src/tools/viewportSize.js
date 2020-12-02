import debounce from './debounce.js';

function viewportSize() {
  let vh = window.innerHeight * 0.01;
  let vw = window.innerWidth * 0.01;
  console.log(vw, vh);
  document.documentElement.style.setProperty('--vw', `${vw}px`);
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', debounce(viewportSize, 150));

// add to css:
/* height: calc(var(--vh, 1vh) * 100); */
