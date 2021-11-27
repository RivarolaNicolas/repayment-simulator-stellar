const StellarSdk = require('stellar-sdk');

//const borrowerAccount = 'GCE3DHPZUEITQP2B6HHWTQMLIEKR5YYM4HJ3CIVVTETORNCNU3NFNLOT';
const emitterAccountPublicKey = 'GBJDIEEJ4HUXQSYNINVBAJ35FLSUGFFVLPBHVI65R42GUDKIMJ7PKHGJ';
const emitterAccountPrivateKey = 'SBJYCFTUCM5GLIZNXRO5T7HTEY2IILMP2GHUTXQMDIAMRCF25U333PCF';
function CreateBorrowerAccount() {
  const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
  const source = StellarSdk.Keypair.fromSecret(
    'SBJYCFTUCM5GLIZNXRO5T7HTEY2IILMP2GHUTXQMDIAMRCF25U333PCF'
  );
  const destination = StellarSdk.Keypair.random();

  server
    .accounts()
    .accountId(source.publicKey())
    .call()
    .then(({ sequence }) => {
      const account = new StellarSdk.Account(source.publicKey(), sequence);
      const transaction = new StellarSdk.TransactionBuilder(account, {
        fee: StellarSdk.BASE_FEE,
        networkPassphrase: StellarSdk.Networks.TESTNET,
      })
        .addOperation(
          StellarSdk.Operation.createAccount({
            destination: destination.publicKey(),
            startingBalance: '25',
          })
        )
        .setTimeout(30)
        .build();
      transaction.sign(StellarSdk.Keypair.fromSecret(source.secret()));

      return server.submitTransaction(transaction);
    })
    .then((results) => {
      console.log('Transaction', results._links.transaction.href);
      console.log('New Keypair', destination.publicKey(), destination.secret());
    });
}
export default CreateBorrowerAccount;
