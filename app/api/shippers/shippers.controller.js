const {models, services} = mxp; 
const { filterObject } = services.util


module.exports = {
    create(req) {
        return filterObject(req.body, [], false, doc => {
            if(!doc.name) {
                return Promise.reject({
                    status: 400, 
                    message: '`name` is required'
                })
            }
            
            return Promise.all([
                doc, 
                mxp.models.shippers.findOne({
                    // name: doc.name, 
                    owner: req.user._id
                })
            ])
        })
        .then(([doc, shipper]) => {
            if(shipper) {
                return Promise.reject({
                    status: 403,
                    message: "You already own a shipper service"
                })
            }else{
                return new models.shippers({
                    name: doc.name, owner: req.user._id
                }).save()
            }
        })
    },
    read(req) {
        return models.shippers.aggregateSkipDelete([
            {
                $match: { owner: req.user._id }
            }
        ])
    }
}