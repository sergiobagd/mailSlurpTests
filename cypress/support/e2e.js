// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';
import { MailSlurp } from 'mailslurp-client';

// Alternatively you can use CommonJS syntax:
// require('./commands')

const apiKey = Cypress.env('MAILSLURP_API_KEY');
if (!apiKey) {
  throw new Error(
    'Error no MailSlurp API Key. Please set the `CYPRESS_MAILSLURP_API_KEY` '
        + 'environment variable to the value of your MailSlurp API Key to use the MailSlurp Cypress plugin. '
        + 'Create a free account at https://app.mailslurp.com/sign-up/. See https://docs.cypress.io/guides/guides/environment-variables#Option-3-CYPRESS_ for more information.',
  );
}
// create an instance of mailslurp-client
const mailslurp = new MailSlurp({ apiKey, basePath: 'https://cypress.api.mailslurp.com' });
// register MailSlurp with cypress under "mailslurp" command
// afterwards you can access it in tests using `cy.mailslurp().then(mailslurp => /* do stuff */)`
Cypress.Commands.add('mailslurp', () => Promise.resolve(mailslurp));
