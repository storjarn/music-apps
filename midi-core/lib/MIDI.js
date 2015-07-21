
(function() {

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
            }
        },
        initialize: function(success, errorHandler){
            errorHandler = errorHandler || function(err){ console.error(err); };
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
    });

})();
