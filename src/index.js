import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { renderGallery } from './js/render-gallery';

Notify.init({
  borderRadius: '10px',
  timeout: 4000,
  clickToClose: true,
  cssAnimationStyle: 'zoom',
});