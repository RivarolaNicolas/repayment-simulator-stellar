import React, { useState } from 'react';
import './App.css';
import Home from './pages/Home';
import SubmitTransaction from './components/SubmitTransaction';

function App() {
  const [borrowerAccount, setBorrowerAccount] = useState('');
  const [submitTransactionClicked, setSubmitTransactionClicked] = useState(false);
  return (
    <div>
      <Home
        setBorrowerAccount={setBorrowerAccount}
        borrowerAccount={borrowerAccount}
        setSubmitTransactionClicked={setSubmitTransactionClicked}
      ></Home>
      <SubmitTransaction
        borrowerAccount={borrowerAccount}
        submitTransactionClicked={submitTransactionClicked}
        setSubmitTransactionClicked={setSubmitTransactionClicked}
      />
    </div>
  );
}

export default App;
