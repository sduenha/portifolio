'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header')
const navHeight = nav.getBoundingClientRect().height;

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

btnScrollTo.addEventListener('click', function(e) {
  section1.scrollIntoView({behavior: 'smooth'});
});

document.querySelector('.nav__links').addEventListener('click', function(e) {
  e.preventDefault();
  const id = e.target.getAttribute('href');
  if(e.target.classList.contains('nav__link') && id !== '#'){
    document.querySelector(id).scrollIntoView({behavior: 'smooth'});
  };
});

// Tabbed component

tabsContainer.addEventListener('click', function(e) {
  const clicked = e.target.closest('.operations__tab');

  if(!clicked) return;

  tabs.forEach(el => el.classList.remove('operations__tab--active'));
  tabsContent.forEach(el => el.classList.remove('operations__content--active'));

  clicked.classList.add('operations__tab--active');
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
});

// Menu fade animation
const handleHover = function(e) {
  if(!e.target.classList.contains('nav__link')) return;

  const link = e.target;
  const siblings = link.closest('.nav').querySelectorAll('.nav__link');
  const logo = link.closest('.nav').querySelector('img');

  siblings.forEach(el => {
    if(el !== link) el.style.opacity = this;
    logo.style.opacity = this;
  });
};  

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// Sticky Navigation
// const initialCoords = section1.getBoundingClientRect();

// window.addEventListener('scroll', function(e) {
//   if(window.scrollY > initialCoords.top) nav.classList.add('sticky')
//   else nav.classList.remove('sticky');
// });

// Sticky Navigation: Intersection Observer API
const stickyNav = function(entries) {
  const [entry] = entries;

  if(!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {root: null, threshold: 0, rootMargin: `-${navHeight}px`,});
headerObserver.observe(header);

// Reveal sections
const allSections = document.querySelectorAll('.section');

const revealSection = function(entries, observer) {
  const [entry] = entries;
  if(!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {root: null, threshold: 0.15,});

allSections.forEach(function(section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// Lazy loading images
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function(entries, observer) {
  const [entry] = entries;

  if(!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function() {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {root: null, threshold: 0, rootMargin: '-200px',});

imgTargets.forEach(img => imgObserver.observe(img));

// Slider
const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const maxSlide = slides.length;
const dotContainer = document.querySelector('.dots');
let curSlide = 0;

const createDots = function() {
  slides.forEach(function(_, i){
    dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`);
  });
};

const activateDot = function(slide) {
  document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));
  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
};

const goToSlide = function(slide) {
  slides.forEach((s,i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`));
  activateDot(slide);
}; 

createDots();
goToSlide(0);

const nextSlide = function() {
  if(curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  };

  goToSlide(curSlide);
}

const prevSlide = function() {
  if(curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  };

  goToSlide(curSlide);
}

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);
document.addEventListener('keydown', function(e) {
  e.key === 'ArrowLeft' && prevSlide();
  e.key === 'ArrowRight' && nextSlide();
});

dotContainer.addEventListener('click', function(e) {
  if(!e.target.classList.contains('dots__dot')) return;
  const {slide} = e.target.dataset;
  goToSlide(slide);
});

////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

// const h1 = document.querySelector('h1');

// const alertH1 = function(e) {
//   alert('AddEventListener: Great! You are reading the heading :D');
// }

// h1.addEventListener('mouseenter', alertH1);

// setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

// const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () => `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// document.querySelector('.nav__link').addEventListener('click', function(e) {
//   this.style.backgroundColor = randomColor();
//   console.log('LINK', e.target, e.currentTarget);

//   // Não é uma ideia muito boa usar
//   // e.stopPropagation();
// });

// document.querySelector('.nav__links').addEventListener('click', function(e) {
//   this.style.backgroundColor = randomColor();
//   console.log('CONTAINER', e.target, e.currentTarget);
// });

// document.querySelector('.nav').addEventListener('click', function(e) {
//   this.style.backgroundColor = randomColor();
//   console.log('NAV', e.target, e.currentTarget);
// });

// const h1 = document.querySelector('h1');
// console.log(h1.querySelectorAll('.highlight'));