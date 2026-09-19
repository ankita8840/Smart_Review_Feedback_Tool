function SuggestionCard({ suggestion, selected, onSelect }) {
  return (
    <div
      className={
        selected
          ? "suggestion-card selected"
          : "suggestion-card"
      }
    >
      <p>{suggestion}</p>

      <button
        type="button"
        onClick={onSelect}
      >
        {selected ? "Selected ✓" : "Select"}
      </button>
    </div>
  );
}

export default SuggestionCard;