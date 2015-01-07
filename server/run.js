var restify = require('restify'),
    ServerPort = require('fr-infra').ServerConfig.ciservice.port,
    partial = require('./partial'),
    image = require('./image'),
    style = require('./style'),
    font = require('./font'),

    framlinCSS = style.load('framlin'),
    framlinLayoutCSS = style.load('fr-layout'),
    framlinLookCSS = style.load('fr-look'),
    normalizeCSS = style.load('normalize'),

    topHTML = partial.load('top'),
    impressumHTML = partial.load('impressum'),
    showcasesHTML = partial.load('showcases'),
    disclaimerHTML = partial.load('disclaimer'),
    bottomHTML = partial.load('bottom'),

    logo = image.load('framlin-logo'),
    bullet = image.load('bullet'),

    TeXMono = font.load('texgyrecursor-regular'),
    TeXMono_Bold = font.load('texgyrecursor-bold'),
    TeX = font.load('texgyreschola-regular'),
    TeX_Bold = font.load('texgyreschola-bold'),
    TeXSans = font.load('texgyreadventor-regular'),
    TeXSans_Bold = font.load('texgyreadventor-bold'),
    telegrame = font.load('telegrama_render_osn'),

    partialIndex = {
        'top' : topHTML,
        'impressum': impressumHTML,
        'showcases': showcasesHTML,
        'disclaimer': disclaimerHTML,
        'bottom' : bottomHTML
    },
    imageIndex = {
        'logo' : logo,
        'bullet': bullet
    },
    fontIndex = {
        'TeXMono' : TeXMono,
        'TeXMono_Bold': TeXMono_Bold,
        'TeX': TeX,
        'TeX_Bold': TeX_Bold,
        'TeXSans': TeXSans,
        'TeXSans_Bold': TeXSans_Bold,
        'telegrame': telegrame
    },
    styleIndex = {
        'framlin': framlinCSS,
        'fr-look': framlinLookCSS,
        'fr-layout': framlinLayoutCSS,
        'normalize': normalizeCSS
    };


function serveData(req, res, idx, mimeType, isText) {
    var path = req.params.path,
        result = idx[path],
        header = {
            'Content-Type': mimeType
        },
        binary;

    console.log(path);
    if (isText) {
        header['Content-Length'] =  Buffer.byteLength(result);
    } else {
        binary = 'binary';
    }

    res.writeHead(200, header);
    res.end(result, binary);

}

function ciPartial(req, res, next) {
    serveData(req, res, partialIndex, 'text/html', true);
}

function ciStyle(req, res, next) {
    serveData(req, res, styleIndex, 'text/css', true);
}

function ciImage(req, res, next) {
    serveData(req, res, imageIndex, 'image/png');
}

function ciFont(req, res, next) {
    serveData(req, res, fontIndex, 'application/x-font-opentype');
}



// ----------- run ----------------------------
var server = restify.createServer();

server.use(restify.CORS( {credentials: true, headers: ['x-framlin-cv']}));
server.use(restify.fullResponse());

server.get('/ci/partial/:path', ciPartial);
server.get('/ci/style/:path', ciStyle);
server.get('/ci/image/:path', ciImage);
server.get('/ci/font/:path', ciFont);

server.listen(ServerPort, function() {
    console.log('%s listening at %s', server.name, server.url);
});
