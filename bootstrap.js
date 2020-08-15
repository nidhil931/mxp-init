
module.exports = {

    before: [],
    apiGroups: [],
    
    after: [],
    

    packages: require('./app/packages'),

    appIntercept: app => {
        app.use('/', (req, res)=> res.send("MXP server works") );
        return app;
    }
}