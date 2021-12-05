import { calculateMinimumRepayment } from '../helpers/calculator';

const loanAmount = 30000;

test('should return minimum repayment', () => {
  expect(calculateMinimumRepayment(loanAmount)).toBe(608.29);
});
