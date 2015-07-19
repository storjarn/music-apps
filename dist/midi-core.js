/*! ee-class 2015-01-16 */
!function(a,b){"use strict";"function"==typeof define&&define.amd?define([],b):"object"==typeof exports?module.exports=b():a.Class=b()}(this,function(){"use strict";var a,b;a=function(a,c,d){c["super"]=function(){if(c.___super)return c.___super.apply(this,Array.prototype.slice.call(arguments));throw new Error("The method «"+a+"» has no super «"+a+"» method on any protoype!")},d&&d.prototype&&b(a,c,d.prototype)},b=function(a,c,d){d&&(Object.hasOwnProperty.call(d,a)?Object.defineProperty(c,"___super",{value:d[a]}):d.___isEeClass||"init"!==a||"object"!=typeof d||"function"!=typeof d.constructor?b(a,c,"object"==typeof d?Object.getPrototypeOf(d):null):Object.defineProperty(c,"___super",{value:d.constructor}))};var c=function(b){var d={},e;return this instanceof c?(b.inherits&&b.inherits.___properties&&(d=b.inherits.___properties),Object.keys(b).forEach(function(c){var e=b[c];"inherits"!==c&&("function"==typeof e?(d[c]={value:e,enumerable:"_"!==c[0]},a(c,e,b.inherits)):"object"==typeof e&&"[object Object]"===Object.prototype.toString.call(e)?Object.hasOwnProperty.call(e,"get")||Object.hasOwnProperty.call(e,"value")||Object.hasOwnProperty.call(e,"set")?Object.keys(e).some(function(a){return-1===["get","set","value","enumerable","writable","configurable"].indexOf(a)})?d[c]=d[c]={value:e,enumerable:!0,writable:!0}:(d[c]=e,"function"==typeof e.value&&a(c,e.value,b.inherits)):d[c]=d[c]={value:e,enumerable:!0,writable:!0}:d[c]={value:e,enumerable:!0,writable:!0})}),e=function(){var a;if(!this)throw new Error("the class constructor was called without the «new» keyword!");if(b.isAbstract)throw new Error("Can't instantiate abstract class!");return this.init?a=this.init.apply(this,Array.prototype.slice.call(arguments)):"function"==typeof b.inherits&&b.inherits.apply(this,Array.prototype.slice.call(arguments)),"undefined"!=typeof a?a:void 0},e.prototype=Object.create(b.inherits?b.inherits.prototype?b.inherits.prototype:b.inherits:{},d),Object.defineProperty(e.prototype,"___isEeClass",{value:!0}),e):Object.create(c,{value:{value:b,enumerable:!0}})};return c.Enumerable=function(){return Object.defineProperty(this,"enumerable",{value:!0,enumerable:!0}),this},c.Configurable=function(){return Object.defineProperty(this,"configurable",{value:!0,enumerable:!0}),this},c.Writable=function(){return Object.defineProperty(this,"writable",{value:!0,enumerable:!0}),this},c.proto=function(a){return"object"==typeof a?Object.getPrototypeOf(a):void 0},c.keys=function(a){var b=[];for(var c in a)b.push(c);return b},c.define=function(a,b,c){Object.defineProperty(a,b,c)},c.implement=function(a,b){return c.keys(a).forEach(function(c){b[c]=a[c]}),b},c.inspect=function(a,b){return b=b||{},("object"==typeof a||"function"==typeof a)&&(Object.getOwnPropertyNames(a).sort().forEach(function(c){"function"==typeof a[c]?b[c]=function(){}:"___isEeClass"!==c&&(b[c]=a[c])}),Object.getPrototypeOf(a)&&(b["super"]={},c.inspect(Object.getPrototypeOf(a),b["super"]))),b},c});
//# sourceMappingURL=Class.min.js.map
/*! ee-class 2015-01-16 */
!function(a,b){"use strict";"function"==typeof define&&define.amd?define(["../dist/Class.min"],b):"object"==typeof exports?module.exports=b(require("../dist/Class.min")):a.Collection=b(a.Class)}(this,function(a){"use strict";var b=new a({inherits:Array,init:function(a){function b(a){d.push(a)}function c(a){for(var c=0;c<a.length;++c)b(a[c])}var d=this,e={}.toString;if(a=a||[],"[object Array]"===e.call(a))c(a);else if("function"==typeof a)c(a(d));else if("object"==typeof a)for(var f in a)b(a[f])}});return b});
//# sourceMappingURL=Collection.min.js.map
/*! ee-class 2015-01-16 */
!function(a,b){"use strict";"function"==typeof define&&define.amd?define(["../dist/Class.min"],b):"object"==typeof exports?module.exports=b(require("../dist/Class.min")):a.EventEmitter=b(a.Class)}(this,function(a){"use strict";var b=console.log,c=new a({___events:{get:function(){return Object.hasOwnProperty.call(this,"____events")||a.define(this,"____events",a({}).Writable()),this.____events}},emit:function(a,c){var d=arguments,e,f,g;if(this.___events[a])for(f=this.___events[a].length;f--;){if(g=this.___events[a][f],"function"!=typeof g.listener)throw this.___events[a].splice(f,1),new Error("cannot emit event «"+a+"», listener is typeof «"+typeof g.listener+"»");g.listener.apply(null,Array.prototype.slice.call(d,1)),g.once&&this.___events[a].splice(f,1)}else"error"===a&&(e=Array.prototype.slice.call(d,1).filter(function(a){return a instanceof Error}),b.error("Cannot emit error event without listeners!"),b.trace(e[0]));return this},listener:function(a){return this.___events&&this.___events[a]?this.___events[a]:[]},off:function(a,b){var c;if(a)if(b&&this.___events[a])for(c=this.___events[a].length;c--;)this.___events[a][c].listener===b&&this.___events[a].splice(c,1);else this.___events[a]&&delete this.___events[a];else this.____events={};return this.emit("removeListener",a,b),this},once:function(a,b){return this.on(a,b,!0)},on:function(a,b,c){var d,e;if("object"==typeof a)for(d=Object.keys(a),e=d.length;e--;)this.addListener(d[e],a[d[e]],c);else this.addListener(a,b,c);return this},addListener:function(a,b,c){this.___events[a]||(this.___events[a]=[]),this.emit("listener",a,b,c===!0),this.___events[a].push({listener:b,once:!!c})}});return c});
//# sourceMappingURL=EventEmitter.min.js.map
/*! ee-class 2015-01-16 */
!function(a,b){"use strict";"function"==typeof define&&define.amd?define(["../dist/Class.min"],b):"object"==typeof exports?module.exports=b(require("../dist/Class.min")):a.Namespace=b(a.Class)}(this,function(a){"use strict";var b=new a({init:function(e,f,g){var h=this;return g=g||{},a.define(h,"Name",a(e)),a.define(h,"TypeName",a("Namespace")),a.define(h,"Type",a(b)),Object.keys(g).forEach(function(b){a.define(h,b,a(g[b]).Enumerable().Writable())}),a.define(h,"addClass",a(function(a,b){if(1==arguments.length&&(b=a,a=b.TypeName),!a)throw new Error("Adding a class to a namespace requires a class name");if(h[a])throw new Error("This class ('"+a+"') already exists in this namespace ('"+h.getFullyQualifiedName()+"')");return c(h,a,b),b})),a.define(h,"addNamespace",a(function(b){if(d(b),h[b.Name])throw new Error("The indicated namespace '"+b.Name+"' already exists in this namespace: '"+h.getFullyQualifiedName()+"'");return a.define(h,b.Name,a(b).Enumerable()),a.define(b,"ParentNamespace",a(h).Enumerable()),b})),a.define(h,"getFullyQualifiedName",a(function(){return(h.ParentNamespace?h.ParentNamespace.getFullyQualifiedName()+".":"")+e})),f&&(a.define(h,"ParentNamespace",a(f).Enumerable()),a.define(f,h.Name,a(h).Enumerable())),h}}),c=function(b,c,f){if(d(b),!c)throw new Error("You need to provide a class name as the second argument");return e(f),a.define(f,"ParentNamespace",a(b).Enumerable()),a.define(b,c,a(f).Enumerable()),f.hasOwnProperty("getFullyQualifiedName")||a.define(f,"getFullyQualifiedName",a(function(){return b.getFullyQualifiedName()+"."+c})),f.hasOwnProperty("TypeName")&&f.prototype.hasOwnProperty("Type")||(a.define(f,"TypeName",a(c)),a.define(f.prototype,"Type",a(f))),f},d=function(a,c){if(!(a&&a instanceof b))throw new Error(c||"You need to provide a valid namespace.")},e=function(a,b){if(!(a&&a instanceof Object))throw new Error(b||"You need to provide a valid class. ")};return b});
//# sourceMappingURL=Namespace.min.js.map
/*! ee-class 2015-01-16 */
!function(a,b){"use strict";"function"==typeof define&&define.amd?define(["../dist/Class.min"],b):"object"==typeof exports?module.exports=b(require("../dist/Class.min")):a.ReferenceObject=b(a.Class)}(this,function(a){"use strict";var b=new a({init:function(a,b){for(var c in b)this[c]=b[c];this.Name=a},toData:function(){var a={};for(var b in this)this.hasOwnProperty(b)&&(a[b]=this[b]);return a},valueOf:function(){return this.toData()},toJSON:function(){return this.toData()}});return b});
//# sourceMappingURL=ReferenceObject.min.js.map



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

