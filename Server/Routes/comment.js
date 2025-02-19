import express from "express";
import { postcomment, getcomment, deletecomment, editcomment } from "../Controllers/Comment.js";
import auth from "../Models/Auth.js";
const router=express.Router()

router.post("/post",auth,postcomment)
router.get('/get',getcomment)
router.delete('/delete/:id',auth,deletecomment)
router.patch('/edit/:id',auth,editcomment)

export default router