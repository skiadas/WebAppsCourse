// Module for events
//
// To use it for "global events", use Event.on/off/trigger
//
// To attach this functionality to the objects of a class, mix
// it into the prototype:
//
//     Event.mixin(Cls.prototype);

// Immediate function invocation to create a scope to work with.
var Event = (function() {
    "use strict";

    var Event;

    /*
     * The main Event module. It is returned and therefore exported as the Event variable.
     */
    Event = {};

    /*
     * Mixes the Event functionality into an existing class, so objects of that class
     * can be observed. You must pass to this function the prototype of the class that
     * you want to have this added to. It will then add
     * the three methods on/off/trigger to this prototype.
     */
    Event.mixin = function mixin(prototype) {
        prototype.on = Event.on;
        prototype.off = Event.off;
        prototype.trigger = Event.trigger;
    };

    /*
     * Registers for the `handler` to be called when an event on the given `topic`
     * occurs. The handler will be called with `context` as its `this`.
     *
     * Note: It will allow for the same handler/context pair to register more than once.
     */
    Event.on = function on(topic, handler, context) {
        // Make sure there is some context, even if it is just null
        if (typeof context === 'undefined') {
            context = null;
        }
        // Add  the handler/context pair to the list of event handlers
        getTopicEvents(this, topic)
            .push({
                handler: handler,
                context: context
            });

        return this;
    };

    /*
     * Remove the given `handler`/`context` pair from the list of observers
     * for the given `topic`.
     */
    Event.off = function off(topic, handler, context) {
        var handlers, i;

        // Make sure there is some context, even if it is just null
        if (typeof context === 'undefined') {
            context = null;
        }

        // Find the object matching the given handler/context, then remove it
        // from the handlers array.
        handlers = getTopicEvents(this, topic);
        for (i = 0; i < handlers.length; i += 1) {
            if (handlers[i].handler === handler &&
                handlers[i].context === context) {
                handlers.splice(i, 1);
                i -= 1;
            }
        }
        return this;
    };

    /*
     * Trigger the event for the given topic.
     * All parameters after the topic will be passed to the handlers.
     */
    Event.trigger = function trigger(topic) {
        var args;

        // Read the remaining parameters.
        args = Array.prototype.slice.call(arguments, 1);
        getTopicEvents(this, topic)
            .forEach(function(observer) {
                callObserver(observer.handler, observer.context, args);
            });

        return this;
    };

    ////////////////////////////////////////////
    //           HELPER METHODS
    ////////////////////////////////////////////

    /*
     * Sets up a call to the specified observer
     */
    function callObserver(handler, context, args) {
        setTimeout(function() {
            handler.apply(context, args);
        }, 1);
    }

    // Helper method to get the events list. If necessary it creates then returns
    // the obj's events array corresponding to topic. It will store these in a
    // hidden variable called `_events`.
    function getTopicEvents(obj, topic) {
        if (!obj._events) {
            // Properties defined via defineProperty are not enumerable.
            Object.defineProperty(obj, "_events", { value: {} });
        }
        // Create the array for this topic's events, if it does not exist yet.
        if (!obj._events[topic]) {
            obj._events[topic] = [];
        }
        return obj._events[topic];
    }

    return Event;
}());

// If used in Node, also export it as a module.
try { module.export = Event; } catch (err) {}
