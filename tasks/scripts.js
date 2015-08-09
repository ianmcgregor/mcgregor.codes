'use strict';

var args = require('yargs').argv;
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var chalk = require('chalk');
var debug = require('gulp-debug');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var jscs = require('gulp-jscs');
var eslint = require('gulp-eslint');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');
var strip = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var watchify = require('watchify');

var paths = require('./paths.json').scripts;
var isProduction = args.min; // eg: gulp --min

var bundler = browserify({
    entries: paths.entry,
    debug: !isProduction
});

function logError(msg) {
    console.log(chalk.bold.red('[ERROR] ' + msg.toString()));
}

function lint() {
    return gulp.src(paths.lint)
        .pipe(eslint())
        .pipe(eslint.format());
}

function lintJscs() {
    return gulp.src(paths.lint)
        .pipe(debug())
        .pipe(jscs());
}

function bundle() {
    return bundler
        .bundle()
        .on('error', logError)
        .pipe(source(paths.bundle))
        .pipe(buffer())
        .pipe(gulpif(isProduction, uglify()))
        .pipe(gulpif(isProduction, strip()))
        .pipe(gulpif(isProduction, rename({
            suffix: '.min'
        })))
        .pipe(gulp.dest(paths.dest));
}

function watch() {
    bundler = watchify(bundler, watchify.args);
    bundler.on('update', bundle);
    bundler.on('log', console.log.bind(console));
}

module.exports = {
    bundle: bundle,
    lint: lint,
    jscs: lintJscs,
    watch: watch
};
