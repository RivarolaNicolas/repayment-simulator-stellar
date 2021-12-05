import React, { useState } from 'react';
import './App.css';
import Home from './pages/Home';

// import IssueNewAsset from './components/IssueNewAsset';

function App() {
  const [borrowerAccountPrivateKey, setBorrowerAccountPrivateKey] = useState('');
  return (
    <div className="w-screen h-screen">
      <Home
        setBorrowerAccountPrivateKey={setBorrowerAccountPrivateKey}
        borrowerAccountPrivateKey={borrowerAccountPrivateKey}
      ></Home>
    </div>
  );
}

export default App;
