'use strict';

var args = require('yargs').argv;
var path = require('path');
var uniq = require('lodash').uniq;
var gulp = require('gulp');
var debug = require('gulp-debug');
var resize = require('gulp-image-resize');
var webp = require('imagemin-webp');

var paths = require('./paths.json').images;

var sizes = [{
    width: 1280,
    height: 720
}, {
    width: 960,
    height: 540
}, {
    width: 800,
    height: 450
}, {
    width: 640,
    height: 360
}];

function listImages(search) {
    var config = require('../src/model/config.json');
    var projects = config.projects;
    if (search) {
        projects = projects.filter(function(project) {
            return project.title.toLowerCase().indexOf(search) > -1;
        });
    }

    return projects
        .filter(function(project) {
            return project.visible;
        })
        .map(function(project) {
            return uniq(project.images.concat([project.thumb]));
        })
        .reduce(function(value, images) {
            return value.concat(images);
        }, []);
}

function getSrcImages(search) {
    return listImages(search)
        .map(function(image) {
            return paths.entry + '/**/' + path.basename(image, '.jpg') + '.*';
        });
}

// function resizeJPG(size) {
//     return resize({
//         format: 'jpg',
//         width: size.width,
//         height: size.height,
//         crop: false,
//         upscale: false,
//         quality: 1,
//         filter: 'Catrom',
//         sharpen: false
//     });
// }

function convertJPG(quality) {
    return resize({
        format: 'jpg',
        quality: quality
    });
}

function convertWebP(quality) {
    return webp({
        quality: quality
    })();
}

function resizePNG(size) {
    return resize({
        width: size.width,
        height: size.height,
        crop: false,
        upscale: false,
        filter: 'Catrom',
        sharpen: false
    });
}

function convert() {
    sizes.forEach(function(size) {

        gulp.src(getSrcImages(args.project))
            .pipe(debug())
            .pipe(resizePNG(size))
            .pipe(convertJPG(0.9))
            .pipe(gulp.dest(paths.dest + '/' + size.width + 'x' + size.height));

        gulp.src(getSrcImages(args.project))
            .pipe(debug())
            .pipe(resizePNG(size))
            .pipe(convertWebP(90))
            .pipe(gulp.dest(paths.dest + '/' + size.width + 'x' + size.height));
    });
}

module.exports = {
    convert: convert,
    ls: function() {
        listImages().forEach(function(image) {
            console.log(image);
        });
    }
};
