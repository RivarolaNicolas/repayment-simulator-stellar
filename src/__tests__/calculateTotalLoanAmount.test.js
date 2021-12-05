import { calculateTotalLoanAmount } from '../helpers/calculator';

const loanAmount = '30000';
const minimumRepayment = '608.29';

test('should return total loan amount (interest included)', () => {
  expect(calculateTotalLoanAmount(loanAmount, minimumRepayment)).toBe('36497.40');
});
