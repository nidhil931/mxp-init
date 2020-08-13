

module.exports = function(...args){
    return (req, res, next) => {

        // For optional authorization
        if(!req.headers.authorization) {
            if(args.length > 0 && args.indexOf('optional') >= 0) {
                return next();
            }else{
                return res.status(403).send({
                    message: "Token not provided"
                });
            }
            
        }
        let optionalIndex = args.indexOf('optional');
        if(optionalIndex >= 0) {
            args.splice(optionalIndex, 1);
        }

        let auth = req.headers.authorization;
        mxp.models.user.getSession(auth, ...args)
        .then(user=>{
            req.user = user;
            next();
        })
        .catch(err=>{
            return res.status(err.status || 500).send({
                message: err.message || "Unknow error occured"
            })
        })
        
    }
    
}