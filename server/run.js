var restify         = require('restify'),
    ServerPort      = require('fr-infra').ServerConfig.ciservice.port,
    fontCache       = require('./font').loadAll();

var fs = require('fs');

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
    fs.createReadStream(__dirname + '/../partials/'+req.params.path+'.html').pipe(res);
}

function ciStyle(req, res, next) {
    fs.createReadStream(__dirname + '/../styles/'+req.params.site+'/'+req.params.path+'.css').pipe(res);
}

function ciImage(req, res, next) {
    fs.createReadStream(__dirname + '/../images/'+req.params.path+'.png').pipe(res);
}

function ciFont(req, res, next) {
    serveData(req, res, fontCache, 'application/x-font-opentype');
}


// ----------- run ----------------------------
var server = restify.createServer();

// server.use(restify.CORS( {credentials: true, headers: ['x-framlin-ci']}));
// server.use(restify.fullResponse());

server.get('/ci/:site/partial/:path', ciPartial);
server.get('/ci/:site/style/:path', ciStyle);
server.get('/ci/:site/image/:path', ciImage);
server.get('/ci/font/:path', ciFont);

server.listen(ServerPort, function() {
    console.log('%s listening at %s', server.name, server.url);
});
