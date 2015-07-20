(function() {
    describe("MIDI.Clock", function() {
        var defaultTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;

        it("exists", function() {
            expect(typeof MIDI === 'object' && typeof MIDI.Clock === "function").toBeTruthy();
        });

        it("has a static constant defining MICROSECONDS_PER_MINUTE equal to 60000000", function() {
            expect(MIDI.Clock.MICROSECONDS_PER_MINUTE).toEqual(60000000);
        });

        xit("can run a rough timing test of the current system", function(done) {
            var x = 1;
            var length = 0;
            var startTime = new Date().getTime();
            var lastLength = 0;
            var tstTimer = setInterval((function go() {
                lastLength = length;
                length = new Date().getTime() - startTime;
                lastLength = length - lastLength;
                ++x;
                console.log(lastLength);
                if (length >= 1000) {
                    console.log('x:', x, ' _ length:', length);
                    expect(true).toEqual(true);
                    clearInterval(tstTimer);
                    done();
                } else {
                    // setTimeout(go, 1);
                }
            })/*()*/, 1);
        });

        xit("tests requestAnimationFrame for high performance timing", function(done) {
            var x = 0;

            window.requestAnimFrame = (function() {
                return window.requestAnimationFrame ||
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame ||
                    function(callback) {
                        window.setTimeout(callback, 1000 / 60);
                    };
            })();

            var lastTime = (new Date()).getTime();
            var display = console.log;
            var numSeconds = 0;
            (function timer() {
                requestAnimFrame(timer);
                var currentTime = (new Date()).getTime();

                // if (currentTime - lastTime >= 1000) {
                //     console.log("Last Time: " + lastTime);
                //     console.log("Current Time: " + currentTime);
                //     numSeconds++;
                //     display(numSeconds);
                // }
                ++x;
                display(x, currentTime - lastTime);
                lastTime = currentTime;

                if(x === 100) {
                    done();
                }
            }());
        });

        xit("can provide an accurate position consistently", function(done) {
            var clock = new MIDI.Clock();
            clock.setTempo(120);
            setTimeout(function() {
                clock.stop();
                console.log(clock.getPosition());
                expect(clock.getPosition()).toEqual(480);
                jasmine.DEFAULT_TIMEOUT_INTERVAL = defaultTimeout;
                done();
            }, 10000);
            clock.start();
        });
    });
})();
