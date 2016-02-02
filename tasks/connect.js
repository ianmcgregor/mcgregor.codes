const args = require('yargs').argv;
const browserSync = require('browser-sync').create();
const historyApiFallback = require('connect-history-api-fallback');
const paths = require('../package.json').paths.connect;

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
