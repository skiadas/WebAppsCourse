// Extremely barebones implementation of promises

var Promise = (function() {

   var Promise, proto;
   var PENDING = 0, FULFILLED = 1, REJECTED = 2;

   Promise = {};
   proto = {};

   // executor is a function of two arguments "resolve" and "reject",
   // which it is meant to call in order to resolve the promise.
   // So executor = function(resolve, reject)
   // Where resolve and reject are functions of value/reason respectively
   Promise.new = function newPromise(executor) {
      var o = Object.create(proto);
      // "pending" / "fulfilled" / "rejected"
      Object.defineProperty(o, "status", { value: PENDING });
      Object.defineProperty(o, "resolvedHandlers", {
         writable: false,
         value: []
      });
      Object.defineProperty(o, "rejectedHandlers", {
         writable: false,
         value: []
      });
      function resolve(v) { handleResolve(o, v); }
      function reject(r) {  handleReject(o, r); }
      setTimeout(function() { executor(resolve, reject); }, 0);
      return o;
   };
   Promise.prototype = proto;

   function handleResolve(o, v) {
      if (o.status === PENDING) {
         o.status = FULFILLED;
         ... TODO
      }
   }

   function handleReject(o, v) {
      if (o.status === PENDING) {
         o.status = REJECTED;
         ... TODO
      }
   }

   return Promise;
}());
