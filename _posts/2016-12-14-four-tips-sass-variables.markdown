---
layout: post
title: "Four Tips for Using Sass Variables"
date: 2016-12-14
categories: front-end sass css
author: Max Antonucci
excerpt: Sass variables help keep your CSS efficient and flexible, but they're more complex than you may think. These are four basic tips to get the most from your Sass variables.

source: internal
ext-url: none
---

While [Sass](http://sass-lang.com/) brings many great functions to CSS, one of the biggest is variables. Variables mean no more <kbd>CTRL</kbd>+<kbd>F</kbd>-ing our way through stylesheets when we change a color or margin value. Putting these frequent values in one place makes managing them that much easier.

Turns out there's much more to Sass variables then that basic use. At least if you want to get as much out of them as possible.

These are four basic tips to get a lot more out of Sass variables. They'll help developers use more variables with fewer issues and write DRYer code too. If you're relatively new to Sass and want to expand your understanding, this article's for you.

### Tip 1: Know the Different Variable Types

There's Sass variable types that Javascript writers may be familiar with. The variable type directly affects how the value is called and how complex it is, so this a good starting point for learning more.

#### Basic Variables

Basic variables are the simplest: singular values for a CSS property. They can range from basic colors (`#FF0000`) or lengths (`1em`), to ones that hold a few words, like `1px solid black` for borders. Their main purpose is substituting a value for a CSS property.

Here's a simple example:

{% highlight sass %}
$light-color: #111;

.element { background-color: $light-color; }
{% endhighlight %}

#### List variables

List variables are like Javascript arrays: they contain a list of values the code will usually loop through. If there's several colors that only work in a group, a developer can put them in a list for more efficient use.

Accessing a list's values needs either an *@each loop* or *getting a value at its index.* Here's an example of each one:

{% highlight sass %}
// This is the list
$element-colors: #F00, #0F0, #00F;

// This is the @each loop. In each iteration, $color is
// the name we chose for the current value
@each $color in $element-colors {
    $i: index($element-colors, $color); // This returns the list index of the color

    // This makes use of the index and value,
    // so the loop creates different selectors for each value
    .element:nth-of-type(#{$i}) { background-color: $color; }
}

// This loop would output:
// .element:nth-of-type(1) { background-color: #F00; }
// .element:nth-of-type(2) { background-color: #0F0; }
// .element:nth-of-type(3) { background-color: #00F; }

// This is calling a color by the index alone
.another-element {
    
    background-color: nth($element-colors, 1); // returns #F00
}
{% endhighlight %}

You'll notice the start of a Sass list's index is 1, not 0. This often throws off many people who've only used Javascript arrays before.

Also note the `@each` loop uses the `$i` variable in it's selector. Using that, or even the `$color` variable, is important. Otherwise it'd create the same `.element` selector three times, and only the last one would work. Remember to use these variables for selectors in an `@each` loop for this reason, and in that context reference them like this:`#{$i}`.

#### Map Variables

Map variables are the most complex. They're like Javascript objects since **they store object-value pairs,** and work for more complex data like this:

{% highlight sass %}
$color-map: (
    color1 : #F00,
    color2 : #0F0,
    color3 : #00F
);
{% endhighlight %}

Similar to lists, `@each` loops are used to access the values. Developers can also access values by their specific keys. So for the different colors in this map, we could do this:

{% highlight sass %}
// We assign names to the properties and values in the map
@each $name, $color in $color-map {
    
    // We can use them both for more detailed selectors in the loop
    .#{$name}-background { background-color: $color; }
}

// This loop would output:
// .color1-background { background-color: #F00; }
// .color2-background { background-color: #0F0; }
// .color3-background { background-color: #00F; }

// We can also use $map-get to get a certain value
.cool-element {
    background-color: map-get($color-map, color1); // Returns #F00
}
{% endhighlight %}

This syntax is similar to lists and only needs a few changes for the extra value. Since developers often want a specific string for only class names, Sass maps are often used more than lists.

Those are the essentials to the different Sass variables in this post. You can get more complex by [nesting Sass lists and maps,](https://www.sitepoint.com/sass-maps-vs-nested-lists/), or [using conditionals within your loops](http://thesassway.com/intermediate/if-for-each-while), but that's a level of detail for another article. The rest of the tips only rely on these basics (mostly).

### Tip 2: Know the Different Variables Scopes

In another parallel to Javascript variables, Sass variables have different scopes. While there's only two official scopes, I like to think there's three for better structure. So these three scopes, going from largest to smallest, are as follows:

#### Global Scope

Global variables are the onces referenced the earliest in a collection of Sass files, since they're meant for use in all of them. File(s) with global variables will output no CSS, and just declare the global variables and what they're for. They contain universal and important values, like color, typography, responsive breakpoints, spacing units, and more.

#### Single File Scope

This is the scope that isn't technically isn't real, but I think is useful to pretend exists. Variables with a single file scope only exist in one sass file. An example: in the styles for a thumbnail component, there'd be variables for the thumbnails padding, border, layout widths, or others. The most important thing is these are declared at the file's start and used only in that sheet. This way it's easy to adjust important styles for it without running through dozens or hundreds of lines of code. Just go to that file's variables and change the values.

Why isn't this a real scope? Because these variables could be used by every sass partial afterward. It's important not to do this, since it risks changes to one component accidentally affecting others and creating bugs. Single file variables should only be used in the files declaring them.

#### Selector Scope

Selector Scope variables are declared in a selector and can only be used there. So declaring a variable inside a class selector means it can only be used for that class's styles (plus anything nested inside). It's good for values used repeatedly in one selector but nowhere else, since it means better containment.

Here's an example of selector scopes (plus the other two scopes) being used in a few files. First we have a file dedicated to declaring global variables:

{% highlight sass %}
// _colors.scss

$g-white: #efe;
$g-black: #111;

{% endhighlight %}

Then one for a thumbnail component. Since we referenced the `_colors.scss` file first in our master Sass file, all these values can be used.

{% highlight sass %}
// _thumbnail.scss

// These are variables in the single file scope.
// Note that global variables can be used as these values!
// This lets devs use global values for components while maintaining the rules of file scope, which can better handle changes.
$thumb-border  : 1px solid $g-black;
$thumb-padding : 10px;
$thumb-bg      : $g-white;

.thumb__wrapper {
    box-sizing: border-box; // We are mostly using single file variables here.
    padding: $thumb-padding;
    margin: $thumb-padding / 2;

    border: $thumb-border;
    background-color: $thumb-bg;
}

.thumb__image {
    $width: 3em; // Since this is a value used multiple times, but only in this selector, it is a selector variable.

    width: $img-width;
    display: inline-block;
    margin-right: $width / 2;
}

{% endhighlight %}

### Tip 3: Use a Naming Convention

Notice the odd variable names in the above examples? Projects usually have lots of variables in different categories, so a naming convention is great for organizing them. Good names help a variable's scope, category, and specific purpose be known at a glance.

Say you have the color `#fdae1d` and want to put it in a variable. There's three important things the variable name should convey:

* It's orange, specifically a lighter shade
* It's one of your colors
* It has a global scope.

Names like `$orange` and `$orange-color` cover one or two points at most. A much better, if uglier, name would be `$g-color__orange--light`. This uses a naming scheme inspired by BEM to get the info across with a pattern of increasing specificity:

* The first few letters are a name-space for the scope. `$g` obviously means global; single file and selector variables can use more specific ones, like `$thumb` and `$img` from the previous example.
* After is a dash and the variable's category, in this case the color category. If that variable is the only one in the category, the name can stop there, like our single file example names did.
* If there's more than one variable in a category, the name then includes two underscores and a basic descriptor to set it apart. For the color variable, it's a general color name like orange. Another example is using `long` or `short` for different values in the `$g-spacing` category.
* If there's multiple values in that basic descriptor, like different shades of orange, then add two dashes and a more detailed modifier. This lighter shade of orange would use `--light`. Others could use `--dark` or `--faded`.

Once you get the basics, you can usually figure out a variable's general purpose at a glance.

* `$g-breakpoint__small` is the global breakpoint for small screens.
* `$hdr-border__bottom--thin` is a single file variable that's the thin version of the header's border bottom.
* `$link-fontSize__large` is a selector variable, and controls the font size for a large link element.

This method isn't perfect. Variable names can get large, unwieldy, and harder to remember. Plus name-spaces like `$hdr-` are short but unclear. But the organization and clarity they give is worth it in the long run.

### Tip 4: Combine Variables and Loops to Save Time

Lastly, a common mindset about variables is they're only used to substitute values. Don't forget they can also keep your CSS extremely DRY. In the examples list and map variable examples, I looped through values to create lots of needed CSS from just a few lines.

**Don't get so caught up in using variables for substituting values that you forget about looping.**

For instance, say someone wanted to make some different button states: a default, positive, warning, and error state. The only difference is their background colors. Instead of writing each selector out, they can just loop through a map to make the classes, like this:

{% highlight sass %}

$button-states: (
    default  : blue,
    positive : green,
    warning  : yellow,
    error    : red
);

@each $label, $color in $button-states {
    
    .btn--#{$label} { background-color: $color; }
}

{% endhighlight %}

That's four classes created with minimal work. All thanks to a variable and loop.

Let's get more ambitious. Say the default font color for buttons was white, but some of these background colors were so light it wouldn't contrast well. We can use a conditional to test for this and change the CSS output as needed.

{% highlight sass %}

$button-states: (
    default  : blue,
    positive : green,
    warning  : yellow,
    error    : red
);

@each $label, $color in $button-states {
    
    .btn--#{$label} {
        background-color: $color;

        @if (lightness($color) > 50) { color: black; }
};
    }
}

{% endhighlight %}

This conditional kicks in for every loop iteration and checks its color value. If it's too light, the font color is changed to `black`. If not, it stays as white. This way, **Sass variables and loops write code and make simple decisions for us.** Don't forget to use this extremely useful feature whenever possible.

### In Conclusion

Sass variables are very powerful, but also have more layers than one would first think. Once one understands the different types and scopes, uses detailed names, and combines them with loops, they can start using them to their full potential. Keeping this in mind will help save time and aggravation when writing styles, and that extra energy can go towards improving the styles themselves.

So get to know your local Sass variables more today!