import React, { useState } from 'react';
import './App.css';
import Home from './pages/Home';

// import IssueNewAsset from './components/IssueNewAsset';

function App() {
  const [borrowerAccountPublicKey, setBorrowerAccountPublicKey] = useState('');
  const [borrowerAccountPrivateKey, setBorrowerAccountPrivateKey] = useState('');
  return (
    <div className="w-screen h-screen">
      <Home
        borrowerAccountPublicKey={borrowerAccountPublicKey}
        setBorrowerAccountPublicKey={setBorrowerAccountPublicKey}
        setBorrowerAccountPrivateKey={setBorrowerAccountPrivateKey}
        borrowerAccountPrivateKey={borrowerAccountPrivateKey}
      ></Home>
    </div>
  );
}

export default App;
