import axios from 'axios';

export class PixabayAPI {
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

  async fetchGallery() {
    try {
      const response = await axios(
      `${this.#BASE_URL}?key=${this.#API_KEY}&q=${this.searchQuery}&page=${this.page}&${this.params}`
    );

    this.incrementPage();

    return await response.data;
    } catch (error) {
            console.log(error);
        }
  }

  incrementPage() {
      this.page += 1;
    }

  resetPage() {
      this.page = 1;
    }
}

// import axios from 'axios';

// export default class PixabayAPI {
//   constructor() {
//     this.searchQuery = '';
//     this.page = 1;
//     this.per_page = 40;
//   }
//   async fetchGallery() {
//     const axiosParams = {
//       method: 'get',
//       url: 'https://pixabay.com/api/',
//       params: {
//         key: '34785717-8063b5203a171717f86304ea0',
//         q: `${this.searchQuery}`,
//         image_type: 'photo',
//         orientation: 'horizontal',
//         safesearch: true,
//         page: `${this.page}`,
//         per_page: `${this.per_page}`,
//       },
//     };
//     try {
//       const response = await axios(axiosParams);

//       this.incrementPage();

//       return response.data;
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   incrementPage() {
//     this.page += 1;
//   }

//   resetPage() {
//     this.page = 1;
//   }

//   resetEndOfHits() {
//     this.endOfHits = false;
//   }

//   get query() {
//     return this.searchQuery;
//   }

//   set query(newQuery) {
//     this.searchQuery = newQuery;
//   }
// }