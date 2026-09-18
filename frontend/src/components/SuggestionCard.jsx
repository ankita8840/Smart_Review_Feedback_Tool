function SuggestionCard({
  suggestion,
  selected,
  onSelect
}) {
  return (
    <div
      className={
        selected
          ? "suggestion-card selected"
          : "suggestion-card"
      }
      onClick={onSelect}
    >
      <p>{suggestion}</p>

      <button type="button">
        {selected ? "Selected ✓" : "Select"}
      </button>
    </div>
  );
}

export default SuggestionCard;