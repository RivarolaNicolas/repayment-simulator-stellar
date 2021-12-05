export const calculateMinimumRepayment = (loanAmount) => {
  //8% annual interest / 12 months
  const INTEREST = 0.08 / 12;
  //Five years * 12 months
  const PAYMENTS = 5 * 12;
  return Number(
    (
      (loanAmount * (INTEREST * (INTEREST + 1) ** PAYMENTS)) /
      ((INTEREST + 1) ** PAYMENTS - 1)
    ).toFixed(2)
  );
};

export const calculateTotalLoanAmount = (loanAmount, minimumRepayment) => {
  const PAYMENTS = 5 * 12;

  return Number((minimumRepayment * PAYMENTS).toFixed(2));
};

export const calculateBorrowerRewards = (
  minimumRepayment,
  repaymentAmount,
  twoPercentOfInterestPaid
) => {
  const differenceBetweenMinimumRepaymentAndRepaymentAmount = repaymentAmount - minimumRepayment;
  if (
    differenceBetweenMinimumRepaymentAndRepaymentAmount != undefined &&
    twoPercentOfInterestPaid != undefined &&
    differenceBetweenMinimumRepaymentAndRepaymentAmount < twoPercentOfInterestPaid
  ) {
    return Number(differenceBetweenMinimumRepaymentAndRepaymentAmount.toFixed(2));
  } else {
    return Number(twoPercentOfInterestPaid.toFixed(2));
  }
};

export const calculate2PercentOfInterestPaid = (loanAmount, repaymentAmount, totalLoanAmount) => {
  const totalInterestAmount = totalLoanAmount - loanAmount;
  return Number(
    (repaymentAmount * ((totalInterestAmount * 100) / totalLoanAmount / 100) * 0.02).toFixed(2)
  );
};
