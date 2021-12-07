# Stellar Loan Repayment Simulator

This project takes a desired loan amount (with 8% annual interest and for 5 years), calculates it's minimum payments and sends rewards using the Stellar blockchain.

The project asks for a Stellar account private key, which you can create here: https://laboratory.stellar.org/#account-creator?network=test

2% of the interest paid with each repayment is sent to the borrower's stellar account as AUD.

Paying less than the minimum repayment is not possible, and when the borrower pays more than the minimum they are rewarded for good behavior, receiving WNT in their Stellar account. The amount they receive is the lesser of these: the difference between minimum repayment and repayment made, or 2% of the interest paid.

![image](https://user-images.githubusercontent.com/56001809/144936567-12410161-8a59-4820-a4fa-3ce542a2d621.png)

![image](https://user-images.githubusercontent.com/56001809/144936610-e4120b30-59d0-4d4c-a5e0-5799a064e6c3.png)

![image](https://user-images.githubusercontent.com/56001809/144936661-c60f06db-7601-4521-ab64-6c88e99fc6b5.png)

![image](https://user-images.githubusercontent.com/56001809/144936696-c767ca5b-abe8-465a-86c0-ac3c63a39d01.png)

# How to use

Download the repo and run "npm install".

To start the project run "npm run start", to run the unit tests run "npm run test", and "npm run cypress:open" for the integration test.

You can use the issuer account that comes hardcoded or you can create your own account on the Stellar laboratory and change the issuerAccountPrivateKey variable in ./src/helpers/stellar.js to your own private key
