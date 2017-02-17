---
layout: post
title: "Tips for Making Maintainable Pattern Libraries"
date: 2017-02-17
categories: front-end sass pattern library modular design
author: Max Antonucci
excerpt: It's easy to see why pattern libraries are useful, but tough to successfully maintain them over time.

source: internal
ext-url: none
---

**It's tough to do any front-end work without hearing "pattern library" at least once a day.**

Pattern libraries have become the next big thing for front-end developers making large-scale apps and websites. Breaking sites down into individual components, then assembling them into entire pages, helps in several ways - to keep code organized and scalable, easier to design for multiple devices, and more focused debugging, to name a few. Brad Frost's book [Atomic Design](http://atomicdesign.bradfrost.com/table-of-contents/) has helped spread word of its benefits farther, and tools for making them like [Pattern Lab](http://patternlab.io/), [Fractal](http://fractal.build/), and [many others](https://github.com/davidhund/styleguide-generators).

But while these benefits are well-stated, advice on making and maintaining them gets lost along the way (at least in my experience). This article lists several rules of thumb I've discovered in my personal and professional work with pattern libraries to help developers do so. Hopefully they'll help with any of yours too.


### Keep your HTML Absolutely DRY

This is the simplest and most important rule of any pattern library, and potentially the most frustrating. Most pattern library's component HTML will be written in multiple places, such as in larger patterns or full-page templates. In all these cases, **their actual HTML should only be edited from one place.** If you only follow one tip here, make it this one. If you need to change a class in a button component, it should only need to be changed in one file, not every single one with a button in it.

If you think I'm being too serious about a seemingly obvious rule, ignore those thoughts. Only writing a component's HTML once here is extremely important, and easily overlooked by newcomers. The more WET the HTML is, there's exponentially more opportunity for bugs to slip through. If your client sees them, all blame falls on you. Not doing this means more work, more testing, more risk, and much more.

Following this rule means a pattern library that's easier to update, maintain, and will have fewer "oh crap" moments. Otherwise, these moments will pile up until it's not worth it anymore.


### Clearly Separate Layouts from Components

