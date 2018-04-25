const APIHandler = function (url) {
  this.url = url
  this.countries = [];
}

APIHandler.prototype.getAPI = function (onComplete) {
  const request = new XMLHttpRequest();
  request.open('GET', this.url);
  request.addEventListener('load', function () {
    if (request.status !== 200 ) return;
    const response = JSON.parse(request.responseText);
    this.countries = response;
    console.log(this.countries);

    onComplete(response);
  })
  request.send();
};

module.exports = APIHandler;
