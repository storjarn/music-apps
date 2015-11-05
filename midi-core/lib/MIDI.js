(function() {
    var check = {
        isAMD: typeof define === 'function' && define.amd,
        isNode: typeof exports === 'object',
        isBrowser: typeof navigator !== 'undefined'
    };

    /* jshint newcap: false */
    ;(function (root, factory) {
        'use strict';

        /* istanbul ignore next */
        if (check.isAMD) {
            // AMD. Register as an anonymous module.
            define([
                '../../bower/ee-class/dist/Class.min',
                '../../bower/ee-class/dist/EventEmitter.min',
                '../../bower/ee-class/dist/Namespace.min'
            ], factory);
        } else if (check.isNode) {
            // Node. Does not work with strict CommonJS, but
            // only CommonJS-like environments that support module.exports,
            // like Node.
            module.exports = factory(
                require('../../bower/ee-class/dist/Class.min'),
                require('../../bower/ee-class/dist/EventEmitter.min'),
                require('../../bower/ee-class/dist/Namespace.min')
            );
        } else {
            // Browser globals (root is window)
            root.MIDI = factory(root.Class, root.EventEmitter, root.Namespace);
        }
    }(this, function (Class, EventEmitter, Namespace) {
        // 'use strict';
        /**
            @global
         */
        MIDI = new Namespace('MIDI', null, {
            NON_VALUE: -1,
            FIRST_BYTE: 0,
            SECOND_BYTE: 1,
            THIRD_BYTE: 2,
            MIDDLE_A_FREQ: 440,
            MIDDLE_A_NOTENUMBER: 69,
            PPQ: 24,
            DIATONIC_BASE: 12,
            MS_PER_SECOND: 1000,
            SECONDS_PER_MINUTE: 60,
            MS_PER_MINUTE: 60000,

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
                    return MIDI.MIDDLE_A_FREQ * Math.pow(2, (note - MIDI.MIDDLE_A_NOTENUMBER) / MIDI.DIATONIC_BASE);
                },
                beatsPerSecond: function(tempo){
                    return tempo / MIDI.SECONDS_PER_MINUTE;
                },
                tempoToPulseInterval: function(tempo, pulseRate) {
                    return MIDI.MS_PER_SECOND / MIDI.Utility.beatsPerSecond(tempo) / (pulseRate || MIDI.PPQ);
                },
                pulseIntervalToTempo: function(interval /** in ms */, pulseRate) {
                    return MIDI.MS_PER_MINUTE / (interval * (pulseRate || MIDI.PPQ));
                },
                getChannel: function(message) {
                    if (message && message[MIDI.FIRST_BYTE] < MIDI.Messages.System) {
                        return MIDI.Utility.getLowNibble(message[MIDI.FIRST_BYTE]) + 1;
                    }
                    return MIDI.NON_VALUE;
                },
                getEventName: function(message) {
                    var msgType = '';
                    if (message[MIDI.FIRST_BYTE] < MIDI.Messages.System) {
                        msgType = MIDI.Messages.Event[message[MIDI.FIRST_BYTE].toString()];
                    } else {
                        msgType = MIDI.Messages.Event[MIDI.Utility.getHighNibble(message[MIDI.FIRST_BYTE]).toString()];
                    }
                    if (msgType === 'NoteOn' && message[MIDI.THIRD_BYTE] === 0) {
                        msgType = 'NoteOff';
                    } else if (msgType === 'ControlChange') {
                        msgType = MIDI.Messages.Controller[message[MIDI.SECOND_BYTE]].PropertyName;
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
            }
        });

        var Context = new Class({
            inherits: EventEmitter,
            init: function(contextModel) {
                var self = this;

                if (check.hasWebMIDI) {
                    contextModel.onstatechange = function() {
                        // getMIDIInputs();
                        // getMIDIOutputs();
                        self.emit('stateChange', self);
                    };
                } else if (check.isNode) {
                    contextModel.onstatechange = function() {};
                }

                Class.define(self, 'inputs', {
                    get: function getMIDIInputs() {
                        var ret = [];
                        if (check.hasWebMIDI) {
                            var inputs = contextModel.inputs.values();
                            for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
                                // input.value.onmidimessage = MIDIMessageEventHandler;
                                var wrapper = new WebInput(input.value);
                                ret.push(wrapper);

                                if (!ret.byName) {
                                    ret.byName = {};
                                }
                                ret.byName[input.value.name] = wrapper;

                                if (!ret.byId) {
                                    ret.byId = {};
                                }
                                ret.byId[input.value.id] = wrapper;
                            }
                        } else if (check.isNode) {
                            // Set up a new input.
                            var inputPorts = new contextModel.input();

                            // Count the available input ports.
                            var count = inputPorts.getPortCount();

                            for(var i = 0; i < count; ++i) {
                                (function(index) {
                                    ret.push({
                                        name: inputPorts.getPortName(index),
                                        open: function() {
                                            inputPorts.openPort(index);
                                        },
                                        close: function() {
                                            inputPorts.closePort(index);
                                        }
                                    });
                                })(i);
                            }

                            // Configure a callback.
                            inputPorts.on('message', function(deltaTime, message) {
                              // console.log('m:' + message + ' d:' + deltaTime);
                              var msgType = MIDI.Utility.getEventName(message);
                              var channel = MIDI.Utility.getChannel(message);
                              console.log(moment().format('HH:mm:ss:SSS'), input.getPortName(0), msgType, 'Ch'+channel, deltaTime, message);
                            });

                            // Open the first available input port.
                            inputPorts.openPort(0);
                        }
                        return ret;
                    }
                });

                Class.define(self, 'outputs', {
                    get: function getMIDIOutputs() {
                        var ret = [];
                        if (check.hasWebMIDI) {
                            var outputs = contextModel.outputs.values();
                            for (var output = outputs.next(); output && !output.done; output = outputs.next()) {
                                ret.push(output.value);

                                if (!ret.byName) {
                                    ret.byName = {};
                                }
                                ret.byName[output.value.name] = output.value;

                                if (!ret.byId) {
                                    ret.byId = {};
                                }
                                ret.byId[output.value.id] = output.value;
                            }
                        } else if (check.isNode) {
                        }
                    }
                });
            }
        });

        var Input = new Class({
            inherits: EventEmitter,
            init: function(MIDIInput) {
                if (MIDIInput) {
                    this.connect(MIDIInput);
                }
                this.updateDeltaTime();
            },

            getDeltaTime: MIDI.Utility.getCurrentSeconds,

            updateDeltaTime: function() {
                this.LastDeltaTime = this.getDeltaTime();
            },

            onMidiMessage: function(event) {
                event.delta = this.getDeltaTime() - this.LastDeltaTime;
                this.updateDeltaTime();
                if (this.__callOldHandler) {
                    this.__callOldHandler.call(this, event);
                }
                this.emit('message', event.delta, event);
            },
            connect: function(midiPort) {
                throw new Error("This method must be overridden!");
            },
            disconnect : function() {
                throw new Error("This method must be overridden!");
            },
            open: function() {
                throw new Error("This method must be overridden!");
            },
            close : function() {
                this.off();
                this.opened = false;
                this.emit('close', this);
            }
        });

        var WebInput = new Class({
            inherits: Input,
            init: function constructor(webMIDIInput) {
                constructor.super.call(this, webMIDIInput);
            },

            __callOldHandler: function(event) {
                if (this.Port && this.Port.onmidimessage && this.Port.onmidimessage.__OldHandler) {
                    this.Port.onmidimessage.__OldHandler.call(_input, event);
                }
            },
            connect: function(webMIDIInput) {
                var input = this;
                this.emit('beforeConnect', this);
                if (webMIDIInput instanceof MIDIInput) {
                    if (this.Port) {
                        this.disconnect();
                    }
                    var _input = this.Port = webMIDIInput;

                    this.updateDeltaTime();

                    this.emit('connect', this);
                }
            },
            disconnect: function() {
                this.emit('beforeDisconnect', this);
                if (this.Port instanceof MIDIInput) {
                    if (this.Port.onmidimessage) {
                        this.Port.onmidimessage = this.Port.onmidimessage.__OldHandler;
                        if (this.Port.onmidimessage && this.Port.onmidimessage.__OldHandler) {
                            delete this.Port.onmidimessage.__OldHandler;
                        }
                    }
                    this.Port = null;
                    this.emit('disconnect', this);
                }
                this.close();
            },
            open: function() {
                var input = this;
                this.emit('beforeOpen', this);

                if (!this.opened && this.Port instanceof MIDIInput) {
                    var _input = this.Port;

                    this.updateDeltaTime();

                    var oldHandler = _input.onmidimessage;
                    _input.onmidimessage = function(event) {
                        input.onMidiMessage.call(input, event);
                    };
                    _input.onmidimessage.__OldHandler = oldHandler;
                    this.opened = true;
                    this.emit('open', this);
                }
            }
        });

        MIDI.Input.WebInput = WebInput;

        MIDI.initialize =function(config){
            check.hasWebMIDI = check.isBrowser && !!navigator.requestMIDIAccess;
            var success = config.success || function() {},
                errorHandler = config.error || function(err){ console.error(err); };
            var hasContext = false;

            if (check.isBrowser) {
                if (check.hasWebMIDI) {
                    navigator.requestMIDIAccess().then(function(midi) {
                        MIDI.context = new Context(midi);
                        hasContext = true;

                        function getMIDIOutputs() {

                        }

                        MIDI.context.onstatechange = function() {
                            getMIDIInputs();
                            getMIDIOutputs();
                        };

                        MIDI.context.onstatechange();


                    }, errorHandler);
                } else {

                }
            } else if (check.isNode) {
                var midi = require('midi');
                MIDI.context = new Context(midi);
                hasContext = true;
            }

            if (hasContext) {
                delete MIDI.initialize;
                success();
            }
        };

        return MIDI;

    }));

})();

