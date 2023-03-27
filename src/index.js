import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import fetchCountriesAPI from './fetchCountries.js'
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
    fetchCountriesAPI.fetchCountries(searchCountry).then(renderMarkup).catch(fetchError)
};

function renderMarkup(data) {

    if (data.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');

    } else if (data.length >= 2 && data.length < 10) {
        const createMarkup = data.map(element => {
            const countryListMarkup = `
            <li class="country-list__item">
            <div class="country-list__container">
                <img class="country-list__image" src="${element.flags.png}" alt="${element.flags.alt}" width="80" height="40"></img>
                <p class="country-list__text"><b>${element.name.official}</b></p>
            </div>
            </li>`;
            return countryListMarkup
        }).join('')
        countryList.innerHTML = createMarkup;

    } else if (data.length === 1) {
        countryInfo.innerHTML = `
        <div class="country-info__container">
            <img class="country-info__img" src="${data[0].flags.svg}" alt="${data[0].flags.alt}" width="300" height="140">
            <h1 class="country-info__text">${data[0].name.official}</h1>
        </div>
        <div class="country-info__container">
            <p class="country-info__item-text"><b>Capital:</b> ${data[0].capital}</p>
            <p class="country-info__item-text"><b>Population:</b> ${data[0].population}</p>
            <p class="country-info__item-text"><b>Languages:</b> ${Object.values(data[0].languages)}</p>
        </div>`
    }
};

function fetchError() { 
    Notiflix.Notify.failure('Oops, there is no country with that name');
};

function clearInput() {
    countryInfo.innerHTML = '';
    countryList.innerHTML = '';
};

