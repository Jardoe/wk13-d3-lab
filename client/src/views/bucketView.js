const BucketView = function () {
  this.countries = [];
}

BucketView.prototype.addCountry = function (country) {
  this.countries.push(country);
  this.render(country);
};


BucketView.prototype.render = function (object) {
  const ul = document.querySelector('#bucket-list');
  const li = document.createElement('li');
  li.textContent = object.country
  ul.appendChild(li);
};

BucketView.prototype.clearAll = function () {
  this.countries = [];
  const ul = document.querySelector('#bucket-list');
  ul.innerHTML = "";
};


module.exports = BucketView;
