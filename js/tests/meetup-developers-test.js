describe('meetup-developers', function () {
  var sandbox;
  var expect = chai.expect;
  var AssertionError = chai.AssertionError;

  var developersFixture = {
    results: [
      {name: 'test developer 1'},
      {name: 'test developer 2'},
      {name: 'test developer 3'},
      {name: 'test developer 4'},
      {name: 'test developer 5'}
    ]
  };

  before(function () {
    sandbox = sinon.sandbox.create();
  });

  beforeEach(function () {
    sandbox.stub(Meetup, 'fetchData');
    this.refreshSpy = sandbox.spy();
    this.errorSpy = sandbox.spy();
    this.subject = document.createElement('meetup-developers');
    this.subject.addEventListener('refresh', this.refreshSpy);
    this.subject.addEventListener('error', this.errorSpy);
    this.subject.setAttribute('api-key', 'test-api-key');
    this.subject.setAttribute('group', 'test-group');
    this.subject.setAttribute('max-developers', '2');
    this.subject.setAttribute('page', '5');
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('displays a loading message', function () {
    var result = this.subject.querySelectorAll('.alert.alert-info');
    expect(result).to.have.lengthOf(1);
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

  it('fetches data with "offset" query param', function () {
    sinon.assert.called(Meetup.fetchData);
    sinon.assert.calledWithMatch(Meetup.fetchData, /offset=5/);
  });

  it('displays developers from API', function () {
    Meetup.fetchData.callsArgWith(1, developersFixture);
    this.subject.refresh();
    var result = this.subject.querySelectorAll('meetup-developer-card');
    sinon.assert.called(this.refreshSpy);
    sinon.assert.notCalled(this.errorSpy);
    expect(result).to.have.lengthOf(developersFixture.results.length);
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

  describe('refresh event', function () {
    it('passes API data', function () {
      Meetup.fetchData.callArgWith(1, developersFixture);
      this.subject.refresh();
      sinon.assert.called(this.refreshSpy);
      sinon.assert.calledWith(
        this.refreshSpy,
        sinon.match.has('detail', sinon.match(developersFixture))
      );
    });
  });
});
