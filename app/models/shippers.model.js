module.exports = c => {
    return {
        schema: {
            name: {
                type: String,
                required: true
            },
            owner: {
                type: c.ObjectId,
                ref: 'user'
            },

            employees: {
                type: [
                    {
                        role: {
                            type: String,
                            enum: ['staff'],
                            default: ''
                        },
                        user: {
                            type: c.ObjectId,
                            ref: 'user'
                        }
                    }
                ],
                default: []
            }
            // More fields can be added later
        },
        options: {
            timestamps: true
        },
        plugins: [
            [mxp.packages.mongooseSequence(c), { inc_field: 'shipperId' }]
        ]
    }
}