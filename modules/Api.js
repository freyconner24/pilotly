var Api = module.exports = {
  post: function(url, data) {
    var options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }

    if(arguments.length > 1) {
      options.body = JSON.stringify(data);
    }

    return fetch(url, options)
    .then(res => res.json())
    .then((res) => {
      if(res.error) {
        throw res;
      }

      return res;
    })
  }
}
