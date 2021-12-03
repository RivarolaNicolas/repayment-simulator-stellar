const StellarSdk = require('stellar-sdk');

const issuerAccountPrivateKey = 'SBNJMFBUVROLXVHVZUK3SXXB5I6MN3AUJSUX5WCTQN6WBEDDZPF7DDJZ';
const thePoolPrivateKey = 'SAXOOH5B7MPSRJHVAJFBYGUMO2AXCR7XFFFWIDQXBMUPS245OYCJEZJ5';

export const sendWNT = (borrowerAccountPublicKey, borrowerAccountPrivateKey, amount) => {
  const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
  // Keys for accounts to issue and receive the new asset
  const issuingKeys = StellarSdk.Keypair.fromSecret(issuerAccountPrivateKey);
  const receivingKeys = StellarSdk.Keypair.fromSecret(borrowerAccountPrivateKey);

  // Create an object to represent the new asset
  const WNT = new StellarSdk.Asset('WNT', issuingKeys.publicKey());

  // First, the receiving account must trust the asset
  server
    .loadAccount(receivingKeys.publicKey())
    .then(function (receiver) {
      const transaction = new StellarSdk.TransactionBuilder(receiver, {
        fee: StellarSdk.BASE_FEE,
        networkPassphrase: StellarSdk.Networks.TESTNET,
      })
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
        fee: StellarSdk.BASE_FEE,
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

export const sendAUDToThePool = (amount) => {
  const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
  const issuingKeys = StellarSdk.Keypair.fromSecret(issuerAccountPrivateKey);
  const receivingKeys = StellarSdk.Keypair.fromSecret(thePoolPrivateKey);
  const AUD = new StellarSdk.Asset('AUD', issuingKeys.publicKey());

  // First, the receiving account must trust the asset
  server
    .loadAccount(receivingKeys.publicKey())
    .then(function (receiver) {
      const transaction = new StellarSdk.TransactionBuilder(receiver, {
        fee: StellarSdk.BASE_FEE,
        networkPassphrase: StellarSdk.Networks.TESTNET,
      })
        .addOperation(
          StellarSdk.Operation.changeTrust({
            asset: AUD,
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
        fee: StellarSdk.BASE_FEE,
        networkPassphrase: StellarSdk.Networks.TESTNET,
      })
        .addOperation(
          StellarSdk.Operation.payment({
            destination: receivingKeys.publicKey(),
            asset: AUD,
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
};
