const DBRequest = function (url) {
  this.url = url;
}

DBRequest.prototype.addCountry = function (onComplete, payload) {
  const request = new XMLHttpRequest();
  request.open('POST', this.url);

  request.setRequestHeader("Content-Type", 'application/json');
  request.addEventListener('load', function () {
    if(request.status !== 201) return;
    const response = JSON.parse(request.responseText);
    onComplete(response);
  })
  console.log(request);
  const jsonPayload = JSON.stringify(payload)
  request.send(jsonPayload)
};

DBRequest.prototype.getSavedCountries = function (onComplete) {
  const request = new XMLHttpRequest();
  request.open('GET', this.url);
  request.addEventListener('load', function () {
    if(request.status !== 200) return;
    console.log(request);
    const response = JSON.parse(request.responseText);
    onComplete(response);
  })
  request.send();
}

module.exports = DBRequest;
