---
layout: post
title:  "Welcome to the new NewHaven.IO!"
date:   2016-2-23
categories: update
author: Max Antonucci

source: internal
ext-url: none
---

On behalf of all the other NewHaven.IO developers, I welcome you to the new NewHaven.IO website. So at [a meetup last last year,](http://www.meetup.com/newhavenio/events/225516517/) we decided to revamp the site. After much discussion in person and over our Slack group, the work is finally done.

This post is a brief look at the big changes we've made, and how they'll make it easy for members to contribute to the site. Our big changes were partly inspired by [TechCorrider.IO](http://techcorridor.io/), who transformed their site similarly before our own.

### Jekyll for Better Collaboration

Our old site was built on MongoDB, a powerful NoSQL database known for speed and ease of setup. But while MongoDB is great, it was ultimtely decided to move to Jekyll.

{% include image.html place="post-half-image right" url="/img/posts/welcome_newhavenio/jekyll-logo.png"%}

This was a big change, as it means moving from a MongoDB database to none at all. Jekyll is a static-site generator - it takes basic files and compiles a full website from them. Whenever a change is made, Jekyll compiles a new one again and serves it up for visitors.

The big reason for this was *collaboration.* Github offers free Jekyll hosting. This makes it incredibly easy for different developers to find and contribute to these sites. Want to make a style change? Write a blog post? Tweak some javascript? Just fork the repo, make your changes, and request to merge it. Once they're approved, your changes are merged and you're all set.

Now it's easier for members, old and new, to add to the NewHaven.IO site if they chose to. Posts can be about programming and technology in general, recaps of meetings they attended, their experiences at different tech events, or just links they want to share.

### From Gumby to Bootstrap

The previous site was built on Gumby, a responsive web framework by the great folks at Digital Surgeons. It was sadly retired, so we ported it over to Bootstrap.

Bootstrap was a clear choice to us since it's one of, if not the, most popular and effective web frameworks out there. For a site where lots of different developers with different focuses working on it, using a well-known framework like Bootstrap makes maintenance (and new ideas) easy and straightfoward to add to the site's repo.

### In Conclusion

As you can see, our big goal with these changes were making it easier for developers to contribute to the site. Moving the site to Jekyll makes it easy and convenient for developers to add posts or change code through Github. Using the popular framework Bootstrap also makes it less difficult for developers to understand and add to the site's code.

NewHaven.IO's community is already strong, but this new site aims to bring it a little closer than before. The barriers to take an active role in the group are lower than before. So all those interested in contributing a blog post or improving the site's code, please go for it! This new site is built to make contributing that much easier.