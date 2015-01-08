var restify         = require('restify'),
    ServerPort      = require('fr-infra').ServerConfig.ciservice.port,

    partialCache    = require('./partial').loadAll(),
    imageCache      = require('./image').loadAll(),
    fontCache       = require('./font').loadAll(),
    styleCache      = require('./style').loadAll();

function serveData(req, res, cache, mimeType, isText) {
    var path = req.params.path,
        site = req.params.site,
        result = cache[path],
        header = {
            'Content-Type': mimeType
        },
        binary;

    if (cache[site]) {
        result = cache[site][path];
    }


    if (isText) {
        header['Content-Length'] =  Buffer.byteLength(result);
    } else {
        binary = 'binary';
    }

    res.writeHead(200, header);
    res.end(result, binary);

}

function ciPartial(req, res, next) {
    serveData(req, res, partialCache, 'text/html', true);
}

function ciStyle(req, res, next) {
    serveData(req, res, styleCache, 'text/css', true);
}

function ciImage(req, res, next) {
    serveData(req, res, imageCache, 'image/png');
}

function ciFont(req, res, next) {
    serveData(req, res, fontCache, 'application/x-font-opentype');
}


// ----------- run ----------------------------
var server = restify.createServer();

server.use(restify.CORS( {credentials: true, headers: ['x-framlin-ci']}));
server.use(restify.fullResponse());

server.get('/ci/:site/partial/:path', ciPartial);
server.get('/ci/:site/style/:path', ciStyle);
server.get('/ci/:site/image/:path', ciImage);
server.get('/ci/font/:path', ciFont);

server.listen(ServerPort, function() {
    console.log('%s listening at %s', server.name, server.url);
});
