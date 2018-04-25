const APIRequest = function (url) {
  this.url = url
}

APIRequest.prototype.getAPI = function (onComplete) {
  const request = new XMLHttpRequest();
  request.open('GET', this.url);
  request.addEventListener('load', function () {
    if (request.status !== 200 ) return;
    const response = JSON.parse(request.responseText);
    onComplete(response)
  })
  request.send();
};

module.exports = APIRequest;
