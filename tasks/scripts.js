const args = require('yargs').argv;
const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const chalk = require('chalk');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const eslint = require('gulp-eslint');
const source = require('vinyl-source-stream');
const strip = require('gulp-strip-debug');
const uglify = require('gulp-uglify');
const watchify = require('watchify');

const paths = require('../package.json').paths.scripts;
const isDebug = args.debug; // eg: gulp --debug

let bundler = browserify({
    entries: paths.entry,
    debug: isDebug
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
        .pipe(gulpif(!isDebug, uglify()))
        .pipe(gulpif(!isDebug, strip()))
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
        .pipe(gulp.dest(paths.modernizr.dest));
}

module.exports = {
    bundle: bundle,
    lint: lint,
    watch: watch,
    modernizr: modernizr
};
