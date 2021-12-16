import { calculateTotalLoanAmount } from '../helpers/calculator';

const loanAmount = 30000;
const minimumRepayment = 608.29;

test('should return total loan amount (interest included)', () => {
	expect(Number(calculateTotalLoanAmount(loanAmount, minimumRepayment).toFixed(2))).toBe(36497.4);
});
