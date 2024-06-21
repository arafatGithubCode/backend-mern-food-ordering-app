import express from "express";
const router = express.Router();
import multer = require("multer");
import MyRestaurantController from "../controllers/MyRestaurantController";

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

// /api/my/restaurant
router.post(
  "/",
  upload.single("imageFile"),
  MyRestaurantController.createMyRestaurant
);

export default router;
