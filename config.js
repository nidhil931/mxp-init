module.exports = {
    PORT: parseInt(process.env.PORT) || "3000",
    mongoUrl: 'mongodb://nidhil:secretpassword@13.233.84.8:27017/test?authSource=gruzgo',
    tokenSecret: 'whpsecretcode'
}