(function() {

    function _setup() {
        var _constants = {
            NoteOff: 0x80,
            NoteOn: 0x90,
            PolyphonicAftertouch: 0xA0,
            ControlChange: 0xB0,
            ProgramChange: 0xC0,
            ChannelAftertouch: 0xD0,
            PitchBendChange: 0xE0,
            System: 0xF0,
            //System
            ExclusiveStart: 0xF0,
            MIDITimeCodeQtrFrame: 0xF1,
            SongPositionPointer: 0xF2,
            SongSelect: 0xF3,
            TuneRequest: 0xF6,
            ExclusiveEnd: 0xF7,
            TimingClock: 0xF8,
            Start: 0xFA,
            Continue: 0xFB,
            Stop: 0xFC,
            ActiveSensing: 0xFE,
            Reset: 0xFF,

            FileHeader: 'MThd',
            TrackHeader: 'MTrk'
        };

        var i = 0;
        var _controllerMeta = {};
        var _events = {};

        for(var key in _constants) {
            if (!isNaN(parseFloat(_constants[key])) && isFinite(_constants[key])) {
                _events[_constants[key].toString()] = key;
            }
        }

        for (i = 0; i < 16; ++i) {
            _constants['Channel' + (i + 1)] = i;
        }

        for (i = 0; i < ccs.length; ++i) {
            _constants[ccs[i].PropertyName] = i;
            ccs[i] = new Namespace(ccs[i].PropertyName, null, ccs[i]);
        }

        _constants.ControllerMeta = ccs;

        var Constants = new Namespace('Constants', MIDI, _constants);
        var Events = new Namespace('Events', Constants, _events);

    }

    var ccs = [{
        "ControlNumber": 0,
        "PropertyName": "BankSelect",
        "Binary": "00000000",
        "Hex": "0x00",
        "Label": "Bank Select",
        "Description": "0-127"
    }, {
        "ControlNumber": 1,
        "PropertyName": "ModWheel",
        "Binary": "0000001",
        "Hex": "0x01",
        "Label": "Mod Wheel",
        "Description": "Modulation Wheel or Lever 0-127"
    }, {
        "ControlNumber": 2,
        "PropertyName": "Breath",
        "Binary": "00000010",
        "Hex": "0x02",
        "Label": "Breath Controller",
        "Description": "0-127"
    }, {
        "ControlNumber": 3,
        "PropertyName": "Controller3",
        "Binary": "00000011",
        "Hex": "0x03",
        "Label": "Undefined",
        "Description": "0-127"
    }, {
        "ControlNumber": 4,
        "PropertyName": "Foot",
        "Binary": "00000100",
        "Hex": "0x04",
        "Label": "Foot Controller",
        "Description": "0-127"
    }, {
        "ControlNumber": 5,
        "PropertyName": "PortamentoTime",
        "Binary": "00000101",
        "Hex": "0x05",
        "Label": "Portamento Time",
        "Description": "0-127"
    }, {
        "ControlNumber": 6,
        "PropertyName": "DataEntryMSB",
        "Binary": "00000110",
        "Hex": "0x06",
        "Label": "Data Entry MSB",
        "Description": "0-127"
    }, {
        "ControlNumber": 7,
        "PropertyName": "Volume",
        "Binary": "00000111",
        "Hex": "0x07",
        "Label": "Channel Volume (formerly Main Volume)",
        "Description": "0-127"
    }, {
        "ControlNumber": 8,
        "PropertyName": "Balance",
        "Binary": "00001000",
        "Hex": "0x08",
        "Label": "Balance",
        "Description": "0-127"
    }, {
        "ControlNumber": 9,
        "PropertyName": "Controller9",
        "Binary": "00001001",
        "Hex": "0x09",
        "Label": "Undefined",
        "Description": "0-127"
    }, {
        "ControlNumber": 10,
        "PropertyName": "Pan",
        "Binary": "00001010",
        "Hex": "0x0A",
        "Label": "Pan",
        "Description": "0-127"
    }, {
        "ControlNumber": 11,
        "PropertyName": "Expression",
        "Binary": "00001011",
        "Hex": "0x0B",
        "Label": "Expression Controller",
        "Description": "0-127"
    }, {
        "ControlNumber": 12,
        "PropertyName": "Effect1",
        "Binary": "00001100",
        "Hex": "0x0C",
        "Label": "Effect Control 1",
        "Description": "0-127"
    }, {
        "ControlNumber": 13,
        "PropertyName": "Effect2",
        "Binary": "00001101",
        "Hex": "0x0D",
        "Label": "Effect Control 2",
        "Description": "0-127"
    }, {
        "ControlNumber": 14,
        "PropertyName": "Controller14",
        "Binary": "00001110",
        "Hex": "0x0E",
        "Label": "Undefined",
        "Description": "0-127"
    }, {
        "ControlNumber": 15,
        "PropertyName": "Controller15",
        "Binary": "00001111",
        "Hex": "0x0F",
        "Label": "Undefined",
        "Description": "0-127"
    }, {
        "ControlNumber": 16,
        "PropertyName": "GeneralPurpose1",
        "Binary": "00010000",
        "Hex": "0x10",
        "Label": "General Purpose Controller 1",
        "Description": "0-127"
    }, {
        "ControlNumber": 17,
        "PropertyName": "GeneralPurpose2",
        "Binary": "00010001",
        "Hex": "0x11",
        "Label": "General Purpose Controller 2",
        "Description": "0-127"
    }, {
        "ControlNumber": 18,
        "PropertyName": "GeneralPurpose3",
        "Binary": "00010010",
        "Hex": "0x12",
        "Label": "General Purpose Controller 3",
        "Description": "0-127"
    }, {
        "ControlNumber": 19,
        "PropertyName": "GeneralPurpose4",
        "Binary": "00010011",
        "Hex": "0x13",
        "Label": "General Purpose Controller 4",
        "Description": "0-127"
    }, {
        "ControlNumber": 20,
        "PropertyName": "Controller20",
        "Binary": "00010100",
        "Hex": "0x14",
        "Label": "Undefined",
        "Description": "0-127"
    }, {
        "ControlNumber": 21,
        "PropertyName": "Controller21",
        "Binary": "00010101",
        "Hex": "0x15",
        "Label": "Undefined",
        "Description": "0-127"
    }, {
        "ControlNumber": 22,
        "PropertyName": "Controller22",
        "Binary": "00010110",
        "Hex": "0x16",
        "Label": "Undefined",
        "Description": "0-127"
    }, {
        "ControlNumber": 23,
        "PropertyName": "Controller23",
        "Binary": "00010111",
        "Hex": "0x17",
        "Label": "Undefined",
        "Description": "0-127"
    }, {
        "ControlNumber": 24,
        "PropertyName": "Controller24",
        "Binary": "00011000",
        "Hex": "0x18",
        "Label": "Undefined",
        "Description": "0-127"
    }, {
        "ControlNumber": 25,
        "PropertyName": "Controller25",
        "Binary": "00011001",
        "Hex": "0x19",
        "Label": "Undefined",
        "Description": "0-127"
    }, {
        "ControlNumber": 26,
        "PropertyName": "Controller26",
        "Binary": "00011010",
        "Hex": "0x1A",
        "Label": "Undefined",
        "Description": "0-127"
    }, {
        "ControlNumber": 27,
        "PropertyName": "Controller27",
        "Binary": "00011011",
        "Hex": "0x1B",
        "Label": "Undefined",
        "Description": "0-127"
    }, {
        "ControlNumber": 28,
        "PropertyName": "Controller28",
        "Binary": "00011100",
        "Hex": "0x1C",
        "Label": "Undefined",
        "Description": "0-127"
    }, {
        "ControlNumber": 29,
        "PropertyName": "Controller29",
        "Binary": "00011101",
        "Hex": "0x1D",
        "Label": "Undefined",
        "Description": "0-127"
    }, {
        "ControlNumber": 30,
        "PropertyName": "Controller30",
        "Binary": "00011110",
        "Hex": "0x1E",
        "Label": "Undefined",
        "Description": "0-127"
    }, {
        "ControlNumber": 31,
        "PropertyName": "Controller31",
        "Binary": "00011111",
        "Hex": "0x1F",
        "Label": "Undefined",
        "Description": "0-127"
    }, {
        "ControlNumber": 32,
        "PropertyName": "BankSelectLSB",
        "Binary": "00100000",
        "Hex": "0x20",
        "Label": "LSB for Control 0 (Bank Select)",
        "Description": "0-127"
    }, {
        "ControlNumber": 33,
        "PropertyName": "ModWheelLSB",
        "Binary": "00100001",
        "Hex": "0x21",
        "Label": "LSB for Control 1 (Modulation Wheel or Lever)",
        "Description": "0-127"
    }, {
        "ControlNumber": 34,
        "PropertyName": "BreathLSB",
        "Binary": "00100010",
        "Hex": "0x22",
        "Label": "LSB for Control 2 (Breath Controller)",
        "Description": "0-127"
    }, {
        "ControlNumber": 35,
        "PropertyName": "Controller3LSB",
        "Binary": "00100011",
        "Hex": "0x23",
        "Label": "LSB for Control 3 (Undefined)",
        "Description": "0-127"
    }, {
        "ControlNumber": 36,
        "PropertyName": "FootLSB",
        "Binary": "00100100",
        "Hex": "0x24",
        "Label": "LSB for Control 4 (Foot Controller)",
        "Description": "0-127"
    }, {
        "ControlNumber": 37,
        "PropertyName": "PortamentoTimeLSB",
        "Binary": "00100101",
        "Hex": "0x25",
        "Label": "LSB for Control 5 (Portamento Time)",
        "Description": "0-127"
    }, {
        "ControlNumber": 38,
        "PropertyName": "DataEntryLSB",
        "Binary": "00100110",
        "Hex": "0x26",
        "Label": "LSB for Control 6 (Data Entry)",
        "Description": "0-127"
    }, {
        "ControlNumber": 39,
        "PropertyName": "VolumeLSB",
        "Binary": "00100111",
        "Hex": "0x27",
        "Label": "LSB for Control 7 (Channel Volume, formerly Main Volume)",
        "Description": "0-127"
    }, {
        "ControlNumber": 40,
        "PropertyName": "BalanceLSB",
        "Binary": "00101000",
        "Hex": "0x28",
        "Label": "LSB for Control 8 (Balance)",
        "Description": "0-127"
    }, {
        "ControlNumber": 41,
        "PropertyName": "Controller9LSB",
        "Binary": "00101001",
        "Hex": "0x29",
        "Label": "LSB for Control 9 (Undefined)",
        "Description": "0-127"
    }, {
        "ControlNumber": 42,
        "PropertyName": "PanLSB",
        "Binary": "00101010",
        "Hex": "0x2A",
        "Label": "LSB for Control 10 (Pan)",
        "Description": "0-127"
    }, {
        "ControlNumber": 43,
        "PropertyName": "ExpressionLSB",
        "Binary": "00101011",
        "Hex": "0x2B",
        "Label": "LSB for Control 11 (Expression Controller)",
        "Description": "0-127"
    }, {
        "ControlNumber": 44,
        "PropertyName": "Effect1LSB",
        "Binary": "00101100",
        "Hex": "0x2C",
        "Label": "LSB for Control 12 (Effect control 1)",
        "Description": "0-127"
    }, {
        "ControlNumber": 45,
        "PropertyName": "Effect2LSB",
        "Binary": "00101101",
        "Hex": "0x2D",
        "Label": "LSB for Control 13 (Effect control 2)",
        "Description": "0-127"
    }, {
        "ControlNumber": 46,
        "PropertyName": "Controller14LSB",
        "Binary": "00101110",
        "Hex": "0x2E",
        "Label": "LSB for Control 14 (Undefined)",
        "Description": "0-127"
    }, {
        "ControlNumber": 47,
        "PropertyName": "Controller15LSB",
        "Binary": "00101111",
        "Hex": "0x2F",
        "Label": "LSB for Control 15 (Undefined)",
        "Description": "0-127"
    }, {
        "ControlNumber": 48,
        "PropertyName": "GeneralPurpose1LSB",
        "Binary": "00110000",
        "Hex": "0x30",
        "Label": "LSB for Control 16 (General Purpose Controller 1)",
        "Description": "0-127"
    }, {
        "ControlNumber": 49,
        "PropertyName": "GeneralPurpose2LSB",
        "Binary": "00110001",
        "Hex": "0x31",
        "Label": "LSB for Control 17 (General Purpose Controller 2)",
        "Description": "0-127"
    }, {
        "ControlNumber": 50,
        "PropertyName": "GeneralPurpose3LSB",
        "Binary": "00110010",
        "Hex": "0x32",
        "Label": "LSB for Control 18 (General Purpose Controller 3)",
        "Description": "0-127"
    }, {
        "ControlNumber": 51,
        "PropertyName": "GeneralPurpose4LSB",
        "Binary": "00110011",
        "Hex": "0x33",
        "Label": "LSB for Control 19 (General Purpose Controller 4)",
        "Description": "0-127"
    }, {
        "ControlNumber": 52,
        "PropertyName": "Controller20LSB",
        "Binary": "00110100",
        "Hex": "0x34",
        "Label": "LSB for Control 20 (Undefined)",
        "Description": "0-127"
    }, {
        "ControlNumber": 53,
        "PropertyName": "Controller21LSB",
        "Binary": "00110101",
        "Hex": "0x35",
        "Label": "LSB for Control 21 (Undefined)",
        "Description": "0-127"
    }, {
        "ControlNumber": 54,
        "PropertyName": "Controller22LSB",
        "Binary": "00110110",
        "Hex": "0x36",
        "Label": "LSB for Control 22 (Undefined)",
        "Description": "0-127"
    }, {
        "ControlNumber": 55,
        "PropertyName": "Controller23LSB",
        "Binary": "00110111",
        "Hex": "0x37",
        "Label": "LSB for Control 23 (Undefined)",
        "Description": "0-127"
    }, {
        "ControlNumber": 56,
        "PropertyName": "Controller24LSB",
        "Binary": "00111000",
        "Hex": "0x38",
        "Label": "LSB for Control 24 (Undefined)",
        "Description": "0-127"
    }, {
        "ControlNumber": 57,
        "PropertyName": "Controller25LSB",
        "Binary": "00111001",
        "Hex": "0x39",
        "Label": "LSB for Control 25 (Undefined)",
        "Description": "0-127"
    }, {
        "ControlNumber": 58,
        "PropertyName": "Controller26LSB",
        "Binary": "00111010",
        "Hex": "0x3A",
        "Label": "LSB for Control 26 (Undefined)",
        "Description": "0-127"
    }, {
        "ControlNumber": 59,
        "PropertyName": "Controller27LSB",
        "Binary": "00111011",
        "Hex": "0x3B",
        "Label": "LSB for Control 27 (Undefined)",
        "Description": "0-127"
    }, {
        "ControlNumber": 60,
        "PropertyName": "Controller28LSB",
        "Binary": "00111100",
        "Hex": "0x3C",
        "Label": "LSB for Control 28 (Undefined)",
        "Description": "0-127"
    }, {
        "ControlNumber": 61,
        "PropertyName": "Controller29LSB",
        "Binary": "00111101",
        "Hex": "0x3D",
        "Label": "LSB for Control 29 (Undefined)",
        "Description": "0-127"
    }, {
        "ControlNumber": 62,
        "PropertyName": "Controller30LSB",
        "Binary": "00111110",
        "Hex": "0x3E",
        "Label": "LSB for Control 30 (Undefined)",
        "Description": "0-127"
    }, {
        "ControlNumber": 63,
        "PropertyName": "Controller31LSB",
        "Binary": "00111111",
        "Hex": "0x3F",
        "Label": "LSB for Control 31 (Undefined)",
        "Description": "0-127"
    }, {
        "ControlNumber": 64,
        "PropertyName": "Sustain",
        "Binary": "01000000",
        "Hex": "0x40",
        "Label": "Damper Pedal on/off (Sustain)",
        "Description": "≤63 off, ≥64 on"
    }, {
        "ControlNumber": 65,
        "PropertyName": "Portamento",
        "Binary": "01000001",
        "Hex": "0x41",
        "Label": "Portamento On/Off",
        "Description": "≤63 off, ≥64 on"
    }, {
        "ControlNumber": 66,
        "PropertyName": "Sostenuto",
        "Binary": "01000010",
        "Hex": "0x42",
        "Label": "Sostenuto On/Off",
        "Description": "≤63 off, ≥64 on"
    }, {
        "ControlNumber": 67,
        "PropertyName": "Soft",
        "Binary": "01000011",
        "Hex": "0x43",
        "Label": "Soft Pedal On/Off",
        "Description": "≤63 off, ≥64 on"
    }, {
        "ControlNumber": 68,
        "PropertyName": "Legato",
        "Binary": "01000100",
        "Hex": "0x44",
        "Label": "Legato Footswitch",
        "Description": "≤63 Normal, ≥64 Legato"
    }, {
        "ControlNumber": 69,
        "PropertyName": "Hold2",
        "Binary": "01000101",
        "Hex": "0x45",
        "Label": "Hold 2",
        "Description": "≤63 off, ≥64 on"
    }, {
        "ControlNumber": 70,
        "PropertyName": "Variation",
        "Binary": "01000110",
        "Hex": "0x46",
        "Label": "Sound Controller 1 (default: Sound Variation)",
        "Description": "0-127"
    }, {
        "ControlNumber": 71,
        "PropertyName": "Timbre",
        "Binary": "01000111",
        "Hex": "0x47",
        "Label": "Sound Controller 2 (default: Timbre/Harmonic Intens.)",
        "Description": "0-127"
    }, {
        "ControlNumber": 72,
        "PropertyName": "Release",
        "Binary": "01001000",
        "Hex": "0x48",
        "Label": "Sound Controller 3 (default: Release Time)",
        "Description": "0-127"
    }, {
        "ControlNumber": 73,
        "PropertyName": "Attack",
        "Binary": "01001001",
        "Hex": "0x49",
        "Label": "Sound Controller 4 (default: Attack Time)",
        "Description": "0-127"
    }, {
        "ControlNumber": 74,
        "PropertyName": "Brightness",
        "Binary": "01001010",
        "Hex": "0x4A",
        "Label": "Sound Controller 5 (default: Brightness)",
        "Description": "0-127"
    }, {
        "ControlNumber": 75,
        "PropertyName": "Decay",
        "Binary": "01001011",
        "Hex": "0x4B",
        "Label": "Sound Controller 6 (default: Decay Time - see MMA RP-021)",
        "Description": "0-127"
    }, {
        "ControlNumber": 76,
        "PropertyName": "VibratoRate",
        "Binary": "01001100",
        "Hex": "0x4C",
        "Label": "Sound Controller 7 (default: Vibrato Rate - see MMA RP-021)",
        "Description": "0-127"
    }, {
        "ControlNumber": 77,
        "PropertyName": "VibratoDepth",
        "Binary": "01001101",
        "Hex": "0x4D",
        "Label": "Sound Controller 8 (default: Vibrato Depth - see MMA RP-021)",
        "Description": "0-127"
    }, {
        "ControlNumber": 78,
        "PropertyName": "VibratoDelay",
        "Binary": "01001110",
        "Hex": "0x4E",
        "Label": "Sound Controller 9 (default: Vibrato Delay - see MMA RP-021)",
        "Description": "0-127"
    }, {
        "ControlNumber": 79,
        "PropertyName": "SoundController10",
        "Binary": "01001111",
        "Hex": "0x4F",
        "Label": "Sound Controller 10 (default undefined - see MMA RP-021)",
        "Description": "0-127"
    }, {
        "ControlNumber": 80,
        "PropertyName": "GeneralPurpose5",
        "Binary": "01010000",
        "Hex": "0x50",
        "Label": "General Purpose Controller 5",
        "Description": "0-127"
    }, {
        "ControlNumber": 81,
        "PropertyName": "GeneralPurpose6",
        "Binary": "01010001",
        "Hex": "0x51",
        "Label": "General Purpose Controller 6",
        "Description": "0-127"
    }, {
        "ControlNumber": 82,
        "PropertyName": "GeneralPurpose7",
        "Binary": "01010010",
        "Hex": "0x52",
        "Label": "General Purpose Controller 7",
        "Description": "0-127"
    }, {
        "ControlNumber": 83,
        "PropertyName": "GeneralPurpose8",
        "Binary": "01010011",
        "Hex": "0x53",
        "Label": "General Purpose Controller 8",
        "Description": "0-127"
    }, {
        "ControlNumber": 84,
        "PropertyName": "PortamentoControl",
        "Binary": "01010100",
        "Hex": "0x54",
        "Label": "Portamento Control",
        "Description": "0-127"
    }, {
        "ControlNumber": 85,
        "PropertyName": "Controller85",
        "Binary": "01010101",
        "Hex": "0x55",
        "Label": "Undefined",
        "Description": "---"
    }, {
        "ControlNumber": 86,
        "PropertyName": "Controller86",
        "Binary": "01010110",
        "Hex": "0x56",
        "Label": "Undefined",
        "Description": "---"
    }, {
        "ControlNumber": 87,
        "PropertyName": "Controller87",
        "Binary": "01010111",
        "Hex": "0x57",
        "Label": "Undefined",
        "Description": "---"
    }, {
        "ControlNumber": 88,
        "PropertyName": "HiResVelocityPrefix",
        "Binary": "01011000",
        "Hex": "0x58",
        "Label": "High Resolution Velocity Prefix",
        "Description": "0-127"
    }, {
        "ControlNumber": 89,
        "PropertyName": "Controller89",
        "Binary": "01011001",
        "Hex": "0x59",
        "Label": "Undefined",
        "Description": "---"
    }, {
        "ControlNumber": 90,
        "PropertyName": "Controller90",
        "Binary": "01011010",
        "Hex": "0x5A",
        "Label": "Undefined",
        "Description": "---"
    }, {
        "ControlNumber": 91,
        "PropertyName": "ReverbLevel",
        "Binary": "01011011",
        "Hex": "0x5B",
        "Label": "Effects 1 Depth ",
        "Description": "Effects 1 Depth (default: Reverb Send Level - see MMA RP-023) (formerly External Effects Depth)"
    }, {
        "ControlNumber": 92,
        "PropertyName": "TremeloDepth",
        "Binary": "01011100",
        "Hex": "0x5C",
        "Label": "Effects 2 Depth (formerly Tremolo Depth)",
        "Description": "0-127"
    }, {
        "ControlNumber": 93,
        "PropertyName": "Effect3Depth",
        "Binary": "01011101",
        "Hex": "0x5D",
        "Label": "Effects 3 Depth "
    }, {
        "ControlNumber": 94,
        "PropertyName": "DetuneDepth",
        "Binary": "01011110",
        "Hex": "0x5E",
        "Label": "Effects 4 Depth (formerly Celeste [Detune] Depth)",
        "Description": "0-127"
    }, {
        "ControlNumber": 95,
        "PropertyName": "PhaserDepth",
        "Binary": "01011111",
        "Hex": "0x5F",
        "Label": "Effects 5 Depth (formerly Phaser Depth)",
        "Description": "0-127"
    }, {
        "ControlNumber": 96,
        "PropertyName": "DataIncrement",
        "Binary": "01100000",
        "Hex": "0x60",
        "Label": "Data Increment (Data Entry +1) (see MMA RP-018)",
        "Description": "N/A"
    }, {
        "ControlNumber": 97,
        "PropertyName": "DataDecrement",
        "Binary": "01100001",
        "Hex": "0x61",
        "Label": "Data Decrement (Data Entry -1) (see MMA RP-018)",
        "Description": "N/A"
    }, {
        "ControlNumber": 98,
        "PropertyName": "NRPNLSB",
        "Binary": "01100010",
        "Hex": "0x62",
        "Label": "Non-Registered Parameter Number (NRPN) - LSB",
        "Description": "0-127"
    }, {
        "ControlNumber": 99,
        "PropertyName": "NRPNMSB",
        "Binary": "01100011",
        "Hex": "0x63",
        "Label": "Non-Registered Parameter Number (NRPN) - MSB",
        "Description": "0-127"
    }, {
        "ControlNumber": 100,
        "PropertyName": "RPNLSB",
        "Binary": "01100100",
        "Hex": "0x64",
        "Label": "Registered Parameter Number (RPN) - LSB*",
        "Description": "0-127"
    }, {
        "ControlNumber": 101,
        "PropertyName": "RPNMSB",
        "Binary": "01100101",
        "Hex": "0x65",
        "Label": "Registered Parameter Number (RPN) - MSB*",
        "Description": "0-127"
    }, {
        "ControlNumber": 102,
        "PropertyName": "Controller102",
        "Binary": "01100110",
        "Hex": "0x66",
        "Label": "Undefined",
        "Description": "---"
    }, {
        "ControlNumber": 103,
        "PropertyName": "Controller103",
        "Binary": "01100111",
        "Hex": "0x67",
        "Label": "Undefined",
        "Description": "---"
    }, {
        "ControlNumber": 104,
        "PropertyName": "Controller104",
        "Binary": "01101000",
        "Hex": "0x68",
        "Label": "Undefined",
        "Description": "---"
    }, {
        "ControlNumber": 105,
        "PropertyName": "Controller105",
        "Binary": "01101001",
        "Hex": "0x69",
        "Label": "Undefined",
        "Description": "---"
    }, {
        "ControlNumber": 106,
        "PropertyName": "Controller106",
        "Binary": "01101010",
        "Hex": "0x6A",
        "Label": "Undefined",
        "Description": "---"
    }, {
        "ControlNumber": 107,
        "PropertyName": "Controller107",
        "Binary": "01101011",
        "Hex": "0x6B",
        "Label": "Undefined",
        "Description": "---"
    }, {
        "ControlNumber": 108,
        "PropertyName": "Controller108",
        "Binary": "01101100",
        "Hex": "0x6C",
        "Label": "Undefined",
        "Description": "---"
    }, {
        "ControlNumber": 109,
        "PropertyName": "Controller109",
        "Binary": "01101101",
        "Hex": "0x6D",
        "Label": "Undefined",
        "Description": "---"
    }, {
        "ControlNumber": 110,
        "PropertyName": "Controller110",
        "Binary": "01101110",
        "Hex": "0x6E",
        "Label": "Undefined",
        "Description": "---"
    }, {
        "ControlNumber": 111,
        "PropertyName": "Controller111",
        "Binary": "01101111",
        "Hex": "0x6F",
        "Label": "Undefined",
        "Description": "---"
    }, {
        "ControlNumber": 112,
        "PropertyName": "Controller112",
        "Binary": "01110000",
        "Hex": "0x70",
        "Label": "Undefined",
        "Description": "---"
    }, {
        "ControlNumber": 113,
        "PropertyName": "Controller113",
        "Binary": "01110001",
        "Hex": "0x71",
        "Label": "Undefined",
        "Description": "---"
    }, {
        "ControlNumber": 114,
        "PropertyName": "Controller114",
        "Binary": "01110010",
        "Hex": "0x72",
        "Label": "Undefined",
        "Description": "---"
    }, {
        "ControlNumber": 115,
        "PropertyName": "Controller115",
        "Binary": "01110011",
        "Hex": "0x73",
        "Label": "Undefined",
        "Description": "---"
    }, {
        "ControlNumber": 116,
        "PropertyName": "Controller116",
        "Binary": "01110100",
        "Hex": "0x74",
        "Label": "Undefined",
        "Description": "---"
    }, {
        "ControlNumber": 117,
        "PropertyName": "Controller117",
        "Binary": "01110101",
        "Hex": "0x75",
        "Label": "Undefined",
        "Description": "---"
    }, {
        "ControlNumber": 118,
        "PropertyName": "Controller118",
        "Binary": "01110110",
        "Hex": "0x76",
        "Label": "Undefined",
        "Description": "---"
    }, {
        "ControlNumber": 119,
        "PropertyName": "Controller119",
        "Binary": "01110111",
        "Hex": "0x77",
        "Label": "Undefined",
        "Description": "---"
    }, {
        "ControlNumber": 120,
        "PropertyName": "AllSoundOff",
        "Binary": "01111000",
        "Hex": "0x78",
        "Label": "[Channel Mode Message] All Sound Off",
        "Description": "0"
    }, {
        "ControlNumber": 121,
        "PropertyName": "ResetAllControllers",
        "Binary": "01111001",
        "Hex": "0x79",
        "Label": "[Channel Mode Message] Reset All Controllers "
    }, {
        "ControlNumber": 122,
        "PropertyName": "LocalControl",
        "Binary": "01111010",
        "Hex": "0x7A",
        "Label": "[Channel Mode Message] Local Control On/Off",
        "Description": "0 off, 127 on"
    }, {
        "ControlNumber": 123,
        "PropertyName": "AllNotesOff",
        "Binary": "01111011",
        "Hex": "0x7B",
        "Label": "[Channel Mode Message] All Notes Off",
        "Description": "0"
    }, {
        "ControlNumber": 124,
        "PropertyName": "OmniModeOff",
        "Binary": "01111100",
        "Hex": "0x7C",
        "Label": "[Channel Mode Message] Omni Mode Off (+ all notes off)",
        "Description": "0"
    }, {
        "ControlNumber": 125,
        "PropertyName": "OmniModeOn",
        "Binary": "01111101",
        "Hex": "0x7D",
        "Label": "[Channel Mode Message] Omni Mode On (+ all notes off)",
        "Description": "0"
    }, {
        "ControlNumber": 126,
        "PropertyName": "MonoModeOn",
        "Binary": "01111110",
        "Hex": "0x7E",
        "Label": "[Channel Mode Message] Mono Mode On (+ poly off, + all notes off)",
        "Description": ""
    }, {
        "ControlNumber": 127,
        "PropertyName": "PolyModeOn",
        "Binary": "01111111",
        "Hex": "0x7F",
        "Label": "[Channel Mode Message] Poly Mode On (+ mono off, +all notes off)",
        "Description": ""
    }];

    _setup();

})();

