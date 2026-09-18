import Feedback from "../models/Feedback.js";
import Business from "../models/Business.js";

import generateReviewSuggestions from "../utils/reviewGenerator.js";


// Generate review suggestions
export const generateReview = async (req, res) => {
  try {
    const {
      businessId,
      rating,
      service,
      context
    } = req.body;

    if (!businessId || !rating) {
      return res.status(400).json({
        message: "Business ID and rating are required"
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        message: "Rating must be between 1 and 5"
      });
    }

    const business = await Business.findById(businessId);

    if (!business) {
      return res.status(404).json({
        message: "Business not found"
      });
    }

    const suggestions = generateReviewSuggestions({
      rating,
      businessType: business.type,
      service,
      context
    });

    const feedbackType =
      rating >= 4 ? "positive" : "needs_attention";

    res.status(200).json({
      rating,
      feedbackType,
      suggestions
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to generate review",
      error: error.message
    });
  }
};


// Save review / feedback
export const createReview = async (req, res) => {
  try {
    const {
      businessId,
      rating,
      service,
      context,
      generatedSuggestions,
      finalText
    } = req.body;

    if (!businessId || !rating || !finalText) {
      return res.status(400).json({
        message: "Business ID, rating and final text are required"
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        message: "Rating must be between 1 and 5"
      });
    }

    const business = await Business.findById(businessId);

    if (!business) {
      return res.status(404).json({
        message: "Business not found"
      });
    }

    const feedbackType =
      rating >= 4 ? "positive" : "needs_attention";

    const feedback = await Feedback.create({
      businessId,
      rating,
      service,
      context,
      generatedSuggestions,
      finalText,
      feedbackType
    });

    res.status(201).json({
      message: "Feedback submitted successfully",
      feedback
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to save feedback",
      error: error.message
    });
  }
};


// Get reviews
export const getReviews = async (req, res) => {
  try {
    const { rating } = req.query;

    const filter = {};

    if (rating) {
      const ratingNumber = Number(rating);

      if (
        Number.isNaN(ratingNumber) ||
        ratingNumber < 1 ||
        ratingNumber > 5
      ) {
        return res.status(400).json({
          message: "Rating filter must be between 1 and 5"
        });
      }

      filter.rating = ratingNumber;
    }

    const reviews = await Feedback.find(filter)
      .populate("businessId", "name type")
      .sort({ createdAt: -1 });

    const totalResponses = await Feedback.countDocuments();

    const averageResult = await Feedback.aggregate([
      {
        $group: {
          _id: null,
          averageRating: {
            $avg: "$rating"
          }
        }
      }
    ]);

    const averageRating =
      averageResult.length > 0
        ? Number(averageResult[0].averageRating.toFixed(1))
        : 0;

    res.status(200).json({
      totalResponses,
      averageRating,
      reviews
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch reviews",
      error: error.message
    });
  }
};