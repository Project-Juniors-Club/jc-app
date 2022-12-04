export const validateDifferences = (differences: number[]) => {
  if (differences.length % 4 !== 0) {
    return { valid: false, message: 'The number of values should be a multiple of 4.' };
  }

  for (const location of differences) {
    if (location > 1 || location < 0) {
      return { valid: false, message: 'All values should be non-negative floats less than one.' };
    }
  }
  return { valid: true };
};

export default validateDifferences;
