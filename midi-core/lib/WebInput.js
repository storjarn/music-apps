(function() {
    var WebInput = new Class({
        inherits: EventEmitter,
        init: function(webMIDIInput) {
            var input = this;
            if (webMIDIInput) {
                input.connect(webMIDIInput);
            }
        },
        connect: function(webMIDIInput) {
            var input = this;
            var _input = input.Port = webMIDIInput;

            function getDeltaTime() {
                return performance.now() / 1000;
            }

            var lastDeltaTime = getDeltaTime();

            var oldHandler = _input.onmidimessage;
            _input.onmidimessage = function(event) {
                if (oldHandler) {
                    oldHandler.call(_input, event);
                }
                input.emit('message', getDeltaTime() - lastDeltaTime, event);
            };
            _input.onmidimessage.oldHandler = oldHandler;
        },
        disconnect : function() {
            this.Port.onmidimessage = this.Port.onmidimessage.oldHandler;
            this.Port = null;
            this.off();
        }
    });

    MIDI.addClass(WebInput);
})();
