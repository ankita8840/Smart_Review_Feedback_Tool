function StarRating({ rating, setRating }) {
  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={star <= rating ? "star active" : "star"}
          onClick={() => setRating(star)}
        >
          ★
        </button>
      ))}
    </div>
  );
}

export default StarRating;