import { Router } from "express";

const router = Router() 


router.get("/" ,( req, res) => {
    res.send("express is working ... ")
})


export {router}