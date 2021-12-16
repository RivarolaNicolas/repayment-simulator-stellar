import { calculate2PercentOfInterestPaid } from '../helpers/calculator';

const loanAmount = 30000;
const repaymentAmount = 608.29;
const totalLoanAmount = 36497.4;

test('should calculate the 2% of interest paid', () => {
	expect(Number(calculate2PercentOfInterestPaid(loanAmount, repaymentAmount, totalLoanAmount).toFixed(2))).toBe(2.17);
});
