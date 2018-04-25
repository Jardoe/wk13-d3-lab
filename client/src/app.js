const APIHandler = require('./services/apiHandler.js');
const DropDownView = require('./views/dropDownView.js');
const DBRequest = require('./services/dbRequest.js');
const BucketView = require('./views/bucketView.js');

const apiHandler = new APIHandler("https://restcountries.eu/rest/v2/all")
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

const onCountryComplete = function (addedCountry) {
  bucketView.addCountry(addedCountry);
}

const onCountrySelected = function (event){
  const selectedCountry = {country: event.target.value};
  dbRequest.addCountry(onCountryComplete, selectedCountry);
}

const onDeleteButtonClicked = function () {
  dbRequest.deleteAll(deleteAllRequestComplete)
}

const deleteAllRequestComplete = function (){
  bucketView.clearAll();
}

const appStart = function () {
  dbRequest.getSavedCountries(onSavedCountriesComplete);
  apiHandler.getAPI(getAPIOnComplete);

  const dropDownContainer = document.querySelector('#country-select');
  dropDownContainer.addEventListener('change', onCountrySelected)

  const deleteAllButton = document.querySelector('#delete-all');
  deleteAllButton.addEventListener('click', onDeleteButtonClicked);

};

document.addEventListener('DOMContentLoaded', appStart);
