(function() {
    var AudioClock = new Class({
        inherits: MIDI.Clock,
        init: function constructor() {
            constructor.super.call(this);
            this.isSlave = false;
        },
        setTempo: function(tempo) {
            this.State.tempo = tempo || 120;
        },
        start: function() {
            var me = this;

            var audioCtx = new window.AudioContext() || new window.webkitAudioContext();
            var sampleRate = audioCtx.sampleRate;
            var pulseWidth = 2;
            var clockFreq = (me.State.tempo / 60) * me.State.ppq;

            // Create a ScriptProcessorNode with a bufferSize of 4096 and a single input and output channel
            var pulseDetector = audioCtx.createScriptProcessor(/*4096, 1, 1*/);

            var clockLead = context.createOscillator();
            clockLead.type = "square"; // Square wave
            clockLead.frequency.value = clockFreq; // Frequency in hertz
            var leadGain = audioCtx.createGain();
            leadGain.gain.value = 1;

            // var clockTrim = context.createOscillator();
            // clockTrim.type = "square"; // Square wave
            // clockTrim.frequency.value = clockFreq; // Frequency in hertz
            // var trimGain = audioCtx.createGain();
            // trimGain.gain.value = -1;

            // var trimDelay = audioCtx.createDelay(pulseWidth / sampleRate);

            clockLead.connect(leadGain);
            // clockTrim.connect(trimDelay);
            // trimDelay.connect(trimGain);
            leadGain.connect(pulseDetector);
            // trimGain.connect(pulseDetector);

            clockLead.start(0);
            // clockTrim.start(0);

            if (me.Output) {
                me.Output.send( [MIDI.Messages.Start, 0, 0] );
            }

            var isUp = false;

            // Give the node a function to process audio events
            pulseDetector.onaudioprocess = function(audioProcessingEvent) {

                //Update clock frequency based on tempo
                clockFreq = (me.State.tempo / 60) * me.State.ppq;
                clockLead.frequency.value = clockFreq;
                // clockTrim.frequency.value = clockFreq;

                // The input buffer is made up of both oscillators
                var inputBuffer = audioProcessingEvent.inputBuffer;

                // The output buffer will be an optional output of the pulse clock signal that is generated, to drive other devices
                var outputBuffer = audioProcessingEvent.outputBuffer;

                // Loop through the output channels (in this case there is only one)
                for (var channel = 0; channel < inputBuffer.numberOfChannels; channel++) {
                    var inputData = inputBuffer.getChannelData(channel);
                    var outputData = outputBuffer.getChannelData(channel);

                    // Loop through the 4096 samples
                    for (var sample = 0; sample < inputBuffer.length; sample++) {
                        // copy pulse at input to output, to drive other audio clocks for example
                        outputData[sample] = inputData[sample];

                        //Detect pulse to send MIDI clock message
                        //If peak...
                        if (inputData[sample] > 0) {
                            //if not already peaked
                            if (!isUp) {
                                isUp = true;
                                clock.sendClock();
                            }
                        } else {
                            //When down, stay down until next up
                            isUp = false;
                        }
                    }
                }
            };

        }
    });

    MIDI.addClass("AudioClock", AudioClock);
})();
