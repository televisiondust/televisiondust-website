const section = document.querySelector('section');

let currentPos = window.pageYOffset;

const update = () => {
  const newPos = window.pageYOffset;
  const diff = newPos - currentPos;
  const speed = diff * 0.02;
  if (section) {
    section.style.transform = `skew(${speed}deg, ${-diff * 0.01}deg )`;
    console.log('called');
  }
  console.log('called');
  currentPos = newPos;

  requestAnimationFrame(update);
};

section.addEventListener('scroll', update());
