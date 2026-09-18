const generateReviewSuggestions = ({
  rating,
  businessType,
  service,
  context
}) => {
  const business = businessType || "business";
  const serviceText = service || "service";
  const contextText = context || "";

  if (rating >= 4) {
    const suggestions = [
      `Great experience at the ${business}. The ${serviceText} was excellent and I was very happy with the service.`,

      `I had a wonderful experience with the ${business}. The ${serviceText} was great and the overall service was excellent.`,

      `Really happy with my experience at the ${business}. The ${serviceText} was handled well and I would definitely recommend it.`
    ];

    if (contextText) {
      return suggestions.map(
        (suggestion) => `${suggestion} ${contextText}.`
      );
    }

    return suggestions;
  }

  const feedback = `My experience with the ${business} was not as expected. The ${serviceText} could be improved. ${contextText}`.trim();

  return [feedback];
};

export default generateReviewSuggestions;