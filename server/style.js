var fs = require('fs');

const STYLES_PATH = '/../styles/';
const STYLESS_POSTFIX = '.css';

function load(style) {
    var content = fs.readFileSync(__dirname + STYLES_PATH + style + STYLESS_POSTFIX, {encoding: 'utf-8'});

    return content;
}



module.exports = {
    load: load
};