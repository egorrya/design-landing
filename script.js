const active = document.querySelector('.navigation__link--active'),
  createActiveColorNav = (a, c) => {
    let b = (a) =>
      document.querySelectorAll(`.${c}`).forEach((b) => {
        b.style.opacity = a;
      });
    a && 'navigation__link' === c
      ? (b('0.3'), (a.style.opacity = '1'))
      : b('1');
  },
  handleHover = (a, c, b) => {
    if (a.target.classList.contains(b)) {
      let d = a.target,
        e = d.closest(`.${c}`).querySelectorAll(`.${b}`);
      e.forEach((a) => {
        a === d && (a.style.opacity = '1'),
          a !== d && (a.style.opacity = '0.3');
      });
    }
  },
  nav = document.querySelector('.navigation');
nav.classList.add('animation'),
  nav.addEventListener('mouseover', (a) =>
    handleHover(a, 'navigation', 'navigation__link')
  ),
  nav.addEventListener('mouseout', () =>
    createActiveColorNav(active, 'navigation__link')
  ),
  createActiveColorNav(active, 'navigation__link');
const footer = document.querySelector('.footer');
footer.addEventListener('mouseover', (a) =>
  handleHover(a, 'footer__list', 'footer__link')
),
  footer.addEventListener('mouseout', () =>
    createActiveColorNav(active, 'footer__link')
  ),
  (document.querySelector('.footer__copyright--year').innerHTML =
    new Date().getFullYear());
const footerAbsolute = () => {
  let b = document.querySelector('header').scrollHeight,
    c = document.querySelector('main').scrollHeight;
  document.querySelector('.footer').scrollHeight;
  let a = document.querySelector('.footer');
  window.innerHeight > c + b
    ? (a.classList.add('footer__absolute'),
      (document.querySelector('body').style.overflowY = 'hidden'))
    : (a.classList.remove('footer__absolute'),
      (document.querySelector('body').style.overflowY = 'auto'));
};
document.addEventListener('DOMContentLoaded', () => {
  let a = document.querySelector('.projects--one');
  a &&
    a.querySelectorAll('.projects__item').forEach((b, a) => {
      setTimeout(() => {
        b.classList.add('fade-in');
      }, 100 * a);
    });
  let b = document.querySelector('.projects__inside');
  b &&
    b.querySelectorAll('.projects__item').forEach((b, a) => {
      setTimeout(() => {
        b.classList.add('fade-in');
      }, 100 * a);
    });
});
const popup = document.querySelector('.popup'),
  projectOpenPopup = document.querySelector('.project__main-image.video'),
  homeButton = document.querySelector('.home__button'),
  fullscreenElement =
    document.fullscreenElement ||
    document.mozFullScreenElement ||
    document.webkitFullscreenElement ||
    document.msFullscreenElement;
function openPopupVideo() {
  let a = popup.querySelector('video');
  window.scrollTo(0, 0),
    document.querySelector('body').classList.add('overflow-y-none'),
    popup.classList.add('popup--show'),
    (a.style.display = 'block'),
    a.paused && a.play(),
    (a.muted = !1),
    (a.volume = 0.5),
    (a.currentTime = 0);
}
if (projectOpenPopup && popup && window.innerWidth >= 680) {
  let a = projectOpenPopup.querySelector('video');
  a.muted || (a.muted = !0),
    projectOpenPopup.addEventListener('click', () => {
      openPopupVideo();
    });
} else
  projectOpenPopup &&
    popup &&
    window.innerWidth <= 680 &&
    (popup.remove(), projectOpenPopup.querySelector('video').remove());
homeButton &&
  popup &&
  homeButton.addEventListener('click', () => {
    openPopupVideo();
  }),
  popup &&
    popup.addEventListener('click', () => {
      let a = popup.querySelector('video');
      document.querySelector('body').classList.remove('overflow-y-none'),
        popup.classList.remove('popup--show'),
        (a.muted = !0),
        (a.style.display = 'none'),
        projectOpenPopup &&
          (projectOpenPopup.querySelector('video').play(),
          (projectOpenPopup.querySelector('video').muted = !0));
    }),
  document
    .querySelector('.navigation__button')
    .addEventListener('click', () => {
      window.scrollTo(0, 0),
        document.querySelector('body').classList.toggle('overflow-y-none');
    });
const loadMore = document.querySelector('.load-more'),
  projectsTwoSection = document.querySelector('.projects--two');
if (
  (loadMore &&
    projectsTwoSection &&
    ((loadMore.style.display = 'flex'),
    (projectsTwoSection.style.display = 'none'),
    projectsTwoSection
      .querySelectorAll('.projects__item')
      .forEach((a) => a.classList.add('opacity-zero')),
    loadMore.addEventListener('click', () => {
      (loadMore.style.opacity = '0'),
        (loadMore.style.position = 'absolute'),
        (projectsTwoSection.style.display = 'flex'),
        projectsTwoSection
          .querySelectorAll('.projects__item')
          .forEach((b, a) => {
            setTimeout(() => {
              b.classList.add('fade-in');
            }, 100 * a);
          }),
        footerAbsolute();
    })),
  popup)
) {
  let b,
    c = () => {
      popup.style.cursor = 'none';
    };
  popup.addEventListener('mousemove', () => {
    (popup.style.cursor = "url('./img/close.png'), auto"),
      clearTimeout(b),
      (b = setTimeout(c, 3e3));
  });
}
document.addEventListener('DOMContentLoaded', footerAbsolute());
let vh = 0.01 * window.innerHeight;
document.documentElement.style.setProperty('--vh', `${vh}px`),
  window.addEventListener('resize', () => {
    let a = 0.01 * window.innerHeight;
    document.documentElement.style.setProperty('--vh', `${a}px`);
  });
