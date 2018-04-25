const APIRequest = require('./services/apiRequest.js');
const DropDownView = require('./views/dropDownView.js');
const DBRequest = require('./services/dbRequest.js');
const BucketView = require('./views/bucketView.js');

const apiRequest = new APIRequest("https://restcountries.eu/rest/v2/all")
const dbRequest = new DBRequest("http://localhost:3000")
const bucketView = new BucketView();

const getAPIOnComplete = function (allCountries) {
  const dropDownContainer = document.querySelector('#country-select');
  const dropDownView = new DropDownView(allCountries, dropDownContainer);
  dropDownView.populateList();
};

const onSavedCountriesComplete = function (savedCountries) {
  const bucketList = document.querySelector('#bucket-list');
  savedCountries.forEach((country) => {
    bucketView.addCountry(country)
  });
};

const onCountryComplete = function () {
  // render countries in bucket list;
}

const onCountrySelected = function (event){
  const selectedCountry = {country: event.target.value};
  dbRequest.addCountry(onCountryComplete, selectedCountry);
}

const appStart = function () {
  dbRequest.getSavedCountries(onSavedCountriesComplete);
  apiRequest.getAPI(getAPIOnComplete);
  const dropDownContainer = document.querySelector('#country-select');
  dropDownContainer.addEventListener('change', onCountrySelected)

};

document.addEventListener('DOMContentLoaded', appStart);
