import { SpotTheDifferenceRegion } from '@prisma/client';
export const validateDifferences = (differences: SpotTheDifferenceRegion[]) => {
  for (const difference of differences) {
    if (difference.x < 0 || difference.y < 0 || difference.height < 0 || difference.width < 0) {
      return { valid: false, message: 'All values should be non-negative floats less than one.' };
    }
    differences.some((difference, index) => {
      for (let i = index + 1; i < differences.length; i++) {
        if (difference.x === differences[i].x && difference.y === differences[i].y) {
          return { valid: false, message: 'There should not be spot the differences starting at same x and y coordinate' };
        }
      }
    });
  }
  return { valid: true };
};

export default validateDifferences;
