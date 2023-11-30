import { fetchBreeds, fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_yULkId2oWAATLksooWjgoomjtcTo7Lamz7Sg8eakmBGxPb1kNVYBZaxRBSFUuNxF';

const refs = {
  select: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  loaderText: document.querySelector('.loader-text'),
  //error: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};

//refs.error.classList.add('is-hidden');
refs.loader.classList.replace('is-hidden', 'loader');
refs.loaderText.classList.replace('is-hidden', 'loader');
refs.select.addEventListener('change', handleChange);

function handleChange(event) {
  const breedId = event.currentTarget.value;
  refs.select.classList.add('is-hidden');
  refs.loader.classList.replace('is-hidden', 'loader');
  refs.loaderText.classList.replace('is-hidden', 'loader-text');
  // refs.catInfo.classList.add('is-hidden')
  fetchCatByBreed(breedId)
    .then(data => {
      refs.select.classList.remove('is-hidden');
      refs.catInfo.classList.remove('is-hidden');
      refs.loader.classList.replace('loader', 'is-hidden');
      refs.loaderText.classList.replace('loader-text', 'is-hidden');

      const catInfoMarkup = createMarkupId(data);
      refs.catInfo.innerHTML = catInfoMarkup;
      if (data.length === 0) {
        Notiflix.Notify.failure(
          'Failed to fetch cat information.Please, choose another cat.'
        );
      }
    })
    .catch(error => {
      refs.select.classList.remove('is-hidden');
      console.error(error);
      Notiflix.Notify.failure('Failed to fetch cat information');
    });
}

fetchBreeds()
  .then(initialBreeds => {
    const arrBreeds = initialBreeds.map(({ name, id, url }) => ({
      name,
      value: id,
      url,
    }));
    refs.select.innerHTML = createMarkup(arrBreeds);
    refs.select.value = arrBreeds[0].value;
    handleChange({ currentTarget: refs.select });
    new SlimSelect({
      select: '#selectElement',
    });

    refs.catInfo.classList.remove('is-hidden');
    refs.select.classList.remove('is-hidden');
    refs.loader.classList.replace('loader', 'is-hidden');
    refs.loaderText.classList.replace('loader-text', 'is-hidden');
  })
  .catch(error => {
    console.error(error);
    refs.select.classList.remove('is-hidden');
    Notiflix.Notify.failure('Failed to fetch breeds');
  });

function createMarkup(arrBreeds) {
  return arrBreeds
    .map(
      arr => `
        <option value='${arr.value}'>${arr.name}</option>
      `
    )
    .join('');
}

function createMarkupId(selectCat) {
  return selectCat
    .map(
      arr => `
      <div class="img-cat">
        <h1>${arr.breeds[0].name}</h1>
        <img src=${arr.url} alt=${arr.breeds[0].name} width='400'/>
      </div>
      <div class="cat-descr">
        <p>${arr.breeds[0].description}</p>
        <p>${arr.breeds[0].temperament}</p>
      </div>
    `
    )
    .join('');
}
