const BucketView = function () {
  this.countries = [];
}

BucketView.prototype.addCountry = function (country) {
  this.countries.push(country);
  this.render(country);
};


BucketView.prototype.render = function (country) {
  const ul = document.querySelector('#bucket-list');
  const li = document.createElement('li');
  li.textContent = country.name.
  ul.appendChild(li);
};


module.exports = BucketView;
