(function() {
    var Event = new Class({
        inherits: Array,
        init: function(data) {
            var event = this;
            for(var i = 0; i < data.length; ++i) {
                event.push(data[i]);
            }
            Class.define(event, 'FirstByte', {
                get: function() {
                    return this[0];
                }
            });
            Class.define(event, 'SecondByte', {
                get: function() {
                    return this[1];
                }
            });
            Class.define(event, 'ThirdByte', {
                get: function() {
                    return this[2];
                }
            });
        }
    });

    MIDI.addClass(Event);
})();
