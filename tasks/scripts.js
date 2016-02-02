const args = require('yargs').argv;
const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const chalk = require('chalk');
const debug = require('gulp-debug');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const eslint = require('gulp-eslint');
const rename = require('gulp-rename');
const source = require('vinyl-source-stream');
const strip = require('gulp-strip-debug');
const uglify = require('gulp-uglify');
const watchify = require('watchify');

const paths = require('../package.json').paths.scripts;
const isProduction = args.min; // eg: gulp --min

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

function bundle() {
    return bundler
        .bundle()
        .on('error', logError)
        .pipe(source('bundle.js'))
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

function modernizr() {
    return gulp.src(paths.modernizr.entry)
        .pipe(gulp.dest(paths.modernizr.dest))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.modernizr.dest));
}

module.exports = {
    bundle: bundle,
    lint: lint,
    watch: watch,
    modernizr: modernizr
};
