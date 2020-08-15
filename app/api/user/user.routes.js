module.exports = user => {
    return {
        routeResolverOptions: {
            defaultRoutes: false
        },
        routes: [
            {
                action: 'POST',
                path: '/login-with-email',
                resolve: user.loginWithEmail
            },
            {
                action: 'POST',
                path: '/register',
                resolve: user.register
            },
            {
                action: 'GET',
                path: '/me',
                before: [
                    mxp.middlewares.auth()
                ],
                resolve: user.getMe
            }
        ]
    }
}