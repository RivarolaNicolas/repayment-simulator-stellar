import React from 'react';
import { useState, useEffect } from 'react';
import CalculateMinimumRepayment from '../components/CalculateMinimumRepayment';

const Home = () => {
  const [loanAmount, setLoanAmount] = useState(Number);
  const [minimumRepayment, setMinimumRepayment] = useState(Number);
  const [repaymentAmount, setRepaymentAmount] = useState(Number);

  function handleLoanAmount(e) {
    setLoanAmount(e.target.value);
    console.log(e.target.value, 'loan amount');
  }

  function handleRepaymentAmount(e) {
    setRepaymentAmount(e.target.value);
    console.log(repaymentAmount);
  }

  return (
    <div>
      <h4>Enter loan amount:</h4>
      <input type="number" onChange={handleLoanAmount}></input>
      <h4>Enter repayment amount:</h4>
      <input
        type="number"
        onChange={handleRepaymentAmount}
        className={repaymentAmount > minimumRepayment ? 'border ' : 'border-2 border-red-500'}
      ></input>
      <h4>Enter the borrower's stellar account:</h4>
      <input type="text"></input>;
      <CalculateMinimumRepayment
        loanAmount={loanAmount}
        minimumRepayment={minimumRepayment}
        setMinimumRepayment={setMinimumRepayment}
      />
    </div>
  );
};

export default Home;
