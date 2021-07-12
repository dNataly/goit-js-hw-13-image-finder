import './../sass/main.scss';
import { refs } from './refs.js';
import getImgMarkup from './../templates/img-list.hbs';

import apiService from './apiService.js';
const fetchCards = new apiService();

import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

refs.form.addEventListener('submit', getImgList);
refs.loadMoreBtn.addEventListener('click', loadMore)

function getImgList(e) {
  e.preventDefault();
    reset();
  fetchCards.query = e.currentTarget.elements.query.value;

  if (fetchCards.query === '' || fetchCards.query === ' ') {
    return
  }

    getImgName();
    
    if (getImgName) {
        refs.loadMoreBtn.style.display = "block";
    }
};


function getImgName() {
    return fetchCards.fetchImg().then(renderImgList);
}

function renderImgList(hits) {
  refs.galleryList.insertAdjacentHTML('beforeend', getImgMarkup(hits));
    if (hits.length < 12) {
        refs.loadMoreBtn.style.display = 'none';
    }
}

function reset() {
    refs.galleryList.innerHTML = '';
    refs.input.innerText = '';
}

function loadMore() {
    fetchCards.nextPage();
    getImgName();

    setTimeout(() => {
      refs.loadMoreBtn.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }, 100);
}

refs.galleryList.addEventListener('click', createModal);
function createModal(e) {
    if (e.target.nodeName !== 'IMG') {
        return;
    }
    const instance = basicLightbox.create(`
    <img src="${e.target.dataset.source}" width="800" height="600">
`);
    instance.show();
}
