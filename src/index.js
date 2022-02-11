import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import './css/styles.css';
import { fetchCountries } from './js/fetchCountries.js';
import countriesListTpl from './templates/countries-list.hbs';
import countryInfoTpl from './templates/country-info.hbs';

const DEBOUNCE_DELAY = 300;

const inputRef = document.getElementById('search-box');
const countriesListRef = document.querySelector('.country-list');
const countryInfoRef = document.querySelector('.country-info');

inputRef.placeholder = 'Enter country name';

inputRef.addEventListener('input', debounce(onCountrySearch, DEBOUNCE_DELAY));

function onCountrySearch(e) {
  const country = e.target.value;
  clearCardContainer();
  if (country.length > 0) {
    fetchCountries(country)
      .then(renderCountriesList)
      .catch(error =>
        Notiflix.Notify.failure('Oops, there is no country with that name', { clickToClose: true }),
      );
    // .then(countries => renderCountriesList(countries))
    // .catch(error => console.log(error));
  }
}

//новий файл - ф-я Render
function renderCountriesList(countries) {
  if (countries.length > 10) {
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.', {
      clickToClose: true,
    });
  } else if (countries.length === 1) {
    countryInfoRef.insertAdjacentHTML('beforeend', countryInfoTpl(countries));
  } else {
    countriesListRef.insertAdjacentHTML('beforeend', countriesListTpl(countries));
  }
}

function clearCardContainer() {
  countryInfoRef.innerHTML = '';
  countriesListRef.innerHTML = '';
}
