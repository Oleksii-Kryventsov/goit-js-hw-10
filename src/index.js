import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import API from './fetchCountries.js'
const DEBOUNCE_DELAY = 300;

const searchCountryInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchCountryInput.addEventListener('input', debounce(handleSearchCountry, DEBOUNCE_DELAY))

function handleSearchCountry(event) {
    event.preventDefault();
    let searchCountry = event.target.value.trim();
    clearInput();
    if (searchCountry === "") {   
        return;
    }
    API.fetchCountries(searchCountry).then(renderMarkup).catch(fetchError)
};

function renderMarkup(data) {
    if (data.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    } else if (data.length >= 2 && data.length < 10) {
        const createMarkup = data.map(element => {
            const countryListMarkup = `
            <li class="country-list__item">
            <img class="country-list__image" src="${element.flags.png}" alt="${element.flags.alt}"></img>
            <p class="country-list__text"><b>${element.name.official}</b></p>
            </li>`;
            return countryListMarkup
        }).join('')
        countryList.innerHTML = createMarkup;
    }
}