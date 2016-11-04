---
layout: post
title: "Common Front-end Problems Solved with Flexbox"
date: 2016-11-4
categories: front-end flexbox solutions codepen examples
author: Max Antonucci
excerpt: Flexbox has helped solve many layout issues that were once hacked around. These are four more common layout dilemmas Flexbox now helps solve.

source: internal
ext-url: none
---

As antsy as I am about [CSS Grid](http://gridbyexample.com/) getting full browser support someday, until then I have Flexbox for company. While Flexbox is more for component layouts, not site layouts, it still has uses aplenty. Developers have found [solutions to many long-standing issues](https://philipwalton.github.io/solved-by-flexbox/) that were previously hacked around, and there's still more out there.

This post lists four common issues I've faced in front-end development that Flexbox has mostly or completely solved for me. Flexbox (with prefixes) has [almost universal browser support](http://caniuse.com/#search=flexbox), so there's little keeping front-end devs from using them. I hope you find them, and the included examples, useful!

_(Small warning: this post assumes an understanding of [Flexbox's basics.](https://scotch.io/tutorials/a-visual-guide-to-css3-flexbox-properties))_

### Responsive Logo and Title Pairing

A common annoyance that never went away was pairing a logo and title. Ideally a site wants them both to be center aligned, the logo a constant size with the title taking up the remaining space, and to stay this way on smaller screens. __In other words, the logo and title are always vertically-aligned, regardless of screen size.__

But any time I aimed for this, especially for smaller screens, it required any number of workaround: absolute positioning, floating, overly-precise breakpoints, or giving up and using a single image instead.

Flexbox makes this pairing easy with some basic features. Just use `align-items: center` for the container and set the logo to `flex: 0 0 auto`. The simplicity has another bonus, making it easier to customize for more complex logo-title pairings.

<!-- Logo Example -->
<p data-height="302" data-theme-id="0" data-slug-hash="MjMeGY" data-default-tab="result" data-user="max1128" data-embed-version="2" data-pen-title="Flexbox Example - Center-aligned Logo" data-preview="true" class="codepen">See the Pen <a href="http://codepen.io/max1128/pen/MjMeGY/">Flexbox Example - Center-aligned Logo</a> by Maxwell Antonucci (<a href="http://codepen.io/max1128">@max1128</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

__Note:__ _you'll likely need to resize your screen for the full effect._

### Rows of Articles with Equal Heights

Any site with articles, whether a major news site or a simple blog, has likely had this issue: laying out large groups of articles.

A common article archive page will have three things: a title, excerpt, and image. Making a basic grid for these seems easy, but not in the very likely scenario the elements in each article have different heights. __Having a neat layout for these articles suddenly gets more complicated, since it needs to work the same despite all the possible sizes.__

Flexbox helps since it actively adjusts not just an individual item's layout, but the entire row's layout, based on the content.

Different heights? Flexbox will add in just enough extra space. Items don't fill up the whole row? Flexbox will move or resize them as needed. Have complicated layouts for smaller screens? Flexbox can work with and without media query styles.

Below is just one example, where every article in each row is the same height, and the images are at the bottom of each. It does so by using `flex-direction: column` so the items stack vertically, and setting `margin-top: auto` on the image so it's pushed down. The articles are also laid out using Flexbox to keep their heights the same and fill up any extra space.

The result: a simple, neat layout that works no matter the size of the titles, excerpts, and images, and for all screen sizes. One flaw is when height differences between articles are too high, things can look awkward. But it's still a great improvement over most similar, non-Flexbox layouts.

<!-- Article Height Example -->
<p data-height="372" data-theme-id="0" data-slug-hash="yadJMd" data-default-tab="result" data-user="max1128" data-embed-version="2" data-pen-title="Flexbox Example - Article Heights" data-preview="true" class="codepen">See the Pen <a href="http://codepen.io/max1128/pen/yadJMd/">Flexbox Example - Article Heights</a> by Maxwell Antonucci (<a href="http://codepen.io/max1128">@max1128</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

__Bonus:__ _Want to center the excerpts in the extra space? In the Sass, remove the margin for `.p-article__img`, and uncomment the line in `.p-article`._

### Simple Alternating Orders of Content

One way to break of monotony of lists is little changes in the display. For example, with a long list of images paired with text, why not alternate their placements?

However, doing so means changing the HTML for every other article. This is a challenge for both accessibility and generating the content. __Ideally, one would want to visually change the order without literally doing so.__

Flexbox has a way. For this straightforward example, select every even (or odd) item and use `flex-direction: reverse` to change the order. They'll visually switch around without touching the HTML!

<!-- Alternating Article Display Example  -->
<p data-height="370" data-theme-id="0" data-slug-hash="gwNMBd" data-default-tab="result" data-user="max1128" data-embed-version="2" data-pen-title="Flexbox Example - Alternating Displays" data-preview="true" class="codepen">See the Pen <a href="http://codepen.io/max1128/pen/gwNMBd/">Flexbox Example - Alternating Displays</a> by Maxwell Antonucci (<a href="http://codepen.io/max1128">@max1128</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>


### Flexible Item Highlighting 

One common issue I've faced before is with highlighted items in a grid. Items you want to draw special attention to, in this case by making them larger, but it risks disrupting the layout. In most cases I'd need to code the grid around a specific location for highlighted items to go. __But what about grids where highlighted items, that were sized differently, could be located anywhere?__

Some creative Flexbox work shows how. One just needs to change the `flex-basis` and `flex-grow` properties for highlighted items, which respectfully control the minimum width of the item, and the percentage of extra space it takes up.

Let's see this in the below example of several social links. Regular links have a `flex-basis` of 5em and a `flex-grow` of 1. Highlighted items, meanwhile, have a `flex-basis` of 8em and a `flex-grow` of 8. This means highlighted items take up 3 more ems of space in the beginning, and get 8x as much of the leftover space to fill up each row. That, plus a few other style changes, makes them stand out from all the other icons. These classes can be put on any number of links in any place. They'll adjust as needed, giving a lot more control over their highlighting.

<!-- Group of Icon Links Example -->
<p data-height="265" data-theme-id="0" data-slug-hash="yadJWY" data-default-tab="result" data-user="max1128" data-embed-version="2" data-pen-title="Flexbox Example - Icon Collection" data-preview="true" class="codepen">See the Pen <a href="http://codepen.io/max1128/pen/yadJWY/">Flexbox Example - Icon Collection</a> by Maxwell Antonucci (<a href="http://codepen.io/max1128">@max1128</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

Here's a more practical example I forked a while back: an image gallery. This makes it easier to emphasize some photos without disrupting the layout. They use more space while the other photos always adjust and position accordingly.

<!-- Forked Gallery Example -->
<p data-height="422" data-theme-id="0" data-slug-hash="pjbpWw" data-default-tab="result" data-user="max1128" data-embed-version="2" data-pen-title="A Better Responsive Image Gallery With Flexbox" data-preview="true" class="codepen">See the Pen <a href="http://codepen.io/max1128/pen/pjbpWw/">A Better Responsive Image Gallery With Flexbox</a> by Maxwell Antonucci (<a href="http://codepen.io/max1128">@max1128</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

#### In Conclusion

Flexbox will continue to be a very useful force in the front-end, even as newer specs like CSS Grid arrive. These examples are just a few of its many uses for solving problems old and new. Expect new ones to keep popping up every now and then. Just today at work, a layout issue with some tabs I'd struggled with for an hour was solved in ten minutes thanks to Flexbox.

So keep these examples, and any in the future, in mind going forward. Flexbox isn't going anywhere, and for good reason.


