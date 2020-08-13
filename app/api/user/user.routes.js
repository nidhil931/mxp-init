
module.exports = user => {
    return {
        routes: [
           
            {
                action: 'POST',
                path: '/login-with-email',
                resolve: user.loginWithEmail
            },
            {
                action: 'GET',
                path: '/me',
                before: [
                    mxp.middlewares.auth()
                ],
                resolve: user.getMe
            },
            {
                action: 'POST',
                path: '/register',
                resolve: user.userRegistration
            }
        ]
    }
}