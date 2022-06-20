import express from "express";
import { deleteUser, getAllUser, getUser, updateUser } from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../util/verifyToken.js";
const router = express.Router()

// router.get("/checkAuth", verifyToken , (req,res,next)=>{
//     console.log("==",req.hello)
//     res.send("you are loged in ")
// })
// router.get("/checkUser/:id", verifyUser , (req,res,next)=>{
//     res.send("hello user , You can log in and you can delete your account ")
// })
// router.get("/checkAdmin/:id", verifyAdmin , (req,res,next)=>{
//     res.send("hello user , You can log in and you can delete all account")
// })
//UPDATE
router.put("/:id",verifyUser, updateUser);
//DELETE
router.delete("/:id", verifyUser,deleteUser);
//GET
router.get("/:id", verifyUser,getUser);
//GET ALL
router.get("/",verifyAdmin, getAllUser);

export default router