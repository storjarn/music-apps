(function() {

    var Ticker = new Class({
        inherits: EventEmitter,
        init: function constructor(audioContext) {

            var ticker = this;

            ticker.setInterval = function(value) {
                interval = parseInt(value.toString()) || 24;
            };

            var pos = 0;
            var interval = 24;

            var tickCount = 0;
            var frameCount = 0;
            var fps, startTime, now, then = Date.now(),
                elapsed;

            var requestAnimFrame = (function() {
                if (typeof window !== 'undefined') {
                    return window.requestAnimationFrame ||
                        window.webkitRequestAnimationFrame ||
                        window.mozRequestAnimationFrame ||
                        function(callback) {
                            window.setTimeout(callback, 1000 / 60);
                        };
                } else {
                    return function(callback) {
                        setTimeout(callback, 1000 / 60);
                    };
                }
            })();

            (function tick() {

                ++frameCount;
                ticker.emit('frame', frameCount);

                // calc elapsed time since last loop
                now = Date.now();
                elapsed = now - then;

                // if enough time has elapsed, draw the next frame
                if (elapsed > interval) {
                    // Get ready for next frame by setting then=now, but also adjust for your
                    // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
                    then = now - (elapsed % interval);

                    // Put your drawing code here
                    ++tickCount;
                    ticker.emit('tick', tickCount);
                    // console.log("Ticker frame", tickCount);
                }

                // request another frame
                // setInterval(tick, 1);
                requestAnimFrame(tick);
            })();
        }
    });

    // var Clock = new Class({
    //     inherits: EventEmitter,
    //     init: function(options) {
    //         options = options || {};
    //         var clock = this;

    //         clock.IO = null;
    //         clock.isMaster = false;

    //         var state = {
    //             tempo: 120,
    //             ppq: 24,

    //             beatDivision: 4/4,

    //             tickInterval: 0,

    //             nextTickAt: 0,
    //             position: 0,

    //             playing: false,

    //             startTime: 0,
    //             runningTime: 0,

    //             remainder: 0
    //         };

    //         var prevState = state;

    //         if (options.Tempo) state.tempo = options.Tempo;
    //         // if (options.PPQ) state.ppq = options.PPQ;

    //         var ticker = new Ticker(options.context);
    //         updateTicker();

    //         ticker.on('tick', function(tickCount){
    //             clock.emit('tick', tickCount);
    //             if (state.playing){
    //                 // clock.advance(1);
    //                 clock.advance(tickCount);
    //                 state.runningTime = new Date().getTime() - state.startTime;
    //                 // state.nextTickAt = 0
    //                 if (!!clock.IO && !!clock.isMaster) {
    //                     clock.IO.sendMessage([248]);
    //                 }
    //             }
    //         });

    //         function ticksPerMinute() {
    //             return state.tempo * state.ppq;
    //         }
    //         function tickInterval() {
    //             return 60000 / ticksPerMinute();
    //         }
    //         function ticksPerMillisecond() {
    //             return ticksPerMinute() * 1/60000;
    //         }
    //         function secondsPassed(ticks) {
    //             return (60 * ticks) / ticksPerMinute();
    //         }
    //         function microsecondsPerQuarterNote() {
    //             return Clock.MICROSECONDS_PER_MINUTE / state.tempo;
    //         }
    //         function updateTicker() {
    //             state.tickInterval = tickInterval();
    //             ticker.setInterval(state.tickInterval);
    //         }

    //         // clock.getPPQ = function() {
    //         //  return state.ppq;
    //         // }

    //         // clock.setPPQ = function(ppq) {
    //         //  state.ppq = ppq;
    //         //  updateTicker()
    //         // }

    //         clock.advance = function(n) {
    //             n = n || 1;
    //             clock.setPosition( /*state.position + */n );
    //         };

    //         clock.getPosition = function() {
    //             return state.position;
    //         };

    //         clock.setPosition = function(pos) {
    //             state.position = pos;
    //             clock.emit('position', state.position);
    //         };

    //         clock.getRunningTime = function() {
    //             return state.runningTime;
    //         };

    //         clock.getStartTime = function() {
    //             return state.startTime;
    //         };

    //         clock.getTempo = function() {
    //             return state.tempo;
    //         };

    //         clock.setTempo = function(tempo){
    //             state.tempo = tempo;
    //             updateTicker();
    //             clock.emit('tempo', tempo);
    //         };

    //         clock.isPlaying = function() {
    //             return state.playing;
    //         };

    //         clock.start = function(){
    //             clock.setTempo(state.tempo);
    //             state.startTime = new Date().getTime();
    //             state.nextTickAt = 0;
    //             clock.setPosition( -1 );
    //             clock.emit('start');
    //             state.playing = true;
    //             if (!!clock.IO && !!clock.isMaster) {
    //                 clock.IO.sendMessage([MIDI.Constants.Start]);
    //             }
    //         };

    //         clock.resume = function(){
    //             clock.setTempo(state.tempo);
    //             clock.emit('resume');
    //             state.playing = true;
    //             if (!!clock.IO && !!clock.isMaster) {
    //                 clock.IO.sendMessage([MIDI.Constants.Continue]);
    //             }
    //         };

    //         clock.stop = function(){
    //             state.runningTime = state.startTime = 0;
    //             clock.emit('stop');
    //             state.playing = false;
    //             if (!!clock.IO && !!clock.isMaster) {
    //                 clock.IO.sendMessage([MIDI.Constants.Stop]);
    //             }
    //         };

    //         clock.synchronize = function(masterClock) {
    //             if (!!masterClock /*&& masterClock instanceof Clock*/) {

    //                 prevState = state;

    //                 clock.Master = masterClock;

    //                 clock.setPosition(masterClock.getPosition());
    //                 state.runningTime = masterClock.getRunningTime();
    //                 state.startTime = masterClock.getStartTime();
    //                 clock.setTempo(masterClock.getTempo());

    //                 clock.Master.on('start', clock.start);
    //                 clock.Master.on('resume', clock.resume);
    //                 clock.Master.on('stop', clock.stop);
    //                 clock.Master.on('tempo', clock.setTempo);
    //                 clock.Master.on('position', clock.setPosition);
    //             }
    //         };

    //         clock.unsynchronize = function() {
    //             if(!!clock.Master /*&& masterClock instanceof Clock*/) {
    //                 clock.Master.removeListener('start', clock.start);
    //                 clock.Master.removeListener('start', clock.resume);
    //                 clock.Master.removeListener('start', clock.stop);
    //                 clock.Master.removeListener('tempo', clock.setTempo);
    //                 clock.Master.removeListener('position', clock.setPosition);

    //                 clock.Master = null;
    //                 state = prevState;

    //                 clock.setPosition(state.playing ? state.position : -1);
    //                 state.runningTime = state.playing ? state.runningTime : 0;
    //                 state.startTime = state.playing ? state.startTime : 0;
    //                 clock.setTempo(state.tempo);
    //             }
    //         };

    //         clock.on('position', function(pos) {
    //             // console.log('tick:', pos);
    //         });
    //     }
    // });

    var Clock = new Class({
        inherits: EventEmitter,
        init: function constructor() {
            var clock = this;

            var state = {
                tempo: 120,
                ppq: 24,

                beatDivision: 4 / 4,

                tickInterval: 0,
                tickCount: 0,
                lastTickTime: 0,

                playing: false,

                startTime: new Date().getTime()
            };

            clock.State = state;
            clock.Input = null;
            clock.Output = null;

            clock.on('clock', function(firstByte, clk) {
                console.log('Clock', clk.State.tickCount);
            });
            clock.on('play', function(firstByte, clk) {
                clock.State.startTime = new Date().getTime();
                console.log('Play', clk.State.tickCount);
            });
            clock.on('continue', function(firstByte, clk) {
                console.log('Continue', clk.State.tickCount);
            });
            clock.on('stop', function(firstByte, clk) {
                console.log('Stop', clk.State.tickCount);
            });
        },
        linkInput: function(inputPort) {
            var clock = this;
            var oldHandler = inputPort.onmidimessage;
            function MIDIMessageEventHandler(event) {
                switch (event.data[0]) {
                    case MIDI.Constants.TimingClock:
                        clock.State.tickInterval = new Date().getTime() - clock.State.lastTickTime;
                        clock.State.tempo = MIDI.Utility.pulseIntervalToTempo(clock.State.tickInterval, clock.State.ppq);
                        clock.State.lastTickTime = new Date().getTime();
                        ++clock.State.tickCount;
                        clock.emit('clock', MIDI.Constants.TimingClock, clock);
                        if (clock.Output) {
                            clock.Output.send( event.data );
                        }
                        break;
                    case MIDI.Constants.Start :
                        clock.State.tickCount = 0;
                        clock.State.startTime = new Date().getTime();
                        clock.State.playing = true;
                        clock.emit('play', MIDI.Constants.Start, clock);
                        clock.emit('start', MIDI.Constants.Start, clock);
                        if (clock.Output) {
                            clock.Output.send( event.data );
                        }
                        break;
                    case MIDI.Constants.Continue:
                        clock.State.playing = true;
                        clock.emit('play', MIDI.Constants.Continue, clock);
                        clock.emit('continue', MIDI.Constants.Continue, clock);
                        if (clock.Output) {
                            clock.Output.send( event.data );
                        }
                        break;
                    case MIDI.Constants.Stop:
                        clock.State.playing = false;
                        clock.emit('stop', MIDI.Constants.Stop, clock);
                        if (clock.Output) {
                            clock.Output.send( event.data );
                        }
                        break;
                }
                if (oldHandler) {
                    oldHandler(event);
                }
            }
            MIDIMessageEventHandler.oldHandler = oldHandler;
            inputPort.onmidimessage = MIDIMessageEventHandler;
            clock.Input = inputPort;
        },
        linkOutput: function(outputPort) {
            var clock = this;
            clock.Output = outputPort;
        },
        unlinkInput: function(inputPort) {
            if (inputPort === clock.Input) {
                clock.Input.onmidimessage = clock.Input.onmidimessage.oldHandler;
                clock.Input = null;
                return true;
            }
            return false;
        },
        unlinkOutput: function(outputPort) {
            if (outputPort === clock.Output) {
                clock.outputPort.onmidimessage = clock.outputPort.onmidimessage.oldHandler;
                clock.outputPort = null;
                return true;
            }
            return false;
        },
        unlink: function(inputPort, outputPort) {
            return unlinkInput(inputPort) && unlinkOutput(outputPort);
        }
    });

    Class.define(Clock, 'MICROSECONDS_PER_MINUTE', Class(60000000));

    MIDI.addClass("Clock", Clock);
    // MIDI.addClass("Ticker", Ticker);

})();
