(function() {
    var AudioClock = new Class({
        inherits: MIDI.Clock,
        start: function() {
            // Create AudioContext and buffer source
            var audioCtx = new AudioContext();
            source = audioCtx.createBufferSource();

            // Create a ScriptProcessorNode with a bufferSize of 4096 and a single input and output channel
            var scriptNode = audioCtx.createScriptProcessor(4096, 1, 1);
            console.log(scriptNode.bufferSize);

            var osc = context.createOscillator();
            osc.type = "square"; // Square wave
            osc.frequency.value = 100; // Frequency in hertz

            // load in an audio track via XHR and decodeAudioData

            // function getData() {
            //   request = new XMLHttpRequest();
            //   request.open('GET', 'viper.ogg', true);
            //   request.responseType = 'arraybuffer';
            //   request.onload = function() {
            //     var audioData = request.response;

            //     audioCtx.decodeAudioData(audioData, function(buffer) {
            //     myBuffer = buffer;
            //     source.buffer = myBuffer;
            //   },
            //     function(e){"Error with decoding audio data" + e.err});
            //   }
            //   request.send();
            // }

            // Give the node a function to process audio events
            scriptNode.onaudioprocess = function(audioProcessingEvent) {
                // The input buffer is the song we loaded earlier
                var inputBuffer = audioProcessingEvent.inputBuffer;

                // The output buffer contains the samples that will be modified and played
                var outputBuffer = audioProcessingEvent.outputBuffer;

                // Loop through the output channels (in this case there is only one)
                for (var channel = 0; channel < outputBuffer.numberOfChannels; channel++) {
                    var inputData = inputBuffer.getChannelData(channel);
                    var outputData = outputBuffer.getChannelData(channel);

                    // Loop through the 4096 samples
                    for (var sample = 0; sample < inputBuffer.length; sample++) {
                        // make output equal to the same as the input
                        outputData[sample] = inputData[sample];

                        // add noise to each output sample
                        outputData[sample] += ((Math.random() * 2) - 1) * 0.2;
                    }
                }
            };

        }
    });
})();
