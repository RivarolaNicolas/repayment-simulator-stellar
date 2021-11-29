import { useEffect } from 'react';
const StellarSdk = require('stellar-sdk');

const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');

const SubmitTransaction = (props) => {
  const issuerAccountPrivateKey = props.issuerAccountPrivateKey;
  const borrowerAccount = props.borrowerAccount;
  const submitTransactionIsClicked = props.submitTransactionIsClicked;
  const setSubmitTransactionIsClicked = props.setSubmitTransactionIsClicked;

  // Derive Keypair object and public key (that starts with a G) from the secret
  const sourceKeypair = StellarSdk.Keypair.fromSecret(issuerAccountPrivateKey);
  const issuerAccountPublicKey = sourceKeypair.publicKey();
  useEffect(() => {
    if (
      borrowerAccount.length === 56 &&
      borrowerAccount.charAt(0) === 'G' &&
      submitTransactionIsClicked === true
    ) {
      setSubmitTransactionIsClicked(false);
      async function SubmitTransactionAsync() {
        const account = await server.loadAccount(issuerAccountPublicKey);

        /*
        Right now, we have one function that fetches the base fee.
        In the future, we'll have functions that are smarter about suggesting fees,
        e.g.: `fetchCheapFee`, `fetchAverageFee`, `fetchPriorityFee`, etc.
    */
        const fee = await server.fetchBaseFee();

        const transaction = new StellarSdk.TransactionBuilder(account, {
          fee,
          networkPassphrase: StellarSdk.Networks.TESTNET,
        })
          .addOperation(
            // this operation funds the new account with XLM
            StellarSdk.Operation.payment({
              destination: borrowerAccount,
              asset: StellarSdk.Asset.native(),
              amount: '12',
            })
          )
          .setTimeout(30)
          .build();

        // sign the transaction
        transaction.sign(StellarSdk.Keypair.fromSecret(issuerAccountPrivateKey));

        try {
          const transactionResult = await server.submitTransaction(transaction);
          console.log(transactionResult);
        } catch (err) {
          console.error(err);
        }
      }
      SubmitTransactionAsync();
    } else {
      return null;
    }
  }, [
    borrowerAccount,
    issuerAccountPrivateKey,
    issuerAccountPublicKey,
    setSubmitTransactionIsClicked,
    submitTransactionIsClicked,
  ]);

  return null;
};

export default SubmitTransaction;
