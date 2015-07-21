(function() {
    MIDI.addClass('Track', new Class({
        inherits: Array,
        init: function constructor() {
            var self = this;

            var _state = {
                isPlaying: false,
                isRecording: false,
                isMuted: false,
                isLooped: false,

                offset: 0,

                cursor: -1,
                startPoint: -1,
                endPoint: -1
            };

            [{
                propName: 'play',
                stateName: 'isPlaying'
            }, {
                propName: 'record',
                stateName: 'isRecording'
            }, {
                propName: 'mute',
                stateName: 'isMuted'
            }, {
                propName: 'loop',
                stateName: 'isLooped'
            }].forEach(function(config) {
                Class.define(self, config.propName, {
                    get: MIDI.Utility.stateValueGetter(_state, config.stateName),
                    set: MIDI.Utility.stateValueSetter(_state, config.stateName)
                });
                Class.define(self, config.stateName, {
                    get: MIDI.Utility.stateValueGetter(_state, config.stateName),
                    enumerable: true
                });
            });

            Class.define(self, 'Cursor', {
                get: MIDI.Utility.stateValueGetter(_state, 'cursor'),
                enumerable: true
            });

            Class.define(self, 'StartPoint', {
                get: MIDI.Utility.stateValueGetter(_state, 'startPoint'),
                enumerable: true
            });

            Class.define(self, 'EndPoint', {
                get: MIDI.Utility.stateValueGetter(_state, 'endPoint'),
                enumerable: true
            });
        },

        push: Class(function push() {
            push.super.apply(this, arguments);
        })
    }));
})();
