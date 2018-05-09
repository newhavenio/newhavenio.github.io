const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

function parameterize(params) {
  return Object.keys(params)
    .map(function(key) {
      return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
    })
    .join("&");
}

function formatDate(local_date, local_time) {
  var dateArray = local_date.split("-");
  var timeArray = local_time.split(":");

  var date = new Date(
    dateArray[0],
    dateArray[1] - 1,
    dateArray[2],
    timeArray[0],
    timeArray[1]
  );

  var ampm = timeArray[0] >= 12 ? "PM" : "AM";

  return `${DAYS[date.getDay()]}, ${
    MONTHS[date.getMonth()]
  } ${date.getDate()} at ${timeArray[0] % 12}:${timeArray[1]} ${ampm}`;
}

module.exports = {
  parameterize,
  formatDate
};
