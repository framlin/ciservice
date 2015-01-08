var fs = require('fs'),
    walkSync = require('./fswalker').walkSync;

const PARTIALS_PATH = '/../partials/';
const PARTIALS_POSTFIX = '.html';

function load(partial) {
    var content = fs.readFileSync(__dirname + PARTIALS_PATH + partial + PARTIALS_POSTFIX, {encoding: 'utf-8'});

    return content;
}



function loadAll() {
    var partials = walkSync(__dirname + PARTIALS_PATH),
        i,
        partial,
        key,
        pathEnd,
        postfixStart,
        result = {};

    for (i = 0; i< partials.length; i += 1) {
        partial = partials[i];
        pathEnd = partial.lastIndexOf('/');
        postfixStart = partial.lastIndexOf('.');
        key = partial.substring(pathEnd +1, postfixStart);
        result[key] = fs.readFileSync(partial, {encoding: 'utf-8'});
    }
    return result;
}

module.exports = {
    load: load,
    loadAll: loadAll
};