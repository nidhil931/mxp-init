module.exports = c => {
    return {
        schema: {
            productName: {
                type: String,
                required: true
            },
            productDescription: {
                type: String,
                default: ''
            },
            productPrice: {
                type: Number,
                default: 0.0
            },
            productImages: {
                type: [String],
                default: []
            },
            isAvailable: {
                type: Boolean,
                default: true
            },
            isActive: {
                type: Boolean,
                default: true
            }
        },
        options: {
            timestamps: true
        }
    }
}