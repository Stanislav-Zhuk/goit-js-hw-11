import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { renderGallery } from './js/render-gallery';
import { PixabayAPI } from './js/pixabay-api';

// params library notiflix
Notify.init({
  borderRadius: '10px',
  timeout: 4000,
  clickToClose: true,
  cssAnimationStyle: 'zoom',
});

// use library SimpleLightbox
const SLBparams = {
  captionsData: 'alt',
  captionDelay: 250,
};

const lightbox = new SimpleLightbox('.gallery a', SLBparams);

// declaration of variables and elements of DOM
const pixabayAPI = new PixabayAPI();

const galleryEl = document.querySelector('.gallery');
const formSearchEl = document.querySelector('.search-form');
const loadMoreBtn = document.querySelector('.load-more');

// add event listener
formSearchEl.addEventListener('submit', onSearchFormSubmit);
// loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

// function to perform a search
function onSearchFormSubmit(event) {
  event.preventDefault();

  galleryEl.innerHTML = '';
  pixabayAPI.query = event.currentTarget.elements.searchQuery.value.trim();
  pixabayAPI.resetPage();

  if (pixabayAPI.query === '') {
    Notify.warning('Please enter at least a few characters to search');
    return;
  }
}