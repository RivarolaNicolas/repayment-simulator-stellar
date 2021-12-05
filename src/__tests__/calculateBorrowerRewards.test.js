import { calculateBorrowerRewards } from '../helpers/calculator';

const minimumRepayment = '608.29';
const repaymentAmount = '700';
const twoPercentOfInterestPaid = '2.17';

test('should calculate borrower rewards', () => {
  expect(
    calculateBorrowerRewards(minimumRepayment, repaymentAmount, twoPercentOfInterestPaid)
  ).toBe(twoPercentOfInterestPaid);

  expect(calculateBorrowerRewards(minimumRepayment, '608.30', twoPercentOfInterestPaid)).toBe(
    '0.01'
  );
});
