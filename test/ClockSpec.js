(function() {
    describe("MIDI.Clock", function() {
        it("exists", function() {
            expect(typeof MIDI === 'object' && typeof MIDI.Clock === "function").toBeTruthy();
        });

        it("has a static constant defining MICROSECONDS_PER_MINUTE equal to 60000000", function() {
            expect(MIDI.Clock.MICROSECONDS_PER_MINUTE).toEqual(60000000);
        });
    });
})();
