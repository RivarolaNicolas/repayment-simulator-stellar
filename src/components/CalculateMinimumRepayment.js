import React, { useState, useEffect } from 'react';

const CalculateMinimumRepayment = (props) => {
  //8% annual interest / 12 months
  const INTEREST = 0.08 / 12;
  //Five years * 12 months
  const PAYMENTS = 5 * 12;
  const loanAmount = Number(props.loanAmount);
  const minimumRepayment = props.minimumRepayment;
  const setMinimumRepayment = props.setMinimumRepayment;

  const calculateMinimumRepayment = (loanAmount, INTEREST, PAYMENTS) => {
    return (
      (loanAmount * (INTEREST * (INTEREST + 1) ** PAYMENTS)) /
      ((INTEREST + 1) ** PAYMENTS - 1)
    ).toFixed(2);
  };

  useEffect(() => {
    setMinimumRepayment(calculateMinimumRepayment(loanAmount, INTEREST, PAYMENTS));
    console.log(minimumRepayment);
    return () => {
      setMinimumRepayment(Number);
    };
  }, [INTEREST, PAYMENTS, loanAmount, minimumRepayment, setMinimumRepayment]);

  return null;
};

export default CalculateMinimumRepayment;
