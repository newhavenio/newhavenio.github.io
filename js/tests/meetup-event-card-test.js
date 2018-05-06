describe('meetup-event-card', function () {
  var expect = chai.expect;

  var eventFixture = {
    name: 'test_event_name',
    event_url: 'test-event-url',
    description: '<span class="test-selector">test description</span>',
    time: new Date('2016-03-18').getTime(),
    venue: {
      name: 'test_venue_name',
      address_1: '165 Church St.',
      city: 'New Haven'
    },
    yes_rsvp_count: 123
  };

  beforeEach(function () {
    this.subject = document.createElement('meetup-event-card');
    this.subject.data = eventFixture;
  });

  it('renders container element', function () {
    var result = this.subject.querySelectorAll('article');
    expect(result).to.have.lengthOf(1);
  });

  it('renders the event name', function () {
    var result = this.subject.textContent;
    expect(result).to.contain(eventFixture.name);
  });

  it('links to the event', function () {
    var links = this.subject.querySelectorAll('a');
    var result = mocha.mapNodeList(links, function (link) {
      return link.getAttribute('href');
    });
    expect(result).to.include(eventFixture.event_url);
  });

  it('renders an event description', function () {
    var result = this.subject.querySelector('.test-selector');
    expect(result).to.exist;
    expect(result.textContent).to.include('test description');
  });

  it('renders an event date', function () {
    var expected = Meetup.formatDate(new Date(eventFixture.time));
    var result = this.subject.textContent;
    expect(result).to.contain(expected);
  });

  it('renders an event venue', function () {
    var result = this.subject.textContent;
    expect(result).to.contain(eventFixture.venue.name);
  });

  it('links to the venue', function () {
    var expected = Meetup.venueMapUrl(eventFixture.venue);
    var links = this.subject.querySelectorAll('a');
    var result = mocha.mapNodeList(links, function (link) {
      return link.getAttribute('href');
    });
    expect(result).to.include(expected);
  });

  it('renders the RSVP count of an event', function () {
    var result = this.subject.textContent;
    expect(result).to.contain(eventFixture.yes_rsvp_count);
  });
});
