const fs = require('fs');
const argv = require('yargs').argv;
const _ = require('lodash');
const glob = require('glob');
const path = require('path');

const cwd = process.cwd();
const input = argv.i || argv._[0];
const output = argv.o;
const debug = !!argv.debug;
const dataPath = argv.d || argv.data;
const data = require(`${cwd}/${dataPath}`);
const tmplData = Object.assign({}, argv, data, {
    data,
    debug
});

glob(input, (err, files) => {
    if (err) {
        console.error(err);
        return;
    }

    const dir = path.resolve(cwd, output);

    files.forEach(file => {
        const tmpl = fs.readFileSync(file).toString();
        const name = path.basename(file);//.slice(0, 0 - path.extname(src).length);
        fs.writeFileSync(`${dir}/${name}`, _.template(tmpl)(tmplData));
    });
});
