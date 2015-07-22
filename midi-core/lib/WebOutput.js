(function() {
    var WebOutput = new Class({
        init: function(webMIDIOutput) {
            var output = this;
            if (webMIDIOutput) {
                output.connect(webMIDIOutput);
            }
        },
        connect: function(webMIDIOutput) {
            var _output = this.Port = webMIDIOutput;
        },
        disconnect : function() {
            this.Port = null;
        },
        send: function() {
            if (this.Port instanceof MIDIOutput) {
                this.Port.send.apply(this.Port, arguments);
            }
        },
        clear: function() {
            if (this.Port instanceof MIDIOutput) {
                this.Port.clear.call(this.Port);
            }
        }
    });

    MIDI.addClass(WebOutput);
})();
