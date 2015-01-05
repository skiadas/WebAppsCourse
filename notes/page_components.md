# Components of a Web Application

## Relevant links

- [HTML elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)
- [CSS reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference)
- [Chrome Devtools](https://developer.chrome.com/devtools)

## Components of a Web Application

A web application starts with an HTTP request, which the browser performs when you go to a URL. The response to this request is an HTML document:

```html
<!DOCTYPE html>
<html>
    <head>
        ... meta information about the page here ...
        ... next line loads a CSS file ...
        <link rel="stylesheet" type="text/css" href="aFilename.css">
    </head>
    <body>
        ... content ...
        <script type="text/javascript">
           ... javascript code can go here ...
        </script>
        <script src="aFilename.js"></script>  ... This line loads a Javascript file.
    </body>
</html>
```

There are essentially 3 components to every page:

Structure
  ~ What elements there are in the page and how they relate to each other. This is indicated by the HTML tags in this document.

Appearance
  ~ How the elements look. This is indicated by information in the CSS file linked via the `link` tag.

Behavior
  ~ How the elements react to user interaction. This is determined by the Javascript code provided via the `script` tags.

- Processing of the information in this HTML file happens sequentially. As tags are encountered, they are *rendered* on the page.
- When a `link` to a CSS file is encountered, that file is downloaded in the background, while the rest of the page is rendered. When it has been downloaded, its effects are applied to the current document.
- When a `script` tag is encountered, page rendering stops until that tag has been fully processed. This is important to keep in mind.
- As a consequence, the practice is that we put "css links at the top of the file, scripts at the bottom".
- `script` tags are the only way to get Javascript code to run.
- Scripts are all loaded in a "global scope", there is no distinction between the different tags.
- Internally, the structure of the page is a tree. You can examine this tree using the developer tools (Elements tag in Chrome).

## Working with the Elements tag in Chrome

- You can activate the Developer tools from the View menu. Choose the Elements tag.
- You can navigate the tree, expand out tags.
- Right-clicking on a tag allows you to:
    - Edit the tag as HTML.
    - Add/edit tag attributes
    - Set breakpoints for when something happens related to that element
- The magnifying glass at the left side allows you to focus on an element by highlighting it on the page.
- On the right side you see the styles present for this element.
    - You can edit those styles.
    - You can add new styles.


