var fs = require('fs'),
    walkSync = require('./fswalker').walkSync;

const STYLES_PATH = '/../styles';
const STYLES_POSTFIX = '.css';

function load(style) {
    var content = fs.readFileSync(__dirname + STYLES_PATH + '/' +style + STYLES_POSTFIX, {encoding: 'utf-8'});

    return content;
}

function loadAll() {
    var styleFileNames = walkSync(__dirname + STYLES_PATH),
        path,
        dirs = [],
        i,
        fileName,
        postfixPos,
        site,
        style,
        result = {},
        postfix;

    for (i = 0; i < styleFileNames.length; i += 1) {

        path = styleFileNames[i];
        dirs = path.split('/');
        site = dirs[dirs.length - 2];
        fileName = dirs[dirs.length - 1];
        postfixPos = fileName.lastIndexOf('.');
        postfix = fileName.substring(postfixPos);
        style = fileName.substring(0, postfixPos);

        if (postfix === STYLES_POSTFIX) {
            if (!result[site]) {
                result[site] = {};
            }
            result[site][style] = fs.readFileSync(path, {encoding: 'utf-8'});
        }

    }

    return result;
}

module.exports = {
    load: load,
    loadAll: loadAll
};