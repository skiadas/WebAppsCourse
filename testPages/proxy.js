// Basic proxy pattern

// Makes a "proxy" out of the object
//
// Caution: Will only know about properties that
// are set at the time of calling this function.
function makeProxy(obj) {
   var proxy, control;

   control = { obj: obj };
   proxy = Object.create(obj.__proto__);

   // Placeholders for adding "handlers"
   // Someone can use the control object to add steps to occur
   // before/after the proxy delegates.
   control.getHandlers = {};
   control.setHandlers = {};
   control.invocationHandlers = {};

   function addHandler(group) {
      return function(prop, handler) {
         group[prop] = group[prop] || [];
         group[prop].push(handler);
      };
   }

   control.addGetHandler = addHandler(control.getHandlers);
   control.addSetHandler = addHandler(control.setHandlers);
   control.addInvocationHandler = addHandler(control.invocationHandlers);

   function viaHandlers(handlers, context, v) {
      (handlers || []).forEach(function(handler) {
         v = handler.call(context, v);
      });
      return v;
   }

   // If argument is a function, needs to "wrap it" around a function
   // that records its invocations.
   function wrap(prop, v) {
      if (typeof v !== 'function') { return v; }
      return viaHandlers(control.invocationHandlers[prop], proxy, function() {
         return v.apply(proxy, arguments);
      });
   }

   control.get = function(prop) {
      return function() {
         return wrap(prop, viaHandlers(control.getHandlers[prop], proxy, control.obj[prop]));
      };
   };

   control.set = function(prop) {
      return function(v) {
         control.obj[prop] = viaHandlers(control.setHandlers[prop], proxy, v);
      };
   };

   Object.getOwnPropertyNames(obj).forEach(function(prop) {
      var descriptor = Object.getOwnPropertyDescriptor(obj, prop);
      Object.defineProperty(proxy, prop, {
         configurable: descriptor.configurable,
         enumerable: descriptor.enumerable,
         get: control.get(prop),
         set: control.set(prop)
      });
   });

   return { proxy: proxy, control: control };
};

// Example
var o = { a: 3, foo: function() { return this.a; } };
var p = makeProxy(o);

p.control.addGetHandler("a", function(v) {
   console.log("accessed a. value was: ", v, " but we doubled it!");
   return 2 * v;
});

p.control.addInvocationHandler("foo", function(f) {
   return function() {
      console.log("function foo called. Arguments:", arguments);
      return 5 * f.call(this, arguments);
   };
});

p.control.addSetHandler("a", function(v) {
   console.log("You tried to set a to value ", v, " but I won't let you! I will keep it at 3");
   return 3;
});

p.proxy.a;
p.proxy.foo();
p.proxy.a = 5;


// makes proxy for specific set of methods
// can later replace some of the methods with a
// more useful effect
function makeProxy2(obj, methods) {
   var proxy = Object.create({});
   methods.forEach(function(method) {
      proxy[method] = function() {
         return obj[method].apply(obj, arguments);
      };
   });
   return proxy;
}
