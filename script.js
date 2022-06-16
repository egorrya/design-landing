// active color menu
const active = document.querySelector('.navigation__link--active');

const createActiveColorNav = (activeLink, className) => {
  const makeAllOneOpacity = (opacityNumber) =>
    document.querySelectorAll(`.${className}`).forEach((el) => {
      el.style.opacity = opacityNumber;
    });

  if (activeLink && className === 'navigation__link') {
    // one active
    makeAllOneOpacity('0.3');
    activeLink.style.opacity = '1';
  } else {
    // all active
    makeAllOneOpacity('1');
  }
};

// menu hover
const handleHover = (e, parentClass, childClass) => {
  if (e.target.classList.contains(childClass)) {
    const link = e.target;
    const siblings = link
      .closest(`.${parentClass}`)
      .querySelectorAll(`.${childClass}`);

    siblings.forEach((el) => {
      if (el === link) el.style.opacity = '1';
      if (el !== link) el.style.opacity = '0.3';
    });
  }
};

// header nav opacity
const nav = document.querySelector('.navigation');
nav.addEventListener('mouseover', (e) =>
  handleHover(e, 'navigation', 'navigation__link')
);
nav.addEventListener('mouseout', () =>
  createActiveColorNav(active, 'navigation__link')
);
createActiveColorNav(active, 'navigation__link');

// footer nav opacity
const footer = document.querySelector('.footer');
footer.addEventListener('mouseover', (e) =>
  handleHover(e, 'footer__list', 'footer__link')
);
footer.addEventListener('mouseout', () =>
  createActiveColorNav(active, 'footer__link')
);

// current year in the footer
document.querySelector('.footer__copyright--year').innerHTML =
  new Date().getFullYear();

// add absolute to the footer
document.addEventListener('DOMContentLoaded', () => {
  const headerHeight = document.querySelector('header').scrollHeight;
  const mainHeight = document.querySelector('main').scrollHeight;
  const footerHeight = document.querySelector('.footer').scrollHeight;

  if (window.innerHeight > mainHeight + headerHeight) {
    document.querySelector('.footer').classList.add('footer__absolute');
  }
});

// add fade in to every project
document.addEventListener('DOMContentLoaded', () => {
  document
    .querySelectorAll('.projects__item')
    .forEach((item) => item.classList.add('opacity-zero'));

  document.querySelectorAll('.projects__item').forEach((item, index) => {
    setTimeout(() => {
      item.classList.add('fade-in');
    }, index * 100);
  });
});

// popup
const popup = document.querySelector('.popup');
const projectOpenPopup = document.querySelector('.project__main-image.video');
const homeButton = document.querySelector('.home__button');

if (projectOpenPopup && popup && window.innerWidth >= 680) {
  projectOpenPopup.addEventListener('click', () => {
    window.scrollTo(0, 0);
    document.querySelector('body').classList.add('overflow-y-none');
    popup.classList.add('popup--show');
  });
} else if (projectOpenPopup && popup && window.innerWidth <= 680) {
  popup.remove();
  document.querySelector('.project__main-image').classList.remove('video');
}

if (homeButton && popup)
  homeButton.addEventListener('click', () => {
    window.scrollTo(0, 0);
    document.querySelector('body').classList.add('overflow-y-none');
    popup.classList.add('popup--show');
  });

if (popup)
  popup.addEventListener('click', () => {
    document.querySelector('body').classList.remove('overflow-y-none');
    popup.classList.remove('popup--show');
  });

// mobile nav
document.querySelector('.navigation__button').addEventListener('click', () => {
  window.scrollTo(0, 0);
  document.querySelector('body').classList.toggle('overflow-y-none');
});
