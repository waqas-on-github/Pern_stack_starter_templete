import Prisma from "../prisma.js";
import CustomError from "../utils/CustomError.js";
import asyncHandler from "../utils/asyncHandler.js";



const createCatagory = asyncHandler(async(req, res) => {

   if(!Object.values(req.body).length ) {
    throw new CustomError("not data found to insert")
   }
  

   const doseExist = await Prisma.catagory.findUnique({
    where : {name : req.body.name}
   })

   if(doseExist) {
    throw   new CustomError("catagory already exist" , 400)
   }


   const catagory = await Prisma.catagory.create({data : req.body})

   if(!catagory) {
    throw new CustomError("catagory can't be created ")
   }


   res.status(200).json ({
    success : true , 
    catagory : catagory
   })

} )

const getAllCatagories = asyncHandler(async(req, res ) => {

const catagories = await Prisma.catagory.findMany({
   
}) 



if(catagories.length===0) {
   throw new CustomError("no catagory found ")
}

res.status(200).json({
   success : true , 
   catagories : catagories
})

})

export {createCatagory  , getAllCatagories}