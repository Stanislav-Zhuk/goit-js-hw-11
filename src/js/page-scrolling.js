// function to scroll to the beginning
export { onScroll, onScrollToTop };

const toTopBtnEl = document.querySelector('#to-top__button');

window.addEventListener('scroll', onScroll);
toTopBtnEl.addEventListener('click', onScrollToTop);

function onScroll() {
  const scrolled = window.pageYOffset;
  const coords = document.documentElement.clientHeight;

  if (scrolled > coords) {
    toTopBtnEl.classList.remove('is-hidden');
  }
  if (scrolled < coords) {
    toTopBtnEl.classList.add('is-hidden');
  }
}

function onScrollToTop() {
  if (window.pageYOffset > 0) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
