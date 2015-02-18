// expressions.js
// A simple calculator
// An illustration of the visitor pattern

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

// REAL FILE STARTS HERE

// Expressions come in a number of types:
// - Number: A literal number
// - Variable: A string representing a variable
// - Binop: A binary operator (like addition, multiplication)
// - Func: Built-in function (sin, cos, exp etc)
// - Assign: Assignment operation (e.g. x = ...)
// - Seq: Sequence of expressions (e.g. e1; e2)

// A common "interface". We will populate it later
var Expression = newClass();

var NumberExp = newClass(function init(x) {
   this.x = x;
}, Expression);
var VariableExp = newClass(function init(s) {
   this.symbol = s;
}, Expression);
var BinopExp = newClass(function init(op, e1, e2) {
   this.op = op; this.e1 = e1; this.e2 = e2;
}, Expression);
var FuncExp = newClass(function init(f, e) {
   this.f = f; this.e = e;
}, Expression);
var AssignExp = newClass(function init(s, e) {
   this.symbol = s; this.e = e;
}, Expression);
var SeqExp = newClass(function init() {
   this.expressions = Array.prototype.slice.call(arguments);
}, Expression);

// An example expression

var n1 = NumberExp.new(5);
var n2 = NumberExp.new(2);
var v1 = VariableExp.new("x");
var e1 = AssignExp.new("x", BinopExp.new("+", n1, n2));  // x = 5 + 2
var e2 = BinopExp.new("*", n2, v1)       // 2 * x
var e  = SeqExp.new(e1, e2);  // x = (5+2); (2*x)

// Set up visitor callbacks
NumberExp.prototype.accept = function accept(v) {
   return v.visitNumber(this);
};
VariableExp.prototype.accept = function accept(v) {
   return v.visitVariable(this);
};
BinopExp.prototype.accept = function accept(v) {
   return v.visitBinop(this);
};
FuncExp.prototype.accept = function accept(v) {
   return v.visitFunc(this);
};
AssignExp.prototype.accept = function accept(v) {
   return v.visitAssign(this);
};
SeqExp.prototype.accept = function accept(v) {
   return v.visitSeq(this);
};


var Visitor = newClass();
Visitor.prototype.visit = function(node) {
   return node.accept(this);
};

// A concrete visitor
var ConcreteVisitor = newClass(function init() {
   // Initialize visitor state
}, Visitor);

// One method for each expression type
mixin(ConcreteVisitor.prototype, {
   visitNumber: function(o) { },
   visitVariable: function(o) { },
   visitBinop: function(o) { },
   visitFunc: function(o) { },
   visitAssign: function(o) { },
   visitSeq: function(o) { }
});



// Helper structure for lookups
var Table = newClass(function init(name) {
   this.symbols = [];
   this.name = name;
});
Table.prototype.add = function addOp(op, f) {
   this.symbols[op] = f;
   return this;
};
Table.prototype.get = function getOp(op) {
   if (this.symbols.hasOwnProperty(op)) {
      return this.symbols[op];
   }
   throw new Error("Unknown " + this.name + ": " + op);
}

var Binops = Table.new("operator")
      .add("+", function(x, y) { return x + y; })
      .add("*", function(x, y) { return x * y; })
      .add("/", function(x, y) { return x / y; })
      .add("-", function(x, y) { return x - y; });

var Funcs = Table.new("function")
      .add("exp", Math.exp)
      .add("ln" , Math.log)
      .add("sin", Math.sin)
      .add("cos", Math.cos)
      .add("tan", Math.tan);

var Visitor = newClass();
Visitor.prototype.visit = function(node) {
   return node.accept(this);
};

// A visitor that "evaluates" expressions
var EvalVisitor = newClass(function init() {
   // Memory object to hold assignments
   this.memory = {};
}, Visitor);

mixin(EvalVisitor.prototype, {
   visitNumber: function(o) { return o.x; },
   visitVariable: function(o) {
      if (this.memory.hasOwnProperty(o.symbol)) {
         return this.memory[o.symbol];
      }
      throw new Error("Looking up nonexisting value");
   },
   // Later on: Rethink this method
   visitBinop: function(o) {
      var v1 = this.visit(o.e1);
      var v2 = this.visit(o.e2);
      return Binops.get(o.op)(v1, v2);
   },
   visitFunc: function(o) {
      var v = this.visit(o.e);
      return Funcs.get(o.f)(v);
   },
   visitAssign: function(o) {
      var v = this.visit(o.e);
      this.memory[o.symbol] = v;
      return v;
   },
   visitSeq: function(o) {
      var v, i;
      for (i = 0; i < o.expressions.length; i += 1) {
         v = this.visit(o.expressions[i]);
      }
      return v;
   }
});

var myEval = EvalVisitor.new()
e.accept(myEval);



// A visitor that "prints" expressions. Returns a string
var PrintVisitor = newClass(function init() {}, Visitor);

mixin(PrintVisitor.prototype, {
   visitNumber: function(o) { return o.x.toString(); },
   visitVariable: function(o) { return o.symbol; },
   visitBinop: function(o) {
      var x = this.visit(o.e1);
      var y = this.visit(o.e2);
      return "(" + x + o.op + y + ")";
   },
   visitFunc: function(o) {
      return o.f + "(" + this.visit(o.e) + ")";
   },
   visitAssign: function(o) {
      return o.symbol + " = " + this.visit(o.e);
   },
   visitSeq: function(o) {
      var that = this;
      return o.expressions.map(function(e) { return that.visit(e); })
              .join("\n");
   }
});

PrintVisitor.new().visit(e);


// Visitor that determines if variables are defined before used
// A visitor that "prints" expressions. Returns a string
var CheckVisitor = newClass(function init() {
   this.definedVars = {};
   this.usedBeforeDeclared = [];
}, Visitor);

mixin(CheckVisitor.prototype, {
   visitNumber: function(o) {},
   visitVariable: function(o) {
      if (!this.definedVars[o.symbol]) {
         this.usedBeforeDeclared.push(o.symbol);
      }
   },
   visitBinop: function(o) {
      o.e1.accept(this);
      o.e2.accept(this);
   },
   visitFunc: function(o) { o.e.accept(this); },
   visitAssign: function(o) {
      o.e.accept(this); // Must happen first
      this.definedVars[o.symbol] = true;
   },
   visitSeq: function(o) {
      var that = this;
      o.expressions.forEach(function(e) {
         return that.visit(e);
      });
   }
});

var e3  = SeqExp.new(e1, e2, VariableExp.new("y"));
var checker = CheckVisitor.new();
checker.visit(e3);
checker;

