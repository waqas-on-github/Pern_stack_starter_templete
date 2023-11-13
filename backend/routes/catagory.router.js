import { Router } from "express";
import { createCatagory, getAllCatagories } from "../controlers/catagoty.controler.js";

const router =  Router() 

router.get("/" , (req, res) => {
    res.send("catagory route is working ... ")
})



router.post("/new" , createCatagory)
router.get("/all" , getAllCatagories)

export {router}
