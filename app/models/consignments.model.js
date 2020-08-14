module.exports = c => {
    return {
        schema: {
            shipmentId: {
                type: c.ObjectId,
                ref: 'shipments',
                required: true
            },
            commissionPercent: {
                type: Number,
                default: 0
            },
            basePrice: {
                type: Number,
                default: 0.0
            },
            proposalType: {
                type: String,
                enum: ['fcfs', 'bidding'],
                default: 'bidding'
            },
            bidsPlaced: {
                type: [],
                default: []
            },
            awardedTo: {
                type: c.ObjectId,
                ref: 'carriers',
                default: null
            },
            // More fields to be added in further development
        },
        options: {
            timestamps: true
        },
        plugins: [
            [mxp.packages.mongooseSequence(c), { inc_field: 'consignmentId' }]
        ]

    }
}