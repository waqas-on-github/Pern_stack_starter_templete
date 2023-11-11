import JWT from 'jsonwebtoken';
import CustomError from  '../utils/CustomError.js'
import asyncHandler from '../utils/asyncHandler.js';
import { User } from '../models/user.model.js';


export const isLoggendIn =   asyncHandler (async (req, res, next) =>{
    // 1 check if user has token 
    // 2 if user has token check if toke is same as before mean its not modified
    // 3 if both conditions are okey insert user to req

    let token;
  
     
    if (req?.cookies?.token || (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) ) {
        token = req.cookies.token || req.headers.authorization.split(" ")[1]
        
        // token = "Bearer gbhnjm235r5hbnj"
    }

    if (!token) {
        throw new CustomError("Not authorized to access this resource", 401)
    }

    
        const decodedJwtPayload = JWT.verify(token, process.env.SECRET);

         req.user = await User.findById(decodedJwtPayload._id, "name email role")
    

         next()
        if(!req.user) {
            throw new CustomError("Not authorized to access this resource", 401)
        }
    
    console.log(req.cookies);



})

// Define the authorize function
export const authorize = (...requiredRoles) => {
    return  function (req, res, next) {
      
        // Check if the user's role is included in the list of required roles
        if (!req.user || !requiredRoles.includes(req.user.role)) {
          // If req.user is undefined or the user's role is not in the required roles, throw an error

         return res.json({
           sucess : false ,
           error : ` ${req?.user?.role} are not allowed to access this resource`
          }
          )}

        // If the user's role is in the required roles, proceed to the next middleware/route handler
        
        next();
    }
    };


    