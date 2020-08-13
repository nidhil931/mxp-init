module.exports = c => {
    return {
        schema: {
            categoryName: {
                type: String,
                required: true
            },
            store: {
                type: c.Schema.Types.ObjectId,
                ref: 'stores'
            },
            subCategories: {
                type: [
                    {
                        type: c.Schema.Types.ObjectId,
                        ref: 'categories'
                    }
                ]
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