# Survey of CSS

## Relevant Links

- [Semantic Code](https://boagworld.com/dev/semantic-code-what-why-how/)
- [devdocs](http://devdocs.io/)
- [List of CSS properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference)
- [Learn HTML&CSS](http://learn.shayhowe.com/html-css/)
- [MDN's links for learning CSS](https://developer.mozilla.org/en-US/learn/css)
- ["Can I use" site](http://caniuse.com/)
- [Free online books](https://github.com/vhf/free-programming-books/blob/master/free-programming-books.md#html--css)

## Notes

CSS stands for *Cascading Style Sheets*.

CSS is used to control the *appearance* of the web page.

Here are some key notions, before we look at some examples:

rules
  ~ A rule consists of a "selector" and series of property-value specifications. It indicates that those elements that match the selector should have those properties set to those values.

selectors
  ~ [Selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference#Selectors) "target" certain elements in the page. For instance a selector could say: "I want to look at the `li` elements that have a class of `todo` and are contained inside an element with and id of `main`."

properties and values
  ~ CSS properties specify the appearance of elements. There is a [long list of properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference), and each property accepts a specific set of values. Each property-value pair must end with a semicolon.

specificity
  ~ Each selector has a *[specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity)* value, indicating how "precisely" it is pinpointing the elements. For instance, targetting a specific id is more "specific" than targetting a specific class, which is more "specific" than targetting a specific HTML tag.

    If two rules try to apply the same property to an element, the rule with higher specificity wins. If they have equal specificity, the rule that appears later in the file wins.

inheritance
  ~ Many of the properties are *[inherited](https://developer.mozilla.org/en-US/docs/Web/CSS/inheritance* from a parent node to its children. This behavior lends cascading style sheets their name.

box model
  ~ The [box model](https://developer.mozilla.org/en-US/docs/Web/CSS/box_model) specifies how different properties specifying dimensions of elements should behave. It consists of *content width*, *padding*, *border* and *margins*.

layout mode
  ~ At any given time, depending on the element and its settings, the browser is in one of four main *[layout modes](https://developer.mozilla.org/en-US/docs/Web/CSS/Layout_mode)*: *block*, *inline*, *table* and *positioned*.

floats
  ~ [Floats](https://developer.mozilla.org/en-US/docs/Web/CSS/float) are a difficult concept to work with at first. A "floating" element is taken out of the normal flow and placed along the left or right side of the page, while other elements wrap around it.

There are too many properties to list here, but we will list the **various selectors**:

aTag
  ~ An HTML tag when used as a selector targets all elements in the page with that tag.

\#anId
  ~ Targets only the element with that specific id.

\.aClass
  ~ Targets all elements with this class.

sel1sel2
  ~ Putting selectors right next to each other indicates that they should all apply to an element for it to be targetted. For example `div#main` targets only a div element with an id of main, and nothing else.

sel1 sel2
  ~ A space between two selectors indicates that the second selector should target descendants of elements matched by the first selector. For instance `.todo p` targets paragraph elements only when they appear within an element with class "todo".

sel1, sel2
  ~ A comma between two selectors indicates that this rule should apply if either selector applies.

sel1 \> sel2
  ~ Targets elements that match the second selector, that are children (immediate descendants) of elements that match the first selector.

sel1 \~ sel2
  ~ Targets elements that match the second selector, that are siblings of elements that match the first selector.

sel1 \+ sel2
  ~ Targets elements that match the second selector, that are adjacent siblings (immediately follow) of elements that match the first selector.

[attr=value]
  ~ Attribute selectors target elements with a specific value for a specific attribute. There are a [number of variants](https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors) depending on the relation between the specified value and the element's value.

::pseudo
  ~ There are a few [pseudo-elements](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements) that can be targetted this way, for instance the first line in a paragraph or the first letter in a paragraph.

:pseudo
  ~ These are [pseudo-classes](https://developer.mozilla.org/en-US/docs/Web/CSS/pseudo-classes) and represent specific behavior of the targetted elements. For instance, you can use `:hover` to indicate something that should happen only when the element is hovered over by the mouse, you can use `:visited` to highlight links that have already been followed, and so on.

For an example of how a CSS stylesheet might look like, have a look at the [CSS file](https://github.com/skiadas/skiadas.github.io/blob/master/css/course.css) used for our class notes.
