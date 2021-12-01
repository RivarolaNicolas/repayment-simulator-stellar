export const calculateMinimumRepayment = (loanAmount) => {
  //8% annual interest / 12 months
  const INTEREST = 0.08 / 12;
  //Five years * 12 months
  const PAYMENTS = 5 * 12;
  return (loanAmount * (INTEREST * (INTEREST + 1) ** PAYMENTS)) / ((INTEREST + 1) ** PAYMENTS - 1);
};

export const calculateTotalLoanAmount = (loanAmount, minimumRepayment) => {
  const PAYMENTS = 5 * 12;

  return minimumRepayment * PAYMENTS;
};

export const calculateBorrowerRewards = (loanAmount, repaymentAmount) => {};

export const calculate2PercentOfInterestPaid = (loanAmount, repaymentAmount, totalLoanAmount) => {
  const totalInterestAmount = totalLoanAmount - loanAmount;
  return repaymentAmount * ((totalInterestAmount * 100) / totalLoanAmount / 100) * 0.02;
};
