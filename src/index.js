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

  pixabayAPI.query = event.currentTarget.elements.searchQuery.value.trim();
  
  if (pixabayAPI.query === '') {
    Notify.warning('Please enter at least a few characters to search');
    return;
  }

  try {
    const photos = await pixabayAPI.searchPhotos().then(response => {
      const items = response.data.hits;
      const totalItems = response.data.totalHits;

      if (items.length === 0) {
        return Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      Notify.success(`Hooray! We found ${totalItems} images.`);
      const markup = renderGallery(items);
      if (markup !== undefined) {
        galleryListEl.innerHTML = markup;
        lightbox.on('show.simplelightbox');
        lightbox.refresh();
        loadMoreBtnEl.classList.remove('is-hidden');
      }
    });
  } catch {
    error => console.error(error);
  }
}