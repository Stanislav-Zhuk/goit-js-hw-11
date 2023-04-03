import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { renderGallery } from './js/render-gallery';
import { PixabayAPI } from './js/pixabay-api';

// params library notiflix
Notify.init({
  timeout: 4000,
  clickToClose: true,
  cssAnimationStyle: 'zoom',
});

// use library SimpleLightbox
const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});

// declaration of variables and elements of DOM
const pixabayAPI = new PixabayAPI();

const galleryListEl = document.querySelector('.gallery');
const formSearchEl = document.querySelector('.search-form');
const loadMoreBtnEl = document.querySelector('.load-more');

// add event listener
formSearchEl.addEventListener('submit', onSearchFormSubmit);
// loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

// function to perform a search
async function onSearchFormSubmit(event) {
  event.preventDefault();
  galleryListEl.innerHTML = '';

  const searchQuery = event.currentTarget.elements.searchQuery.value.trim();
  pixabayAPI.query = searchQuery;

}