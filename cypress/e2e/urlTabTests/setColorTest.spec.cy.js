/**
 * setColorTest.spec.cy.js
 * Smoke and tests for Set Color pane in qr code settings - url tab
 *
 * Kimberly Schwartz
 * April 2024
 */

describe('Smoke Tests for Set Color section in URL tab', () => {
  beforeEach(() => {
    cy.visitQRCodeMonkeyTab('url');
  });

  it('displays Set Colors pane', () => {
    cy.get('.pane-header .title').contains('Set Colors').should('be.visible');
  });

  it('verifies Set Colors pane has appropriate fields', () => {
    cy.get('.pane-header .title').contains('Set Colors').click();
    // foreground color selector displays
    cy.contains('Foreground Color').should('be.visible');
    // background color selector display
    cy.contains('Background Color').should('be.visible');
  });

  it('sets color of qr code in colors pane using hex code inputs and generates a new qr code', () => {
    cy.get('.pane-header .title').contains('Set Colors').click();
    // set foreground color
    cy.get('.color-picker-input').first().clear();
    cy.get('.color-picker-input').first().type('#3FADC0');
    // click outside of color picker to set color and dismiss gradient box
    cy.get('body').click(50, 50, { force: true });
    // set background color
    cy.get('.color-picker-input').last().clear();
    cy.get('.color-picker-input').last().type('#BE4D4D');
    // intercept api call for qr code gen
    cy.intercept('GET', 'https://api.qrcode-monkey.com/tmp/***').as('qrGen');
    // click create qr code
    cy.get('[id="button-create-qr-code"]').click();
    // wait for network call to return successful
    cy.wait('@qrGen').its('response.statusCode').should('eq', 200);
    //verify that the qrcode generated is not the same svg file as when the page loaded
    cy.get('.card-img-top').should(
      'not.contain',
      '.ng-src="/img/default-pr  eview-qr.svg"'
    );
    // download png button is enabled and clickable
    cy.get('[id="button-download-qr-code-png"]')
      .should('not.be.disabled')
      .click();
    // download modal displays
    cy.get('.download-modal').should('be.visible');
  });
});
