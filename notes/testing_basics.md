# Testing Basics

We discuss here some basic ideas around testing, that you will further work on in the lab and in future labs and projects.

## Testing Basics

When we refer to tests, we typically mean automated tests. Those tests fall into various categories:

Unit Tests
  ~ Unit tests test a single tiny individual component of your application. You typically want to have unit tests for every bit of your code that is part of your application's *interface*.

    You should avoid testing for things that are too implementation-dependent.

    Unit tests are a crucial part of the refactoring process, whose goal is to rearrange and rewrite sections of your code. A solid suite of unit tests can allow you to do this freely without worrying about breaking code. "Your tests will catch that". And revision control allows you to recover if you've messed things up too much.

Integration Tests
  ~ Integration tests test bigger parts of your application, making sure that different parts come together naturally.

    Time permitting, we will talk more about integration tests later in the term.

Acceptance Tests
  ~ Acceptance tests are *executable specifications of the system's behavior*. They are meant to describe the functionality required of the software from a business point of view, and are meant to be read and possibly written by our clients or their proxies. At the same time, they can be automatically executed.

    Acceptance tests indicate when your software has met its business needs: If the tests pass, we are ready to ship the software.

Timing Tests
  ~ Timing tests are used in algorithm implementations to assess the efficiency of the algorithms.

    They can also be used to try to find bottlenecks in your application, though some of the browser profiling tools might be better.

Deployment Tests
  ~ Deployment tests are meant to ensure that your application performs well on various browsers / deployment environments. Hard to do.

We will focus on unit tests for now.

## Test-Driven Development

In Test-Driven-Development, you typically would follow these steps:

