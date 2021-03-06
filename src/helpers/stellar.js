const StellarSdk = require('stellar-sdk');
const issuerAccountPrivateKey = 'SBIV2YLZUQ2BY2SQGD6W4DKUQ7LDRVHLOKIIALO4V2NY5IR2AAF5H7XM';
const poolAccountPrivateKey = 'SDFPMDO5YBTRI4KJQA3GKIU6CR3DJ4UVEXXRVVMUKIZDFI5KNRXOWIM6'
// eslint-disable-next-line import/prefer-default-export
export const transactionSubmitter = (
  borrowerAccountPrivateKey,
  borrowerRewards,
  twoPercentOfInterestPaid,
  setTransactionSuccessful
) => {
  const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
  // Keys for accounts to issue and receive the new asset
  const issuingKeys = StellarSdk.Keypair.fromSecret(issuerAccountPrivateKey);
  const receivingKeys = StellarSdk.Keypair.fromSecret(borrowerAccountPrivateKey);
  const poolKeys = StellarSdk.Keypair.fromSecret(poolAccountPrivateKey)

  // Create an object to represent the new asset
  const WNT = new StellarSdk.Asset('WNT', issuingKeys.publicKey());
  const AUD = new StellarSdk.Asset('AUD', issuingKeys.publicKey());

  // First, the receiving account must trust the asset
  server
    .loadAccount(receivingKeys.publicKey())
    .then((account) => {
      const transaction = new StellarSdk.TransactionBuilder(account, {
        fee: StellarSdk.BASE_FEE,
        networkPassphrase: StellarSdk.Networks.TESTNET,
      })
        .addOperation(
          StellarSdk.Operation.changeTrust({
            asset: WNT,
          })
        )
        .addOperation(
          StellarSdk.Operation.changeTrust({
            asset: AUD,
            source: poolKeys.publicKey(),
          })
        )
        .addOperation(
          StellarSdk.Operation.payment({
            asset: AUD,
            destination: poolKeys.publicKey(),
            source: issuingKeys.publicKey(),
            amount: twoPercentOfInterestPaid.toFixed(2),
          })
        )
        // setTimeout is required for a transaction
        .setTimeout(100)
        .build();
      transaction.sign(receivingKeys);
      transaction.sign(issuingKeys);
      transaction.sign(poolKeys);
  
      return server.submitTransaction(transaction);
    })

    .then(console.log())

    .then(() => server.loadAccount(issuingKeys.publicKey()))
    .then((issuer) => {
      if (borrowerRewards != 0) {
        const transaction = new StellarSdk.TransactionBuilder(issuer, {
          fee: StellarSdk.BASE_FEE,
          networkPassphrase: StellarSdk.Networks.TESTNET,
        })
          .addOperation(
            StellarSdk.Operation.payment({
              destination: receivingKeys.publicKey(),
              asset: WNT,
              amount: borrowerRewards.toFixed(2),
            })
          )
          // setTimeout is required for a transaction
          .setTimeout(100)
          .build();
        transaction.sign(issuingKeys);

        return server.submitTransaction(transaction);
      }
    })
    .then(
      () => setTransactionSuccessful(true),
      () => setTransactionSuccessful(false)
    )
    .catch((error) => {
      console.error('Error!', error);
    });
};