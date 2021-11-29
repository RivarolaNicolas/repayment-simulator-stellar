import React, { useState } from 'react';
import './App.css';
import Home from './pages/Home';
import SubmitTransaction from './components/SubmitTransaction';
import IssueNewAsset from './components/IssueNewAsset';

function App() {
  const issuerAccountPrivateKey = 'SBNJMFBUVROLXVHVZUK3SXXB5I6MN3AUJSUX5WCTQN6WBEDDZPF7DDJZ';
  const distributorAccountPrivateKey = 'SDZGGESB5BZBV2E6W4SOSZZ4P2H7N5P2MA6Z6CQNVUGDXNGYQQV5FVJR';
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
        issuerAccountPrivateKey={issuerAccountPrivateKey}
      />

      <IssueNewAsset
        issuerAccountPrivateKey={issuerAccountPrivateKey}
        distributorAccountPrivateKey={distributorAccountPrivateKey}
      />
    </div>
  );
}

export default App;
