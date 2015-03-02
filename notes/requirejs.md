# Using require.js

## Relevant Links

- [require.js home page](http://requirejs.org/)
- [require.js API](http://requirejs.org/docs/api.html)

## Notes

In this section we will discuss setting up an AMD-based application with `require.js`. Other AMD loaders will work in similar ways. You should consule the `require.js` documentation page for details.

We will use as a model our [WebAppsTodo application](https://github.com/skiadas/WebAppsTodo).

### Application Structure

This is by no means the only way to structure the application, but it is a common way:

```
Project Directory/
    index.html        <-- base html file that starts it all
    app/              <-- contains your application code
        require.js    <-- the require.js file. Sets things up
        main.js       <-- loaded from require.js. Kickstarts app
        helper/       <-- contains helper modules (e.d. data structures)
            util.js
            mixin.js
        otherFolders/ <-- to organize your app's pieces
    lib/              <-- for other people's modules
        jquery.js
    build/            <-- the results of an optimized build process
    test/             <-- tests
        test1.spec.js
        test2.spec.js
```

