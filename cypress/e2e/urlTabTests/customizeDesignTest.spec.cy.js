/**
 * customizeDesignTest.spec.cy.js
 * Smoke and tests for Customize Design pane in qr code settings - url tab
 *
 * Kimberly Schwartz
 * April 2024
 */

describe('Smoke Tests for Customize Design section in URL tab', () => {
  beforeEach(() => {
    cy.visitQRCodeMonkeyTab('url');
  });

  it('displays Customize Design pane', () => {
    cy.get('.pane-header .title')
      .contains('Customize Design')
      .should('be.visible');
  });

  it('verifies design pane displays appropriate elements', () => {
    cy.get('.pane-header .title').contains('Customize Design').click();
    // body shape options display
    cy.contains('Body Shape').should('be.visible');
    cy.get('.sprite-body').eq(0).should('be.visible');
    // eye frame shapes display
    cy.contains('Eye Frame Shape').should('be.visible');
    cy.get('.sprite.sprite-frame0').should('be.visible');
    // eye ball shapes display
    cy.contains('Eye Ball Shape').should('be.visible');
    cy.get('.sprite.sprite-ball0').should('be.visible');
  });

  it('generates a new qr code after customizing it', () => {
    // To support choosing a random eye frame shape and compensate for numbering of elements
    var spriteFrameNumber = Math.floor(Math.random() * (16 - 0));
    if (spriteFrameNumber === 9) spriteFrameNumber = 10;
    if (spriteFrameNumber === 15) spriteFrameNumber = 16;

    // To support choosing a random eye ball shape and compensate for numbering of elements
    var spriteBallNumber = Math.floor(Math.random() * (19 - 0));
    if (spriteBallNumber === 4) spriteBallNumber = 5;
    if (spriteBallNumber === 9) spriteBallNumber = 10;

    cy.get('.pane-header .title').contains('Customize Design').click();
    // click a random body shape
    cy.get('.sprite-body')
      .eq(Math.floor(Math.random() * (22 - 1) + 1))
      .click();
    // click a random eye frame shape
    cy.get(`.sprite-frame${spriteFrameNumber}`).click();
    // click a random eye ball shape
    cy.get(`.sprite-ball${spriteBallNumber}`).click();
    // intercept api call for qr code gen
    cy.intercept('GET', 'https://api.qrcode-monkey.com/tmp/***').as('qrGen');
    // click create qr code
    cy.get('[id="button-create-qr-code"]').click();
    // wait for network call to return successful
    cy.wait('@qrGen').its('response.statusCode').should('eq', 200);
    // verify qr code generated is no longer placeholder preview image
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
