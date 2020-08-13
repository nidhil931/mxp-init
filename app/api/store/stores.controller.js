const {filterObject} = mxp.services.util;

const fn = {
    // read: req=>{
    //     return Promise.resolve('yess');
    // },
    getStore: req => {
        console.log('called');
        return mxp.models.stores.aggregateSkipDelete([
            {
                $match: {
                    $expr: {
                        $eq: ["$owner", req.user._id]
                    }
                }
            }
        ])
    },
    addStore(req) {
        
        return filterObject(req.body, [], false, doc=>{
            if(!(doc.storeName && doc.storeIdentifier && doc.whatsappNumber )) {
                return Promise.reject({
                    status: 400,
                    message: "`storeName`, `storeIdentifier` and `whatsappNumber` are required"
                });
            }
            return Promise.all([doc, mxp.db.models.stores.findOne({
                storeIdentifier: new RegExp('^'+doc.storeIdentifier+'$', 'i')
            })])
        })
        .then(([doc, store])=>{
            if(!store) {
                return new mxp.db.models.stores({
                    storeName: doc.storeName,
                    storeIdentifier: doc.storeIdentifier,
                    whatsappNumber: doc.whatsappNumber,
                    owner: req.user._id
                }).save()
            }else{
                return Promise.reject({
                    status: 403,
                    message: "Store Identifier not available"
                })
            }
            
        })
    }
}


module.exports = fn;