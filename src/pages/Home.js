import React from 'react';
import { useState } from 'react';
import CalculateMinimumRepayment from '../components/CalculateMinimumRepayment';
// import CreateBorrowerAccount from '../components/CreateBorrowerAccount';

const Home = (props) => {
  const [loanAmount, setLoanAmount] = useState(Number);
  const [minimumRepayment, setMinimumRepayment] = useState(Number);
  const [repaymentAmount, setRepaymentAmount] = useState(Number);
  const setSubmitTransactionClicked = props.setSubmitTransactionClicked;
  const setBorrowerAccount = props.setBorrowerAccount;

  function handleSetLoanAmount(e) {
    setLoanAmount(e.target.value);
  }

  function handleSetRepaymentAmount(e) {
    setRepaymentAmount(e.target.value);
  }

  function handleSetBorrowerAccount(e) {
    setBorrowerAccount(e.target.value);
  }

  function handleSubmitTransactionClicked(e) {
    e.preventDefault();
    setSubmitTransactionClicked(true);
  }

  // function handleSetCreateBorrowerAccount(e) {
  //   e.preventDefault();
  //   CreateBorrowerAccount();
  // }
  return (
    <div>
      <form>
        <h4>Enter loan amount:</h4>
        <input type="number" onChange={handleSetLoanAmount}></input>
        <h4>Enter repayment amount:</h4>
        <input
          type="number"
          onChange={handleSetRepaymentAmount}
          className={repaymentAmount > minimumRepayment ? 'border ' : 'border-2 border-red-500'}
        ></input>
        <h4>Enter the borrower's stellar account:</h4>
        <input type="text" onChange={handleSetBorrowerAccount}></input>
        <button type="button" onClick={handleSubmitTransactionClicked}>
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
