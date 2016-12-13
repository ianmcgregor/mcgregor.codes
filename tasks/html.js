const args = require('yargs').argv;
const chalk = require('chalk');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const rename = require('gulp-rename');
const debug = require('gulp-debug');
const template = require('gulp-template');

const paths = require('../package.json').paths.html;
const config = require('../src/model/model.json');
const isDebug = args.debug; // eg: gulp --debug

function logError(msg) {
    console.log(chalk.bold.red('[ERROR] ' + msg.toString()));
}

function renderPage(name) {
    const templateData = {
        path: '',
        data: config,
        debug: !!isDebug,
        title: config.title
    };

    return gulp.src(paths.entry)
        .pipe(template(templateData)
        .on('error', function(err) {
            logError(err);
        }))
        .pipe(gulpif(!!name, rename(name)))
        .pipe(gulp.dest(paths.dest))
        .pipe(debug({title: 'html'}));
}

function render() {
    renderPage();
    renderPage('404.html');
}

function watch() {
    gulp.watch(paths.entry, {
        interval: 500
    }, render);
}

module.exports = {
    render: render,
    watch: watch
};
