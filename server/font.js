var fs = require('fs');

const FONTS_PATH = '/../fonts/';
const FONTS_POSTFIX = '.otf';

function load(font) {
    var content = fs.readFileSync(__dirname + FONTS_PATH + font + FONTS_POSTFIX, {encoding:'binary'});
    return content;
}

function loadAll() {
    var result = {
            'TeXMono' :         load('texgyrecursor-regular'),
            'TeXMono_Bold':     load('texgyrecursor-bold'),
            'TeX':              load('texgyreschola-regular'),
            'TeX_Bold':         load('texgyreschola-bold'),
            'TeXSans':          load('texgyreadventor-regular'),
            'TeXSans_Bold':     load('texgyreadventor-bold'),
            'telegrame':        load('telegrama_render_osn')
        };
        return result;
}

module.exports = {
    load: load,
    loadAll: loadAll
};