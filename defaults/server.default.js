var fs = require('fs'),
    path = require('path'),
    yms = require('../'),
    plg = yms.plugins,
    // You can require your own packages.
    express = yms.express,
    minimist = yms.minimist;

var args = minimist(process.argv);

setupServer();

function setupServer () {
    var app = express(),
        args = minimist(process.argv),
        source = args.port || args.p || args.socket || 8000,
        sourceType = isNaN(parseInt(source)) ? 'socket' : 'port';

    app.get(['/', '/:action(init|index|combine|map)(.js|.xml)?'], handleYms);

    app.listen(source, function () {
        if (sourceType == 'socket') {
            fs.chmod(source, '0777');
        }

        console.log('Server `yms` is listening `' + source + '`.');
    });
}

function handleYms (req, res) {
    var buildPath = path.resolve(__dirname, './build/'),
        mode = req.query.mode,
        data = {
            req: req,
            res: res,
            src: buildPath + (mode ? mode + '/' : ''),
            env: {},
            development: args.development,
            cacheEnabled: !args.development
        };

    res.set('Content-Type', 'text/javascript');

    switch (req.params.action) {
        case 'combine': return handleCombine(data);
        case 'map': return handleMap(data);
        default: return handleInit(data);
    }
}

function handleInit (data) {
    plg.init.src(data)
        .pipe(plg.init.setupAsync(data))
        .pipe(plg.closure(data))
        .pipe(plg.contents(data))
        .pipe(data.res);
}

function handleCombine (data) {
    plg.combine.src(data)
        .pipe(plg.combine.format(data))
        .pipe(plg.jsonp(data))
        .pipe(plg.contents(data))
        .pipe(data.res);
}

function handleMap (data) {
    plg.map.src(data)
        .pipe(plg.jsonp(data))
        .pipe(plg.contents(data))
        .pipe(data.res);
}