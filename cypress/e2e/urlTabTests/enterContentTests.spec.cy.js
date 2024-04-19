/**
 * enterContentTest.spec.cy.js
 * Smoke tests for Enter Content pane in qr code settings - url tab
 *
 * Kimberly Schwartz
 * April 2024
 */

describe('Smoke Tests for Enter Content pane on URL tab', () => {
  beforeEach(() => {
    cy.visitQRCodeMonkeyTab('url');
  });

  it('displays Enter Content pane', () => {
    cy.get('.pane-header .title')
      .contains('Enter Content')
      .should('be.visible');
  });

  it('edits url in Enter Content pane and generates qr code', () => {
    // clear qr code url input
    cy.get('[id="qrcodeUrl"]').focus().clear();
    // type another example url string
    cy.get('[id="qrcodeUrl"]').type('https://www.example-monkey.com');
    // intercept api call for qr code gen
    cy.intercept('GET', 'https://api.qrcode-monkey.com/tmp/***').as('qrGen');
    // click create qr code
    cy.get('[id="button-create-qr-code"]').click({ force: true });
    // wait for network call to return successful
    cy.wait('@qrGen').its('response.statusCode').should('eq', 200);
    // verify that the qrcode generated is not the same svg file as when the page loaded
    cy.get('.card-img-top').should(
      'not.contain',
      '.ng-src="/img/default-preview-qr.svg"'
    );
    // download png button is enabled and clickable
    cy.get('[id="button-download-qr-code-png"]')
      .should('not.be.disabled')
      .click();
    // download modal displays
    cy.get('.download-modal').should('be.visible');
  });
});
