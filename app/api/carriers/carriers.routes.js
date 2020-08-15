const {middlewares} = mxp;

module.exports = carrier => {
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