var restify = require('restify'),
    partial = require('./partial'),
    image = require('./image'),
    style = require('./style'),

    framlinCSS = style.load('framlin'),
    framlinLayoutCSS = style.load('fr-layout'),
    framlinLookCSS = style.load('fr-look'),
    normalizeCSS = style.load('normalize'),

    topHTML = partial.load('top'),
    impressumHTML = partial.load('impressum'),
    bottomHTML = partial.load('bottom'),

    logo = image.load('framlin-logo'),
    bullet = image.load('bullet'),

    partialIndex = {
        'top' : topHTML,
        'impressum': impressumHTML,
        'bottom' : bottomHTML
    },
    imageIndex = {
        'logo' : logo,
        'bullet': bullet
    },
    styleIndex = {
        'framlin': framlinCSS,
        'fr-look': framlinLookCSS,
        'fr-layout': framlinLayoutCSS,
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
    console.log(req.params.path);

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


function ciFont(req, res, next) {
    console.log(req.params.path);

    var style = req.params.path,
        resultCSS = styleIndex[style];

    res.writeHead(200, {
        'Content-Length': Buffer.byteLength(resultCSS),
        'Content-Type': 'text/css'
    });
    res.write(resultCSS);
    res.end();
}




var server = restify.createServer();
server.use(restify.CORS( {credentials: true, headers: ['x-framlin-cv']}));
server.use(restify.fullResponse());
server.get('/ci/partial/:path', ciPartial);
server.get('/ci/style/:path', ciStyle);
server.get('/ci/image/:path', ciImage);
server.get('/ci/font/:path', ciFont);

server.listen(8088, function() {
    //console.log('%s listening at %s', server.name, server.url);
});
