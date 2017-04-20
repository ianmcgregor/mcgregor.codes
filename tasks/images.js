const chalk = require('chalk');
const glob = require('glob');
const sharp = require('sharp');
const path = require('path');
const argv = require('yargs').argv;

const cwd = process.cwd();
const input = argv.i || argv._[0];
const output = argv.o;

const sizes = toArray(argv.sizes || argv.s) || [1536, 1280, 1024, 768, 640];
const types = toArray(argv.types || argv.t) || ['jpg', 'webp'];
const quality = argv.quality || argv.q || 80;

function toArray(str) {
    return str && str.split(',').map(s => s.trim());
}

function print(src, dest, info) {
    src = src.replace(`${cwd}/`, '');
    dest = dest.replace(`${cwd}/`, '');
    const kb = `${Math.round(info.size / 1024)}kb`;
    console.log('✓', src, '>', dest, kb);
    return info;
}

function resize({src, size, dest}) {
    return sharp(src, {
        quality: Number(quality)
    })
    .resize(Number(size))
    .toFile(dest)
    .then(info => print(src, dest, info));
}

function getFormats(src, dir) {
    return sizes.reduce((arr, size) => {
        return arr.concat(types.map(type => {
            const name = path.basename(src).slice(0, 0 - path.extname(src).length);
            const dest = `${dir}/${name}_${size}.${type}`;
            return {
                src,
                size,
                dest
            };
        }));
    }, []);
}

glob(input, (err, files) => {
    if (err) {
        console.error(err);
        return;
    }

    const dir = path.resolve(cwd, output);
    const paths = files.map(name => path.resolve(cwd, name));
    const images = paths.reduce((arr, name) => arr.concat(getFormats(name, dir)), []);

    Promise.all(images.map(image => resize(image)))
        .then(info => console.log('✓ Resized', info.length, 'images'))
        .catch(error => console.error(chalk.bold.red(error)));
});
