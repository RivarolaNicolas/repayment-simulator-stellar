import React from 'react';
import { useState, useEffect } from 'react';
import {
  calculateMinimumRepayment,
  calculateTotalLoanAmount,
  calculate2PercentOfInterestPaid,
  calculateBorrowerRewards,
} from '../helpers/calculator';
import TransactionAlert from '../components/TransactionAlert';
import { transactionSubmitter } from '../helpers/stellar';
import { SiStellar } from 'react-icons/si';

const Home = (props) => {
  const [loanAmount, setLoanAmount] = useState(String);
  const [minimumRepayment, setMinimumRepayment] = useState(String);
  const [repaymentAmount, setRepaymentAmount] = useState(0);
  const [totalLoanAmount, setTotalLoanAmount] = useState(String);
  const [twoPercentOfInterestPaid, setTwoPercentOfInterestPaid] = useState(String);
  const [borrowerRewards, setBorrowerRewards] = useState(String);
  const [transactionSuccessful, setTransactionSuccessful] = useState(null);
  const [hide, setHide] = useState('invisible');
  const [alertColor, setAlertColor] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [isHidden, setIsHidden] = useState(true);

  const borrowerAccountPrivateKey = props.borrowerAccountPrivateKey;
  const setBorrowerAccountPrivateKey = props.setBorrowerAccountPrivateKey;

  useEffect(() => {
    if (transactionSuccessful === true) {
      setHide(false);
      setAlertColor('green');
      setAlertMessage('Transaction Succesful');
    } else if (transactionSuccessful === false) {
      setHide(false);
      setAlertColor('red');
      setAlertMessage('Transaction Failed');
    }
  }, [transactionSuccessful]);

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

  function handleSetBorrowerAccountPrivateKey(e) {
    if (e.target.value.length === 56 && e.target.value.indexOf('S') === 0) {
      setBorrowerAccountPrivateKey(e.target.value);
      setIsHidden(false);
    } else {
      setIsHidden(true);
      setBorrowerAccountPrivateKey(false);
    }
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
    <div className="overflow-x-hidden overflow-y-hidden ">
      <div className="bg-white rounded-lg shadow sm:max-w-md sm:w-full sm:mx-auto sm:overflow-hidden md:my-10 ">
        <div className="px-4 py-8 sm:px-10">
          <div className="relative mt-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm leading-5">
              <span className="px-2 text-gray-500 bg-white">Loan Repayment Simulator</span>
            </div>
          </div>
          <div className="mt-6">
            <div className="w-full space-y-6">
              <div className="w-full">
                <div className=" relative ">
                  <input
                    type="text"
                    id="loan-amount"
                    onChange={handleSetLoanAmount}
                    className={
                      'rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent'
                    }
                    placeholder="Loan amount"
                  />
                </div>
              </div>
              <div className="w-full">
                <div className=" relative ">
                  <input
                    type="text"
                    id="repayment-amount"
                    onChange={handleSetRepaymentAmount}
                    className={
                      repaymentAmount > minimumRepayment
                        ? 'rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent '
                        : 'rounded-lg border-transparent flex-1 appearance-none border border-red-500 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent '
                    }
                    placeholder="Repayment amount"
                  />
                </div>
              </div>
              <div className="w-full">
                <div className=" relative ">
                  <label
                    forhtml="private-key"
                    className="relative text-gray-400 focus-within:text-gray-600 block"
                  >
                    <SiStellar className="pointer-events-none w-4 h-4 absolute top-1/2 transform -translate-y-1/2 left-3" />
                    <input
                      name="private-key"
                      type="text"
                      id="private-key"
                      onChange={handleSetBorrowerAccountPrivateKey}
                      className=" rounded-lg border-transparent border border-gray-300 bg-white placeholder-gray-400 text-gray-700 appearance-none w-full block pl-14 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="Stellar Private Key"
                    />
                  </label>
                  {borrowerAccountPrivateKey == false ? (
                    <div className="text-gray-500 mt-2">
                      Enter valid Private Key to be able to submit transaction
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              </div>
              <div>
                <span className="block w-full rounded-md shadow-sm">
                  <button
                    type="button"
                    id="submit-transaction"
                    hidden={isHidden}
                    onClick={handleSubmitTransactionClicked}
                    className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                  >
                    Submit Transaction
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 py-6 border-t-2 border-gray-200 bg-gray-50 sm:px-10">
          {<TransactionAlert alertColor={alertColor} hidden={hide} alertMessage={alertMessage} />}
        </div>
      </div>
    </div>
  );
};

export default Home;
