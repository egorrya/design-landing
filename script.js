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

nav.classList.add('animation');
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
const footerAbsolute = () => {
  const headerHeight = document.querySelector('header').scrollHeight;
  const mainHeight = document.querySelector('main').scrollHeight;
  const footerHeight = document.querySelector('.footer').scrollHeight;
  const footer = document.querySelector('.footer');

  if (window.innerHeight > mainHeight + headerHeight) {
    footer.classList.add('footer__absolute');
    document.querySelector('body').style.overflowY = 'hidden';
  } else {
    footer.classList.remove('footer__absolute');
    document.querySelector('body').style.overflowY = 'auto';
  }
};

// add fade in to every project
document.addEventListener('DOMContentLoaded', () => {
  const projectsOneSection = document.querySelector('.projects--one');

  if (projectsOneSection) {
    projectsOneSection
      .querySelectorAll('.projects__item')
      .forEach((item, index) => {
        setTimeout(() => {
          item.classList.add('fade-in');
        }, index * 100);
      });
  }

  const projectsInside = document.querySelector('.projects__inside');

  if (projectsInside) {
    projectsInside
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
const fullscreenElement =
  document.fullscreenElement ||
  document.mozFullScreenElement ||
  document.webkitFullscreenElement ||
  document.msFullscreenElement;

// popup
function openPopupVideo() {
  const popupVideo = popup.querySelector('video');

  window.scrollTo(0, 0);
  document.querySelector('body').classList.add('overflow-y-none');
  popup.classList.add('popup--show');
  popupVideo.style.display = 'block';

  if (popupVideo.paused) popupVideo.play();
  popupVideo.muted = false;
  popupVideo.volume = 0.5;
  popupVideo.currentTime = 0;
}

if (projectOpenPopup && popup && window.innerWidth >= 680) {
  const videoInsideHeader = projectOpenPopup.querySelector('video');
  if (!videoInsideHeader.muted) videoInsideHeader.muted = true;

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
    popupVideo.style.display = 'none';

    if (projectOpenPopup) {
      if (videoInsideHeader.paused) videoInsideHeader.play();
      if (!videoInsideHeader.muted) videoInsideHeader.muted = true;
    }
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

    footerAbsolute();
  });
}

// mouse moving inside popup cursor
if (popup) {
  let timer;

  const mouseStopped = () => {
    // the actual function that is called
    popup.style.cursor = 'none';
  };

  popup.addEventListener('mousemove', () => {
    popup.style.cursor = "url('./img/close.png'), auto";
    clearTimeout(timer);
    timer = setTimeout(mouseStopped, 3000);
  });
}

// footer absolute
document.addEventListener('DOMContentLoaded', footerAbsolute());

// fix 100vh on mobile
// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);

// We listen to the resize event
window.addEventListener('resize', () => {
  // We execute the same script as before
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});
