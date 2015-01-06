var fs = require('fs');

const FONTS_PATH = '/../fonts/';
const FONTS_POSTFIX = '.otf';

function load(font) {
    console.log(font)
    var content = fs.readFileSync(__dirname + FONTS_PATH + font + FONTS_POSTFIX, {encoding:'binary'});

    return content;
}



module.exports = {
    load: load
};