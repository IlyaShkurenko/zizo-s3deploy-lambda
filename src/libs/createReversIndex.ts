export const createReverseIndex = (vocabulary) => {
  const reverseIndex = {};
  for (const [type, words] of Object.entries(vocabulary)) {
    words.forEach(word => {
      reverseIndex[word] = type;
    });
  }
  return reverseIndex;
};
