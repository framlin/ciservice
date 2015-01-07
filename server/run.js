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

    runjsCSS = style.load('runjs'),
    runjsLookCSS = style.load('runjs-look'),
    runjsLayoutCSS = style.load('runjs-layout'),

    logo = image.load('framlin-logo'),
    bullet = image.load('bullet'),

    TeXMono = font.load('texgyrecursor-regular'),
    TeXMono_Bold = font.load('texgyrecursor-bold'),
    TeX = font.load('texgyreschola-regular'),
    TeX_Bold = font.load('texgyreschola-bold'),
    TeXSans = font.load('texgyreadventor-regular'),
    TeXSans_Bold = font.load('texgyreadventor-bold'),
    telegrame = font.load('telegrama_render_osn'),

    topHTML = partial.load('top'),
    headingHTML = partial.load('heading'),
    topnavHTML = partial.load('topnav'),
    maintopHTML = partial.load('maintop'),
    impressumHTML = partial.load('impressum'),
    bottomnavHTML = partial.load('bottomnav'),
    disclaimerHTML = partial.load('disclaimer'),
    metanavHTML = partial.load('metanav'),
    bottomHTML = partial.load('bottom'),
    mainbottomHTML = partial.load('mainbottom'),

    partialIndex = {
        'top' : topHTML,
        'heading' : headingHTML,
        'topnav' : topnavHTML,
        'maintop' : maintopHTML,
        'impressum': impressumHTML,
        'bottomnav': bottomnavHTML,
        'disclaimer': disclaimerHTML,
        'metanav': metanavHTML,
        'mainbottom': mainbottomHTML,
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
        'runjs': runjsCSS,
        'runjs-look': runjsLookCSS,
        'runjs-layout': runjsLayoutCSS,
        'framlin': framlinCSS,
        'fr-look': framlinLookCSS,
        'fr-layout': framlinLayoutCSS,
        'normalize': normalizeCSS
    };


function serveData(req, res, idx, mimeType, isText) {
    var path = req.params.path,
        site = req.params.site,
        result = idx[path],
        header = {
            'Content-Type': mimeType
        },
        binary;

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

server.get('/ci/:site/partial/:path', ciPartial);
server.get('/ci/:site/style/:path', ciStyle);
server.get('/ci/:site/image/:path', ciImage);
server.get('/ci/font/:path', ciFont);

server.listen(ServerPort, function() {
    console.log('%s listening at %s', server.name, server.url);
});
