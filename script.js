document.documentElement.classList.add('enhanced');

const menu = document.querySelector('.menu');
const navigation = document.querySelector('#nav');
function closeMenu() {
  menu.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('open');
}
menu.addEventListener('click', () => {
  const open = navigation.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation.classList.contains('open')) {
    closeMenu();
    menu.focus();
  }
});

const carousel = document.querySelector('.carousel');
if (carousel) {
  carousel.classList.add('enhanced');
  const slides = [...carousel.querySelectorAll('[data-slide]')];
  const picks = [...carousel.querySelectorAll('[data-pick]')];
  const pause = carousel.querySelector('[data-pause]');
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0;
  let paused = motion.matches;
  let hovering = false;
  let timer;

  function show(index) {
    current = index;
    slides.forEach((slide, i) => { slide.hidden = i !== index; });
    picks.forEach((pick, i) => pick.setAttribute('aria-pressed', String(i === index)));
  }
  function schedule() {
    window.clearInterval(timer);
    pause.textContent = paused ? 'Play slideshow' : 'Pause slideshow';
    if (!paused && !hovering && !document.hidden) {
      timer = window.setInterval(() => show((current + 1) % slides.length), 6500);
    }
  }
  picks.forEach((pick, index) => pick.addEventListener('click', () => {
    paused = true;
    show(index);
    schedule();
  }));
  pause.addEventListener('click', () => {
    paused = !paused;
    schedule();
  });
  carousel.addEventListener('focusin', event => {
    if (event.target !== pause) {
      paused = true;
      schedule();
    }
  });
  carousel.addEventListener('pointerenter', event => {
    if (event.pointerType === 'mouse') {
      hovering = true;
      schedule();
    }
  });
  carousel.addEventListener('pointerleave', () => {
    hovering = false;
    schedule();
  });
  motion.addEventListener('change', event => {
    if (event.matches) {
      paused = true;
      schedule();
    }
  });
  document.addEventListener('visibilitychange', schedule);
  schedule();
}

const enquiry = document.querySelector('[data-enquiry]');
if (enquiry) {
  enquiry.addEventListener('submit', event => {
    event.preventDefault();
    const fields = new FormData(enquiry);
    const message = [
      'Hello, I would like to request technical service.',
      'Name: ' + fields.get('name').trim(),
      'Area or site: ' + fields.get('area').trim(),
      'Service: ' + fields.get('service'),
      'Details: ' + fields.get('details').trim()
    ].join('\n');
    const chat = new URL('https://wa.me/971501157444');
    chat.searchParams.set('text', message);
    window.location.assign(chat.href);
  });
}

document.querySelector('[data-year]').textContent = new Date().getFullYear();
