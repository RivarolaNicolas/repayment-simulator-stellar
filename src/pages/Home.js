import React from 'react';
import { useState } from 'react';
import { calculateMinimumRepayment } from '../helpers/calculator';
import { sendWNT } from '../helpers/stellar';
// import CreateBorrowerAccountPublicKey from '../components/CreateBorrowerAccountPublicKey';

const Home = (props) => {
  const [loanAmount, setLoanAmount] = useState(Number);
  const [minimumRepayment, setMinimumRepayment] = useState(Number);
  const [repaymentAmount, setRepaymentAmount] = useState(0);

  const setBorrowerAccountPublicKey = props.setBorrowerAccountPublicKey;
  const borrowerAccountPublicKey = props.borrowerAccountPublicKey;
  const borrowerAccountPrivateKey = props.borrowerAccountPrivateKey;
  const setBorrowerAccountPrivateKey = props.setBorrowerAccountPrivateKey;
  function handleSetLoanAmount(e) {
    setLoanAmount(e.target.value);
  }

  function handleSetRepaymentAmount(e) {
    setRepaymentAmount(e.target.value);
    setMinimumRepayment(calculateMinimumRepayment(loanAmount));
    console.log(minimumRepayment);
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

  // function handleSetCreateBorrowerAccountPublicKey(e) {
  //   e.preventDefault();
  //   CreateBorrowerAccountPublicKey();
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
