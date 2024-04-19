<!-- ABOUT THE PROJECT -->

## About The Project

In these test files I have attempted to hit a few high level test cases that one would want to get the most value out of the fewest files.

In a real world scenario I would identify what I believe to be the high level/critical user flows and functionality, create a test plan,
then get sign off/confirmation from stakeholders that those are the cases for which we want to automate. However, in this test scenario I just
used best judgement based on the existing product located at https://www.qrcode-monkey.com/# .

Tests included in this project:

- cypress/e2e/url_tab_tests - Ensure user can generate qr codes utilizing the settings options found in URL tab
- cypress/e2e/all_page_tests.spec.cy.js - Verify appearance of expected elements on the wrapper page because I suspect much of the content on the wrapper page is integral to SEO

For further proposals of how I would add to these tests in a real world scenario and improvements I could make to these existing tests in a real world scenario, please see inline TODOs as well as QUESTIONS.md .

<!-- GETTING STARTED -->

## Getting Started

### Pre-requisites

- Node.js 18.x or Node.js 20.x and above
- See https://docs.cypress.io/guides/getting-started/installing-cypress#System-requirements for other system requirements

### Installation

1. Download project file
2. cd into root directory of QRCODETEST
3. Install cypress
   `npm install cypress --save-dev`

### Running Cypress Tests

1.  cd into qrcodetest
2.  Run `npx cypress open` to open cypress runner
3.  Select E2E Testing
4.  Run available tests

<!-- CONTACT -->

## Contact

Kimberly Schwartz - kimba.schwartzy@gmail.com

Project Link: [https://github.com/kstw-beep/QRCodeTest](https://github.com/kstw-beep/QRCodeTest)

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

Thank you for the opportunity!

<p align="right">(<a href="#readme-top">back to top</a>)</p>