- Decide on a small piece of functionality you want to add.
- Make a GitHub issue about it.
    - If you prefer, you can create one bigger more "logical" issue, and create a "task list" in it, following the [example at this blog post](https://github.com/blog/1375%0A-task-lists-in-gfm-issues-pulls-comments). Then check those items off as you implement them.
- Write a test for the code you want to introduce.
- Run your tests, and watch this new test fail. This makes us more certain that the test does indeed detect the feature we want to add.
- Optionally, make a git commit of the test, using "#..." to reference the issue you created.
    - This is a bit of a style decision, whether to commit the tests separately or whether to do one commit containing both test and new code.
- Write a minimal set of code that would make the test pass.
- Check that all your tests pass.
- Make a commit, using "#..." to reference the issue you created. Say "close #..." if it was a "single-problem issue".
    - This gives you a safe backup point to revert to.
- Consider any refactoring that you might want to have take place.
- Do the refactoring, and make sure your tests still all pass.
- Commit (optionally creating an issue first to explain what the refactoring was about).

This is some of the general theory behind testing.

The key steps on the above, other than issues and commits, are:

- Write a test
- Watch it fail
- Make it pass
- Make it right (cleanup/refactor)

The goal is to keep repeating this loop over and over, with ever more complex tests, until you have reached all the functionality you desire.

## Testing in Javascript

We will be using [mocha](http://mochajs.org/) in combination with [chai](http://chaijs.com/) for our unit tests. Here is a basic html file to run mocha on the browser:

```html
<!DOCTYPE html>
<html>
<head>
   <link rel="stylesheet" href="mocha.css" />
</head>
<body>
   <div id="mocha"></div>
   <script src="chai.js" type="text/javascript"></script>
   <script src="mocha.js"></script>
   <script>
      mocha.setup('bdd');
      var expect = chai.expect;
   </script>
   <script src="yourCode.js"></script>
   <script src="tests.spec.js"></script>
   <script>
      mocha.checkLeaks();
      mocha.globals(['chai']);
      mocha.run();
  </script>
</body>
</html>
```

All the tests go into `tests.spec.js` (or a similarly named file). You can also use multiple test files, just put them after each other. Use the rest as a template on every project.

mocha and chai together offer all the primitives we need for testing. We will describe them briefly in the following section. Refer to their homepages for more info.

### Mocha and Chai

Mocha provides a couple of basic functions for us. We use them to structure our test suites.

`describe`
  ~ Starts a new test suite. First argument is a string "title". Second is an anonymous argumentless function that contains the tests.

    The string titles together with the titles from the "it" sections should form sentences asserting what the test does.

    You can have nested "describe"s.

`it`
  ~ Starts a new unit test. Should only appear within the function in a "describe". First argument is a string "test title". Together with the "describe"'s string, it should form a sentence.

    Second argument is an anonymous argumentless function. It will contain the statements that comprise the test.

`before`/`after`
  ~ They go in a "describe" and they take as argument an anonymous argumentless function. They will run this function before starting (respectively after completing) the tests. Look for "hooks" in mocha doc.

`beforeEach`/`afterEach`
  ~ Similar, except that they run before/after *each* test in the describe, rather than only once. Look for "hooks" in mocha doc.

`only`
  ~ You can force the running of a single test, or test suite, by using this. Look for "exclusive tests" in mocha doc.

`skip`
  ~ Can be used to tell it to skip the specific test. Look for "inclusive tests" in mocha doc.

Chai is used to write tests. We will be using its "expect" interface, [whose API is here](http://chaijs.com/api/bdd/).

`expect(...)`
  ~ The start point. `expect(something).to..` is the basic structure. Everything else is "chained" at the end of the expect.

chainable words
  ~ a series of "words" that have no meaning but are used to form something that looks more like a sentence: "to", "be", "is", "that", "have", "has", some more.

`.not`
  ~ negates the test.

`.deep`
  ~ for array comparisons, it will test each matching element. So two arrays would be equal if they have equal elements, even if they are different objects.

`.a(...)`
  ~ checks for `typeof`.

`.include(...)`
  ~ checks that target includes the value.

`.equal(...)`
  ~ tests that the target equals the value.

many others
  ~ Look in the [Chai API](http://chaijs.com/api/bdd/).

### Mocha and ES6 modules

Currently Mocha has some challenges dealing with ES6 modules, but there are some workarounds. Here's what we need to do:

To run mocha on the browser, you use a format similar to the one above, but referring to modules instead. You need to make sure to run a local server like `http-server` for these to take effect:
```html
<!DOCTYPE html>
<html>
<head>
   <link rel="stylesheet" href="https://unpkg.com/mocha@4.0.1/mocha.css" />
</head>
<body>
   <div id="mocha"></div>
   <script src="https://unpkg.com/chai@4.1.2/chai.js"></script>
   <script src="https://unpkg.com/mocha@4.0.1/mocha.js"></script>
   <script>mocha.setup('bdd');</script>
   <script type="module" src="test/event.spec.mjs"></script>
   <script type="module">
      mocha.checkLeaks();
      mocha.run();
  </script>
</body>
</html>
```
If you have more testing modules, you just add links to each one. The `event.spec.mjs` file here is a ES6 module, and the `type=module` line in front ensures that it is loaded as such.

To run the same tests with Node on the server, we need a bit more work. Normally we would simply run the `mocha` executable. However `mocha` is not currently able by itself to run the files as ES6 modules. We instead need to execute mocha as follows:
```bash
NODE_OPTIONS="--experimental-modules" mocha --delay test.esm.js
```
This does two things. First, it sets the `experimental-modules` flag for Node, which tells it to recognize ES6 files. Then, it runs the `test.esm.js` file as a normal Node module. That module loads the other tests as follows:
```javascript
// Run tests with: NODE_OPTIONS="--experimental-modules" mocha --delay test.esm.js
const { sync: globSync } = require("glob");

global.chai = require('chai');

(async () => {
   const matches = globSync("test/*.spec.mjs");
   try {
      for (const match of matches) {
         await import("./" + match);
      }
   } catch (e) {
      throw e;
   }
   run();
})();
```
This file sets up `chai` as a globally available value, then looks for test files in the `test` directory, and imports them. It then waits for all of them to load before using  `run` to execute them all.
