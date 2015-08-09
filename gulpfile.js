'use strict';

var gulp = require('gulp');

// connect
gulp.task('connect', require('./tasks/connect'));

// scripts
gulp.task('js', require('./tasks/scripts').bundle);
gulp.task('js:watch', require('./tasks/scripts').watch);
gulp.task('js:lint', require('./tasks/scripts').lint);
gulp.task('jscs', require('./tasks/scripts').jscs);

// styles
gulp.task('css', require('./tasks/styles').bundle);
gulp.task('css:watch', require('./tasks/styles').watch);
gulp.task('css:lint', require('./tasks/styles').lint);

// images
gulp.task('img:convert', require('./tasks/images').convert);
gulp.task('img:ls', require('./tasks/images').ls);

// build
gulp.task('build', [
    'js',
    'css'
]);

// watch
gulp.task('watch', [
    'js:watch',
    'css:watch'
]);

// lint
gulp.task('lint', [
    'js:lint',
    'css:lint'
]);

// default
gulp.task('default', [
    'build',
    'connect',
    'watch'
]);
