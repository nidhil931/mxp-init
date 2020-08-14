module.exports = user => {
    return {
        routes: [
            {
                action: 'GET',
                path: '/',
                before: [
                    mxp.middlewares.auth()
                ]
            }
        ]
    }
}