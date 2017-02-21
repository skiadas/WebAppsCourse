// templates.js
//
// This file handles the various templates for us.
//
(function(global) {
   var Template, templateStorage, proto;

   if (!global.hasOwnProperty('TaskApp')) {
      global.TaskApp = {};
   }

   // Object keeping the stored templates
   templateStorage = {};

   /*
    * Exported object. `load` is used to store a template, `parse` is used to
    * parse a stored template.
    */
   Template = {
      /*
       * Returns a new template object based on the text in `html`.
       * The `name` can be used to access the template in the future
       * If a template with the same name exists, it prints a warning message
       * and replaces it.
       */
      new: function newTemplate(name, html) {

      },
      /*
       * Returns the template with a given name, or `null` if it does not exist.
       */
      get: function getTemplate(name) {

      }
   };

   /*
    * Prototype object for created templates
    */
   proto = {
      /*
       * Parses the template named `name`, using the `values` object
       * to resolve parameter entries. For instance {{foo}} will be
       * replaced by values.foo
       */
      parse: function(values) {

      }
   };

   global.TaskApp.Template = Template;
}(typeof window === 'undefined' ? root : window));
