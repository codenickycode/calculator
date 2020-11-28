// Redux action types
const INPUT = 'INPUT';

// Redux actions
export const actionInput = (input) => {
  return {
    type: INPUT,
    input,
  };
};
