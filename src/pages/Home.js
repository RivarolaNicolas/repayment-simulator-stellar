import React from 'react';
import { useState, useEffect } from 'react';
import {
  calculateMinimumRepayment,
  calculateTotalLoanAmount,
  calculate2PercentOfInterestPaid,
} from '../helpers/calculator';
import { sendWNT } from '../helpers/stellar';

const Home = (props) => {
  const [loanAmount, setLoanAmount] = useState(Number);
  const [minimumRepayment, setMinimumRepayment] = useState(Number);
  const [repaymentAmount, setRepaymentAmount] = useState(0);
  const [totalLoanAmount, setTotalLoanAmount] = useState(Number);
  const [twoPercentOfInterestPaid, setTwoPercentOfInterestPaid] = useState(Number);

  const setBorrowerAccountPublicKey = props.setBorrowerAccountPublicKey;
  const borrowerAccountPublicKey = props.borrowerAccountPublicKey;
  const borrowerAccountPrivateKey = props.borrowerAccountPrivateKey;
  const setBorrowerAccountPrivateKey = props.setBorrowerAccountPrivateKey;

  useEffect(() => {
    setMinimumRepayment(calculateMinimumRepayment(loanAmount));
  }, [loanAmount]);

  useEffect(() => {
    setTotalLoanAmount(calculateTotalLoanAmount(loanAmount, minimumRepayment));
  }, [loanAmount, minimumRepayment]);

  useEffect(() => {
    setTwoPercentOfInterestPaid(
      calculate2PercentOfInterestPaid(loanAmount, repaymentAmount, totalLoanAmount)
    );
    console.log(twoPercentOfInterestPaid);
  }, [loanAmount, repaymentAmount, totalLoanAmount, twoPercentOfInterestPaid]);

  function handleSetLoanAmount(e) {
    setLoanAmount(Number(e.target.value));
  }

  function handleSetRepaymentAmount(e) {
    setRepaymentAmount(Number(e.target.value));
  }

  function handleSetBorrowerAccountPublicKey(e) {
    setBorrowerAccountPublicKey(e.target.value);
  }

  function handleSetBorrowerAccountPrivateKey(e) {
    setBorrowerAccountPrivateKey(e.target.value);
    console.log(e.target.value);
  }

  function handleSubmitTransactionClicked(e) {
    e.preventDefault();
    sendWNT(borrowerAccountPublicKey, borrowerAccountPrivateKey);
  }

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
        <h4>Enter your stellar account public key:</h4>
        <input type="text" onChange={handleSetBorrowerAccountPublicKey}></input>
        <h4>Enter your stellar account private key:</h4>
        <input type="text" onChange={handleSetBorrowerAccountPrivateKey}></input>
        <button type="button" onClick={handleSubmitTransactionClicked}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Home;
