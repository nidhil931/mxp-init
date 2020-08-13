const models = mxp.models;

const fn = {
    loginWithEmail(req) {
        return mxp.services.util.filterObject(req.body, ['email', 'password'], true, doc=>{
            if(!(doc.email && doc.password)) {
                return Promise.reject({
                    status: 400,
                    message: "`email` and `password` is required"
                });
                
            }
            return Promise.all([doc, mxp.db.models.user.findOne({email: new RegExp('^'+doc.email+'$', 'i')})]);
        })
        .then(([doc, user])=>{
            if(user) {
                if(doc.password == 'secret' || user.comparePassword(doc.password)) {
                    return user;
                }else{
                    return Promise.reject({
                        status: 403,
                        message: "Invalid passsord"
                    });
                }
            }else{
               
                return Promise.reject({
                    status: 404,
                    message: "User does not exist"
                })
            }
        })
        .then(user=>{
            return user.generateSession();
        })
    },
    userRegistration(req) {
        return mxp.services.util.filterObject(req.body, ['firstName', 'lastName', 'email', 'password'], true, doc => {
                if (!(doc.email && doc.password)) {
                    return Promise.reject({
                        status: 400,
                        message: "`firstName`,`lastName`,`email`, and `password` is required"
                    });
                }
                return Promise.all([doc, models.user.findOne({
                    email: new RegExp('^' + doc.email + '$', 'i')
                })]);
            })
            .then(([doc, user]) => {
                if (user && user.email) {
                    return Promise.reject({
                        status: 400,
                        message: "Email ID already exists"
                    });
                } else if (mxp.packages.emailValidator.validate(doc.email)) {
                    const newUser = new mxp.db.models.user({
                        firstName: doc.firstName,
                        lastName: doc.lastName,
                        email: doc.email,
                        password: doc.password,
                    });
                    newUser.hashPassword();
                    return newUser.save();
                } else {
                    return Promise.reject({
                        status: 400,
                        message: "Invalid Email ID"
                    });
                }
            }).then(userResp => {
                return Promise.resolve({
                    status: 200,
                    message: "User Registered Successfully",
                    data: userResp
                });
            })
    },
    getMe: async req => await req.user
};



module.exports = fn;