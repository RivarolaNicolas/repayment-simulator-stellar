const StellarSdk = require('stellar-sdk');

const issuerAccountPrivateKey = 'SA3R3BAGXSXOKUKFGKTYP2GONMTPPGEFBYLFMAAM5LI33ZKYDQ7TIPJC';

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

	// Create an object to represent the new asset
	const WNT = new StellarSdk.Asset('WNT', issuingKeys.publicKey());
	const AUD = new StellarSdk.Asset('AUD', issuingKeys.publicKey());

	// First, the receiving account must trust the asset
	server
		.loadAccount(receivingKeys.publicKey())
		.then(function (account) {
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
					})
				)

				// setTimeout is required for a transaction
				.setTimeout(100)
				.build();
			transaction.sign(receivingKeys);
			return server.submitTransaction(transaction);
		})

		.then(console.log())

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
						amount: borrowerRewards.toFixed(2),
					})
				)
				.addOperation(
					StellarSdk.Operation.payment({
						destination: receivingKeys.publicKey(),
						asset: AUD,
						amount: twoPercentOfInterestPaid.toFixed(2),
					})
				)
				// setTimeout is required for a transaction
				.setTimeout(100)
				.build();
			transaction.sign(issuingKeys);
			return server.submitTransaction(transaction);
		})
		.then(
			() => setTransactionSuccessful(true),
			() => setTransactionSuccessful(false)
		)
		.catch(function (error) {
			console.error('Error!', error);
		});
};
