const gulp = require('gulp');

// connect
gulp.task('connect', require('./tasks/connect'));

// scripts
gulp.task('js', require('./tasks/scripts').bundle);
gulp.task('js:watch', require('./tasks/scripts').watch);
gulp.task('js:lint', require('./tasks/scripts').lint);
gulp.task('modernizr', require('./tasks/scripts').modernizr);

// styles
gulp.task('css', require('./tasks/styles').bundle);
gulp.task('css:watch', require('./tasks/styles').watch);
gulp.task('css:lint', require('./tasks/styles').lint);

// html
gulp.task('html', require('./tasks/html').render);
gulp.task('html:watch', require('./tasks/html').watch);

// images
gulp.task('img:convert', require('./tasks/images').convert);
gulp.task('img:ls', require('./tasks/images').ls);

// build
gulp.task('build', [
    'modernizr',
    'html',
    'js',
    'css'
]);

// watch
gulp.task('watch', [
    'html:watch',
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
