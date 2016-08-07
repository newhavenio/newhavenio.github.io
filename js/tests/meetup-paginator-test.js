describe('meetup-paginator', function () {
  var expect = chai.expect;

  beforeEach(function () {
    this.subject = document.createElement('meetup-paginator');
    this.subject.setAttribute('per-page', '40');
  });

  describe('on initial load', function () {
    it('does not render buttons', function () {
      var result = this.subject.querySelectorAll('.pagination>li');
      expect(result).to.have.lengthOf(0);
    });
  });

  describe('when data is assigned', function () {
    beforeEach(function () {
      this.subject.data = {
        totalCount: 838,
        count: 40,
        page: 1
      };
    });

    it('renders buttons', function () {
      var result = this.subject.querySelectorAll('.pagination>li');
      expect(result).to.have.lengthOf(22);
    });

    it('disables unreachable buttons', function () {
      var result = this.subject.querySelectorAll('.pagination>li');
      expect(result[0].className).to.contain('disabled');
      expect(result[1].className).to.contain('disabled');
    });
  });
});
