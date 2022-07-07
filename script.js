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
  const projectsOneSection = document.querySelector('.projects--one');

  if (projectsOneSection) {
    projectsOneSection
      .querySelectorAll('.projects__item')
      .forEach((item) => item.classList.add('opacity-zero'));

    projectsOneSection
      .querySelectorAll('.projects__item')
      .forEach((item, index) => {
        setTimeout(() => {
          item.classList.add('fade-in');
        }, index * 100);
      });
  }
});

const popup = document.querySelector('.popup');
const projectOpenPopup = document.querySelector('.project__main-image.video');
const homeButton = document.querySelector('.home__button');

// popup
function openPopupVideo() {
  window.scrollTo(0, 0);
  document.querySelector('body').classList.add('overflow-y-none');
  popup.classList.add('popup--show');

  const popupVideo = popup.querySelector('video');

  if (popupVideo.paused) popupVideo.play();
  popupVideo.muted = false;
  popupVideo.volume = 0.5;
  popupVideo.currentTime = 0;
}

if (projectOpenPopup && popup && window.innerWidth >= 680) {
  projectOpenPopup.addEventListener('click', () => {
    openPopupVideo();
  });
} else if (projectOpenPopup && popup && window.innerWidth <= 680) {
  popup.remove();
  document.querySelector('.project__main-image').classList.remove('video');
}

if (homeButton && popup)
  homeButton.addEventListener('click', () => {
    openPopupVideo();
  });

if (popup)
  popup.addEventListener('click', () => {
    const popupVideo = popup.querySelector('video');

    document.querySelector('body').classList.remove('overflow-y-none');
    popup.classList.remove('popup--show');

    popupVideo.muted = true;
  });

// mobile nav
document.querySelector('.navigation__button').addEventListener('click', () => {
  window.scrollTo(0, 0);
  document.querySelector('body').classList.toggle('overflow-y-none');
});

// load more
const loadMore = document.querySelector('.load-more');
const projectsTwoSection = document.querySelector('.projects--two');

if (loadMore && projectsTwoSection) {
  // load more button init
  loadMore.style.display = 'flex';
  projectsTwoSection.style.display = 'none';

  // fade in init
  projectsTwoSection
    .querySelectorAll('.projects__item')
    .forEach((item) => item.classList.add('opacity-zero'));

  loadMore.addEventListener('click', () => {
    // hide button
    loadMore.style.opacity = '0';
    loadMore.style.position = 'absolute';
    // loadMore.querySelector('a').style.fontSize = '0';

    // show projects
    projectsTwoSection.style.display = 'flex';

    projectsTwoSection
      .querySelectorAll('.projects__item')
      .forEach((item, index) => {
        setTimeout(() => {
          item.classList.add('fade-in');
        }, index * 100);
      });
  });
}
// mouse moving inside popup cursor

if (popup) {
  let timer;

  function mouseStopped() {
    // the actual function that is called
    popup.style.cursor = 'none';
  }

  popup.addEventListener('mousemove', function () {
    popup.style.cursor = "url('./img/close.png'), auto";
    clearTimeout(timer);
    timer = setTimeout(mouseStopped, 3000);
  });
}
