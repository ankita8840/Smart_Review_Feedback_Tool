function SuggestionCard({ suggestion, onSelect }) {
  return (
    <div className="suggestion-card">

      <p>{suggestion}</p>

      <button
        type="button"
        onClick={onSelect}
      >
        Select
      </button>

    </div>
  );
}

export default SuggestionCard;