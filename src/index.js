import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries.js';

const DEBOUNCE_DELAY = 300;

const inputRef = document.getElementById('search-box');
const countriesList = document.querySelector('.country-list');

inputRef.addEventListener('input', debounce(onCountrySearch, DEBOUNCE_DELAY));

function onCountrySearch(e) {
  const country = e.target.value;

  fetchCountries(country)
    .then(countries => renderCountriesList(countries))
    .catch(error => console.log(error));
}

//новий файл - ф-я Render
function renderCountriesList(countries) {
  const markup = countries
    .map(country => {
      return `<li>
      <p><b>name</b>: ${country.name.official}</p>
          <p><b>capital</b>: ${country.capital}</p>
          <p><b>population</b>: ${country.population}</p>
          <p><b>languages</b>: ${country.languages}</p>
        </li>`;
    })
    .join('');
  countriesList.innerHTML = markup;
}
