module.exports = c=> {
    return {
        schema: {
            uri: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            user: {
                type: c.ObjectId,
                ref: 'user',
                default: null
            }
        },
        options: {
            timestamps: true
        }
    }
} 