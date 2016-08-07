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
}(window.Meetup = {}, window, document));
