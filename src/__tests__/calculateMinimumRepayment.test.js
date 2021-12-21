import { calculateMinimumRepayment } from '../helpers/calculator';

const loanAmount = 30000;

test('should return minimum repayment', () => {
  expect(Number(calculateMinimumRepayment(loanAmount).toFixed(2))).toBe(608.29);
});
