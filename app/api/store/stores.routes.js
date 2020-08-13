
module.exports = store => {
    const {auth} = mxp.middlewares;
    return {
        routes: [
            {
                action: 'GET',
                path: '/',
                before: [
                    auth()
                ],
                resolve: store.getStore
            },
            {
                action: 'POST',
                path: '/',
                before: [
                    auth()
                ],
                resolve: store.addStore
            }
        ]
    }
}