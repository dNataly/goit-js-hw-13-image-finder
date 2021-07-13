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
  if (fetchCards.query === '') {
    return
  }

    getImgName();
    
    if (renderImgList) {
      refs.loadMoreBtn.style.display = 'block';
    }
};


function getImgName() {
  if (fetchCards.nextPage) {
    $('html, body').animate(
      {
        scrollTop: $('.scroll-to').offset().top + 400,
      },
      1000,
    );
  }
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
  fetchCards.resetPage();
}

function loadMore() {
  fetchCards.nextPage();
  getImgName();
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
