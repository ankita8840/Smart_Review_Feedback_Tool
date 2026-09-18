import express from "express";

import {
  generateReview,
  createReview,
  getReviews
} from "../controllers/reviewController.js";

const router = express.Router();

router.post("/generate", generateReview);

router.post("/", createReview);

router.get("/", getReviews);

export default router;