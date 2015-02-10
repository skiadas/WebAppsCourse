// Module for events
//
// To use it for "global events", use Event.on/off/trigger
//
// To attach this functionality to the objects of a class, mix
// it into the prototype:
//
//     Event.mixin(Cls.prototype);

var Event = (function() {
    "use strict";

    var Event;

    Event = {};

    // If necessary creates then returns the obj's events array
    // corresponding to topic
    function getEvents(obj, topic) {
        if (!obj._events) {
            Object.defineProperty(obj, "_events", { value: {} });
        }
        if (!obj._events[topic]) {
            obj._events[topic] = [];
        }
        return obj._events[topic];
    }

    Event.mixin = function mixin(obj) {
        obj.on = Event.on;
        obj.off = Event.off;
        obj.trigger = Event.trigger;
    };

    Event.on = function on(topic, handler, context) {
        context = context || null;
        getEvents(this, topic).push( {
            handler: handler,
            context: context
        });
        return this;
    };

    Event.off = function off(topic, handler, context) {
        var handlers, i;
        handlers = getEvents(this, topic);
        context = context || null;
        for (i = 0; i < handlers.length; i += 1) {
            if (handlers[i].handler === handler &&
                handlers[i].context === context) {
                handlers.splice(i, 1);
                i -= 1;
            }
        }
        return this;
    };

    Event.trigger = function trigger(topic) {
        var args = Array.prototype.slice.call(arguments, 1);
        getEvents(this, topic).forEach(function(o) {
            o.handler.apply(o.context, args);
        });
        return this;
    };

    return Event;
}());

try { module.export = Event; } catch (err) {}
