import { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

function Dashboard() {
  const [reviews, setReviews] = useState([]);
  const [totalResponses, setTotalResponses] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [ratingFilter, setRatingFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchReviews = async () => {
    try {
      setLoading(true);
      setError("");

      let url = "http://localhost:4000/api/reviews";

      if (ratingFilter) {
        url += `?rating=${ratingFilter}`;
      }

      const response = await axios.get(url);

      setReviews(response.data.reviews);
      setTotalResponses(response.data.totalResponses);
      setAverageRating(response.data.averageRating);

    } catch (error) {
      console.log(error);
      setError("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [ratingFilter]);

  return (
    <div className="dashboard">

      <h1>Admin Dashboard</h1>

      {/* Statistics */}
      <div className="stats-container">

        <div className="stat-card" >
          <h3 style={{ textAlign: 'center' }}>Total Responses</h3>
          <p style={{ textAlign: 'center' }}>{totalResponses}</p>
        </div>

        <div className="stat-card">
          <h3 style={{ textAlign: 'center' }}>Average Rating</h3>
          <p style={{ textAlign: 'center' }}>⭐ {averageRating}</p>
        </div>

      </div>


      {/* Rating Filter */}
      <div className="filter-section">

        <label>Filter by Rating: </label>

        <select
          value={ratingFilter}
          onChange={(e) => setRatingFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="1">1 Star</option>
          <option value="2">2 Stars</option>
          <option value="3">3 Stars</option>
          <option value="4">4 Stars</option>
          <option value="5">5 Stars</option>
        </select>

      </div>


      {/* Loading */}
      {loading && <p>Loading reviews...</p>}


      {/* Error */}
      {error && <p className="error">{error}</p>}


      {/* Reviews */}
      {!loading && reviews.length === 0 && (
        <p>No reviews found.</p>
      )}


      {!loading && reviews.length > 0 && (
        <div className="reviews-list">

          {reviews.map((review) => (

            <div
              key={review._id}
              className={
                review.rating <= 3
                  ? "review-card needs-attention"
                  : "review-card"
              }
            >

              <div className="review-header">

                <h3>
                  {review.businessId?.name || "Business"}
                </h3>

                <span>
                  {review.businessId?.type || ""}
                </span>

              </div>


              <div className="rating">

                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}

              </div>


              <p>
                <strong>Service:</strong>{" "}
                {review.service || "Not provided"}
              </p>


              <p>
                <strong>Feedback:</strong>{" "}
                {review.finalText}
              </p>


              {review.rating <= 3 && (
                <span className="attention-label">
                  Needs Attention
                </span>
              )}


              <p className="date">
                {new Date(review.createdAt).toLocaleDateString()}
              </p>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}

export default Dashboard;