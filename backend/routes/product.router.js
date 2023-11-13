import { Router } from "express";
import { createProudct, getALLProducts } from "../controlers/product.controler.js";


const router = Router()


router.get('/' , (req, res) => {
    res.send("product route is working ...")
})

router.post("/new" , createProudct)
router.get('/all' , getALLProducts)

export {
    router
}