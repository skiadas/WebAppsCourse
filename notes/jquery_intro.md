# Survey of HTML

## Relevant Links

- Flanagan's book, Chapter 19
- Flanagan's book, Part IV (jQuery summary around page 945)
- [devdocs on jQuery](http://devdocs.io/jquery/)
- [jQuery front page](http://jquery.com/)
- [jQuery API](http://api.jquery.com/)

## Notes

jQuery is a very popular library for handling the DOM parts of an application. It offers a uniform interface, not marred by the various incompatibilities between browser implementations.

jQuery has 3 main components that we will utilize in due course:

- Page / element access and manipulation
- event-handling
- asynchronous data loading

Even if you do decide not to use it, you need to become familiar with it, as many others do use it.

As an external library, jQuery needs to be first incorporated into your project via a script tag (or the AMD module methods we will learn about later). You can either download the version you want and link to it, or you can link to the [jQuery CDN](https://code.jquery.com/) (the [wikipedia page](http://en.wikipedia.org/wiki/Content_delivery_network) is a good place to start if you want to learn more about Content Delivery Networks and their advantages).

jQuery defines two global objects, that you can use to access it. One is `jQuery`, the other is `$`. For all our purposes, they are synonyms and we will be using `$`.

### The global (factory) function `$`

The global `$` is a swiss-army knife, it is a function that sort of does everything. It has three main forms, depending on what the first argument is:

$(sel)
  ~ If the first argument is a string that is a selector, it will return a "jQuery object" that represents the collection of all elements that match the selector. If a second "context" argument is passed, representing an element or elements, it will search for the elements *relative to that context*.

$(domEls)
  ~ If the first argument is a dom element or array of dom elements, it will return a "jQuery object" that represents that same array of elements, but now as jQuery objects.

$(f)
  ~ If the first argument is a function, then this function will be called when the document has finished loading. This is a good place to do page initialization.

### jQuery object methods

All jQuery objects respond to a similar set of methods. You can explore the whole [API online](http://api.jquery.com/), and in Part IV of Flanagan's book.

First we have collection methods.

[each(f)](http://api.jquery.com/each/)
  ~ Given a function `f(i, el)`, will call the function for each element (if a collection).

[get(i), el[i]](http://api.jquery.com/get/)
  ~ gets the element at the i-th index. jQuery objects tend to be collections, this picks out a specific element from that collection.

[map(f)](http://api.jquery.com/jQuery.map/)
  ~ Translates all items of the array to a new array, via the function.

[filter()](http://api.jquery.com/filter/)
  ~ Filters the list based on the first argument. See the documentation for options.

[add()](http://api.jquery.com/add/)
  ~ Adds more elements to the current selection, and returns the resulting object.

[children()](http://api.jquery.com/children/)
  ~ Selects the children of the current selection.

[closest()](http://api.jquery.com/closest/)
  ~ Returns the closest ancestor of each element that matches certain criteria.

[find()](http://api.jquery.com/find/)
  ~ Selects all descendants that match certain criteria.

Next we have some element methods that read/write element properties.

[addClass](http://api.jquery.com/addClass/), [removeClass](http://api.jquery.com/removeClass/), [toggleClass](http://api.jquery.com/toggleClass/)
  ~ Add / remove / toggle classes to each element in the collection.

    This can actually toggle multiple classes at once.

[attr](http://api.jquery.com/attr/)
  ~ Get or set one more more attributes.

[data](http://api.jquery.com/data/)
  ~ Get or set data attributes.

[val](http://api.jquery.com/val/)
  ~ Get or set the "value" associated with the element.

Next we have methods for inserting/removing elements from the dom.

[after()](http://api.jquery.com/after/), [before()](http://api.jquery.com/before/)
  ~ Insert the provided content after /before each element.

[append()](http://api.jquery.com/append/), [prepend()](http://api.jquery.com/prepend/)
  ~ Appends / prepends the provided content at the end of each element.

[appendTo()](http://api.jquery.com/appendTo/), [prependTo()](http://api.jquery.com/prependTo/)
  ~ Inserts each element at the end / start of the argument.

[html()](http://api.jquery.com/html/)
  ~ Sets/gets the html contents of the elements.

[insertAfter()](http://api.jquery.com/insertAfter/), [insertBefore()](http://api.jquery.com/insertBefore/)
  ~ Inserts each element after the argument. It will also clone them if the target argument is many elements.

[wrap](http://api.jquery.com/wrap/), [wrapInner](http://api.jquery.com/wrapInner/)
  ~ Various ways or wrapping specific HTML around/inside the elements.

There are a lot of other methods, mostly related to events, that we will revisit later.

### Examples

We will run some examples on a barebones page. Save this page in an HTML file, open it in the browser, then fire up the console, to follow along.

```html
<!DOCTYPE html>
<html>
<head>
  <title>A basic page</title>
</head>
<body>
  <div id="mainDiv">
    Basic content.
  </div>
  <script src="https://code.jquery.com/jquery-1.11.2.min.js"></script>
</body>
</html>
```

Okay, now first off, let's type `$` in the console. We should see that it exists and is a function.

Try each of these lines in order.

```javascript
var mainDiv = $("#mainDiv");
mainDiv.addClass("foo").append("<p>Hi! I'm new!</p>");
mainDiv.text();                        // Text in mainDiv
mainDiv.html();                        // HTML in mainDiv
mainDiv.html("Oops it's all gone!");   // Replacing the html
$([1,2,3]).map(function(i) { return $('<p></p>').html("Hi! I'm " + i)[0]; })
          .appendTo(mainDiv).wrap('<li></li>');
$('<input type="input" />').appendTo('li').val(20);
$('<input type="input" />').appendTo('li').val(function(i) { return i; });
$('li').first().css('background-color', 'blue')
```
