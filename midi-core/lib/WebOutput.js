(function() {
    var WebOutput = new Class({
        init: function(webMIDIOutput) {
            var output = this;
            if (webMIDIOutput) {
                output.connect(webMIDIOutput);
            }
        },
        connect: function(webMIDIOutput) {
            var output = this;
            var _output = output.Port = webMIDIOutput;
        },
        disconnect : function() {
            this.Port = null;
        },
        send: function() {
            this.Port.send.apply(this.Port, arguments);
        },
        clear: function() {
            this.Port.clear.call(this.Port);
        }
    });

    MIDI.addClass(WebOutput);
})();
