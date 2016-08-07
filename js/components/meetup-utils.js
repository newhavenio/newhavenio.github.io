(function (exports, global, document) {
  var floor = Math.floor;
  var random = Math.random;

  var DAYS = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday",
    "Saturday"
  ];

  var MONTHS = [
    "January", "February", "March", "April", "May", "June", "July", "August",
    "September", "October", "November", "December"
  ];

  function createElementDefinition(template) {
    return {
      createdCallback: {
        value: function createdCallback() {
          this.render();
        }
      },

      render: {
        value: function render() {
          this.innerHTML = Mustache.render(
            template,
            Object.create(this.data, this.decorator)
          );
        }
      },

      data: {
        get: function get() {
          return this._data || {};
        },
        set: function set(value) {
          this._data = value;
          this.render();
        }
      }
    };
  }

  exports.createMeetupElement = function createMeetupElement(template) {
    Mustache.parse(template);
    return Object.create(
      HTMLElement.prototype,
      createElementDefinition(template)
    );
  };

  exports.parameterize = function parameterize(params) {
    return Object.keys(params)
      .map(function (key) {
        return encodeURIComponent(key) + '=' +
          encodeURIComponent(params[key]);
      })
      .join('&');
  };

  exports.venueMapUrl = function venueMapUrl(venue) {
    /* jshint camelcase: false */
    return 'http://maps.google.com/?' +
      exports.parameterize({
        q: [venue.address_1, venue.city].join(' ')
      });
  };

  exports.eventsUrl = function eventsUrl(params) {
    /* jshint camelcase: false */
    return 'https://api.meetup.com/2/events?' +
      exports.parameterize({
        key: params.key,
        group_urlname: params.group_urlname,
        sign: true,
        offset: params.offset || 0,
        format: 'json',
        limited_events: 'False',
        page: params.page || 200,
        order: 'time',
        desc: false,
        status: 'upcoming'
      });
  };

  exports.developersUrl = function developersUrl(params) {
    /* jshint camelcase: false */
    return 'https://api.meetup.com/2/members?' +
      exports.parameterize({
        key: params.key,
        group_urlname: params.group_urlname,
        sign: true,
        'photo-host': 'public',
        order: 'name',
        page: params.page || 40,
        offset: params.offset || 0
      });
  };

  exports.formatDate = function formatDate(date) {
    /* jshint maxlen: false */
    return Mustache.render(
      '{{dayofweek}}, {{month}} {{day}}, {{year}} at {{hour}}:{{minute}} {{meridiem}}',
      {
        dayofweek: DAYS[date.getDay()],
        month: MONTHS[date.getMonth()],
        day: date.getDate(),
        year: date.getFullYear(),
        hour: (date.getHours() % 12),
        minute: ('0' + date.getMinutes()).slice(-2),
        meridiem: (date.getHours() < 12 ? 'AM' : 'PM')
      }
    );
  };

  exports.fetchData = function fetchData(url, resolve, reject) {
    var timeout, script, insertEl;
    var elementId = '_' + floor(10000 * random()).toString(16);
    var callbackName = 'jsonp_callback_' + elementId;

    function cleanup() {
      delete global[callbackName];
      var el = document.getElementById(elementId);
      el.parentNode.removeChild(el);
    }

    global[callbackName] = function jsonpCallback(data) {
      global.clearTimeout(timeout);
      cleanup();
      resolve(data);
    };

    timeout = global.setTimeout(function jsonpTimeout() {
      cleanup();
      reject(new Error('JSONP timeout'));
    }, 5000);

    script = document.createElement('script');
    script.src = url + (url.indexOf('?') === -1 ? '?' : '&') +
      'callback=' + callbackName;
    script.id = elementId;
    script.type = 'text/javascript';
    script.async = true;

    insertEl = document.getElementsByTagName('head')[0] ||
      document.body || document.documentElement;
    insertEl.appendChild(script);
  };

  exports.triggerEvent = function triggerEvent(eventName, payload) {
    var event;
    if (typeof global.CustomEvent === 'function') {
      event = new CustomEvent(eventName, {detail: payload});
    } else {
      event = document.createEvent('CustomEvent');
      event.initCustomEvent(eventName, true, true, payload);
    }
    this.dispatchEvent(event);
  };

}(window.Meetup = {}, window, document));
