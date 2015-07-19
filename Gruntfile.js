module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: '\n',
            },
            midicore: {
                src: [
                    './bower/ee-class/dist/**/*.min.js',
                    './midi-core/lib/MIDI.js',
                    './midi-core/lib/Constants.js',
                    './midi-core/lib/Clock.js',
                    './midi-core/lib/Track.js'
                ],
                dest: 'dist/midi-core.js',
            },
            musicui: {
                src: [
                    './bower/ee-class/dist/**/*.min.js',
                    './music-ui/lib/**/*.js'
                ],
                dest: 'dist/music-ui.js',
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                sourceMap: true
            },
            core: {
                src: 'dist/onto.js',
                dest: 'dist/onto.min.js'
            },
            ui: {
                src: 'dist/onto.ui.js',
                dest: 'dist/onto.ui.min.js'
            }
        },
        jasmine: { //Browser tests
            midicore: {
                src: [
                    'dist/midi-core.js'
                ],
                options: {
                    specs: 'test/*Spec.js'
                }
            }
        },
        watch: {
            midicore: {
                files: ['./midi-core/lib/**/*.js'],
                tasks: 'test'
            },
            musicui: {
                files: ['./music-ui/lib/**/*.js'],
                tasks: 'test'
            },
            test: {
                files: './test/**/*.js',
                tasks: 'test'
            }
        }
    });

    //Tests
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    //Utility
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // grunt.registerTask('jasmine', ['connect', 'jasmine']);
    grunt.registerTask('test', '', function() {
        grunt.task.run(['concat', 'jasmine', 'watch']);
    });

    grunt.registerTask('default', ['test']);

};
