import express from "express";
import Hotel from "../models/Hotel.js";
import { createError } from "../util/error.js";
import {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotel,
  getAllHotel,
  countByCity,
  countByType,
  getHotelRooms,
} from "../controllers/hotel.js";
import { verifyAdmin } from "../util/verifyToken.js";
const router = express.Router();

//CRETAE
router.post("/",verifyAdmin, createHotel);
//UPDATE
router.put("/:id",verifyAdmin, updateHotel);
//DELETE
router.delete("/:id", verifyAdmin,deleteHotel);
//GET
router.get("/find/:id",getHotel);
//GET ALL
router.get("/", getAllHotel);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getHotelRooms);

export default router;
