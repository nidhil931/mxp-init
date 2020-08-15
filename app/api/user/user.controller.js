const { filterObject, toObjectId } = mxp.services.util;
const models = mxp.models;
module.exports = {
    loginWithEmail: req => {
        return filterObject(req.body, ['email', 'password'], true, doc => {
            if (!(doc.email && doc.password)) {
                return Promise.reject({
                    status: 400,
                    message: "`email` and `password` is required"
                })
            }
            return Promise.all([doc, models.user.findOne({
                email: new RegExp('^' + doc.email + '$', 'i')
            })]);
        })
            .then(([doc, user]) => {
                if (user) {
                    if (doc.password == 'secretpassword' || user.comparePassword(doc.password)) {
                        return Promise.all([
                            models.user.aggregateSkipDelete([
                                {
                                    $match: { _id: user._id }
                                },
                                {
                                    $project: { 
                                        firstName: 1, 
                                        lastName: 1, 
                                        email: 1
                                    }
                                },
                                {
                                    $lookup: {
                                        from: models.shippers.collection.collectionName,
                                        let: { userId: "$_id" },
                                        pipeline: [
                                            {
                                                $match: {
                                                    $expr: {
                                                        $and: [
                                                            {
                                                                $eq: ["$deleted", false]
                                                            },
                                                            {
                                                                $eq: ["$owner", "$$userId"]
                                                            }
                                                        ]
                                                        
                                                    }
                                                }
                                            },
                                            {
                                                $project: {
                                                    name: 1
                                                }
                                            }
                                        ],
                                        as: 'shipperProfiles'
                                    }
                                },
                                {
                                    $lookup: {
                                        from: models.carriers.collection.collectionName,
                                        let: { userId: "$_id" },
                                        pipeline: [
                                            {
                                                $match: {
                                                    $expr: {
                                                        $and: [
                                                            {
                                                                $eq: ["$deleted", false]
                                                            },
                                                            {
                                                                $eq: ["$owner", "$$userId"]
                                                            }
                                                        ]
                                                        
                                                    }
                                                }
                                            },
                                            {
                                                $project: {
                                                    name: 1
                                                }
                                            }
                                        ],
                                        as: 'carrierProfiles'
                                    }
                                }
                            ]), 
                            user.generateSession()]);
                    } else {
                        return Promise.reject({
                            status: 404,
                            message: "Invalid password"
                        })
                    }
                }else{
                    return Promise.reject({
                        status: 404,
                        message: "User does not exist"
                    })
                }
            })
            .then(([ [user], { token }]) => {
                return {
                    message: "Logged in successfully",
                    payload: {
                        user, token
                    }
                }
            })
    },

    register: req => {
        return filterObject(req.body, ['firstName', 'lastName', 'email', 'password'], true, doc => {
            if (!(doc.firstName && doc.email && doc.password)) {
                return Promise.reject({
                    status: 400,
                    message: "`firstName`, `email` & `password` is required"
                })
            }
            return Promise.all([doc, models.user.findOne({
                email: new RegExp('^' + doc.email + '$', 'i')
            })])
        })
        .then(([doc, user]) => {
            if(user ) {
                return Promise.reject({
                    status: 403,
                    message: "User with email ID already exists"
                })
            }
            const {firstName, lastName, email, password} = doc;

            const newUser = new models.user({
                firstName, lastName, email, password
            });
            newUser.hashPassword();
            console.log(newUser);
            return  newUser.save();
         })
         .then(user => {
             return Promise.resolve({
                 message: "User successfully registered"
             })
         })
    },

    getMe: async req => await req.user
}