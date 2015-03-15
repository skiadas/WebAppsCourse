# Project Steps

Some of you have already done these steps.

- Create repository
- Add your teammate and instructor as collaborators
- Clone the repository in your computer
- For everything below create issues and close them as you make progress
- Create basic structure:
    - Create `app` and `lib` folders inside your project.
    - Download and place jQuery, Handlebars, and any other packages you need inside the `lib` folder.
    - Download and place `require.js` and optionally its minified version ot the root directory.
    - Set up `.eslintrc` with the rules you want to follow in your project.
    - Create `index.html` and `app/main.js` similar to the TODOApp. The result of this is that if you open `index.html` in your browser, then `main.js` should load.
    - Set up `paths` in your `main.js` to the various addons like `jQuery`.
    - Create a test file in `app` folder that follows the AMD style and is loaded from `main.js`. Test by loading `index.html` in your browser.
    - If you want to use custom libraries like `mixin`, `newClass`, `event` etc, add them in an appropriately named subfolder of `app` (say `utils`).
- Create basic documentation:
    - A README.md file on your main folder.
    - Should include short project description.
    - Should include descriptions of the basic components of the app.
- Start work:
    - Pick a model that stands on its own.
    - Create an appropriate file for your model inside `app`, using AMD format.
    - Set up the boilerplate for your model.
    - Add instance variables, method blank implementations.
    - Add comment at top of file describing the model.
    - Add comments above each instance variable describing it.
    - Add comments above each method describing its input, return values, and purpose.
    - Create a `testMyModel.html` test file.
    - Fill test file and program file ideally one method at a time.
- Keep working.
