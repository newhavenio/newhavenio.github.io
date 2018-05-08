window.$ = require("jquery");
window.Mustache = require("mustache");
import Vue from "vue";
import "bootstrap-sass/assets/javascripts/bootstrap.js";

import "./scss_files/main.scss";

import MeetupEvents from "../js/vue/meetupEvents.vue";

document.addEventListener("DOMContentLoaded", function() {
  var eventsApp = new Vue({
    el: "#meetup-events",
    render: function(h) {
      return h(MeetupEvents);
    }
  });
});
