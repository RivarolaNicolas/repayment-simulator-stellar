import React from 'react';
import { useState, useEffect } from 'react';
import {
  calculateMinimumRepayment,
  calculateTotalLoanAmount,
  calculate2PercentOfInterestPaid,
  calculateBorrowerRewards,
} from '../helpers/calculator';
import { transactionSubmitter } from '../helpers/stellar';

const Home = (props) => {
  const [loanAmount, setLoanAmount] = useState(String);
  const [minimumRepayment, setMinimumRepayment] = useState(String);
  const [repaymentAmount, setRepaymentAmount] = useState(0);
  const [totalLoanAmount, setTotalLoanAmount] = useState(String);
  const [twoPercentOfInterestPaid, setTwoPercentOfInterestPaid] = useState(String);
  const [borrowerRewards, setBorrowerRewards] = useState(String);
  const [transactionSuccessful, setTransactionSuccessful] = useState(false);

  const setBorrowerAccountPublicKey = props.setBorrowerAccountPublicKey;
  const borrowerAccountPublicKey = props.borrowerAccountPublicKey;
  const borrowerAccountPrivateKey = props.borrowerAccountPrivateKey;
  const setBorrowerAccountPrivateKey = props.setBorrowerAccountPrivateKey;

  useEffect(() => {
    setMinimumRepayment(calculateMinimumRepayment(loanAmount));
  }, [loanAmount]);

  useEffect(() => {
    setTotalLoanAmount(calculateTotalLoanAmount(loanAmount, minimumRepayment).toFixed(2));
  }, [loanAmount, minimumRepayment]);

  useEffect(() => {
    setTwoPercentOfInterestPaid(
      calculate2PercentOfInterestPaid(loanAmount, repaymentAmount, totalLoanAmount).toFixed(2)
    );
  }, [loanAmount, repaymentAmount, totalLoanAmount, twoPercentOfInterestPaid]);

  useEffect(() => {
    setBorrowerRewards(
      calculateBorrowerRewards(minimumRepayment, repaymentAmount, twoPercentOfInterestPaid)
    );
  }, [minimumRepayment, repaymentAmount, twoPercentOfInterestPaid]);

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
  }

  function handleSubmitTransactionClicked(e) {
    e.preventDefault();
    transactionSubmitter(
      borrowerAccountPrivateKey,
      borrowerRewards,
      twoPercentOfInterestPaid,
      setTransactionSuccessful
    );
  }

  return (
    <div className="">
      <form className="">
        <h4 className="text-white">Enter loan amount:</h4>
        <input type="number" onChange={handleSetLoanAmount}></input>
        <h4 className="text-white">Enter repayment amount:</h4>
        <input
          type="number"
          onChange={handleSetRepaymentAmount}
          className={repaymentAmount > minimumRepayment ? 'border ' : 'border-2 border-red-500'}
        ></input>
        <h4 className="text-white">Enter your stellar account public key:</h4>
        <input type="text" onChange={handleSetBorrowerAccountPublicKey}></input>
        <h4 className="text-white">Enter your stellar account private key:</h4>
        <input type="text" onChange={handleSetBorrowerAccountPrivateKey}></input>
        <button type="button" className="text-white" onClick={handleSubmitTransactionClicked}>
          Submit
        </button>
        {transactionSuccessful ? <h1>Transaction successfull</h1> : ''}
      </form>
    </div>
  );
};

export default Home;