This one is tricky but important when it comes to keeping all the moving parts working together. The basic rule is **all styles related to layout shouldn't be directly connected to any components.** [Issues between components and how they're laid out are common yet dangerous](http://alistapart.com/article/learning-from-lego-a-step-forward-in-modular-web-design). Keeping them as separate as boys and girls at a junior high dance greatly helps in avoiding them.

Pulling this off can be tough, so here's some good rules to follow:

* Make the classes that control layouts a separate section of the pattern library. These would be the containers and classes for things like a sidebar page layout, a blog page layout, or certain arrangements of components like three article in a row. This makes adding and removing components in different layouts, and editing the layouts themselves, simpler by clearly separating the concerns.

{% highlight html %}

<div class="pl-l-sidebar">
    <div class="pl-l-sidebar__content">
        <!-- Your main page components here, separate from the layout -->
    </div>

    <div class="pl-l-sidebar__aside">
        <!-- Your sidebar components here, separate from the layout -->
    </div>
</div>

{% endhighlight %}


* If you're putting components in other components, like a logo and navigation in a header, define the inner containers separately. For example, the header would include a `.header__logoContainer` and `.header__navContainer` that controls the width and placement relative to other components inside the header. Then you'll simply drop the needed components in these containers without changing their layouts directly. It's easier to keep editing components separately and swap in different ones if needed.
* Only set component widths to be inline or 100%. They'll either expand to snugly fit in their containers, or stay a normal width if they're simpler components like buttons.
* Don't add extra margins around components, or other styles that affect the space around them, whenever possible. This includes floats!

All this will help ensure that issues with what components due won't create others with where they're located, and vice versa.

### Include Templates of Full Page Examples

While a pattern library's main point is to organizing separate pieces, having examples of full pages with the pieces working together is very important. How can you make sure they'll work together right? You don't want to spend weeks on components that look great separate, but clash on the same page.

Pattern Lab does this efficiently by letting developers create both templates and pages. Templates are pages with placeholder text and images, while pages use actual text and images from the site. The data is defined separate from the components, making it faster and easier to create representative examples of site pages.

It's another reason to keep your HTML completely DRY. If any HTML changes, it should also change in the templates. Keeping the data and markup separate lets you do this with less risk of breaking something.

One final perk: these templates speed up the process of using a pattern library in a CMS. Just copy part or all of the page, connect the HTML to the back-end as needed, and you're set!


### Use Global Variables for Common Styling

Keeping consistent styles and textures across all components is vital for a strong design. In the first stages of a pattern library, decide on an initial group of global values, such as:

* A basic color palette. It can include primary, complimentary, and action colors.
* Common spacing values for paddings and margins.
* Font families, line heights, sizes, weights, and other elements in typography.
* Borders with a set range of thickness and color options.

Get in the habit of using these values when needed while developing. Need to add padding to a header? Use a spacing value. Need a background color? Use a color from the palette. 

Here's an example of organizing global color variables in a [Sass map](https://www.sitepoint.com/using-sass-maps/) and how to reference them:

{% highlight css %}

$g-color--shade: 25%;

// Map for storing all color variables
$color-map: (
  primary: (
    light : tint(blue, $g-color--shade),
    base  : blue,
    dark  : shade(blue, $g-color--shade)
  ),

  secondary: (
    light : tint(green, $g-color--shade),
    base  : green,
    dark  : shade(green, $g-color--shade)
  ),

  action: (
    light : tint(red, $g-color--shade),
    base  : red,
    dark  : shade(red, $g-color--shade)
  ),

  mono: (
    blank : white,
    base  : gray,
    black : black
  )
);

// This function pulls specific color values from the above map
@function color($color, $tone: 'base') {
  @if map-has-key($color-map, $color) {
    @return map-get(map-get($color-map, $color), $tone);
  }
}

/*
  Examples:
  color(primary) => blue
  color(primary, dark) => a darker blue
  color(secondary, light) => a lighter
*/

{% endhighlight %}

Styles don't need to be organized in maps, but the principle is the same: define basic styles ahead of time and using them whenever needed. This has two main benefits:

1. It creates a common texture with the components.
2. If they're controlled through Sass variables, changing one value will automatically update all the components, keeping the look consistent. It's much easier to test out different styles.

Global variables can be the different between a tight, cohesive pattern library and an overblown collection of mismatched pieces. Use them to keep everything working together instead of against each other.


### Choose a Sass File Architecture

Unsurprisingly, pattern libraries have a lot of CSS to organize. Choose a maintainable file structure - one that can scale well with less risk of conflicts or overlaps.

There's some [popular Sass architectures to choose from](https://www.sitepoint.com/architecture-in-sass/), and the right choice depends on the project and the developer's style. My own favorite is [ITCSS, or Inverted Triangle CSS](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/), where the structure is defined based on the code's priority. It's easier to control specificity and avoid style overlaps. You can add or rename certain sections if you want, depending on your naming scheme. You should still follow the basic structure, shown below:

{% include image.html place="post-image" url="/img/posts/pattern-library-tips/itcss-layers.svg" description="The basic ITCSS file structure from <a href='https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/' target='_blank'>xfive.co.</a>"%}

My own take on it changed some of names but keeps the basic rules:

    | Main Sass Folder
    |
    | -- Settings      // Global variables
    | -- Tools         // Functions and mixins
    | -- Generic       // Global element changes, including Reset or Normalize
    | -- Layouts       // Specific layout styles and patterns
    | -- Base          // Basic element styling
    | -- Components    // More complex elements that use those in Base
    | -- Patterns      // The final elements made up of Base and Components
    | -- Trumps        // Last resort styles that override all others

### Use a Naming Convention

Like the last two tips, this one's about managing complexity - here it's the complexity of class names. Keeping class names specific and separate, yet easily understood and managed. This means choosing a class naming scheme.

There's again room for personal preference. The [most popular ones](http://thesassway.com/advanced/modular-css-naming-conventions) include SMACSS and OOCSS, but my favorite is BEM. More specifically, [BEMIT](https://csswizardry.com/2015/08/bemit-taking-the-bem-naming-convention-a-step-further/), which has a few additions to mesh better with ITCSS.

The biggest difference is adding some extra namespaces to each class. I prepend each class with two acronyms:

1. **The name of the pattern library.** If it's called "Awesome Pattern Library," you may use `.apl-`.
2. **The class's section or use.** A component in the `atoms` section (for the Atomic Design hierarchy) would then be prepended with `.apl-a-`; a layout class would use `.apl-l-`; a helper class would use `.apl-h-`.

These namespaces may need odd, but have two benefits:

1. **They prevent conflicts against third-party markup.** It's extremely unlikely any external plugin will use these same namespaces, so there's no chance of styles overlap.
2. **It's easy to identify a class at a glance.** One can see if a class is for a component, a layout, a helper, etc. Looking through complicated markup will be faster and easier.

Choose what naming convention works for you. Even if it means playing around with an established convention like I have.

### Avoid 3rd-Party Frameworks, if Possible

My personal rule about 3rd-party frameworks, like Bootstrap or Foundation, is "avoid when possible." If you're making a pattern library from scratch and there's no explicit reason to use one, don't.

My main argument for this is **3rd-party frameworks come with different rules and conventions you'll need to work around if they're different from yours.** Using a naming convention or global variables gets tougher when the framework already has its own ideas going for it. There's more opportunities for conflicts, and often more need for messy overrides, workarounds, and abuse of `!important`.

Now if it's a framework you're very comfortable with, agree with in important rules and conventions, and it'll save much-needed time, then go right ahead. Otherwise, avoid headaches and start from scratch.

#### In Conclusion

Pattern libraries likely aren't going anywhere, due to how effective they are in creating and managing components for large sites and apps. If you're a front-end developer, chances are you'll be making a few in your career. Either as a work requirement or to just try them out.

Even if these tips go against how your own rules as a coder, they're still starting points for avoiding mistakes I've made earlier in pattern libraries. So please keep them in mind to keep all the working pieces working together, instead of quickly crashing into each other and dragging your site down with it.

