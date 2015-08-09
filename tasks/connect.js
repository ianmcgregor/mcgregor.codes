'use strict';

var browserSync = require('browser-sync').create();
var historyApiFallback = require('connect-history-api-fallback');
var paths = require('./paths.json').connect;

module.exports = function() {
    browserSync.init({
        middleware: [historyApiFallback()],
        server: {
            baseDir: paths.dir
        },
        files: paths.files,
        // open: false,
        // port: '8000',
        reloadDebounce: 500
    });
};
