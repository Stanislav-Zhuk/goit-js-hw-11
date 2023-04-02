import axios from 'axios';

export class PixabayApi {
  #BASE_URL = 'https://pixabay.com/api/';
  #API_KEY = '34785717-8063b5203a171717f86304ea0';

  params = new URLSearchParams([
    ['image_type', 'photo'],
    ['orientation', 'horizontal'],
    ['safesearch', 'true'],
    ['per_page', 40],
  ]);
  searchQuery = '';
  page = 1;

  async fetchImages() {
    try {
      const response = await axios(
      `${this.#BASE_URL}?key=${this.#API_KEY}&q=${this.searchQuery}&page=${this.page}&${this.params}`
    );

    return await response.data;
    } catch (error) {
            console.log(error);
        }
  }
}