const args = require('yargs').argv;
const chalk = require('chalk');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const rename = require('gulp-rename');
const debug = require('gulp-debug');
const template = require('gulp-template');

const paths = require('../package.json').paths.html;
const config = require('../src/model/config.json');
const isProduction = args.min; // eg: gulp --min


function logError(msg) {
    console.log(chalk.bold.red('[ERROR] ' + msg.toString()));
}

function renderPage(page, name) {
    const templateData = {
        data: config,
        debug: !isProduction,
        min: isProduction ? '.min' : '',
        path: isProduction ? paths.dest : '',
        title: config.title.toUpperCase()
    };

    var dest = isProduction ? paths.destMin : paths.dest;

    if (page) {
        dest += page.route.slice(1);
        templateData.path = '../' + templateData.path;
        templateData.title += ' / ' + page.title.toUpperCase();
    }

    return gulp.src(paths.entry)
        .pipe(template(templateData)
        .on('error', function(err) {
            logError(err);
        }))
        .pipe(gulpif(!!name, rename(name)))
        .pipe(gulp.dest(dest))
        .pipe(debug({title: 'html'}));
}

function render() {
    renderPage();

    if (isProduction) {
        renderPage(null, '404.html');
        config.pages.forEach(function(page) {
            renderPage(page);
        });
    }
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
