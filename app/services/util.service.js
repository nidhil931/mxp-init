module.exports = {
    filterObject: (obj, objArray, include, cb)=> {
        try {
            let ret = include?{}:Object.assign({}, obj);
            for(let i=0; i<objArray.length; i++) {
                const key = objArray[i];
                if(obj[key] != undefined) {
                    if(include) {
                        ret[key] = obj[key];  
                    }else{
                        delete ret[key];
                    }
                }
            }
            if(cb) {
                return cb(ret);
            }else{
                return Promise.resolve(ret);
            }
        }catch(err) {
            console.log(err);
            return Promise.reject({
                message: err.message || "error at filterObject"
            })
        }
        
        
    },
    toObjectId: (id) => {
        try {
            return mongoose.Types.ObjectId(id)
        }catch(err){
            console.log('Invalid object id passed');
        }
        return null; 
        
    },
    model: m => m? mxp.models[m]: mxp.models
}