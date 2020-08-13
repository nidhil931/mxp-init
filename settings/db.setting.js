module.exports = {
    options: {
        url: mxp.config.mongoUrl,
        useNewUrlParser: true,
        plugins: [
            [require('mongoose-delete'), {overrideMethods: 'all'}],
            schema => {
                schema.statics.aggregateSkipDelete = function(arr) {
                    arr = arr || [];
                    return this.aggregate([
                        {
                            $match: {
                                deleted: false
                            }
                        },
                        ...arr
                    ]);
                }
            }
        ]
    },
    onSuccess: db => {
        console.log('DB connected successfully');
    },
    onError: err => {
        console.log("DB connection failed", err);
    }
}