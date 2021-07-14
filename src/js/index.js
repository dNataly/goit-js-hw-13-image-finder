import './../sass/main.scss';
import { refs } from './refs.js';
import getImgMarkup from './../templates/img-list.hbs';

import apiService from './apiService.js';
const fetchCards = new apiService();

import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import toastr from 'toastr';
import 'toastr/build/toastr.css';
toastr.options = {
  closeButton: false,
  debug: false,
  newestOnTop: false,
  progressBar: true,
  positionClass: 'toast-bottom-right',
  preventDuplicates: false,
  onclick: null,
  showDuration: '300',
  hideDuration: '1000',
  timeOut: '5000',
  extendedTimeOut: '1000',
  showEasing: 'swing',
  hideEasing: 'linear',
  showMethod: 'fadeIn',
  hideMethod: 'fadeOut',
};

refs.form.addEventListener('submit', getImgList);
refs.loadMoreBtn.addEventListener('click', loadMore)

function getImgList(e) {
  e.preventDefault();
  reset();
  fetchCards.query = e.currentTarget.elements.query.value;
  if (fetchCards.query === '' || fetchCards.query === ' ') {
    toastr.warning('Type something');
    return;
  }

    getImgName();
    
    if (renderImgList) {
      refs.loadMoreBtn.style.display = 'block';
    }
};


function getImgName() {
  return fetchCards
    .fetchImg()
    .then(renderImgList)
    // .then(window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: 'smooth' }));
  // window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: 'smooth' });

}

function renderImgList(hits) {
  refs.galleryList.insertAdjacentHTML('beforeend', getImgMarkup(hits));
    if (hits.length < 12) {
      refs.loadMoreBtn.style.display = 'none';
      toastr.warning('No more pictures :(');
    }
}

function reset() {
  refs.galleryList.innerHTML = '';
  refs.input.innerText = '';
  fetchCards.resetPage();
}

function scroll() {
 try {
   setTimeout(() => {
     window.scrollTo({
       top: document.body.scrollHeight,
       left: 0,
       behavior: 'smooth',
     });
   }, 1000);
 } catch (error) {
   console.log(error);
  }
}

function loadMore() {
  fetchCards.nextPage();
  getImgName().then(scroll());
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
