const DropDownView = function (allCountries, select) {
  this.allCountries = allCountries;
  this.select = select;
};

DropDownView.prototype.populateList = function () {
  this.allCountries.forEach((country) => {
    const option = document.createElement('option');
    option.textContent = country.name;
    option.value = country.name;
    this.select.appendChild(option);
  } )
};

module.exports = DropDownView;
