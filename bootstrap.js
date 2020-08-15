const cors = require("cors");
const bodyParser = require("body-parser");
const errorlog = require("express-errorlog");
mxp.mongoose = require('mongoose');

module.exports = {

    before: [
        cors({ credentials: true }),
        errorlog,
        bodyParser.urlencoded({ extended: true }),
        bodyParser.json()
    ],
    apiGroups: [

        {
            path: '/api/v1',
            name: 'version 1',
            before: [
                
            ],
            apiGroupModule: 'api'
        }
    ],
    routeResolverOptions: {
        onResult: (ctx, result) => {
            result.then(data => ctx.res.send(data)).catch(err =>ctx.next(err))
        }
    },
    after: [
        // For errorlog
        (err, req, res, next) => {
            const { status, message } = err;
            res.status(status || 500).json({ 
                message: message || 'Unknown error occured'
            });
        }

    ],
    db: {
        type: 'mongoose',
        ...require('./settings/db.setting')
    },

    packages: require('./app/packages'),

    appIntercept: app => {
        app.use('/', (req, res)=> res.send("It works") );
        return app;
    }
}