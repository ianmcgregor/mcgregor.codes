'use strict';

var args = require('yargs').argv;
var browserSync = require('browser-sync').create();
var historyApiFallback = require('connect-history-api-fallback');
var paths = require('./paths.json').connect;

module.exports = function() {
    browserSync.init({
        middleware: [historyApiFallback()],
        server: {
            baseDir: (args.min ? paths.dirMin : paths.dir)
        },
        files: paths.files,
        // open: false,
        // port: '8000',
        reloadDebounce: 500
    });
};
