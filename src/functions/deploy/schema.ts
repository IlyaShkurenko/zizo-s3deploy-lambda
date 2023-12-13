const arrayStringType = { type: 'array', items: { type: 'string' } };

const props = ['noun', 'verb', 'adjective', 'adverb', 'preposition', 'conjunction', 'pronoun', 'interjection', 'determiner', 'numeral'];

export default {
  type: "object",
  properties: {
    ...props.reduce((acc, key) => ({ ...acc, [key]: arrayStringType }), {})
  },
  required: props
} as const;
