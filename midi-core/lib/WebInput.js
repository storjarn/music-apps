(function() {
    var WebInput = new Class({
        inherits: EventEmitter,
        init: function(webMIDIInput) {
            if (webMIDIInput) {
                this.connect(webMIDIInput);
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
            if (this.__OldHandler) {
                this.__OldHandler.call(_input, event);
            }
            this.emit('message', event.delta, event);
        },
        connect: function(webMIDIInput) {
            if (webMIDIInput instanceof MIDIInput) {
                if (this.Port) {
                    this.disconnect();
                }
                var _input = this.Port = webMIDIInput;

                this.updateDeltaTime();

                var oldHandler = _input.onmidimessage;
                _input.onmidimessage = function(event) {
                    input.onMidiMessage.call(input, event);
                };
                _input.onmidimessage.__OldHandler = oldHandler;
            }
        },
        disconnect : function() {
            if (this.Port instanceof MIDIInput) {
                if (this.Port.onmidimessage) {
                    this.Port.onmidimessage = this.Port.onmidimessage.__OldHandler;
                    if (this.Port.onmidimessage && this.Port.onmidimessage.__OldHandler) {
                        delete this.Port.onmidimessage.__OldHandler;
                    }
                }
                this.Port = null;
            }
            this.off();
        }
    });

    MIDI.addClass(WebInput);
})();
