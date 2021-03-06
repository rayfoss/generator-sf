'use strict';
var babelify = require('babelify');
module.exports = {
    options: {
        transform: [
            ['rollupify'],
            [babelify.configure({
                presets: ['env'],
                ignore: /(node_modules|bower_components)/,
                sourceMaps: true
            })],
            ['debowerify', {preferNPM: true}],
            ['deamdify']
        ]
    },

    dev: {
        options: {
            browserifyOptions: {
                debug: true
            },
            watch: true
        },
        files: {
            '.tmp/scripts/main.js': ['<%%= paths.app %>/scripts/main.js']
        }
    },
    dist: {
        files: {
            '.tmp/scripts/main.js': ['<%%= paths.app %>/scripts/main.js']
        }
    }
};
