// Redux action types
const INPUT = 'INPUT';
// OUTPUT = 'OUTPUT';

// Redux actions
export const actionInput = (input) => {
  return {
    type: INPUT,
    input,
  };
};
