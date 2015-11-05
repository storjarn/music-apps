var midi = require('midi');
var moment = require('moment');
require('./MIDI');
require('./Messages');

// Set up a new input.
var input = new midi.input();

// Count the available input ports.
input.getPortCount();

// Get the name of a specified input port.
input.getPortName(0);

// Configure a callback.
input.on('message', function(deltaTime, message) {
  // console.log('m:' + message + ' d:' + deltaTime);
  var msgType = MIDI.Utility.getEventName(message);
  var channel = MIDI.Utility.getChannel(message);
  console.log(moment().format('HH:mm:ss:SSS'), input.getPortName(0), msgType, 'Ch'+channel, deltaTime, message);
});

// Open the first available input port.
input.openPort(0);

// Sysex, timing, and active sensing messages are ignored
// by default. To enable these message types, pass false for
// the appropriate type in the function below.
// Order: (Sysex, Timing, Active Sensing)
// For example if you want to receive only MIDI Clock beats
// you should use
// input.ignoreTypes(true, false, true)
input.ignoreTypes(false, false, false);

// ... receive MIDI messages ...

// Close the port when done.
 process.stdin.on('data', function (text) {
    if (text.toString() === 'quit\n') {
        done();
    }
});

function done() {
    console.log('Now that process.stdin is paused, there is nothing more to do.');
    input.closePort();
    process.exit();
}
