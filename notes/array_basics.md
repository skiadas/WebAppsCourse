# Basics of Javascript Arrays

## Relevant Links

- Flanagan's book, 7.1-7.8
- [MDN's page on the Array global](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)

## Javascript Arrays

- In Javascript, arrays can contain absolutely any elements and have a variable length. In this way they are very much like Python's lists.
- Easiest way to create is with an array literal, e.g. `[]`, `[1, 2, 3]` or `[1, [3, 4]]`.
- Access an array value via bracket notation: `arr[2]`. Indexing starts at 0.
    - Question: How would we access the value 4 in the example above?
- Set any array value similarly: `arr[5] = 2`. You can set values out of bounds!
- Arrays are actually just objects, and can have properties that are non-numeric.
- The length of an array is one more than the largest numeric property.

    ```js
    let a = [1, 4, 5];
    a[2];                 // 2 -> 5
    a[6] = 2;
    a;
    a.length;             // 7
    a.foo = 5;            // A random property.
    ```
- The most basic way to iterate over an array's elements is with a `for` loop:

    ```js
    let a = [1,2,3,4];
    for (let i = 0; i < a.length; i += 1) {
       console.log(a[i]);
    }
    ```
- A better way to iterate over an array, or in fact any *iterable* object (we will discuss those later), with a `for-of` loop, which is similar to Python loops:

    ```js
    let arr = [3,5,3,4];
    for (let x of arr) {
       console.log(x);
    }
    // Can use const if you don't try to reassign it in the loop
    for (const x of arr) {
       console.log(x);
    }
    ```

**Practice:** Create an array containing the squares of the numbers from 1 to 10. Then write a loop that prints them.

### Standard Methods

Consult individual method pages as well as section 7.8 from the book.

[Array.from](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from)
  ~ Used to construct an array from an iterable object.

[Array.of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/of)
  ~ Used to construct an array from the provided arguments. You should prefer this (or the array literal notation) to using the constructor.


Iterators:

[keys](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/keys)
  ~ Iterates over the indices of the array: `for (const i of [2,3,5].keys()) { console.log(i); }`

[values](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/values)
  ~ Iterates over the values of the array: `for (const e of [2,3,5].values()) { console.log(e); }`

[entries](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/entries)
  ~ Allows you to iterate over both indices and values of an array: `for (const [i, e] of [2,3,5].entries()) { console.log(i + ": " + e); }`

Inserting/Removing elements:

[push](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push)
  ~ adds one or more elements to the end of the array. *Returns the new length of the array*.

[pop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop)
  ~ removes the last element of the array and returns it.

[unshift](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift)
  ~ adds one or more elements at the beginning of the array, shifting other elements to the right. *Returns the new length of the array*.

[shift](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift)
  ~ removes the first element of the array and returns it. Shifts all other elements accordingly.

Slicing:

[slice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
  ~ returns a *new* array containing a specific range of elements from the original array.

[splice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)
  ~ removes and/or inserts elements at a specified location in the array.

Finding:

[indexOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)
  ~ searches into an array looking for a specific element. Returns the index of the first match, or -1 if the search fails.

[lastIndexOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf)
  ~ finds the last match instead.

[findIndex](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndexf)
  ~ searches into an array looking for a specific element that satisfies a provided predicate function.

Others:

[reverse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse)
  ~ reverses the array *in place*.

[sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
  ~ sorts the array *in place*. You can provide a custom sorting function, a topic we will discuss more later.

[concat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)
  ~ returns a new array comprising of the concatenation of the original array and the arguments.

[join](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join)
  ~ used for arrays of strings. Join the strings together, possibly inserting a separator.

There is another set of methods following a higher-order-function paradigm. We will discuss these in future segments.

