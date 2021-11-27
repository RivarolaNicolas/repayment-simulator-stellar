import React from 'react';
import { useState, useEffect } from 'react';
import CalculateMinimumRepayment from '../components/CalculateMinimumRepayment';
import SubmitTransaction from '../components/SubmitTransaction';
import CreateBorrowerAccount from '../components/CreateBorrowerAccount';

const Home = () => {
  const [loanAmount, setLoanAmount] = useState(Number);
  const [minimumRepayment, setMinimumRepayment] = useState(Number);
  const [repaymentAmount, setRepaymentAmount] = useState(Number);
  const [borrowerAccount, setBorrowerAccount] = useState(String);

  function handleLoanAmount(e) {
    setLoanAmount(e.target.value);
    console.log(e.target.value, 'loan amount');
  }

  function handleRepaymentAmount(e) {
    setRepaymentAmount(e.target.value);
    console.log(repaymentAmount);
  }

  function handleBorrowerAccount(e) {
    setBorrowerAccount(e.target.value);
  }

  function handleCreateBorrowerAccount(e) {
    e.preventDefault();
    CreateBorrowerAccount();
  }

  function handleSubmitTransaction(e) {
    e.preventDefault();
    SubmitTransaction();
  }

  return (
    <div>
      <form>
        <h4>Enter loan amount:</h4>
        <input type="number" onChange={handleLoanAmount}></input>
        <h4>Enter repayment amount:</h4>
        <input
          type="number"
          onChange={handleRepaymentAmount}
          className={repaymentAmount > minimumRepayment ? 'border ' : 'border-2 border-red-500'}
        ></input>
        <h4>Enter the borrower's stellar account:</h4>
        <input type="text" onChange={handleBorrowerAccount}></input>;
        <button type="submit" onClick={handleCreateBorrowerAccount}>
          Submit
        </button>
      </form>
      <CalculateMinimumRepayment
        loanAmount={loanAmount}
        minimumRepayment={minimumRepayment}
        setMinimumRepayment={setMinimumRepayment}
      />
    </div>
  );
};

export default Home;
