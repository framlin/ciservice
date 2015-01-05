var fs = require('fs');

const IMAGES_PATH = '/../images/';
const IMAGES_POSTFIX = '.png';

function load(image) {
    var content = fs.readFileSync(__dirname + IMAGES_PATH + image + IMAGES_POSTFIX, {encoding:'binary'});

    return content;
}



module.exports = {
    load: load
};