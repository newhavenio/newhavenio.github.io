describe('meetup-events', function () {
  var sandbox;
  var expect = chai.expect;
  var AssertionError = chai.AssertionError;

  var eventsFixture = {
    results: [
      {name: 'test event 1'},
      {name: 'test event 2'},
      {name: 'test event 3'},
      {name: 'test event 4'},
      {name: 'test event 5'}
    ]
  };

  before(function () {
    sandbox = sinon.sandbox.create();
  });

  beforeEach(function () {
    sandbox.stub(Meetup, 'fetchData');
    this.refreshSpy = sandbox.spy();
    this.errorSpy = sandbox.spy();
    this.subject = document.createElement('meetup-events');
    this.subject.addEventListener('refresh', this.refreshSpy);
    this.subject.addEventListener('error', this.errorSpy);
    this.subject.setAttribute('api-key', 'test-api-key');
    this.subject.setAttribute('group', 'test-group');
    this.subject.setAttribute('max-events', '2');
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('fetches data with "key" query param', function () {
    sinon.assert.called(Meetup.fetchData);
    sinon.assert.calledWithMatch(Meetup.fetchData, /key=test-api-key/);
  });

  it('fetches data with "group_urlname" query param', function () {
    sinon.assert.called(Meetup.fetchData);
    sinon.assert.calledWithMatch(Meetup.fetchData, /group_urlname=test-group/);
  });

  it('fetches data with "page" query param', function () {
    sinon.assert.called(Meetup.fetchData);
    sinon.assert.calledWithMatch(Meetup.fetchData, /page=2/);
  });

  it('displays a loading message', function () {
    var result = this.subject.querySelectorAll('.alert.alert-info');
    expect(result).to.have.lengthOf(1);
  });

  it('displays events from API', function () {
    Meetup.fetchData.callsArgWith(1, eventsFixture);
    this.subject.refresh();
    var result = this.subject.querySelectorAll('meetup-event-card');
    sinon.assert.called(this.refreshSpy);
    sinon.assert.notCalled(this.errorSpy);
    expect(result).to.have.lengthOf(eventsFixture.results.length);
  });

  it('displays errors from API', function () {
    Meetup.fetchData.callsArgWith(2, new Error('test error'));
    this.subject.refresh();
    var result = this.subject.querySelectorAll('.alert.alert-danger');
    sinon.assert.called(this.errorSpy);
    sinon.assert.notCalled(this.refreshSpy);
    expect(result).to.have.lengthOf(1);
    expect(result[0].textContent).to.contain('test error');
  });
});
