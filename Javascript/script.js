'use strict';

const btnScrollTo = document.querySelector('.btn-scroll-to');
const section1 = document.querySelector('#section-1');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations-tab');
const tabsContainer = document.querySelector('.operations-tab-container');
const tabsContent = document.querySelectorAll('.operations-content');

// nav opacity
const handleHover = function (e) {
  if (e.target.classList.contains('nav-link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav-link');
    const logo = link.closest('.nav').querySelector('.logo');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));
// Button scrolling
btnScrollTo.addEventListener('click',(e)=>section1.scrollIntoView({ behavior: 'smooth' }));
tabsContainer.addEventListener('click',(e)=>{
  const clicked = e.target.closest('.operations-tab');
  if (!clicked) return;
  tabs.forEach(t => t.classList.remove('operations-tab-active'));
  tabsContent.forEach(c => c.classList.remove('operations-content-active'));
  clicked.classList.add('operations-tab-active');

  document.querySelector(`.operations-content-${clicked.dataset.tab}`).classList.add('operations-content-active');
})
///////////////////////////////////////
//slider
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider-btn-left');
  const btnRight = document.querySelector('.slider-btn-right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dot" data-slide="${i}"></button>`
      );
    });
  };

    const activateDot = function (slide) {
      document
        .querySelectorAll('.dot')
        .forEach(dot => dot.classList.remove('dot-active'));

      document
        .querySelector(`.dot[data-slide="${slide}"]`)
        .classList.add('dot-active');
    };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

