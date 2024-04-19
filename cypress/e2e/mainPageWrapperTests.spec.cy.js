/**
 * mainPageWrapperTests.spec.cy.js
 * Smoke and visibility tests for header, footer, informational and seo
 * related elements on qrcode-monkey page
 *
 * Kimberly Schwartz
 * April 2024
 */

describe('Smoke Test for page wrapper elements', () => {
  beforeEach(() => {
    cy.visitQRCodeMonkeyTab();
  });

  it('navigates to different tabs', () => {
    var randomTab = Math.floor(Math.random() * (14 - 1) + 1);
    // capture a random tab's text and click it
    cy.get('.tab')
      .eq(randomTab)
      .invoke('text')
      .then((tabText) => {
        var clickedTab = tabText.toLowerCase();
        cy.get('.tab').eq(randomTab).click();
        // verify that url you are brought to is correct for tab clicked
        cy.url().should('contain', clickedTab);
      });
  });

  it('displays header elements', () => {
    // logo is visible
    cy.get('.logo-flex')
      .contains('The 100% Free QR Code Generator')
      .should('be.visible');
    // about link is visible
    cy.get('[href="/#about"]').should('be.visible').and('contain', 'About');
    // chrome app link is visible
    cy.get(
      '[href="https://chrome.google.com/webstore/detail/gidoepdbdhacpopcmepkflghaalfapmk"]'
    )
      .should('be.visible')
      .and('contain', 'Chrome App');
    // qr code api link is visible
    cy.get('[href="https://www.qrcode-monkey.com/qr-code-api-with-logo/"]')
      .should('be.visible')
      .and('contain', 'QR Code API');
    // language button is visible
    cy.get('.last-item').contains('English').should('be.visible');
  });

  it('displays type bar', () => {
    cy.get('.type-bar').should('be.visible');
  });

  it('displays settings screen', () => {
    cy.get('.settings').should('be.visible');
  });

  it('verifies, while signed out, clicking More tab dropdown pops signup ad', () => {
    cy.get('.tabmore').click();
    cy.get('.ad-modal').should('be.visible');
  });

  it('displays Get More section', () => {
    // get more section
    cy.get('.section')
      .eq(0)
      .should('be.visible')
      .within(() => {
        // get more title
        cy.get('h4.intro-title').contains('Get More').should('be.visible');
        // get more icons
        cy.get('.facts').should('be.visible');
        // get started now button
        cy.get('.btn').contains('Get Started Now').should('be.visible');
      });
  });

  it('displays Get Started section', () => {
    // section displays
    cy.get('.section')
      .eq(1)
      .should('be.visible')
      .within(() => {
        // title displays
        cy.get('.intro-title').contains('Get Started').should('be.visible');
        // paragraphs display
        cy.get('.text-block').eq(0).should('be.visible');
        cy.get('.text-block').eq(1).should('be.visible');
        cy.get('.text-block').eq(2).should('be.visible');
        cy.get('.text-block').eq(2).should('be.visible');
      });
  });

  it('displays About section', () => {
    // section displays
    cy.get('.section')
      .eq(2)
      .should('be.visible')
      .within(() => {
        // titled displays
        cy.get('.intro-title').contains('About').should('be.visible');
        // header displays
        cy.get('h2').contains('QR Code Generator').should('be.visible');
        // sub-paragraph displays
        cy.get('p').contains('QRCode Monkey').should('be.visible');
        // example qr codes display
        cy.get('.example-qrcode').eq(0).should('be.visible');
        // other About paragraphs display - verify all because probably seo text
        cy.get('.h4').eq(0).should('be.visible');
        cy.get('p').eq(0).should('be.visible');
        cy.get('.h4').eq(1).should('be.visible');
        cy.get('p').eq(1).should('be.visible');
        cy.get('.h4').eq(2).should('be.visible');
        cy.get('p').eq(2).should('be.visible');
        cy.get('.h4').eq(3).should('be.visible');
        cy.get('p').eq(3).should('be.visible');
        cy.get('.h4').eq(4).should('be.visible');
        cy.get('p').eq(4).should('be.visible');
        cy.get('.h4').eq(5).should('be.visible');
        cy.get('p').eq(5).should('be.visible');
      });
  });

  it('displays FAQs section', () => {
    // section displays
    cy.get('[id="faq"]')
      .should('be.visible')
      .within(() => {
        // titled displays
        cy.get('.intro-title')
          .should('be.visible')
          .and('contain', 'Frequently Asked Questions');
        // header displays
        cy.get('.h6').first().should('be.visible');
        // paragraph displays
        cy.get('.bottom-spacing').eq(2).should('be.visible');
      });
  });

  it('displays footer', () => {
    // footer displays
    cy.get('.footer')
      .should('be.visible')
      .within(() => {
        //links display
        cy.get('[href="https://www.qrcode-monkey.com/qr-code-api-with-logo/"]')
          .should('be.visible')
          .and('contain', 'QR Code API');
        cy.get('[href="https://www.qrcode-monkey.com/"]')
          .should('be.visible')
          .and('contain', 'English');
        cy.get('[href="https://www.qrcode-monkey.com/de/"]')
          .should('be.visible')
          .and('contain', 'Deutsch');
        cy.get('[href="https://www.qrcode-monkey.com/es/"]')
          .should('be.visible')
          .and('contain', 'Español');
        cy.get('[href="https://www.qrcode-monkey.com/fr/"]')
          .should('be.visible')
          .and('contain', 'Français');
        cy.get('[href="https://www.qrcode-monkey.com/it/"]')
          .should('be.visible')
          .and('contain', 'Italiano');
        cy.get('[href="https://www.qrcode-monkey.com/pt/"]')
          .should('be.visible')
          .and('contain', 'Português');
        cy.get('[href="https://www.qrcode-monkey.com/id/"]')
          .should('be.visible')
          .and('contain', 'Indonesian');
        cy.get('[href="https://www.qrcode-monkey.com/ru/"]')
          .should('be.visible')
          .and('contain', 'Русский');
        cy.get('[href="https://www.qrcode-monkey.com/th/"]')
          .should('be.visible')
          .and('contain', 'ไทย');
        cy.get('[href="https://www.qrcode-monkey.com/ar/"]')
          .should('be.visible')
          .and('contain', 'عربى');
        cy.get('[href="https://www.qrcode-monkey.com/en/imprint/"]')
          .should('be.visible')
          .and('contain', 'Imprint');
        // logo displays
        cy.get('.logo').should('be.visible');
        // socials display
        cy.get('[href="https://facebook.com/qrcodemonkey"]')
          .find('img')
          .and('be.visible');
        cy.get('[href="https://twitter.com/qrcodemonkey"]')
          .find('img')
          .and('be.visible');
        //trademark copy displays
        cy.get('.text-center')
          .contains(
            'QR Code is a registered trademark of DENSO WAVE INCORPORATED in the United States and other countries.'
          )
          .should('be.visible');
      });
  });
});
