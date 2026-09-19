const generateReviewSuggestions = ({
  rating,
  businessType,
  service,
  context
}) => {
  const business = businessType || "business";
  const serviceText = service || "service";
  const contextText = context?.trim() || "";

  // Positive ratings: 4 and 5 stars
  if (rating >= 4) {
    const suggestions = [
      `Great experience at the ${business}. The ${serviceText} was excellent and I was very happy with the service.`,

      `I had a wonderful experience with the ${business}. The ${serviceText} was great and the overall service was excellent.`,

      `Really happy with my experience at the ${business}. The ${serviceText} was handled well and I would definitely recommend it.`
    ];

    if (contextText) {
      return suggestions.map(
        (suggestion) => `${suggestion} ${contextText}`
      );
    }

    return suggestions;
  }

  // Low ratings: 1, 2 and 3 stars
  const suggestions = [
    `My experience with the ${business} was not as expected. The ${serviceText} could be improved.`,

    `I feel the ${serviceText} at the ${business} could have been better. There is room for improvement.`,

    `My experience with the ${business} was okay, but I think the ${serviceText} could be improved.`
  ];

  if (contextText) {
    return suggestions.map(
      (suggestion) => `${suggestion} ${contextText}`
    );
  }

  return suggestions;
};

export default generateReviewSuggestions;