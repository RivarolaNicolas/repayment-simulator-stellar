const StellarSdk = require('stellar-sdk');

const issuerAccountPrivateKey = 'SBNJMFBUVROLXVHVZUK3SXXB5I6MN3AUJSUX5WCTQN6WBEDDZPF7DDJZ';
// const borrowerAccountPublicKey = 'SDZGGESB5BZBV2E6W4SOSZZ4P2H7N5P2MA6Z6CQNVUGDXNGYQQV5FVJR';
export const sendWNT = (borrowerAccountPublicKey, borrowerAccountPrivateKey, amount) => {
  // Keys for accounts to issue and receive the new asset
  const issuingKeys = StellarSdk.Keypair.fromSecret(issuerAccountPrivateKey);
  const receivingKeys = StellarSdk.Keypair.fromSecret(borrowerAccountPrivateKey);

  const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');

  // Create an object to represent the new asset
  const WNT = new StellarSdk.Asset('WNT', issuingKeys.publicKey());

  // First, the receiving account must trust the asset
  server
    .loadAccount(receivingKeys.publicKey())
    .then(function (receiver) {
      const transaction = new StellarSdk.TransactionBuilder(receiver, {
        fee: 100,
        networkPassphrase: StellarSdk.Networks.TESTNET,
      })
        // The `changeTrust` operation creates (or alters) a trustline
        // The `limit` parameter below is optional
        .addOperation(
          StellarSdk.Operation.changeTrust({
            asset: WNT,
          })
        )
        // setTimeout is required for a transaction
        .setTimeout(100)
        .build();
      transaction.sign(receivingKeys);
      return server.submitTransaction(transaction);
    })
    .then(console.log)

    // Second, the issuing account actually sends a payment using the asset
    .then(function () {
      return server.loadAccount(issuingKeys.publicKey());
    })
    .then(function (issuer) {
      const transaction = new StellarSdk.TransactionBuilder(issuer, {
        fee: 100,
        networkPassphrase: StellarSdk.Networks.TESTNET,
      })
        .addOperation(
          StellarSdk.Operation.payment({
            destination: receivingKeys.publicKey(),
            asset: WNT,
            amount: amount.toString(),
          })
        )
        // setTimeout is required for a transaction
        .setTimeout(100)
        .build();
      transaction.sign(issuingKeys);
      return server.submitTransaction(transaction);
    })
    .then(console.log)
    .catch(function (error) {
      console.error('Error!', error);
    });
  return null;
};
