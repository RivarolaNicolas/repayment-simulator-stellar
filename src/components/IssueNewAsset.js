import { useEffect } from 'react';
const StellarSdk = require('stellar-sdk');
const IssueNewAsset = (props) => {
  const issuerAccountPrivateKey = props.issuerAccountPrivateKey;
  const distributorAccountPrivateKey = props.distributorAccountPrivateKey;

  // Keys for accounts to issue and receive the new asset
  const issuingKeys = StellarSdk.Keypair.fromSecret(issuerAccountPrivateKey);
  const receivingKeys = StellarSdk.Keypair.fromSecret(distributorAccountPrivateKey);

  useEffect(() => {
    const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');

    // Create an object to represent the new asset
    const USD = new StellarSdk.Asset('USD', issuingKeys.publicKey());
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
              asset: USD,
            })
          )
          // setTimeout is required for a transaction
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
              asset: USD,
              amount: '10000',
            })
          )
          // setTimeout is required for a transaction
          .addOperation(
            StellarSdk.Operation.payment({
              destination: receivingKeys.publicKey(),
              asset: WNT,
              amount: '10000',
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
  }, [issuingKeys, receivingKeys]);

  return null;
};

export default IssueNewAsset;
