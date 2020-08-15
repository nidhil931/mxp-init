const {middlewares} = mxp;

module.exports = shipper => {
    return {
        routes: [
            {
                path: '/',
                action: 'POST',
                before: [
                    middlewares.auth()
                ]
            },
            {
                path: '/',
                action: 'GET',
                before: [
                    middlewares.auth()
                ]
            },
        ]
    }
} 