import Prisma from "../prisma.js";
import CustomError from "../utils/CustomError.js";
import asyncHandler from "../utils/asyncHandler.js";

const createProudct = asyncHandler(async (req, res) => {

  if (!Object.keys(req.body).length) {
    throw new CustomError("no  data found found", 401);
  }

  const productExist = await Prisma.product.findUnique({
    where: { name: req.body.name },
  });

  if (productExist) {
    throw new CustomError(" product already exists ", 401);
  }

  const product = await Prisma.product.create({ data: req.body });

  if (!product) {
    throw new CustomError(" product can not be create ", 400);
  }

  res.status(201).json({
    sucess: true,
    product: product,
  });
});


const getALLProducts =  asyncHandler(async (req, res) => {
    
        const products = await Prisma.product.findMany({
        });

        if (products.length === 0) {
            throw new CustomError("no products found" , 401)
        }

        res.status(200).json({
            success: true,
            products: products
        });
    
})




export { createProudct , getALLProducts };
