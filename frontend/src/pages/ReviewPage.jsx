import { useState } from "react";
import axios from "axios";
import "./ReviewPage.css";

import StarRating from "../components/StarRating";
import SuggestionCard from "../components/SuggestionCard";

const API_URL = import.meta.env.VITE_API_URL;

function ReviewPage() {
  const [rating, setRating] = useState(0);
  const [service, setService] = useState("");
  const [context, setContext] = useState("");

  const [suggestions, setSuggestions] = useState([]);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Live business ID
  const businessId = "6aadf3e0368560cf69b8d980";

  // Generate Review
  const generateReview = async () => {
    try {
      setMessage("");

      if (rating === 0) {
        setMessage("Please select a rating.");
        return;
      }

      setLoading(true);

      const response = await axios.post(
        `${API_URL}/reviews/generate`,
        {
          businessId,
          rating,
          service,
          context
        }
      );

      // Show generated suggestions
      setSuggestions(response.data.suggestions);

      // No suggestion will be selected automatically
      // Existing user context will remain unchanged

    } catch (error) {
      console.log(error);

      setMessage(
        error.response?.data?.message ||
        "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  // Select a suggestion
  const selectSuggestion = (suggestion) => {
    setContext(suggestion);
  };

  // Submit Review
  const submitReview = async () => {
    try {
      setMessage("");

      if (!rating) {
        setMessage("Please select a rating.");
        return;
      }

      if (!context.trim()) {
        setMessage("Please enter your feedback.");
        return;
      }

      setLoading(true);

      await axios.post(
        `${API_URL}/reviews`,
        {
          businessId,
          rating,
          service,
          context,
          generatedSuggestions: suggestions,
          finalText: context
        }
      );

      setMessage(
        "Thank you! Your feedback has been submitted successfully."
      );

      // Reset form
      setRating(0);
      setService("");
      setContext("");
      setSuggestions([]);

    } catch (error) {
      console.log(error);

      setMessage(
        error.response?.data?.message ||
        "Failed to submit feedback."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="review-page">

      <div className="review-container">

        <h1>Smart Review</h1>

        <p className="business-name">
          Glow Salon
        </p>

        <hr />

        <p
          style={{
            textAlign: "left",
            fontSize: "21px"
          }}
        >
          <b>Business Type: </b>
          Salon
        </p>

        <h3 style={{ fontSize: "21px" }}>
          How was your experience?
        </h3>

        <StarRating
          rating={rating}
          setRating={setRating}
        />

        <div className="form-group">

          <label>
            Service Used
          </label>

          <input
            type="text"
            placeholder="e.g. Haircut"
            value={service}
            onChange={(e) =>
              setService(e.target.value)
            }
          />

        </div>

        <div className="form-group">

          <label>
            What did you like / what can improve?
          </label>

          <textarea
            style={{ resize: "none" }}
            placeholder="Tell us about your experience or select a suggestion below..."
            value={context}
            onChange={(e) =>
              setContext(e.target.value)
            }
          />

        </div>

        <button
          className="generate-btn"
          onClick={generateReview}
          disabled={loading}
        >
          {loading
            ? "Generating..."
            : "Generate Review"}
        </button>

        {suggestions.length > 0 && (

          <div className="suggestions-section">

            <h2>
              Choose a review
            </h2>

            {suggestions.map(
              (suggestion, index) => (

                <SuggestionCard
                  key={index}
                  suggestion={suggestion}
                  onSelect={() =>
                    selectSuggestion(suggestion)
                  }
                />

              )
            )}

          </div>

        )}

        {suggestions.length > 0 && (

          <button
            className="submit-btn"
            onClick={submitReview}
            disabled={loading}
          >
            {loading
              ? "Submitting..."
              : "Submit Feedback"}
          </button>

        )}

        {message && (

          <p className="message">
            {message}
          </p>

        )}

      </div>

    </div>
  );
}

export default ReviewPage;