// composite.js
// An illustration of the composite pattern

// PRELIMINARY STUFF. REAL FILE STARTS LATER
/**
 * Mix into the first argument properties from the remaining arguments.
 * No check is made to see if the properties exist in the first place.
 */
function mixin(target) {
   Array.prototype.slice.call(arguments, 1)
      .forEach(function(source) {
         Object.keys(source).forEach(function(key) {
            target[key] = source[key];
         });
      });
   return target;
}

// Class infrastructure
function newClass(init, superclass) {
   var cls, proto;

   init = init || function() {};
   superclass = superclass || Object;
   proto = Object.create(superclass.prototype);
   cls = Object.create({}, { "super": { value: superclass } });
   cls.prototype = proto;
   Object.defineProperty(cls.prototype, "class", { value: cls });
   cls.initialize = init;
   cls.new = function newObj() {
      var o = Object.create(cls.prototype);
      cls.initialize.apply(o, arguments);
      return o;
   };

   return cls;
}

var Collection = newClass(function() { this.children = []; });

mixin(Collection.prototype, {
   getLength: function getLength() { return this.children.length; },
   getItem: function getItem(i) { return this.children[i]; },
   indexOf: function indexOf(item) {
      return this.children.indexOf(item);
   },
   insertAt: function insertAt(item, i) {
      this.children.splice(i, 0, item);
      return this;
   },
   remove: function remove(i) {
      return this.children.splice(i, 1)[0];
   },
   append: function append(item) {
      return this.insertAt(item, this.getLength());
   }
});


// REAL FILE STARTS HERE

// We will use composite to manage a list of tasks with
// sublists

function makeNewList() { return TaskList.new("top level"); }

// A common "interface/abstract class".
// This is what clients would see/use
var Component = newClass(function init(title) {
   this.title = title;
   this.parent = null;
   this.tags = [];
});

var Task = newClass(function init(title) {
   this.class.super.initialize.call(this, title);
   this.completed = null;
}, Component);

var TaskList = newClass(function init(title) {
   this.class.super.initialize.call(this, title);
   this.children = Collection.new();
}, Component);

mixin(Component.prototype, {
   indexOf: function(item) { // index of item in this
      return this.children.indexOf(item);
   },
   append: function(item) {
      this.children.append(item.detach());
      return this;
   },
   prepend: function(item) {
      this.children.insertAt(item.detach(), 0);
      return this;
   },
   insertAfter: function(prevItem) {
      if (!prevItem.parent) {
         throw new Error("Cannot insert after detached item");
      }
      var children = prevItem.parent.children;
      var i = children.indexOf(prevItem) + 1;
      children.insertAt(this.detach(), i);
      return this;
   },
   detachItem: function(item) {
      this.children.remove(this.children.indexOf(item));
      item.parent = null;
      return item;
   },
   detach: function() {
      if (this.parent) { this.parent.detachItem(item); }
      return this;
   },
});


mixin(Task.prototype, {
   // Tasks don't really have iterators
   iterator: function() {
      return {
         next: function() { return; },
         hasNext: function() { return false; }
      }
   },
   accept: function(visitor) {
      return visitor.visitTask(this);
   }
});

mixin(TaskList.prototype, {
   iterator: function() {
      var children = this.children;
      var i = -1, it = null, nextValue = null;
      return {
         next: function() { return nextValue; },
         hasNext: function() {
            if (!it || !it.hasNext()) {
               i += 1;
               if (i >= children.getLength()) { return false; }
               nextValue = children.getItem(i);
               it = nextValue.iterator();
               return true;
            }
            nextValue = it.next();
            return true;
         }
      }
   },
   accept: function(visitor) {
      // Could do more work here, depending on whose responsibility
      // it is to visit the children
      return visitor.visitTaskList(this);
   }
});


var l = makeNewList();
l.append(Task.new("Task 1"));
var l2 = TaskList.new("A sublist");
l.append(l2);
l2.append(Task.new("Task 2"));
l.append(Task.new("Task 3"));
var it = l.iterator();
while (it.hasNext()) {
   console.log(it.next().title);
}

var ToStringVisitor = newClass(function init() {
   this.result = [];
   this.indent = "";
   this.depth = 0;
});
mixin(ToStringVisitor.prototype, {
   visitTask: function(task) {
      this.result.push(this.indent + task.title);
   },
   visitTaskList: function(list) {
      var prevIndent = this.indent;
      this.result.push(this.indent + list.title);
      this.indent += "\t";
      this.depth += 1;
      for (var i = 0; i < list.children.getLength(); i += 1) {
         list.children.getItem(i).accept(this);
      }
      this.depth -= 1;
      this.indent = prevIndent;
   }
});

var s = ToStringVisitor.new();
l.accept(s)
