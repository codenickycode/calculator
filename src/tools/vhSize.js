import debounce from './debounce.js';

function vhSize() {
  let vh = window.innerHeight * 0.01;
  console.log(vh);
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', debounce(vhSize, 150));

// add to css:
/* height: calc(var(--vh, 1vh) * 100); */
