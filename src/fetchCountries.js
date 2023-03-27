const BASE_URL = 'https://restcountries.com/v3.1/name';

 function fetchCountries(nameOfCountry) {
    return fetch (`${BASE_URL}/${nameOfCountry}?fields=name,capital,population,flags,languages`)
        .then(response => {
            if (response.ok) {
            return response.json()
        } throw new Error(response.statusText)
    })
};

export default { fetchCountries };
