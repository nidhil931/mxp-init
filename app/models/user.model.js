
const { jwt, bcrypt } = mxp.packages;

const {tokenSecret} = mxp.config;

const hasher = password => {
    return bcrypt.hashSync(password, 10);
}


module.exports = connection => {
    return {
        schema: {
            fullName: {
                type: String,
                default: ''
            },
            firstName: {
                type: String,
                default: ''
            },
            lastName: {
                type: String,
                default: ''
            },
            email: {
                type: String,
                default: null
            },
            password: {
                type: String,
                default: null
            },
            googleId: {
                type: String,
                default: null
            },
            isActive: {
                type: Boolean,
                default: true
            },
            mobile: {
                type: String,
                default: ''
            }
        },
        options: {
            timestamps: true
        },
        statics: {
            getSession(auth, ...args) {
                return new Promise((resolve, reject) => {
                    if (auth.split(' ')[0] == 'Bearer') {
                        jwt.verify(auth.split(' ')[1], tokenSecret, (err, decoded) => {
            
                            if (err) {
                                return reject({
                                    status: 403,
                                    message: err.message || "Invalid token"
                                })
                            }
                            this.findById(decoded.user).select('-password')
                                .then(user => {
                                    if (user) {
                                        // let accessLevel = req.headers['access-level'];
                                        let accessLevel = null;
                                        if (
                                            (!accessLevel || (
                                                accessLevel == 'back office' && (user.isAdmin || user.boAccess)
            
                                            )) &&
                                            (
                                                args.length <= 0
                                                || user.isAdmin
                                                || (user.rolesAssigned && (intersection(args, user.rolesAssigned.rights).length > 0))
                                            )
                                        ) {
                                            
                                            return resolve(user)
                                        } else {
                                            return reject({
                                                status: 401,
                                                message: "Not allowed"
                                            });
                                        }
                                    } else {
                                        return reject({
                                            status: 403,
                                            message: "Invalid user"
                                        });
                                    }
                                })
                                .catch(err => {
                                    return reject({
                                        status: 500,
                                        message: err.message || "Unknown error occurred"
                                    });
                                })
                        });
                    } else {
                        return reject({
                            status: 403,
                            message: "Invalid token"
                        });
                    }
                })
            
            }
        },
        methods: {
            comparePassword(password) {
                return bcrypt.compareSync(password, this.password);
            },
            hashPassword() {
                this.password = hasher(this.password);
            },
            generateSession() {

                let token = jwt.sign(
                    {
                        user: this._id
                    },
                    tokenSecret,
                    {
                        expiresIn: 60 * 60 * 24
                    }
                );
                return Promise.resolve({
                    token
                })
            },
            changePassword(oldPassword, newPassword) {
                return promise.then(() => {
                    if (!this.password || this.comparePassword(oldPassword)) {
                        this.password = newPassword;
                        this.hashPassword();
                        return this.save();
                    } else {
                        return Promise.reject({
                            status: 405,
                            message: "Old password does not match"
                        });
                    }
                })
            }
        },

        plugins: [
            [mxp.packages.mongooseSequence(connection), { inc_field: "userId" }]
        ]
    }
}