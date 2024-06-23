import express from "express";
import { param } from "express-validator";
import RestaurantController from "../controllers/RestaurantController";
const router = express.Router();

// /api/restaurant
router.get(
  "/search/:city",
  param("city")
    .trim()
    .isString()
    .notEmpty()
    .withMessage("City parameter must be a valid string"),
  RestaurantController.searchRestaurant
);

export default router;
