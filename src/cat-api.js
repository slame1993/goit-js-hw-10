import axios from 'axios';

export function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => {
      return response.data;
    })
    .catch(error => {
      Notiflix.Notify.failure('Failed to fetch breeds');
      throw error;
    });
}
export function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      Notiflix.Notify.failure('Failed to fetch breeds');
      throw error;
    });
}
