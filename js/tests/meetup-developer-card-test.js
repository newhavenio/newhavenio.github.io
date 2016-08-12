describe('meetup-developer-card', function () {
  var expect = chai.expect;

  var developerFixture = {
    link: 'test-developer-url',
    name: 'test_developer_name',
    photo: {photo_link: 'test-photo-url'},
    bio: '<span class="test-selector">bio test developer bio</span>',
    city: 'New Haven',
    state: 'CT',
    topics: [
      {name: "Animal Welfare"},
      {name: "Gardening"},
      {name: "Open Source"},
      {name: "Walking"},
      {name: "Software Development"},
      {name: "Education & Technology"},
      {name: "Web Technology"},
      {name: "Dogs"},
      {name: "Critical Thinking"}
    ]
  };

  beforeEach(function () {
    this.subject = document.createElement('meetup-developer-card');
  });

  it('renders container element', function () {
    this.subject.data = developerFixture;
    var result = this.subject.querySelectorAll('.developer-card');
    expect(result).to.have.lengthOf(1);
  });

  it('renders the developer name', function () {
    this.subject.data = developerFixture;
    var result = this.subject.textContent;
    expect(result).to.contain(developerFixture.name);
  });

  it('links to the developer\'s profile', function () {
    this.subject.data = developerFixture;
    var links = this.subject.querySelectorAll('a');
    var result = mocha.mapNodeList(links, function (link) {
      return link.getAttribute('href');
    });
    expect(result).to.include(developerFixture.link);
  });

  it('renders a developer\'s photo', function () {
    this.subject.data = developerFixture;
    var links = this.subject.querySelectorAll('img');
    var result = mocha.mapNodeList(links, function (link) {
      return link.getAttribute('src');
    });
    expect(result).to.include(developerFixture.photo.photo_link);
  });

  it('renders a default photo when developer has none', function () {
    this.subject.data = Object.create(developerFixture, {
      photo: { value: null }
    });
    var result = this.subject.querySelectorAll('.missing-photo');
    expect(result).to.not.be.empty;
  });

  it('renders a developer\'s location', function () {
    this.subject.data = developerFixture;
    var result = this.subject.textContent;
    expect(result).to.contain(developerFixture.city)
      .and.contain(developerFixture.state);
  });

  it('renders a developer\'s bio', function () {
    this.subject.data = developerFixture;
    var result = this.subject.querySelector('.test-selector');
    expect(result).to.exist;
    expect(result.textContent).to.include('bio test developer bio');
  });

  it('renders a developer\'s interest', function () {
    this.subject.data = developerFixture;
    var result = this.subject.textContent;
    developerFixture.topics.forEach(function (topic) {
      expect(result).to.contain(topic.name);
    });
  });
});
