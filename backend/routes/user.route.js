import { Router } from "express";
import {
  deleteAllUsers,
  deleteOneUser,
  getAllUsers,
  getProfile,
  login,
  logout,
  signUp,
  updateOneUser,
} from "../controlers/user.controler.js";
import { isLoggendIn , authorize } from "../middlewares/auth.middleware.js";

const router = Router() 


router.post('/new', signUp)
router.post('/login' , login )

router.get('/', isLoggendIn, getAllUsers) 
router.get("/logout", logout)
router.get("/:id", getProfile)

router.delete('/delete',  deleteAllUsers)
router.delete('/delete/:id', deleteOneUser)

router.put("/update/:id" , updateOneUser)



export {router}