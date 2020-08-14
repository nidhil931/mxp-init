module.exports = c => {
    return {
        schema: {
            shipments: {
                type: [
                    {
                        type: c.ObjectId,
                        ref: 'shipments'
                    }
                ],
                default: []
            },
            addedBy: {
                type: c.ObjectId,
                ref: 'user'
            },
            quotationParticulars: {
                type: [],
                default: []
            },

            // More fields to be added later for quotation details
        },
        options: {
            timestamps: true
        },

        plugins: [
            [mxp.packages.mongooseSequence(c), { inc_field: 'quotationId' }]
        ]
    }
}