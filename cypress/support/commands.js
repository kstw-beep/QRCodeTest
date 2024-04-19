/** Custom command for visiting a specific tab/type within the QR code generator
 *  usage-
 * cy.visitQRCodeMonkeyTab() to go to default main tab of page
 * cy.visitQRCodeMonkeyTab(<tabName>) like cy.visitQRCodeMonkeyTab('text') to visit specific tabs
 *  Also has a cookie banner dismissal and a wait for page load.
 */

Cypress.Commands.add('visitQRCodeMonkeyTab', (tabName) => {
  // intercept request for page
  cy.intercept('GET', 'https://www.qrcode-monkey.com/**').as('pageLoad');
  // visit either the specific tab for the qrcode generator or leave blank to go to default
  cy.visit(`https://www.qrcode-monkey.com/#${tabName}`);
  // wait for page to load
  cy.wait('@pageLoad').its('response.statusCode').should('eq', 200);
  // accept all cookies
  // TODO: replace this with setting the cookie value to not show the banner, once we know the cookie value
  cy.get('[id="onetrust-accept-btn-handler"]').click();
});
