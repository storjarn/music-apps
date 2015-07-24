/* jshint newcap: false */
;(function (root, factory) {
    'use strict';

    /* istanbul ignore next */
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['../../bower/ee-class/dist/Namespace.min'], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory(require('../../bower/ee-class/dist/Namespace.min'));
    } else {
        // Browser globals (root is window)
        root.MIDI = factory(root.Namespace);
    }
}(this, function (Namespace) {
    // 'use strict';

    /**
        @global
     */
    MIDI = new Namespace('MIDI', null, {
        context: null,
        inputs: [],
        outputs: [],
        Utility: {
            stateNameGenerator: function(valName) {
                return 'is' + valName.slice(0, 1).toUpperCase() + valName.slice(1);
            },
            stateValueGenerator: function(state, valName, callback) {
                callback = callback || function() {};
                return function() {
                    if (arguments.length) {
                        state[valName] = !!arguments[0];
                    } else {
                        state[valName] = true;
                    }
                    callback();
                    return state[valName];
                };
            },
            stateValueGetter: function(state, valName) {
                return function() {
                    return state[valName];
                };
            },
            stateValueSetter: function(state, valName) {
                return function(value) {
                    state[valName] = value;
                };
            },
            getHighNibble: function(value) {
                return value & 0xF0;
            },
            getLowNibble: function(value) {
                return value & 0xF0 >> 4;
            },
            frequencyFromNoteNumber : function( note ) {
                return 440 * Math.pow(2,(note-69)/12);
            },
            tempoToPulseInterval: function(tempo) {
                return 1000 / (tempo / 60) / 24;
            },
            pulseIntervalToTempo: function(interval, ppq) {
                return 60000 / (interval * (ppq || 24));
            },
            getChannel: function(message) {
                if (message[0] < MIDI.Constants.System) {
                    return MIDI.Utility.getLowNibble(message[0]) + 1;
                }
                return -1;
            },
            getEventName: function(message) {
                var msgType = '';
                if (message[0] < MIDI.Constants.System) {
                    msgType = MIDI.Constants.Event[message[0].toString()];
                } else {
                    msgType = MIDI.Constants.Event[MIDI.Utility.getHighNibble(message[0]).toString()];
                }
                if (msgType === 'NoteOn' && message[2] === 0) {
                    msgType = 'NoteOff';
                } else if (msgType === 'ControlChange') {
                    msgType = MIDI.Constants.Controller[message[1]].PropertyName;
                }
                return msgType;
            },
            getCurrentSeconds: function() {
                if (typeof window !== 'undefined' && window.performance) {
                    return performance.now() / 1000;
                }
                return new Date().getTime() / 1000;
            },
            next: function(process) {
                return setImmediate(process);
            },
            whenever: function(process) {
                return setTimeout(process, 1);
            }
        },
        initialize: function(success, errorHandler){
            errorHandler = errorHandler || function(err){ console.error(err); };
            if (typeof navigator !== 'undefined') {
                if (navigator.requestMIDIAccess) {
                    navigator.requestMIDIAccess().then(function(midi) {
                        MIDI.context = midi;

                        function getMIDIInputs() {
                            var inputs = MIDI.context.inputs.values();
                            for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
                                // input.value.onmidimessage = MIDIMessageEventHandler;
                                MIDI.inputs.push(input.value);
                            }
                        }

                        function getMIDIOutputs() {
                            var outputs = MIDI.context.outputs.values();
                            for (var output = outputs.next(); output && !output.done; output = outputs.next()) {
                                MIDI.outputs.push(output.value);
                            }
                        }

                        MIDI.context.onstatechange = function() {
                            getMIDIInputs();
                            getMIDIOutputs();
                        };

                        MIDI.context.onstatechange();
                        success();

                    }, errorHandler);
                }
            }
        }
    });

    return MIDI;

}));

