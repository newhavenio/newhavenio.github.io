function parameterize(params) {
  return Object.keys(params)
    .map(function(key) {
      return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
    })
    .join("&");
}

module.exports = {
  parameterize
};
