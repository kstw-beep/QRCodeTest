/**
 * addLogoTest.spec.cy.js
 * Smoke and tests for Add Logo pane in qr code settings - url tab
 *
 * Kimberly Schwartz
 * April 2024
 */

describe('Smoke Tests for Add logo section in URL tab', () => {
  beforeEach(() => {
    cy.visitQRCodeMonkeyTab('url');
  });

  it('displays Add Logo Image pane', () => {
    cy.get('.pane-header .title')
      .contains('Add Logo Image')
      .should('be.visible');
  });

  it('verifies Add Logo Image pane has appropriate fields', () => {
    cy.get('.pane-header .title').contains('Add Logo Image').click();
    // uploaded logo placeholder
    cy.get('.logo-preview').should('be.visible');
    // upload image button
    cy.get('.btn-upload').should('be.visible');
    // logo spotlight ad
    cy.get('.ad.d-block').should('be.visible');
    // remove background checkbox
    cy.get(
      '.form-check-input.ng-pristine.ng-untouched.ng-valid.ng-empty'
    ).should('be.visible');
    // pre-loaded logos
    cy.get('.form-group.shape-group').should('be.visible');
    // logo alert
    cy.get('.form-group.alert.alert-info').should('be.visible');
  });

  it('adds a pre-loaded logo to qr code and generates a new qr code', () => {
    cy.get('.pane-header .title').contains('Add Logo Image').click();
    // click a random logo from those available. currently there are 24 available
    cy.get('.sprite-logo')
      .eq(Math.floor(Math.random() * (24 - 1) + 1))
      .click();
    // intercept api call for qr code gen
    cy.intercept('GET', 'https://api.qrcode-monkey.com/tmp/***').as('qrGen');
    // click create qr code
    cy.get('[id="button-create-qr-code"]').click();
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
