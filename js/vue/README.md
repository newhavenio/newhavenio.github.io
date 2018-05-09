# Contributing Vue Components to New Haven IO website.

So you want to contribute to the website! Thats great! most of the website is served using a static site generator jekyll that makes it easy to add pages and renderings using html. Occasionally, you need some more power and robust features for managing state on the webpage. We could use tools like Mustache and Jquery together, but there is a light yet powerful framework we can use to make modular components that are easy to include in our web pages, and that framework is Vue.

## What This Readme Isn't

This Readme is _not_ a tutorial on how to make vue components and all of the ways that you can make a vue component. That is a topic much better left to the experts, which would be the Vue team over at [Vue's Getting Started Guide](https://vuejs.org/v2/guide/) where you can also access their full documetation on the api if you want to take a deep dive.

### But I Hate Reading Documentation!

If you don't want to just read documentation on the Vue's homepage, then I have taken a course or 2 on Vue to get used to it and learn a bit more. I can recommend taking ...

* [Vue JS 2 - The Complete Guide (incl. Vue Router & Vuex)](https://www.udemy.com/vuejs-2-the-complete-guide/) - This was a good course, but he teaches like you are very new to programming and if you have used other JavaScript frameworks before you might find it just a touch on the slow side for you
* [Frontend Masters - Vue Learning Path](https://frontendmasters.com/learn/vue/) - I will happily plug Frontend Masters as a phenomenal way that I have gotten a chance to watch some really fascinating courses that have taken my JavaScript to the next level. I have dipped my feet into the Vue path, and I found it just a bit more engaging that Udemy (and the advanced course is taught by the original founder of Vue, so thats nice.)

## What this Readme Is

This Readme is going to give you an overview of how _we_ use Vue and what you need to do to add a Vue Component to our site. It will details things like where to put your file templates and how to structure them so that they end up on the page where you expect.

## Creating a Vue Component for newhaven.io

### Where to put it

We put our vue components in the `js/components/vue` folder off of the source directory. This is just by convention so that we can keep the repository organized and if we do ever move to another component system in the future, everything is properly compartmentalized.

### What to make

We render our Vue components as _Single_ _File_ _Components_ (SFC). This means that all of the html, scripts and css that Vue needs to render the components properly is all wrapped up in the same place.

This has a couple of distinct advantages, most notably that it become trivial to move the component because everything that you need is wrapped up in the single file together. You can read more about it on [Vues Documentation](https://vuejs.org/v2/guide/single-file-components.html)

As a word of caution, it is sometimes easy to get a bit over zealous with the size of a SFC, and end up with a ton of HTML, CSS, and JavaScript that you have to try and understand at once. The cool part is that if you _do_ find that your SFC is too much to work with in one go, its easy to extract part of the file into another SFC that you can import and include, letting you build up a components of components and making it easier to understand the UI. You probably won't run into this problem for the site, but if you do then that is an excellent way to reduce complexity.

### How to include it

Once you have made your SFC, we need to include it in the bundle of JavaScript we make for the site using webpack. Our webpack currently builds off of the `webpack/entry.js` file, which then bundles the JavaScript and puts it into `js/bundle.js`

For example, I have made the `meetupEventsVue.vue` SFC to include in the application on the homepage. I need to get that component into our build pipeline, and to do that I am going to first import it into our `entry.js`...

```javascript
//use relative path to the file from the entry.js file
//make sure you use export default in the script of your SFC to make an export
import MeetupEvents from '../js/components/vue/meetupEventsVue.vue';
```
once it is included in the `entry.js` at the top, you now need to tell JavaScript what part of the DOM is controlled by your Vue Instance. Usually, I use an `id` on an empty `div` element like so ...

```html
<div id="meetup-events">
</div>
```

You can in theory use any css selector with vue, but I find it helpful to use id because html enforces that I don't accidentally duplicate ids and end up with multiple of the same Vue Instance.

Now the last bit is to let our Vue instance take control and load it _after_ the document is ready. In this case we will use jQuery to do that, because we already have jQuery as a dependency but you can also use vanilla JavaScript to load after the page has loaded if you like.

```javascript
$( document ).ready( function() {
  var eventsApp = new Vue({
    el: "#meetup-events",
    render: function(h) {
      return h(MeetupEvents);
    },
  })
})
```

And thats all that they is to getting your Vue SFC added into the flow of the program. Webpack will take care of all the trouble of extracting your HTML, CSS and JavaScript and putting it all into the right place (what a nice guy).

## Collaborating

So if you have an idea that you want to bring to life on the site but don't feel like you can commit to to learning something new (trust me, it will be worth it), then I love getting a chance to teach and do some pair programming. Hit me up on our Slack channel (my handle is @brady) and we can try and find a time to workshop your idea and maybe even get started with the basics of how to get it going.

## Questions?

If something is hella confusing, then you can start a Github Issue for it, tag me in the post and then I'll fix whatever wording or concept is causing confusion.
