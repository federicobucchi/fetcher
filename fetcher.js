window.fetcher = (function() {

  // Fetcher Class
  function Fetcher() {
    self = this;

    this.name = 'Fetcher';
    this.version = '0.0.1';
  };

  // Display error fetching error
  Fetcher.prototype.showError = function(error) {
    throw new Error(error);
  };

  // Build the settings/options to pass for fetching
  Fetcher.prototype.initFetch = function(options, type) {
    var url = options.url;
    var data = JSON.stringify(options.body);

    delete options.url;

    options.method = type;
    options.body = data;

    return [url, options];
  };

  // Call fetch
  Fetcher.prototype.useFetch = function(url, options, callback) {

    // IF window.fetch is available use it ELSE use XMLHttpRequest
    if (window.fetch) {
      window.fetch(url, options).then(function(response) {
        // If response is not ok, call method to display error
        if (!response.ok) {
          self.showError('Status: ' + response.status + ' - Message: ' + response.statusText);
        }

        // Convert data response to JSON
        response.json().then(function(data){
          data.fetcherSuccess = true;

          // Run passed callback
          return callback(data);
        })
      }).catch(function(error){
        // If the fetch is incorrect, call method to display error
        self.showError(options.method + ' - ' + error);
      });
    } else {
      var request = new XMLHttpRequest();

      request.open(options.method, url, true);

      // Loop header keys and at one by one to request
      if (options.headers) {
        for(var property in options.headers) {
          request.setRequestHeader(property, options.headers[property]);
        }
      }

      // Send request
      if (options.body) {
        request.send(JSON.stringify(options.body));
      } else {
        request.send();
      }

      // This method is triggered when the state of the request changes
      request.onreadystatechange = function() {
        // When request is 'done'
        if (request.readyState === 4) {
          // IF the response is good, get data and call the callback ELSE show error
          if (request.status === 200 || request.status === 201 || request.status === 202 || request.status === 204) {
            var data = JSON.parse(request.responseText);

            data.fetcherSuccess = true;

            // Run passed callback
            callback(data);
          } else {
            if (request.status === 0) {
              self.showError('Status: empty - Message: empty');
            } else {
              self.showError('Status: ' + request.status + ' - Message: ' + request.statusText);
            }
          }
        }
      };
    }

    return this;
  };

  Fetcher.prototype.get = function(options, callback) {
    var settings = self.initFetch(options, 'GET');

    return this.useFetch(settings[0], settings[1], callback);
  };

  Fetcher.prototype.post = function(options, callback) {
    var settings = self.initFetch(options, 'POST');

    return this.useFetch(settings[0], settings[1], callback);
  };

  Fetcher.prototype.put = function(options, callback) {
    var settings = self.initFetch(options, 'PUT');

    return this.useFetch(settings[0], settings[1], callback);
  };

  Fetcher.prototype.delete = function(options, callback) {
    var settings = self.initFetch(options, 'DELETE');

    return this.useFetch(settings[0], settings[1], callback);
  };

  return new Fetcher();

})();
