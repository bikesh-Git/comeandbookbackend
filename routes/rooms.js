import express from "express";
import { CreateRoom, deleteRoom, getAllRoom, getRoom, updateRoom, updateRoomAvailabilty } from "../controllers/room.js";
import { verifyAdmin } from "../util/verifyToken.js";
const router = express.Router()

//CRETAE
router.post("/:hotelId",verifyAdmin, CreateRoom);
//UPDATE
router.put("/:id",verifyAdmin, updateRoom);
router.put("/avaiaibilty/:id", updateRoomAvailabilty);
//DELETE
router.delete("/:id/:hotelId", verifyAdmin,deleteRoom);
//GET
router.get("/:id",getRoom);
//GET ALL
router.get("/", getAllRoom);


export default router