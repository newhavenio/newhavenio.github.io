'use strict';

var Meetup = function(meetupURL) {
	this.meetupURL = (typeof meetupURL!=='undefined') ? meetupURL :
	"https://api.meetup.com/2/events?key=6e7b85c3fc96f524d133273a4556&group_urlname=newhavenio&sign=true&offset=0&format=json&limited_events=False&page=200&fields=&order=time&desc=false&status=upcoming";

	this.getEvents = function(callback) {
		$.ajax({
			url: this.meetupURL,
			dataType: 'jsonp'
		})
		.done(function(data) {
            callback(data);

		})
		.fail(function(error) {
			console.log("Meetup API Request Failed");
		});
	};

	var requested_page = window.location.search.match(/page=(\d+)/);
	var offset = (requested_page == null ? 0 : parseInt(requested_page[1]) - 1);
	offset = (offset < 0 ? 0 : offset);
	this.developersURL = "https://api.meetup.com/2/members?key=6e7b85c3fc96f524d133273a4556&group_urlname=newhavenio&sign=true&photo-host=public&order=name&page=100" +
	                     "&offset=" + offset;

	this.getDevelopers = function(callback) {
		$.ajax({
			url: this.developersURL,
			dataType: 'jsonp'
		})
		.done(function(data) {
            callback(data);
		})
		.fail(function(error) {
			console.log("Meetup API Request Failed");
		});
	};
};

$(document).on('click', '.developer-card .dev-card-trigger', function (event) {
	$(this).closest('.developer-card').toggleClass('--small');

	if ( $(this).hasClass('glyphicon-plus') ) {
		$(this).removeClass('glyphicon-plus').addClass('glyphicon-minus');
	} else {
		$(this).removeClass('glyphicon-minus').addClass('glyphicon-plus');
	}
});







