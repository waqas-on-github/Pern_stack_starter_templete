import { Router } from "express";

const router = Router() 


router.get("/" ,( req, res) => {
    res.send("working at user ...")
})


export {router}