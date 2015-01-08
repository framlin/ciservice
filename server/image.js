var fs = require('fs'),
    walkSync = require('./fswalker').walkSync;

const IMAGES_PATH = '/../images';
const IMAGES_POSTFIX = '.png';

function load(image) {
    var content = fs.readFileSync(__dirname + IMAGES_PATH + '/' + image + IMAGES_POSTFIX, {encoding:'binary'});

    return content;
}

function loadAll() {
    var images = walkSync(__dirname + IMAGES_PATH),
        i,
        image,
        key,
        pathEnd,
        postfixStart,
        result = {};

    for (i = 0; i< images.length; i += 1) {
        image = images[i];
        pathEnd = image.lastIndexOf('/');
        postfixStart = image.lastIndexOf('.');
        key = image.substring(pathEnd +1, postfixStart);
        result[key] = fs.readFileSync(image, {encoding: 'binary'});
    }
    return result;
}


module.exports = {
    load: load,
    loadAll: loadAll
};