(function() {

    var Ticker = new Class({
        inherits: EventEmitter,
        init: function constructor(audioContext) {

            var ticker = this;

            var pos = 0;
            var interval = 24;

            var time = ticker.time = function time(){
                if (audioContext){
                    return audioContext.currentTime * 1000;
                } else if (typeof global !== 'undefined' && global.process && global.process.hrtime) {
                  var t = global.process.hrtime();
                  return (t[0] + (t[1] / Math.pow(10, 9))) * 1000;
                } else {
                  return Date.now();
                }
            };

            function tick(){
                if (!pos){
                  pos = time();
                }
                pos += interval;
                var diff = pos - time();
                ticker.emit('tick');
                setTimeout(tick, diff);
            }

            ticker.setInterval = function(tempo){
                interval = parseInt(tempo.toString()) || 24;
                // console.log('ticker interval:', interval)
            };

            tick();
        }
    });

    var Clock = new Class({
        inherits: EventEmitter,
        init: function(options) {
            options = options || {};
            var clock = this;

            var ticker = new Ticker(options.context);
            clock.IO = null;
            clock.isMaster = false;

            var state = {
                tempo: 120,
                ppq: 24,

                beatDivision: 4/4,

                tickInterval: 0,

                nextTickAt: 0,
                position: 0,

                playing: false,

                startTime: 0,
                runningTime: 0
            };

            var prevState = state;

            if (options.Tempo) state.tempo = options.Tempo;
            // if (options.PPQ) state.ppq = options.PPQ;

            ticker.on('tick', function(){
                if (state.playing){
                    clock.advance(1);
                    state.runningTime = new Date().getTime() - state.startTime;
                    // state.nextTickAt = 0
                    if (!!clock.IO && !!clock.isMaster) {
                        clock.IO.sendMessage([248]);
                    }
                }
            });

            function ticksPerMinute() {
                return state.tempo * state.ppq;
            }
            function tickInterval() {
                return 60000 / ticksPerMinute();
            }
            function ticksPerMillisecond() {
                return ticksPerMinute() * 1/60000;
            }
            function secondsPassed(ticks) {
                return (60 * ticks) / ticksPerMinute();
            }
            function microsecondsPerQuarterNote() {
                return Clock.MICROSECONDS_PER_MINUTE / state.tempo;
            }
            function updateTicker() {
                state.tickInterval = tickInterval();
                ticker.setInterval(state.tickInterval);
            }

            // clock.getPPQ = function() {
            //  return state.ppq;
            // }

            // clock.setPPQ = function(ppq) {
            //  state.ppq = ppq;
            //  updateTicker()
            // }

            clock.advance = function(n) {
                n = n || 1;
                clock.setPosition( state.position + n );
            };

            clock.getPosition = function() {
                return state.position;
            };

            clock.setPosition = function(pos) {
                state.position = pos;
                clock.emit('position', state.position);
                // state.runningTime =
            };

            clock.getRunningTime = function() {
                return state.runningTime;
            };

            clock.getStartTime = function() {
                return state.startTime;
            };

            clock.getTempo = function() {
                return state.tempo;
            };

            clock.setTempo = function(tempo){
                state.tempo = tempo;
                updateTicker();
                clock.emit('tempo', tempo);
            };

            clock.isPlaying = function() {
                return state.playing;
            };

            clock.start = function(){
                clock.setTempo(state.tempo);
                state.startTime = new Date().getTime();
                state.nextTickAt = 0;
                clock.setPosition( -1 );
                clock.emit('start');
                state.playing = true;
                if (!!clock.IO && !!clock.isMaster) {
                    clock.IO.sendMessage([MIDI.Constants.Start]);
                }
            };

            clock.resume = function(){
                clock.setTempo(state.tempo);
                clock.emit('resume');
                state.playing = true;
                if (!!clock.IO && !!clock.isMaster) {
                    clock.IO.sendMessage([MIDI.Constants.Continue]);
                }
            };

            clock.stop = function(){
                state.runningTime = state.startTime = 0;
                clock.emit('stop');
                state.playing = false;
                if (!!clock.IO && !!clock.isMaster) {
                    clock.IO.sendMessage([MIDI.Constants.Stop]);
                }
            };

            clock.synchronize = function(masterClock) {
                if (!!masterClock /*&& masterClock instanceof Clock*/) {

                    prevState = state;

                    clock.Master = masterClock;

                    clock.setPosition(masterClock.getPosition());
                    state.runningTime = masterClock.getRunningTime();
                    state.startTime = masterClock.getStartTime();
                    clock.setTempo(masterClock.getTempo());

                    clock.Master.on('start', clock.start);
                    clock.Master.on('resume', clock.resume);
                    clock.Master.on('stop', clock.stop);
                    clock.Master.on('tempo', clock.setTempo);
                    clock.Master.on('position', clock.setPosition);
                }
            };

            clock.unsynchronize = function() {
                if(!!clock.Master /*&& masterClock instanceof Clock*/) {
                    clock.Master.removeListener('start', clock.start);
                    clock.Master.removeListener('start', clock.resume);
                    clock.Master.removeListener('start', clock.stop);
                    clock.Master.removeListener('tempo', clock.setTempo);
                    clock.Master.removeListener('position', clock.setPosition);

                    clock.Master = null;
                    state = prevState;

                    clock.setPosition(state.playing ? state.position : -1);
                    state.runningTime = state.playing ? state.runningTime : 0;
                    state.startTime = state.playing ? state.startTime : 0;
                    clock.setTempo(state.tempo);
                }
            };

            clock.on('position', function(pos) {
                // console.log('tick:', pos);
            });
        }
    });

    Class.define(Clock, 'MICROSECONDS_PER_MINUTE', Class(60000000));

    MIDI.addClass("Clock", Clock);
    MIDI.addClass("Ticker", Ticker);

})();

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
                loopStart: -1,
                loopEnd: -1
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

            Class.define(self, 'LoopStart', {
                get: MIDI.Utility.stateValueGetter(_state, 'loopStart'),
                enumerable: true
            });

            Class.define(self, 'LoopEnd', {
                get: MIDI.Utility.stateValueGetter(_state, 'loopEnd'),
                enumerable: true
            });
        },

        push: Class(function push() {
            push.super.apply(this, arguments);
        })
    }));
})();
