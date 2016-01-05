/**
 * Mix into the first argument properties from the remaining arguments.
 * No check is made to see if the properties exist in the first place.
 */
function mixin(target) {
   "use strict";

   Array.prototype.slice.call(arguments, 1)
      .forEach(function(source) {
         Object.keys(source).forEach(function(key) {
            target[key] = source[key];
         });
      });

   return target;
}

function newClass(init, superclass) {
   var cls, proto;

   init = init || function() {};
   superclass = superclass || Object;
   proto = Object.create(superclass.prototype);
   cls = Object.create({}, {
      "prototype": { value: proto },
      "super": { value: superclass }
   });
   Object.defineProperty(cls.prototype, "class", { value: cls });
   cls.initialize = init;
   cls.new = function newObj() {
      var o = Object.create(proto);
      cls.initialize.apply(o, arguments);
      return o;
   };

   return cls;
}

// Example:
var Point = newClass(function init(x, y) {
   this.x = x;
   this.y = y;
});
Point.prototype.r = function() {
   return Math.sqrt(this.x * this.x + this.y * this.y);
};

var ColorPoint = newClass(
   function init(x, y, color) {
      Point.initialize.call(this, x, y);
      this.color = color;
   },
   Point  // <---- ColorPoint inherits from Point
);
ColorPoint.prototype.getColor = function() {
      return this.color;
};

var p1 = Point.new(2,3);
p1.x;
p1.y;
p1.r();

var p2 = ColorPoint.new(2, 3, "blue");
p2.x;
p2.y;
p2.r();
p2.getColor();

Point.clsConst;
ColorPoint.clsConst;

/*
 *  Various utilities
 */


/*
 *  Mixin methods
 */


/**
 * Mix into the first argument properties from the remaining arguments.
 * Will only add a property if it does not already exist.
 */
function mixinSafe(target) {
   "use strict";

   Array.prototype.slice.call(arguments, 1).forEach(function(source) {
      Object.keys(source).forEach(function(key) {
         if (!target.hasOwnProperty(key)) {
            target[key] = source[key];
         }
      });
   });

   return target;
}

/*
 *  Class Construction
 */

/**
 * Construct a "class" object with given instance variables, class variables,
 * and inheriting from a parent object.
 *
 * The returned object has a `new` method meant to be used for creating instances
 * of the "class".
 *
 * classVars may contain an `initialize` method, which can be used to initialize the
 * newly created object. This method should expect to be called as
 * `newObject.initialize(superC, args)`, where `superC` is the corresponding `initialize`
 * of the parent, or `undefined` if the parent does not exist or doesn't have an `initialize`
 * method, and all remaining arguments are those passed to the original call to `new`.
 * In the call to `initialize`, the `this` object is set to the newly created object.
 *
 * You may also choose to provide a `new` method in `classVars`, in which case you are
 * responsible for creating and returning an appropriate object.
 *
 * The returned object contains a hidden property called `prototype`, which contains what
 * is to become the `__proto__` object of the instance object of this "class".
 *
 * This prototype object contains a `super` property, which refers directly to the parent's
 * prototype object, if there was one. Your instance methods can access instance methods of
 * the parent directly, by calling `this.super.methodName(...)`. Class methods can also
 * access class methods of the parent with the same expression.
 *
 * The class inherits, via prototypal inheritance, any class methods of its superclass that
 * it does not implement itself.
 */

function newClass(instanceVars, classVars, parent) {
   "use strict";

   var cls,                // class object to return
       proto,              // prototype object
       initialize,         // the initializer
       superConstr,        // the constructor from the parent, if provided
       superProto;         // the prototype of the parent, if provided

   if (classVars == null) { classVars = {}; }

   // If parent argument is null, inherit from null instead
   if (parent === null) {
      superProto = null;
      superConstr = null;
   } else {
      // If parent argument missing, inherit from Object
      parent = parent || Object;
      superProto = parent.prototype;
      superConstr = parent.initialize;
   }
   cls = Object.create(parent);        // Inherit superclass' methods. Correct?
   proto = Object.create(superProto);

   // Default initializer
   function defaultInit(superC) { if (superC) { superC(); } }
   initialize = classVars.initialize || defaultInit;

   mixin(proto, instanceVars || {});
   mixin(cls, classVars || {});

   // Constructor function
   cls.new = function makeNew() {
      var args, obj;

      obj = Object.create(cls.prototype);
      args = Array.prototype.slice.call(arguments);
      args.unshift(superConstr && superConstr.bind(obj));

      initialize.apply(obj, args);

      return obj;
   };

   Object.defineProperty(proto, "super", { value: superProto, writeable: false });
   Object.defineProperty(cls, "super", { value: parent, writeable: false });
   Object.defineProperty(cls, "prototype", { value: proto });

   return cls;
}

/*
 *   Observer Pattern
 */

var Event = (function() {
   var Event,       // Singleton Object
       mixin,       // object containing the main event methods
       keyName,     // unique random property name to use for storing events
       makeConfig;  // Configuration object maker for defining properties
   // Generate random name. Could also have gone with `_events`.
   keyName = Math.floor(10000 * Math.random()) + "events";

   mixin = Object.create(null);
   Event = Object.create(mixin);

   // Return the array that holds the handlers for the object and the event name
   // Will create that array if it doesn't exist already
   // TODO: keyName should be local to this function!
   function getEventHandlers(obj, ev) {
      if (!obj.hasOwnProperty(keyName)) {
         obj[keyName] = {};
      }
      if (!obj[keyName].hasOwnProperty(ev)) {
         obj[keyName][ev] = [];
      }
      return obj[keyName][ev];
   }

   makeConfig = (function(propObject) {
      return function(value) {
         propObject.value = value;
         return propObject;
      };
   }({ enumerable: true, writable: false }));

   function makeEventObject(data, target) {
      var o = Object.create(null);
      o.preventPropagation = false;
      Object.defineProperty(o, "data", makeConfig(data));
      Object.defineProperty(o, "target", makeConfig(target));
      return o;
   }

   mixin = {
      // Add a handler.
      on: function(ev, handler) {
         getEventHandlers(this, ev).push(handler);
         return this;
      },
      // Remove a handler.
      off: function(ev, handler) {
         var handlers = getEventHandlers(this, ev);
         handlers.forEach(function(h, i) {
            if (h === handler) {
               delete handlers[i];
            }
         });
         return this;
      },
      trigger: function(ev, data) {
         var eventObj = makeEventObject(data, this);
         getEventHandlers(this, ev).forEach(function(handler) {
            if (!eventObj.preventPropagation) {
               handler.call(null, eventObj);
            }
         });
         return this;
      }
   };

   Event.mixin = function(obj) {
      ['on', 'off', 'trigger'].forEach(function(key) {
         obj[key] = mixin[key];
      });
   };

   return Event;
}());



// var Foo = makeClass({ foo: function() { return this.a; } }, { initialize: function() { this.a = 5; }});
// var foo = Foo.new();
// foo.foo();

// var Bar = makeClass({ bar: function() { return this.a + 2; } }, {}, Foo);
// var bar = Bar.new();
// bar;

// Foo.prototype.foo2 = function() { this.a += 5; };
