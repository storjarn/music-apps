(function() {

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

    var Clock = new Class({
        inherits: EventEmitter,
        init: function constructor() {
            var clock = this;

            var state = {
                DEBUG: true,

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
            clock.isSlave = true;

            clock.on('clock', function(firstByte, clk) {
                clock.updateInterval();
                clock.updateTempo();
                clock.updateTicks();
                if (clock.State.DEBUG) {
                    console.log('Clock', clock.State.tickCount);
                }
            });
            clock.on('beat', function(clk) {
                if (clock.State.DEBUG) {
                    console.log('Beat', clock.State.tickCount / clock.State.ppq);
                }
            });
            clock.on('start', function(firstByte, clk) {
                clock.updateTicks(0);
                clock.State.playing = true;
                clock.State.startTime = new Date().getTime();
                if (clock.State.DEBUG) {
                    console.log('Start', clock.State.tickCount);
                }
            });
            clock.on('continue', function(firstByte, clk) {
                clock.State.playing = true;
                if (clock.State.DEBUG) {
                    console.log('Continue', clock.State.tickCount);
                }
            });
            clock.on('stop', function(firstByte, clk) {
                clock.State.playing = false;
                if (clock.State.DEBUG) {
                    console.log('Stop', clock.State.tickCount);
                }
            });
        },
        updateInterval: function() {
            this.State.tickInterval = new Date().getTime() - this.State.lastTickTime;
        },
        updateTempo: function() {
            if (this.isSlave) {
                this.State.tempo = MIDI.Utility.pulseIntervalToTempo(this.State.tickInterval, this.State.ppq);
            }
        },
        updateTicks: function(tickVal) {
            this.State.lastTickTime = new Date().getTime();
            this.advance(tickVal);
        },
        advance: function(tickVal) {
            this.State.tickCount = this.State.tickCount + (tickVal || 1);
        },
        advanceTo: function(tickVal) {
            this.State.tickCount = tickVal;
        },
        sendClock: function() {
            this.emit('clock', MIDI.Messages.TimingClock, this);
            if (this.State.tickCount % this.State.ppq === 0){
                this.emit('beat', this);
            }
            if (this.Output) {
                this.Output.send( [MIDI.Messages.TimingClock] );
            }
        },
        startClock: function() {
            this.emit('play', MIDI.Messages.Start, this);
            this.emit('start', MIDI.Messages.Start, this);
            if (this.Output) {
                this.Output.send( [MIDI.Messages.Start] );
            }
        },
        continueClock: function() {
            this.emit('play', MIDI.Messages.Continue, this);
            this.emit('continue', MIDI.Messages.Continue, this);
            if (this.Output) {
                this.Output.send( [MIDI.Messages.Continue] );
            }
        },
        stopClock: function() {
            this.emit('stop', MIDI.Messages.Stop, this);
            if (this.Output) {
                this.Output.send( [MIDI.Messages.Stop] );
            }
        },
        linkInput: function(inputPort) {
            var clock = this;
            var oldHandler = inputPort.onmidimessage;
            function MIDIMessageEventHandler(event) {
                switch (event.data[0]) {
                    case MIDI.Messages.TimingClock:
                        clock.sendClock();
                        break;
                    case MIDI.Messages.Start :
                        clock.startClock();
                        break;
                    case MIDI.Messages.Continue:
                        clock.continueClock();
                        break;
                    case MIDI.Messages.Stop:
                        clock.stopClock();
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
                clock.outputPort = null;
                return true;
            }
            return false;
        },
        unlink: function(inputPort, outputPort) {
            return unlinkInput(inputPort || this.Input) && unlinkOutput(outputPort || this.Output);
        }
    });

    Class.define(Clock, 'MICROSECONDS_PER_MINUTE', Class(60000000));

    MIDI.addClass("Clock", Clock);

})();
