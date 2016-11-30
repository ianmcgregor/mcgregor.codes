// Requires vips:
// brew install homebrew/science/vips --with-webp --with-graphicsmagick

const gulp = require('gulp');
const resize = require('gulp-responsive');
// const changed = require('gulp-changed');
const paths = require('../package.json').paths.images;

// function scaleImg(scale) {
//     return resize({
//         '*': {
//             width: (scale * 100) + '%',
//             rename: {suffix: '@' + scale + 'x'}
//         }
//     }, {
//         quality: 90,
//         progressive: true,
//         compressionLevel: 9,
//         withMetadata: false
//     });
// }

function sizeImages(sizes, formats) {

    const images = sizes.reduce((arr, size) => {
        return arr.concat(formats.map((format) => {
            return {
                width: size,
                rename: {
                    suffix: '_' + size,
                    extname: '.' + format
                }
            };
        }));
    }, []);

    console.log(images);
    return resize({
        '*': images
    }, {
        quality: 90,
        progressive: true,
        compressionLevel: 9,
        withMetadata: false,
        errorOnEnlargement: false
    });
}

module.exports = {
    size: function() {
        const sizes = [1536, 1280, 1024, 768, 640];
        const formats = ['jpg', 'webp'];

        gulp.src(paths.entry)
            // .pipe(require('gulp-debug')())
            // .pipe(changed(entry))
            .pipe(sizeImages(sizes, formats))
            .pipe(gulp.dest(paths.dest));
    }
};
