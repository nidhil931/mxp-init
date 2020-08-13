
module.exports = c => {
    return {
        schema: {
            storeName: {
                type: String,
                required: true
            },
            owner: {
                type: mxp.mongoose.Schema.Types.ObjectId,
                ref: 'user'
            },
            description: {
                type: String,
                default: ''
            },
            isOpen: {
                type: Boolean,
                default: false
            },
            storeIdentifier: {
                type: String,
                required: true
            },
            whatsappNumber: {
                type: String,
                required: true
            },
            address: {
                type: String,
                default: ''
            },
            acceptableOrderDelivery: {
                type: [String],
                enum: ['homeDelivery', 'selfPickup'],
                default: ['selfPickup']
            },
            minimumOrderForDelivery: {
                type: Number,
                default: 0
            },
            minimumOrderForFreeDelivery: {
                type: Number,
                default: 0
            },
            deliveryFees: {
                type: Number,
                default: 0.0
            },
            deliveryTax: {
                type: Number,
                default: 0.0
            },
            discount: {
                type: Number,
                default: 0
            }
        },
        options: {
            timestamps: true
        },
        plugins: [
            [mxp.packages.mongooseSequence(c), { inc_field: "storeId" }]
        ]
    }
}