// function of creating a markup of a photo card

export function renderGallery(elements) {
  return elements.map(({ largeUrl, webUrl, tags, likes, views, comments, downloads }) => `
    <div class="photo-card">
      <a href="${largeUrl}">
        <img class="photo-img" src="${webUrl}" alt="${tags}" loading="lazy" />
      </a>
      <div class='info'>
        <p class='info-item'><b>Likes</b> ${likes}</p>
        <p class='info-item'><b>Views</b> ${views}</p>
        <p class='info-item'><b>Comments</b> ${comments}</p>
        <p class='info-item'><b>Downloads</b> ${downloads}</p>
      </div>
    </div>
  `).join('');
}
