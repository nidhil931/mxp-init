module.exports = {
    PORT: parseInt(process.env.PORT) || "3000",
    mongoUrl: 'mongodb://nidhil:secretpassword@13.233.84.8:27017/fs?authSource=gruzgo',
    tokenSecret: 'fssecretcode'
}