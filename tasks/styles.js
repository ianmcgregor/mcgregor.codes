'use strict';

var args = require('yargs').argv;
var chalk = require('chalk');
var csslint = require('gulp-csslint');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var minify = require('gulp-minify-css');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');

var paths = require('./paths.json').styles;
var isProduction = args.min; // eg: gulp --min

var processors = [
    require('postcss-nested')(),
    require('postcss-custom-media')(),
    require('postcss-custom-properties')(),
    require('postcss-calc')(),
    require('postcss-url')({
        url: 'inline',
        maxSize: 4096
        // url: function(url) {
        //     return 'http://example.com/' + url
        // }
    }),
    require('autoprefixer')({
        browsers: ['last 2 version'],
        cascade: false
    })
];

function logError(msg) {
    console.log(chalk.bold.red('[ERROR] ' + msg.toString()));
}

function bundle() {
    return gulp.src(paths.entry)
        .pipe(plumber({
            errorHandler: logError
        }))
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(minify({
            keepBreaks: true,
            advanced: false
        }).on('error', logError))
        // .pipe(stylus({
        //     'include css': true,
        //     sourcemap: {
        //         inline: true,
        //         sourceRoot: '.',
        //         basePath: 'src/css'
        //     }
        // }).on('error', logError))
        .pipe(rename(paths.bundle))
        .pipe(postcss(processors))
        .pipe(sourcemaps.write())
        // .pipe(gulpif(isProduction, minify()))
        .pipe(gulpif(isProduction, rename({
            suffix: '.min'
        })))
        .pipe(gulp.dest(paths.dest));
}

function lint() {
    return gulp.src(paths.lint)
        .pipe(csslint('/.csslintrc'))
        .pipe(csslint.reporter());
}

function watch() {
    gulp.watch(paths.watch, {
        interval: 500
    }, bundle);
}

module.exports = {
    bundle: bundle,
    lint: lint,
    watch: watch
};
