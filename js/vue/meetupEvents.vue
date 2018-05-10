
<template>
  <div>
    <div class="meetups">
      <div class="meetup-event" v-for="event in events" :key="event.id">
        <h3 class="meetup-heading"> {{ event.name }} </h3>
        <hr>
        <div class="meetup-description">
          <div v-html="event.description"></div>
          <div class="meetup-details">
            <div class="meetup-date"> <b>When:</b> {{ event.parsed_date }} </div>
            <div v-if="event.venue" class="meetup-location"> <b>Where:</b> {{ event.venue.name }} </div>
            <div v-else> <b>Where:</b> TBD </div>
            <div class="meetup-who"> <b>Who:</b> {{ event.yes_rsvp_count }} already going</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import node module dependencies
import jsonp from 'jsonp';

//import utility dependencies
import { parameterize, formatDate } from '../utils/component-utils.js';


const DESIRED_HACK_NIGHTS = 4;
const HACK_NIGHT = "[Everyone] Full Stack Hack Night";
const EVENT_URL = "//api.meetup.com/newhavenio/events?";
const PARAMS = {
  page: 20,
  status: 'upcoming',
}
               
export default {
  data: function() {
    return {
      events: [],
    };
  },
  methods: {
    getEvents: function() {
      var requestUrl = EVENT_URL + parameterize(PARAMS);
      jsonp(requestUrl, null, (err, data) => {
        var rawEvents = data.data;
        var foundHacks = 0;
        this.events = rawEvents.filter( function(event) {
          if (event.name !== HACK_NIGHT) { return true; }
          foundHacks++;
          if (foundHacks < DESIRED_HACK_NIGHTS) { return true; }
          return false;
        } )
        .map( function(event, index) {
          event["parsed_date"] = formatDate(event.local_date, event.local_time); 
          return event; 
        } );
      })
    },
  },
  created: function() {
    this.getEvents();
  }
}
</script>

<style scoped>
.meetups {
  max-width: 960px;
  margin: auto;
  padding: 0 15px;
}
.meetups > *:not(:last-child) {
  margin-bottom: 20px;
}
.meetup-event {
  background: #ffffff;
  padding: 20px;
}
.meetup-heading {
  padding: 0 10px;
}
.meetup-description {
  padding: 0 20px;
}
@media screen and (min-width: 720px) {
  .meetup-description {
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-gap: 50px;
  }
}
</style>
