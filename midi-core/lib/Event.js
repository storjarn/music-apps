(function() {
    var Event = new Class({
        inherits: Array,
        init: function(data) {
            var event = this;
            this.data = data || [0,0,0];
            Class.define(event, 'FirstByte', {
                get: function() {
                    return this.data[0];
                }
            });
            Class.define(event, 'SecondByte', {
                get: function() {
                    return this.data[1];
                }
            });
            Class.define(event, 'ThirdByte', {
                get: function() {
                    return this.data[2];
                }
            });
        }
    });

    MIDI.addClass(Event);
})();
