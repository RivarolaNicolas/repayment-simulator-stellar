import { useEffect } from 'react';
const StellarSdk = require('stellar-sdk');

const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
const emitterAccountPublicKey = 'GBJDIEEJ4HUXQSYNINVBAJ35FLSUGFFVLPBHVI65R42GUDKIMJ7PKHGJ';
const emitterAccountPrivateKey = 'SBJYCFTUCM5GLIZNXRO5T7HTEY2IILMP2GHUTXQMDIAMRCF25U333PCF';

const SubmitTransaction = (props) => {
  const borrowerAccount = props.borrowerAccount;
  const submitTransactionClicked = props.submitTransactionClicked;
  const setSubmitTransactionClicked = props.setSubmitTransactionClicked;
  useEffect(() => {
    if (
      borrowerAccount.length === 56 &&
      borrowerAccount.charAt(0) === 'G' &&
      submitTransactionClicked === true
    ) {
      setSubmitTransactionClicked(false);
      async function SubmitTransactionAsync() {
        const account = await server.loadAccount(emitterAccountPublicKey);

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
        transaction.sign(StellarSdk.Keypair.fromSecret(emitterAccountPrivateKey));

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
  }, [borrowerAccount, setSubmitTransactionClicked, submitTransactionClicked]);

  return null;
};

export default SubmitTransaction;
