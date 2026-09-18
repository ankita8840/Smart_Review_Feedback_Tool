import express from "express";
import {
  getBusiness,
  createBusiness
} from "../controllers/businessController.js";

const router = express.Router();

router.post("/", createBusiness);

router.get("/:id", getBusiness);

export default router;