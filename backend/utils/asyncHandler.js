function asyncHandler (fun) {
    
        return async function(req, res, next) {
            try {
                 await fun(req, res, next)
            } catch (error) {
                console.log( "error name " , error.name);
                next(error)
            }
        }
    
    
}


export default asyncHandler