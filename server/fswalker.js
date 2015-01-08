var fs = require('fs');

function walkSync (dir) {
    var result = [],
        list = fs.readdirSync(dir);

    list.forEach(function cbEach(file) {
        file = dir + '/' + file;
        var stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            result = result.concat(walkSync(file));
        }
        else {
            result.push(file);
        }
    });
    return result;
}

module.exports = {
    walkSync: walkSync
};