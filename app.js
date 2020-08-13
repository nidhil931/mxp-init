global.mxp = {};
mxp.config = require('./config');
require('mxp-rest-engine')(require('./bootstrap'), mxp).listen(mxp.config.PORT, () => {
    console.log('Server listening at  '+mxp.config.PORT);
});
