import React from 'react';

///
<reference types='cypress' />;

describe('Submit transaction', () => {
  // NOTE: skipping this test because it does not wait correctly for assertion to execute
  it('tries to open the site', () => {
    cy.visit('http://localhost:3000');

    cy.get('#loan-amount').type('30000');
  });
  it('checks that you are alerted if you are making less than minimumRepayment', () => {
    cy.get('#repayment-amount').type('608').should('have.class', 'border-red-500');
  });

  it('checks that the input updates correctly when given a valid repayment amount', () => {
    cy.get('#repayment-amount').clear().type('610').should('have.class', 'border-gray-300');
  });

  it('checks that the input updates when clicking the minimum repayment button', () => {
    cy.get('#set-minimum-repayment').click();

    cy.get('#repayment-amount').should('have.value', '608.29');
  });

  it('checks that you cant submit a transaction if the private key is invalid', () => {
    cy.get('#private-key').type('asd123');

    cy.get('#submit-transaction').should('be.hidden', true);
  });

  it('checks that the submit button is shown when the private key is valid', () => {
    cy.get('#private-key').clear().type('SAELKVAON3AL3SMIVJ5AD5422NLS6C6HFEKUUVU7V4WCSTDFJ6XBGSVW');

    cy.get('#submit-transaction').should('be.visible', true);
  });

  it('checks that the transaction was successful', () => {
    cy.get('#submit-transaction').click();

    cy.findByText('Transaction Succesful', { timeout: 15000 }).should('be.visible', true);
  });
});
