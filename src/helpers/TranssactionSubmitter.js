// import { useEffect } from 'react';
// const StellarSdk = require('stellar-sdk');

// const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');

// const TranssactionSubmitter = (issuerAccountPrivateKey, borroWerAccountSecretKey) => {
//   const distributorAccountPrivateKey = props.distributorAccountPrivateKey;
//   const borrowerAccount = props.borrowerAccount;
//   const submitTransactionIsClicked = props.submitTransactionIsClicked;
//   const setSubmitTransactionIsClicked = props.setSubmitTransactionIsClicked;

//   const sourceKeypair = StellarSdk.Keypair.fromSecret(distributorAccountPrivateKey);
//   const distributorAccountPublicKey = sourceKeypair.publicKey();
//   const issuingKeys = StellarSdk.Keypair.fromSecret(issuerAccountPrivateKey);
//   const WNT = new StellarSdk.Asset('WNT', issuingKeys.publicKey());

//   useEffect(() => {
//     async function SubmitTransactionAsync() {
//       const account = await server.loadAccount(distributorAccountPublicKey);

//       /*
//         Right now, we have one function that fetches the base fee.
//         In the future, we'll have functions that are smarter about suggesting fees,
//         e.g.: `fetchCheapFee`, `fetchAverageFee`, `fetchPriorityFee`, etc.
//     */
//       const fee = await server.fetchBaseFee();

//       const transaction = new StellarSdk.TransactionBuilder(account, {
//         fee,
//         networkPassphrase: StellarSdk.Networks.TESTNET,
//       })
//         .addOperation(
//           StellarSdk.Operation.changeTrust({
//             asset: WNT,
//             source: issuingKeys.publicKey(),
//           })
//         )
//         .addOperation(
//           StellarSdk.Operation.payment({
//             destination: 'GCAQRH7ZWYNT4SFQP37MK7GFBQKW7PGTMSGIL6ICQD7NHANLA7A3UQDH',
//             asset: WNT,
//             amount: '30',
//           })
//         )
//         .setTimeout(100)
//         .build();

//       // sign the transaction
//       transaction.sign(StellarSdk.Keypair.fromSecret(distributorAccountPrivateKey));

//       try {
//         const transactionResult = await server.submitTransaction(transaction);
//         console.log(transactionResult);
//       } catch (err) {
//         console.error(err);
//       }
//     }
//     SubmitTransactionAsync();
//   }, [borrowerAccount]);

//   return null;
// };

// export default SubmitTransaction;
