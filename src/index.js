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
const lightbox = new SimpleLightbox('.gallery a');

// declaration of variables and elements of DOM
const pixabayAPI = new PixabayAPI();

const galleryListEl = document.querySelector('.gallery');
const formSearchEl = document.querySelector('.search-form');
const loadMoreBtnEl = document.querySelector('.load-more');

// add event listener
formSearchEl.addEventListener('submit', onSearchFormSubmit);
loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);

// function to perform a photo search
function onSearchFormSubmit(event) {
  event.preventDefault();
  clearGallery();

  pixabayAPI.query = event.currentTarget.elements.searchQuery.value.trim();
  
  if (pixabayAPI.query === '') {
    Notify.info('Please enter at least a few characters to search');
    return;
  } else {
    pixabayAPI.searchPhotos()
      .then(data => {
        const items = data.hits;
        const totalItems = data.totalHits;
        const markup = renderGallery(items);
        
        if (items.length === 0) {
          return Notify.info(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        } else if (items.length < 40) {
          loadMoreBtnEl.classList.add('is-hidden');
          Notify.success(`Hooray! We found ${totalItems} images.`);
          galleryListEl.innerHTML = markup;
          lightbox.on('show.simplelightbox');
          lightbox.refresh();
        } else {
          Notify.success(`Hooray! We found ${totalItems} images.`);
          loadMoreBtnEl.classList.remove('is-hidden');
          galleryListEl.innerHTML = markup;
          lightbox.on('show.simplelightbox');
          lightbox.refresh();
        }
      })
      .catch(error => {
        Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
        console.error(error);
      });
  }
};

// function to upload more photos
function onLoadMoreBtnClick() {
  pixabayAPI.page += 1;

  pixabayAPI.searchPhotos().
    then(data => {
      const items = data.hits;
      
    if (items.length < 40) {
      loadMoreBtnEl.classList.add('is-hidden');
      Notify.info("We're sorry, but you've reached the end of search results.");
      }

      const newMarkup = renderGallery(items);
      galleryListEl.insertAdjacentHTML('beforeend', newMarkup);
      lightbox.refresh();
  });
}

// function to clear the gallery
function clearGallery() {
  pixabayAPI.page = 1;
  galleryListEl.innerHTML = '';

  loadMoreBtnEl.classList.add('is-hidden');
}
