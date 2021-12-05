import { calculate2PercentOfInterestPaid } from '../helpers/calculator';

const loanAmount = '30000';
const repaymentAmount = '608.29';
const totalLoanAmount = '36497.40';

test('should calculate the 2% of interest paid', () => {
  expect(calculate2PercentOfInterestPaid(loanAmount, repaymentAmount, totalLoanAmount)).toBe(
    '2.17'
  );
});
