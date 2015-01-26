# Survey of HTML

## Relevant Links

- Flanagan's book, Chapter 15
- [MDN's DOM documentation](https://developer.mozilla.org/fi/docs/DOM)
- [Eloquent Javascript](http://eloquentjavascript.net/13_dom.html)
- [MDN's page on document](https://developer.mozilla.org/en-US/docs/Web/API/Document)
- [MDN's page on elements](https://developer.mozilla.org/en-US/docs/Web/API/Element)
- [devdocs](http://devdocs.io/)

## Notes

The *Document Object Model* is an API for accessing HTML and XML documents.

It represents the document as a tree, the *root node* being the html/xml tag.

Each node has:

children
  ~ all the nodes that are immediately below the node.

siblings
  ~ children of the same node are siblings to each other.

descendents
  ~ all the nodes that are somewhere below the node (so all their children, their children's children, their children's children's children and so on).

parent
  ~ Each non-root node has a parent node.

ancestors
  ~ The node's parent, its parent's parent, its parent's parent's parent and so on.

DOM Nodes comes in various types. Even though you might expect that only tag elements would be nodes, in fact this is in practice not the case: There are text nodes, attribute nodes, comment nodes and so on. Some of the DOM methods bypass non-element nodes. Also many popular libraries, like jQuery, offer a more convenient interface.

The DOM interface also allows you to manipulate the page elements, not only access them. We will see examples in the future.

Here is a main list of the properties and methods you have access to. Most of these apply to both the `document` object and any specific `element` objects.

[getElementById](https://developer.mozilla.org/en-US/docs/Web/API/Document.getElementById)
  ~ Returns the element node in the document with a given id.

[getElementsByTagName](https://developer.mozilla.org/en-US/docs/Web/API/Element.getElementsByTagName)
  ~ Returns all elements with a specific tag.

[getElementsByClassName](https://developer.mozilla.org/en-US/docs/Web/API/Element.getElementsByClassName)
  ~ Returns all elements with a specific class.

[querySelector](https://developer.mozilla.org/en-US/docs/Web/API/Document.querySelector)
  ~ Returns the first element that matches the given selector.

[querySelectorAll](https://developer.mozilla.org/en-US/docs/Web/API/Document.querySelectorAll)
  ~ Returns all elements that match the given selector.

[children](https://developer.mozilla.org/en-US/docs/Web/API/ParentNode.children)
  ~ Returns all the element nodes that are children of the current node.

[firstElementChild](https://developer.mozilla.org/en-US/docs/Web/API/ParentNode.firstElementChild)
  ~ Returns the first element node that is a child of the current node.

[innerHTML](https://developer.mozilla.org/en-US/docs/Web/API/Element.innerHTML)
  ~ A property specifying the contents of the node (as a string). Also see [textContent](https://developer.mozilla.org/en-US/docs/Web/API/Node.textContent)

[outerHTML](https://developer.mozilla.org/en-US/docs/Web/API/Element.outerHTML)
  ~ A property specifying the entire node with its contents (as a string).

[className](https://developer.mozilla.org/en-US/docs/Web/API/Element.className)
  ~ The string containing the element's classes (space-separated).

[tagName](https://developer.mozilla.org/en-US/docs/Web/API/Element.tagName)
  ~ The element's tag name.

[id](https://developer.mozilla.org/en-US/docs/Web/API/Element.id)
  ~ The element's id.

[getAttribute](https://developer.mozilla.org/en-US/docs/Web/API/Element.getAttribute), [setAttribute](https://developer.mozilla.org/en-US/docs/Web/API/Element.setAttribute)
  ~ Get and set the attribute with a specific name.

We will not spend more time with this part of the DOM, and we will instead rely on jQuery for DOM manipulation. But you should be aware of what is out there, and that you could do directly most of the things that jQuery offers.

Chapter 15 of Flanagan's book, along with sections of Part IV, do a very good job showing what is possible as well as how one would manipulate a page with the standard DOM toolkit.
