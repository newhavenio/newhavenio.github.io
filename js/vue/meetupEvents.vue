
<template>
  <div>
    <div class="meetups">
      <div class="meetup-event" v-for="event in events" :key="event.id">
        <h3 class="meetup-heading"> {{ event.name }}</h3>
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
import moment from 'moment';
//import utility dependencies
import { parameterize } from '../utils/component-utils.js';

moment().format();
export default {
  data: function() {
    return {
      events: [],
    };
  },
  methods: {
    getEvents: function() {
      console.log("I'm in get events!");
      var url = "http://api.meetup.com/newhavenio/events?"
      var params = {
        page: 20,
        status: 'upcoming',
      }
      var requestUrl = url + parameterize(params);
      console.log(requestUrl);
      jsonp(requestUrl, null, (err, data) => {
        var rawEvents = data.data;
        var hackNight = "[Everyone] Full Stack Hack Night";
        var desiredNumberOfHackNights = 4
        var eventsArray = [];
        rawEvents.reduce( function(acc, event) {
          if (event.name !== hackNight) {
            eventsArray.push(event);
            return acc;
          } else if ((event.name === hackNight)&&(acc < desiredNumberOfHackNights)){
            eventsArray.push(event);
            acc++;
            return acc;
          } else {
            return acc;
          }
        }, 0 )
        eventsArray.forEach( function(event, index) {
          let date = moment(event.local_date + " " + event.local_time)
          eventsArray[index]["parsed_date"] = date.format("LLL");
        })
        this.events = eventsArray;
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
