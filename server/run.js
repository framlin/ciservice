var restify = require('restify'),
    partial = require('./partial'),
    image = require('./image'),
    style = require('./style'),
    framlinCSS = style.load('framlin'),
    normalizeCSS = style.load('normalize'),
    topHTML = partial.load('top'),
    impressumHTML = partial.load('impressum'),
    bottomHTML = partial.load('bottom'),
    logo = image.load('framlin-logo-g+.jpg'),
    partialIndex = {
        'top' : topHTML,
        'impressum': impressumHTML,
        'bottom' : bottomHTML
    },
    imageIndex = {
        'logo' : logo
    },
    styleIndex = {
        'framlin': framlinCSS,
        'normalize': normalizeCSS
    };




function ciPartial(req, res, next) {
    var partial = req.params.path,
        resultHTML = partialIndex[partial];

    res.writeHead(200, {
        'Content-Length': Buffer.byteLength(resultHTML),
        'Content-Type': 'text/html'
    });
    res.write(resultHTML);
    res.end();
}

function ciStyle(req, res, next) {
    console.log(req.params.path)
    var style = req.params.path,
        resultCSS = styleIndex[style];

    res.writeHead(200, {
        'Content-Length': Buffer.byteLength(resultCSS),
        'Content-Type': 'text/css'
    });
    res.write(resultCSS);
    res.end();
}

function ciImage(req, res, next) {
    console.log(req.params.path)
    var image = req.params.path,
        resultPNG = imageIndex[image];

    //console.log(Buffer.byteLength(resultPNG));
    res.writeHead(200, {
        //'Content-Length': Buffer.byteLength(resultPNG),
        'Content-Type': 'image/png'
    });
    //res.write(resultPNG);
    res.end(resultPNG, 'binary');
}

var server = restify.createServer();
server.use(restify.CORS( {credentials: true, headers: ['x-framlin-cv']}));
server.use(restify.fullResponse());
server.get('/ci/partial/:path', ciPartial);
server.get('/ci/style/:path', ciStyle);
server.get('/ci/image/:path', ciImage);

server.listen(8088, function() {
    //console.log('%s listening at %s', server.name, server.url);
});
