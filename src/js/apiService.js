export default class apiService {
  constructor() {
    (this.queryVal = ''), (this.page = 1);
  }

  fetchImg() {
    return fetch(
      `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.queryVal}&page=${this.page}&per_page=12&key=22365607-cef5a2e8d771dec0544965281`,
    )
    .then(response => response.json())
    .then(({ hits }) => {
      this.nextPage();
      return hits;
    });
  }
  nextPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.queryVal;
  }
  set query(newQuery) {
    this.queryVal = newQuery;
  }
}