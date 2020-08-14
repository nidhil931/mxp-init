module.exports = c => {
    return {
        schema: {
            shipmentBy: {
                type: c.ObjectId,
                ref: 'shippers'
            },
            staffAssigned: {
                type: [
                    {
                        type: c.ObjectId,
                        ref: 'user'
                    }
                ],
                default: []
            },
            shipmentDetails: {}, 
            shipmentPackages: {
                type: [],
                default: []
            }
        },
        options: {
            timestamps: true
        },

        plugins: [
            [mxp.packages.mongooseSequence(c), { inc_field: 'shipmentId'}]
        ]
    }
}