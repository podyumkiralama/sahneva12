export function buildFaqSchema(items = []) {
  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }

  const mainEntity = items
    .map((item) => {
      const question = item?.q?.trim();
      const answer = item?.a?.trim();

      if (!question || !answer) {
        return null;
      }

      return {
        "@type": "Question",
        name: question,
        acceptedAnswer: {
          "@type": "Answer",
          text: answer,
        },
      };
    })
    .filter(Boolean);

  if (mainEntity.length === 0) {
    return null;
  }

  return {
    "@type": "FAQPage",
    mainEntity,
  };
}
